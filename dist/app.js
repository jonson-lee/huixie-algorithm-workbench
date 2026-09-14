(function () {
  "use strict";

  const STORAGE_KEY = "huixie-learning-state-v1";
  const VERSION = 1;
  const PROBLEMS = Array.isArray(window.PROBLEMS) ? window.PROBLEMS : [];
  const TOPIC_ORDER = ["哈希", "双指针", "滑动窗口", "栈", "链表", "二叉树", "图搜索", "二分查找", "堆与桶", "回溯", "动态规划"];
  const ERROR_OPTIONS = ["没识别出题型", "思路想不到", "数据结构选错", "边界条件遗漏", "复杂度不清楚", "代码实现错误", "Python 语法不熟"];
  const STATUS_LABELS = {
    new: "未学习",
    learning: "巩固中",
    recall: "待复现",
    mastered: "稳定掌握",
    lapsed: "需要重学"
  };

  const defaultState = {
    version: VERSION,
    onboarded: false,
    settings: {
      language: "Python 3",
      minutes: 25,
      syntaxReady: true
    },
    problems: {},
    history: [],
    session: null
  };

  let state = loadState();
  let currentView = state.session ? "practice" : "today";
  let runner = null;
  let runnerTimeout = null;
  let clearArmedUntil = 0;

  const root = document.getElementById("view-root");
  const toastRegion = document.getElementById("toast-region");

  function cloneDefaultState() {
    return JSON.parse(JSON.stringify(defaultState));
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return cloneDefaultState();
      const parsed = JSON.parse(raw);
      if (parsed.version !== VERSION) return cloneDefaultState();
      return {
        ...cloneDefaultState(),
        ...parsed,
        settings: { ...defaultState.settings, ...(parsed.settings || {}) },
        problems: parsed.problems || {},
        history: Array.isArray(parsed.history) ? parsed.history : []
      };
    } catch (error) {
      console.warn("无法读取本地进度", error);
      return cloneDefaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      showToast("浏览器未能保存进度，请在设置中导出备份。", 4200);
    }
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function problemState(problemId) {
    return state.problems[problemId] || {
      status: "new",
      independentPasses: 0,
      hintTotal: 0,
      attempts: 0,
      errors: [],
      draft: "",
      recallIdea: "",
      recallInvariant: ""
    };
  }

  function ensureProblemState(problemId) {
    if (!state.problems[problemId]) {
      state.problems[problemId] = {
        status: "new",
        independentPasses: 0,
        hintTotal: 0,
        attempts: 0,
        errors: [],
        draft: "",
        recallIdea: "",
        recallInvariant: ""
      };
    }
    return state.problems[problemId];
  }

  function findProblem(problemId) {
    return PROBLEMS.find((problem) => problem.id === problemId) || PROBLEMS[0];
  }

  function dayStart(date = new Date()) {
    const copy = new Date(date);
    copy.setHours(0, 0, 0, 0);
    return copy;
  }

  function addDays(date, days) {
    const copy = new Date(date);
    copy.setDate(copy.getDate() + days);
    return copy;
  }

  function isoDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat("zh-CN", {
      month: "long",
      day: "numeric",
      weekday: "short"
    }).format(date);
  }

  function formatReviewDate(value) {
    if (!value) return "尚未安排";
    const target = dayStart(new Date(value));
    const today = dayStart();
    const delta = Math.round((target - today) / 86400000);
    if (delta <= 0) return "今天";
    if (delta === 1) return "明天";
    return `${delta} 天后`;
  }

  function getQueue() {
    const now = Date.now();
    const activeSessionProblem = state.session ? findProblem(state.session.problemId) : null;
    const due = PROBLEMS.filter((problem) => {
      const progress = problemState(problem.id);
      return progress.nextReviewAt && new Date(progress.nextReviewAt).getTime() <= now;
    });

    const unfinished = PROBLEMS.filter((problem) => {
      const progress = problemState(problem.id);
      return progress.firstSeenAt && !progress.nextReviewAt && progress.status !== "mastered";
    });

    const nextNew = PROBLEMS.find((problem) => !problemState(problem.id).firstSeenAt);
    const selected = [];

    [activeSessionProblem, ...due, ...unfinished].filter(Boolean).forEach((problem) => {
      if (!selected.some((item) => item.id === problem.id)) selected.push(problem);
    });

    const reviewBudget = state.settings.minutes <= 15 ? 1 : state.settings.minutes <= 25 ? 2 : 3;
    const limited = selected.slice(0, reviewBudget);
    if (nextNew && (limited.length === 0 || state.settings.minutes >= 25)) limited.push(nextNew);

    if (!limited.length && PROBLEMS.length) {
      const weakest = [...PROBLEMS].sort((a, b) => masteryScore(problemState(a.id)) - masteryScore(problemState(b.id)))[0];
      if (weakest) limited.push(weakest);
    }

    return limited;
  }

  function masteryScore(progress) {
    if (!progress.firstSeenAt) return 0;
    if (progress.status === "mastered") return 5;
    if (progress.status === "lapsed") return 1;
    if (progress.independentPasses >= 2) return 4;
    if (progress.independentPasses === 1) return 3;
    if (progress.attempts > 0) return 2;
    return 1;
  }

  function selectedReason(problem) {
    const progress = problemState(problem.id);
    if (state.session?.problemId === problem.id) {
      return `你上次停在第 ${state.session.stage + 1} 步。继续原训练，不会丢失已写内容。`;
    }
    if (!progress.firstSeenAt) {
      return `${problem.topic}是后续路线的重要前置。今天只学习一题，先把这条线路接通。`;
    }
    if (progress.nextReviewAt && new Date(progress.nextReviewAt).getTime() <= Date.now()) {
      return `这题的记忆间隔已到。先闭卷复现，再决定是否延长下一次间隔。`;
    }
    if (progress.status === "lapsed") {
      return `上一次需要较多支架，系统已把它提前并允许重新学习。`;
    }
    return `这是当前最薄弱的已学题，优先补强比继续增加新题更有效。`;
  }

  function setView(view) {
    currentView = view;
    if (view !== "practice" && state.session) {
      saveSessionInputs();
    }
    updateNavigation();
    render();
    document.getElementById("main-content")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function updateNavigation() {
    document.querySelectorAll("[data-view]").forEach((button) => {
      if (!button.closest(".main-nav")) return;
      if (button.dataset.view === currentView) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    });
  }

  function render() {
    if (!PROBLEMS.length) {
      root.innerHTML = `<section class="empty-state"><div><p class="panel-label">CONTENT ERROR</p><h2>训练内容没有载入</h2><p>请刷新页面；如果问题仍存在，请稍后再试。</p></div></section>`;
      return;
    }

    if (currentView === "practice" && state.session) {
      renderPractice();
      return;
    }

    const renderers = {
      today: renderToday,
      route: renderRoute,
      progress: renderProgress,
      settings: renderSettings
    };
    (renderers[currentView] || renderToday)();
  }

  function renderToday() {
    const queue = getQueue();
    const active = queue[0];
    const reviewCount = queue.filter((problem) => problemState(problem.id).firstSeenAt).length;
    const newCount = queue.filter((problem) => !problemState(problem.id).firstSeenAt).length;
    const estimate = queue.reduce((total, problem) => total + (problemState(problem.id).firstSeenAt ? 12 : problem.minutes), 0);
    const learned = PROBLEMS.filter((problem) => problemState(problem.id).firstSeenAt).length;
    const mastered = PROBLEMS.filter((problem) => problemState(problem.id).status === "mastered").length;
    const meter = Math.min(100, Math.round((estimate / Math.max(15, state.settings.minutes)) * 100));

    if (!active) {
      root.innerHTML = `<section class="empty-state"><div><p class="panel-label">CIRCUIT CLEAR</p><h2>今天的线路已经全部接通</h2><p>没有到期复习，也没有新题。明天回来继续巩固。</p></div></section>`;
      return;
    }

    const activeProgress = problemState(active.id);
    const isActiveSession = state.session?.problemId === active.id;
    const isDue = Boolean(activeProgress.nextReviewAt && new Date(activeProgress.nextReviewAt).getTime() <= Date.now());
    const activeMode = isActiveSession ? "resume" : isDue ? "review" : activeProgress.firstSeenAt ? "continue" : "new";
    const stageLabels = (isActiveSession ? state.session.kind === "review" : activeProgress.firstSeenAt)
      ? ["回忆", "提纲", "编码", "验证", "复盘"]
      : ["看解法", "复述", "编码", "验证", "复习"];
    const pins = PROBLEMS.slice(0, 12)
      .map((problem) => `<span data-state="${escapeHTML(problemState(problem.id).status)}" title="${escapeHTML(problem.title)}：${escapeHTML(STATUS_LABELS[problemState(problem.id).status] || "未学习")}"></span>`)
      .join("");

    const setup = !state.onboarded
      ? `<section class="setup-strip" aria-label="首次设置">
          <div>
            <p class="panel-label">首次启动</p>
            <strong>已按默认方案准备：Python 3 · 每天 ${state.settings.minutes} 分钟 · 算法零基础</strong>
          </div>
          <div class="choice-row">
            <button class="secondary-button" type="button" data-view="settings">调整</button>
            <button class="primary-button" type="button" data-action="accept-defaults">就按这个开始</button>
          </div>
        </section>`
      : "";

    root.innerHTML = `
      <section class="workspace" aria-label="今日学习工作台">
        <aside class="load-rail">
          <div>
            <p class="rail-title">今日负载</p>
            <p class="load-time">${estimate}<small>分钟预计用时</small></p>
            <div class="load-meter" style="--meter: ${meter}%" role="img" aria-label="预计使用今日 ${meter}% 的学习时间"><span></span></div>
          </div>
          <ul class="load-list">
            <li><span>待续 / 复习</span><strong>${reviewCount}</strong></li>
            <li><span>今日新题</span><strong>${newCount}</strong></li>
            <li><span>已学总数</span><strong>${learned}</strong></li>
          </ul>
          <p class="rail-note">到期复习优先于新题。积压时，系统会自动减少新内容，不会因为断签惩罚你。</p>
        </aside>

        <section class="circuit-board">
          ${setup}
          <header class="board-heading">
            <div>
              <h1>${activeMode === "resume" ? "继续接通这条线路" : activeMode === "review" ? "把这道题写回来" : activeMode === "continue" ? "完成上次没写完的题" : "今天，接通第一条线路"}</h1>
              <p>系统已经决定下一步，你只需要完成眼前这一项。</p>
            </div>
            <div class="date-chip">${escapeHTML(formatDate(new Date()))}<br />LOCAL / ${escapeHTML(state.settings.language)}</div>
          </header>

          <ol class="learning-circuit" aria-label="本题训练阶段">
            ${stageLabels.map((label, index) => `<li class="${index === 0 ? "is-active" : ""}"><span class="pin">${index + 1}</span><span>${label}</span></li>`).join("")}
          </ol>

          <article class="active-module">
            <div class="module-main">
              <div class="module-topline">
                <span class="module-id">LC ${active.number}</span>
                <span class="signal-tag">${activeMode === "resume" ? "继续训练" : activeMode === "review" ? "到期复现" : activeMode === "continue" ? "待完成" : "今日新题"}</span>
              </div>
              <h2>${escapeHTML(active.title)}</h2>
              <p>${escapeHTML(active.summary)}</p>
              <button class="primary-button" type="button" data-action="start-problem" data-problem-id="${escapeHTML(active.id)}">
                ${activeMode === "resume" ? "继续原训练" : activeMode === "review" ? "开始闭卷复现" : activeMode === "continue" ? "继续完成" : "开始今天的训练"}
              </button>
            </div>
            <aside class="module-side">
              <div>
                <p class="panel-label">当前信号</p>
                <strong>${escapeHTML(selectedReason(active))}</strong>
              </div>
              <dl>
                <div><dt>主题</dt><dd>${escapeHTML(active.topic)}</dd></div>
                <div><dt>阶段</dt><dd>${escapeHTML(STATUS_LABELS[activeProgress.status] || "未学习")}</dd></div>
                <div><dt>预计</dt><dd>${activeProgress.firstSeenAt ? 12 : active.minutes} MIN</dd></div>
              </dl>
            </aside>
          </article>

          <div class="queue-strip" aria-label="今日训练队列">
            ${queue.map((problem, index) => {
              const progress = problemState(problem.id);
              const isSession = state.session?.problemId === problem.id;
              const isReview = Boolean(progress.nextReviewAt && new Date(progress.nextReviewAt).getTime() <= Date.now());
              const isSeen = Boolean(progress.firstSeenAt);
              const queueLabel = isSession ? "RESUME" : isReview ? "REVIEW" : isSeen ? "CONTINUE" : "NEW";
              return `<button class="queue-row plain-row-button" type="button" data-action="start-problem" data-problem-id="${escapeHTML(problem.id)}">
                <span class="queue-index">${String(index + 1).padStart(2, "0")}</span>
                <strong>${escapeHTML(problem.title)}</strong>
                <small>${escapeHTML(problem.topic)} · ${isSeen ? "约 12 分钟" : `约 ${problem.minutes} 分钟`}</small>
                <span class="queue-state ${isSeen ? "is-due" : ""}">${queueLabel}</span>
              </button>`;
            }).join("")}
          </div>
        </section>

        <aside class="evidence-rail">
          <p class="rail-title">稳定掌握</p>
          <p class="mastery-copy">${mastered ? `已有 ${mastered} 道题经得住间隔复现。` : "目前还没有题目通过稳定性验证。"}</p>
          <div class="mastery-pins" aria-label="前十二题掌握状态">${pins}</div>
          <div class="reason-block">
            <h2>为什么是这道题</h2>
            <p>${escapeHTML(selectedReason(active))}</p>
            <button class="plain-link" type="button" data-view="route">查看完整路线</button>
          </div>
          <div class="reason-block">
            <h2>掌握不等于看过</h2>
            <p>需要跨日期闭卷完成，并能解释原理和处理一个变化条件，才会点亮稳定掌握。</p>
          </div>
        </aside>
      </section>`;
  }

  function renderRoute() {
    const queue = getQueue();
    const next = queue[0] || PROBLEMS[0];
    const groups = TOPIC_ORDER.map((topic) => ({
      topic,
      problems: PROBLEMS.filter((problem) => problem.topic === topic)
    })).filter((group) => group.problems.length);

    root.innerHTML = `
      <section class="page-view">
        <header class="page-heading">
          <h1>路线不是题单，是前置关系</h1>
          <p>所有题目都可以自由打开；推荐顺序会优先补齐下一题所依赖的知识，而不是照着列表机械向下刷。</p>
        </header>
        <div class="route-layout">
          <ol class="concept-track">
            ${groups.map((group, index) => {
              const scores = group.problems.map((problem) => masteryScore(problemState(problem.id)));
              const average = scores.reduce((a, b) => a + b, 0) / scores.length;
              const isCurrent = group.problems.some((problem) => problem.id === next.id);
              const status = average >= 4 ? "稳定" : average > 0 ? "学习中" : isCurrent ? "当前推荐" : "未学习";
              return `<li class="concept-row ${isCurrent ? "is-current" : ""}">
                <span class="concept-pin">${String(index + 1).padStart(2, "0")}</span>
                <h2>${escapeHTML(group.topic)}</h2>
                <div class="concept-problems">
                  ${group.problems.map((problem) => `<button class="problem-chip" type="button" data-action="start-problem" data-problem-id="${escapeHTML(problem.id)}">${escapeHTML(problem.title)}</button>`).join("")}
                </div>
                <span class="track-status">${status}</span>
              </li>`;
            }).join("")}
          </ol>
          <aside class="route-aside">
            <p class="panel-label">推荐下一步</p>
            <h2>${escapeHTML(next.title)}</h2>
            <p>${escapeHTML(selectedReason(next))}</p>
            <button class="primary-button" type="button" data-action="start-problem" data-problem-id="${escapeHTML(next.id)}">进入训练</button>
          </aside>
        </div>
      </section>`;
  }

  function renderProgress() {
    const learned = PROBLEMS.filter((problem) => problemState(problem.id).firstSeenAt).length;
    const reproduced = PROBLEMS.filter((problem) => problemState(problem.id).independentPasses > 0).length;
    const mastered = PROBLEMS.filter((problem) => problemState(problem.id).status === "mastered").length;
    const grouped = TOPIC_ORDER.map((topic) => {
      const topicProblems = PROBLEMS.filter((problem) => problem.topic === topic);
      if (!topicProblems.length) return null;
      const average = Math.round(topicProblems.reduce((sum, problem) => sum + masteryScore(problemState(problem.id)), 0) / topicProblems.length);
      const nextReview = topicProblems
        .map((problem) => problemState(problem.id).nextReviewAt)
        .filter(Boolean)
        .sort()[0];
      return { topic, count: topicProblems.length, score: average, nextReview };
    }).filter(Boolean);

    const errors = {};
    Object.values(state.problems).forEach((progress) => {
      (progress.errors || []).forEach((error) => {
        errors[error] = (errors[error] || 0) + 1;
      });
    });
    const errorEntries = Object.entries(errors).sort((a, b) => b[1] - a[1]);

    root.innerHTML = `
      <section class="page-view">
        <header class="page-heading">
          <h1>看懂只是通电，复现才算闭环</h1>
          <p>这里同时保留“学过”和“能写回”的差距，避免完成数量制造虚假的进度感。</p>
        </header>
        <div class="progress-layout">
          <div>
            <p class="progress-sentence">你已学习 <strong>${learned}</strong> 道，其中 <strong>${reproduced}</strong> 道曾闭卷通过，<strong>${mastered}</strong> 道达到稳定掌握。</p>
            <table class="signal-table">
              <thead><tr><th>知识模块</th><th>题目</th><th>信号强度</th><th>下次复习</th></tr></thead>
              <tbody>
                ${grouped.map((group) => `<tr>
                  <td>${escapeHTML(group.topic)}</td>
                  <td>${group.count}</td>
                  <td><span class="strength-bar" aria-label="${group.score} 级，共 5 级">${[1, 2, 3, 4, 5].map((n) => `<i class="${n <= group.score ? "is-on" : ""}"></i>`).join("")}</span></td>
                  <td>${escapeHTML(formatReviewDate(group.nextReview))}</td>
                </tr>`).join("")}
              </tbody>
            </table>
          </div>
          <aside class="error-panel">
            <p class="panel-label">卡点诊断</p>
            <h2>${errorEntries.length ? "这些错误正在重复出现" : "完成一次复盘后，这里会显示具体卡点"}</h2>
            ${errorEntries.length
              ? `<ul class="error-list">${errorEntries.slice(0, 6).map(([label, count]) => `<li><span>${escapeHTML(label)}</span><strong>${count} 次</strong></li>`).join("")}</ul>`
              : `<p class="field-help">系统记录的是“为什么没写出来”，不是简单的对错。下一次路线会优先处理重复错误。</p>`}
          </aside>
        </div>
      </section>`;
  }

  function renderSettings() {
    root.innerHTML = `
      <section class="page-view">
        <header class="page-heading">
          <h1>让训练适合你的真实时间</h1>
          <p>首版不需要账号。学习记录、草稿和设置只保存在当前浏览器中，你可以随时导出或清除。</p>
        </header>
        <div class="settings-grid">
          <form class="settings-form" id="settings-form">
            <div class="field-group">
              <span class="field-label">每日时间</span>
              <div class="radio-row">
                ${[15, 25, 45].map((minutes) => `<label class="radio-option"><input type="radio" name="minutes" value="${minutes}" ${state.settings.minutes === minutes ? "checked" : ""} />${minutes} 分钟</label>`).join("")}
              </div>
              <p class="field-help">时间越少，系统越会优先保留到期复习并减少新题。</p>
            </div>

            <div class="field-group">
              <span class="field-label">编程基础</span>
              <div class="radio-row">
                <label class="radio-option"><input type="radio" name="syntaxReady" value="true" ${state.settings.syntaxReady ? "checked" : ""} />会变量、循环和函数</label>
                <label class="radio-option"><input type="radio" name="syntaxReady" value="false" ${!state.settings.syntaxReady ? "checked" : ""} />还需要语法热身</label>
              </div>
              <p class="field-help">当前 MVP 只支持 Python 3。语法热身模块将在下一版补齐。</p>
            </div>

            <div class="field-group">
              <span class="field-label">本地运行环境</span>
              <p class="field-help">首次运行会按需加载 Python 运行时。测试只用于学习反馈，最终结果以官方平台提交为准。</p>
            </div>

            <div><button class="primary-button" type="submit">保存设置</button></div>
          </form>

          <aside class="data-panel">
            <p class="panel-label">本机数据</p>
            <h2>你的代码默认不上传</h2>
            <p>清理浏览器数据会丢失进度。建议每隔一段时间导出一份 JSON 备份。</p>
            <div class="data-actions">
              <button class="secondary-button" type="button" data-action="export-data">导出学习数据</button>
              <button class="secondary-button" type="button" data-action="import-data">导入学习数据</button>
              <input id="import-file" type="file" accept="application/json" hidden />
              <button class="danger-button" type="button" data-action="clear-data">清除全部数据</button>
            </div>
          </aside>
        </div>
      </section>`;
  }

  function startProblem(problemId, forceLearn = false) {
    const problem = findProblem(problemId);
    const progress = ensureProblemState(problem.id);
    const isNew = !progress.firstSeenAt;

    if (state.session && !forceLearn) {
      if (state.session.problemId !== problem.id) {
        const active = findProblem(state.session.problemId);
        showToast(`先完成「${active.title}」，已带你回到原训练。`, 3200);
      }
      setView("practice");
      return;
    }

    if (isNew) {
      progress.firstSeenAt = new Date().toISOString();
      progress.status = "learning";
      progress.draft = progress.draft || problem.starter;
    }

    state.session = {
      problemId: problem.id,
      kind: isNew || forceLearn || progress.status === "lapsed" ? "learn" : "review",
      stage: isNew || forceLearn || progress.status === "lapsed" ? 0 : 1,
      startedAt: new Date().toISOString(),
      hintsUsed: 0,
      testResults: null,
      testsPassed: false,
      officialAccepted: null,
      confidence: null,
      errors: [],
      variantAnswer: ""
    };
    progress.attempts = (progress.attempts || 0) + 1;
    saveState();
    setView("practice");
  }

  function renderPractice() {
    if (!state.session) {
      setView("today");
      return;
    }
    const problem = findProblem(state.session.problemId);
    const labels = ["学习解法", "闭卷复述", "独立编码", "运行验证", "复盘安排"];
    const stage = state.session.stage;

    root.innerHTML = `
      <section class="practice-view">
        <header class="practice-head">
          <button class="back-button" type="button" data-action="leave-practice" aria-label="返回今日训练">返回</button>
          <div class="practice-title">
            <h1>${escapeHTML(problem.title)}</h1>
            <p>LC ${problem.number} · ${escapeHTML(problem.topic)} · ${escapeHTML(problem.signature)}</p>
          </div>
          <div class="practice-progress">STAGE ${stage + 1} / 5</div>
        </header>
        <ol class="practice-circuit" aria-label="训练进度">
          ${labels.map((label, index) => `<li class="${index < stage ? "is-complete" : ""} ${index === stage ? "is-active" : ""}"><span class="pin"></span><span>${label}</span></li>`).join("")}
        </ol>
        <div class="stage-shell">${renderStage(problem, stage)}</div>
      </section>`;

    bindStageInputs(problem, stage);
  }

  function renderStage(problem, stage) {
    if (stage === 0) return renderLearnStage(problem);
    if (stage === 1) return renderRecallStage(problem);
    if (stage === 2) return renderCodeStage(problem);
    if (stage === 3) return renderVerifyStage(problem);
    return renderReviewStage(problem);
  }

  function renderLearnStage(problem) {
    return `<div class="learn-stage">
      <section class="problem-brief">
        <p class="panel-label">原创学习摘要</p>
        <h2>先弄清楚问题，再记住模式</h2>
        <p>${escapeHTML(problem.summary)}</p>
        <ul class="brief-list">
          ${problem.prerequisites.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}
        </ul>
        <a class="official-link" href="${escapeHTML(problem.officialUrl)}" target="_blank" rel="noreferrer">在力扣查看官方原题</a>
      </section>
      <section class="solution-panel" id="solution-panel">
        <div>
          <p class="panel-label">核心洞察</p>
          <h2>${escapeHTML(problem.why)}</h2>
        </div>
        <div class="insight-box"><p class="panel-label">需要记住的一句话</p><p>${escapeHTML(problem.insight)}</p></div>
        <div class="trace-table" aria-label="解法推演">
          ${problem.trace.map(([label, value]) => `<div class="trace-cell"><strong>${escapeHTML(label)}</strong>${escapeHTML(value)}</div>`).join("")}
        </div>
        <div>
          <p class="panel-label">四步完成</p>
          <ol class="step-list">${problem.steps.map((step) => `<li>${escapeHTML(step)}</li>`).join("")}</ol>
          <p><strong>复杂度：</strong>${escapeHTML(problem.complexity)}</p>
        </div>
        ${codeBlock(problem.solution, "参考实现 · Python 3")}
        <div class="stage-actions">
          <p>下一步会完全收起答案，先写思路，再写代码。</p>
          <button class="primary-button" type="button" data-action="disconnect-solution">合上解法，开始复现</button>
        </div>
      </section>
    </div>`;
  }

  function renderRecallStage(problem) {
    const progress = problemState(problem.id);
    return `<div class="recall-stage">
      <aside class="recall-guide">
        <p class="panel-label">支架已断开</p>
        <h2>现在只靠你的记忆。</h2>
        <p>不要求一次写得完美。先把算法的骨架说清楚，再进入编辑器。</p>
        <div class="circuit-break" aria-hidden="true"><span></span></div>
      </aside>
      <section class="recall-panel">
        <p class="panel-label">闭卷复述</p>
        <h2>先写“为什么”，再写“怎么做”</h2>
        <form class="recall-form" id="recall-form">
          <div class="field-group">
            <label for="pattern-select">你认为这题的核心模式是什么？</label>
            <select id="pattern-select" name="pattern">
              <option value="">先自己判断</option>
              ${TOPIC_ORDER.map((topic) => `<option value="${escapeHTML(topic)}" ${progress.recallPattern === topic ? "selected" : ""}>${escapeHTML(topic)}</option>`).join("")}
            </select>
          </div>
          <div class="field-group">
            <label for="recall-idea">用自己的话写出 2～4 步解法</label>
            <textarea id="recall-idea" name="idea" placeholder="例如：扫描当前元素；计算需要的另一个值；查询是否已经出现……">${escapeHTML(progress.recallIdea || "")}</textarea>
          </div>
          <div class="field-group">
            <label for="recall-invariant">哪个条件在整个过程中始终成立？</label>
            <textarea id="recall-invariant" name="invariant" placeholder="不确定也可以先写猜测，复盘时再修正。">${escapeHTML(progress.recallInvariant || "")}</textarea>
          </div>
          <div class="stage-actions">
            <button class="secondary-button" type="button" data-action="relearn">重新看解法</button>
            <button class="primary-button" type="submit">进入独立编辑器</button>
          </div>
        </form>
      </section>
    </div>`;
  }

  function renderCodeStage(problem) {
    const progress = problemState(problem.id);
    const session = state.session;
    const highestHint = session.hintsUsed > 0 ? problem.hints[session.hintsUsed - 1] : "先独立写一遍。卡住 3 分钟后再逐级打开提示。";
    const consoleMarkup = session.testResults
      ? session.testResults.map((result) => `<p class="${result.pass ? "pass" : "fail"}">${result.pass ? "PASS" : "FAIL"} · ${escapeHTML(result.label)}${result.error ? ` · ${escapeHTML(result.error)}` : ""}</p>`).join("")
      : `<p>尚未运行。本地环境只执行本站原创测试，最终结果以官方提交为准。</p>`;

    return `<div class="coding-stage">
      <aside class="code-sidebar">
        <p class="panel-label">分级提示</p>
        <h2>只揭开刚好够用的一层</h2>
        <p>${escapeHTML(problem.summary)}</p>
        <div class="hint-stack">
          ${problem.hints.map((hint, index) => `<button class="hint-button" type="button" data-action="show-hint" data-hint-level="${index + 1}" ${session.hintsUsed >= index + 1 ? "disabled" : ""}>提示 ${index + 1} · ${index === 0 ? "方向" : index === 1 ? "关键量" : "代码骨架"}</button>`).join("")}
        </div>
        <div class="hint-output" id="hint-output">${escapeHTML(highestHint)}</div>
        <button class="plain-link" type="button" data-action="relearn">我需要重新学习</button>
      </aside>
      <section class="editor-shell">
        <div class="editor-toolbar"><strong>${escapeHTML(problem.signature)}</strong><span>⌘ / Ctrl + Enter 运行</span></div>
        <textarea class="code-editor" id="code-editor" aria-label="Python 代码编辑器" spellcheck="false">${escapeHTML(progress.draft || problem.starter)}</textarea>
        <div class="test-console" id="test-console" aria-live="polite">${consoleMarkup}</div>
        <div class="editor-actions">
          <button class="secondary-button" type="button" data-action="reset-code">恢复起始代码</button>
          <div>
            <button class="secondary-button" type="button" data-action="skip-to-verify">去官方提交</button>
            <button class="primary-button" type="button" data-action="run-tests">运行本地测试</button>
          </div>
        </div>
      </section>
    </div>`;
  }

  function renderVerifyStage(problem) {
    const session = state.session;
    const results = session.testResults || [];
    const allPassed = results.length > 0 && results.every((result) => result.pass);
    return `<div class="verify-stage">
      <section class="test-report">
        <p class="panel-label">本地练习结果</p>
        <h2>${allPassed ? "这次线路已经接通。" : results.length ? "还有一个断点需要处理。" : "先去官方环境完成最终验证。"}</h2>
        <p>${allPassed ? "所有本站测试已通过，但这不等于官方 Accepted。" : "你可以返回编辑器修正，也可以打开官方原题继续验证。"}</p>
        ${results.length
          ? `<ul class="result-list">${results.map((result, index) => `<li><span class="result-mark">${result.pass ? "✓" : "×"}</span><span>${escapeHTML(result.label)}</span><span>${result.pass ? "通过" : escapeHTML(result.error || "结果不符")}</span></li>`).join("")}</ul>`
          : `<div class="hint-output">本地测试未运行。官方页面拥有完整题面和最终判题环境。</div>`}
        <div class="choice-row">
          <button class="secondary-button" type="button" data-action="back-to-code">返回编辑器</button>
          <button class="primary-button" type="button" data-action="to-review">进入复盘</button>
        </div>
      </section>
      <aside class="official-check">
        <p class="panel-label">最终验证</p>
        <h2>以官方提交为准</h2>
        <p>本站不读取你的账号或 Cookie，也不会代你提交代码。打开原题后，把函数签名适配为官方格式即可。</p>
        <a class="secondary-button" href="${escapeHTML(problem.officialUrl)}" target="_blank" rel="noreferrer">打开力扣原题</a>
        <button class="secondary-button" type="button" data-action="official-result" data-value="accepted">官方已通过</button>
        <button class="secondary-button" type="button" data-action="official-result" data-value="failed">暂时未通过</button>
      </aside>
    </div>`;
  }

  function renderReviewStage(problem) {
    const session = state.session;
    const progress = problemState(problem.id);
    const predicted = predictReview(session, progress);
    const resultSummary = session.testsPassed
      ? `本地测试通过${session.hintsUsed ? `，使用了 ${session.hintsUsed} 级提示` : "，未使用提示"}。`
      : "本次尚未通过全部本地测试。";

    return `<div class="review-stage">
      <aside class="review-summary">
        <p class="panel-label">本次证据</p>
        <h2>${session.testsPassed && session.hintsUsed === 0 ? "你独立接通了这条线路。" : "先记录断点，系统会把它安排得更近。"}</h2>
        <p>${escapeHTML(resultSummary)}</p>
        <div class="next-review">
          <span class="panel-label">预计下次出现</span>
          <strong>${escapeHTML(predicted.label)}</strong>
          <p>完成复盘后会根据你的真实表现重新计算。</p>
        </div>
      </aside>
      <section class="review-panel">
        <p class="panel-label">复盘与迁移</p>
        <h2>最后一步：告诉系统哪里还不稳</h2>
        <form class="review-form" id="review-form">
          <div class="field-group">
            <span class="field-label">这次最接近哪种感受？</span>
            <div class="confidence-row">
              ${[1, 2, 3, 4, 5].map((value) => `<button type="button" data-action="set-confidence" data-value="${value}" aria-pressed="${session.confidence === value}">${value}<span class="sr-only"> 级</span></button>`).join("")}
            </div>
            <p class="field-help">1 = 仍然完全依赖答案；5 = 能独立完成并解释。</p>
          </div>
          <div class="field-group">
            <span class="field-label">本次卡点</span>
            <div class="check-grid">
              ${ERROR_OPTIONS.map((label) => `<label class="check-option"><input type="checkbox" name="error" value="${escapeHTML(label)}" ${session.errors.includes(label) ? "checked" : ""} />${escapeHTML(label)}</label>`).join("")}
            </div>
          </div>
          <div class="field-group">
            <label for="variant-answer">换个问法：${escapeHTML(problem.variant)}</label>
            <textarea id="variant-answer" name="variant" placeholder="写下你的判断即可，不要求完整代码。">${escapeHTML(session.variantAnswer || "")}</textarea>
          </div>
          <details>
            <summary>重新对照参考实现</summary>
            ${codeBlock(problem.solution, "复盘参考 · Python 3")}
          </details>
          <div class="stage-actions">
            <p>错题不会永久打叉；每次新的证据都会更新路线。</p>
            <button class="primary-button" type="submit">完成并安排复习</button>
          </div>
        </form>
      </section>
    </div>`;
  }

  function codeBlock(code, label) {
    return `<div class="code-block"><div class="code-head"><span>${escapeHTML(label)}</span><button class="copy-button" type="button" data-action="copy-code" data-code="${escapeHTML(code)}">复制</button></div><pre><code>${escapeHTML(code)}</code></pre></div>`;
  }

  function bindStageInputs(problem, stage) {
    if (stage === 1) {
      const form = document.getElementById("recall-form");
      form?.addEventListener("input", () => {
        const progress = ensureProblemState(problem.id);
        const data = new FormData(form);
        progress.recallPattern = String(data.get("pattern") || "");
        progress.recallIdea = String(data.get("idea") || "");
        progress.recallInvariant = String(data.get("invariant") || "");
        saveState();
      });
    }

    if (stage === 2) {
      const editor = document.getElementById("code-editor");
      editor?.addEventListener("input", () => {
        ensureProblemState(problem.id).draft = editor.value;
        saveState();
      });
      editor?.addEventListener("keydown", (event) => {
        if (event.key === "Tab") {
          event.preventDefault();
          const start = editor.selectionStart;
          const end = editor.selectionEnd;
          editor.value = `${editor.value.slice(0, start)}    ${editor.value.slice(end)}`;
          editor.selectionStart = editor.selectionEnd = start + 4;
          editor.dispatchEvent(new Event("input"));
        }
        if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
          event.preventDefault();
          runTests(problem);
        }
      });
    }

    if (stage === 4) {
      const form = document.getElementById("review-form");
      form?.addEventListener("input", () => {
        const data = new FormData(form);
        state.session.errors = data.getAll("error").map(String);
        state.session.variantAnswer = String(data.get("variant") || "");
        saveState();
      });
    }
  }

  function saveSessionInputs() {
    if (!state.session) return;
    const problem = findProblem(state.session.problemId);
    const editor = document.getElementById("code-editor");
    if (editor) ensureProblemState(problem.id).draft = editor.value;
    saveState();
  }

  function moveToStage(stage) {
    if (!state.session) return;
    saveSessionInputs();
    state.session.stage = Math.max(0, Math.min(4, stage));
    saveState();
    renderPractice();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function disconnectSolution() {
    const panel = document.getElementById("solution-panel");
    if (!panel) return moveToStage(1);
    panel.classList.add("is-disconnecting");
    window.setTimeout(() => moveToStage(1), 560);
  }

  function showHint(level) {
    if (!state.session) return;
    const problem = findProblem(state.session.problemId);
    state.session.hintsUsed = Math.max(state.session.hintsUsed, level);
    ensureProblemState(problem.id).hintTotal += 1;
    saveState();
    renderPractice();
    document.getElementById("hint-output")?.scrollIntoView({ block: "nearest" });
  }

  function resetCode() {
    if (!state.session) return;
    const problem = findProblem(state.session.problemId);
    ensureProblemState(problem.id).draft = problem.starter;
    state.session.testResults = null;
    state.session.testsPassed = false;
    saveState();
    renderPractice();
    showToast("已恢复起始代码。", 2200);
  }

  function runTests(problem) {
    const editor = document.getElementById("code-editor");
    const consoleNode = document.getElementById("test-console");
    if (!editor || !consoleNode) return;

    const code = editor.value;
    ensureProblemState(problem.id).draft = code;
    saveState();

    if (!code.includes("def solve")) {
      consoleNode.innerHTML = `<p class="fail">ERROR · 请保留名为 solve 的函数入口。</p>`;
      return;
    }

    consoleNode.innerHTML = `<p class="loading">正在启动浏览器内的 Python 环境……首次加载可能需要十几秒。</p>`;
    const runButton = document.querySelector('[data-action="run-tests"]');
    if (runButton) {
      runButton.disabled = true;
      runButton.textContent = "正在运行";
    }

    if (runner) runner.terminate();
    runner = new Worker("./pyodide-worker.js?v=3", { type: "module" });

    runnerTimeout = window.setTimeout(() => {
      runner?.terminate();
      runner = null;
      consoleNode.innerHTML = `<p class="fail">TIMEOUT · 运行超过 45 秒。请检查是否存在死循环，或稍后重试加载环境。</p>`;
      if (runButton) {
        runButton.disabled = false;
        runButton.textContent = "运行本地测试";
      }
    }, 45000);

    runner.onmessage = (event) => {
      const payload = event.data || {};
      if (payload.type === "status") {
        consoleNode.innerHTML = `<p class="loading">${escapeHTML(payload.message)}</p>`;
        return;
      }

      window.clearTimeout(runnerTimeout);
      runnerTimeout = null;
      if (payload.type === "result") {
        state.session.testResults = payload.results;
        state.session.testsPassed = payload.results.length > 0 && payload.results.every((result) => result.pass);
        saveState();
        consoleNode.innerHTML = payload.results.map((result) => `<p class="${result.pass ? "pass" : "fail"}">${result.pass ? "PASS" : "FAIL"} · ${escapeHTML(result.label)}${result.error ? ` · ${escapeHTML(result.error)}` : ""}</p>`).join("");
        const actions = document.querySelector(".editor-actions > div");
        if (actions && !actions.querySelector('[data-action="show-verification"]')) {
          actions.insertAdjacentHTML("afterbegin", `<button class="secondary-button" type="button" data-action="show-verification">查看验证结果</button>`);
        }
      } else {
        consoleNode.innerHTML = `<p class="fail">ERROR · ${escapeHTML(payload.message || "本地运行环境暂时不可用。")}</p>`;
      }

      if (runButton) {
        runButton.disabled = false;
        runButton.textContent = "再次运行";
      }
    };

    runner.onerror = () => {
      window.clearTimeout(runnerTimeout);
      runnerTimeout = null;
      consoleNode.innerHTML = `<p class="fail">ERROR · 无法载入本地 Python 环境。代码已经保存，可以前往官方页面继续。</p>`;
      if (runButton) {
        runButton.disabled = false;
        runButton.textContent = "重试运行";
      }
    };

    runner.postMessage({ code, tests: problem.tests, compare: problem.compare });
  }

  function predictReview(session, progress) {
    let quality = 1;
    if (session.testsPassed) quality += 2;
    if (session.hintsUsed === 0) quality += 1;
    if (session.officialAccepted === true) quality += 1;
    if ((session.confidence || 0) >= 4) quality += 1;
    quality = Math.max(0, Math.min(5, quality));

    const previousInterval = progress.intervalDays || 0;
    let days;
    if (quality <= 1) days = 0;
    else if (quality === 2) days = 1;
    else if (quality === 3) days = previousInterval ? Math.max(2, Math.round(previousInterval * 1.5)) : 3;
    else if (quality === 4) days = previousInterval ? Math.max(3, Math.round(previousInterval * 2.2)) : 7;
    else days = previousInterval ? Math.max(7, Math.round(previousInterval * 3)) : 14;
    days = Math.min(days, 90);

    return {
      quality,
      days,
      date: addDays(dayStart(), days),
      label: days === 0 ? "今天稍后" : days === 1 ? "明天" : `${days} 天后`
    };
  }

  function finishReview() {
    if (!state.session) return;
    if (!state.session.confidence) {
      showToast("请先选择 1～5 级的真实感受。", 3000);
      return;
    }

    const problem = findProblem(state.session.problemId);
    const progress = ensureProblemState(problem.id);
    const schedule = predictReview(state.session, progress);
    const independent = state.session.testsPassed && state.session.hintsUsed === 0 && state.session.confidence >= 4;

    if (independent) progress.independentPasses = (progress.independentPasses || 0) + 1;
    if (!state.session.testsPassed || state.session.confidence <= 2) {
      progress.status = "lapsed";
    } else if (progress.independentPasses >= 3 && state.session.variantAnswer.trim().length >= 12) {
      progress.status = "mastered";
    } else {
      progress.status = "recall";
    }

    progress.intervalDays = schedule.days;
    progress.lastReviewedAt = new Date().toISOString();
    progress.nextReviewAt = schedule.date.toISOString();
    progress.errors = [...new Set([...(progress.errors || []), ...state.session.errors])];
    progress.lastQuality = schedule.quality;
    progress.lastHintsUsed = state.session.hintsUsed;
    progress.lastOfficialAccepted = state.session.officialAccepted;

    state.history.unshift({
      problemId: problem.id,
      completedAt: new Date().toISOString(),
      quality: schedule.quality,
      hintsUsed: state.session.hintsUsed,
      testsPassed: state.session.testsPassed,
      officialAccepted: state.session.officialAccepted,
      errors: state.session.errors,
      nextReviewAt: schedule.date.toISOString()
    });
    state.history = state.history.slice(0, 200);
    state.session = null;
    saveState();
    currentView = "today";
    updateNavigation();
    render();
    showToast(`已完成「${problem.title}」，${schedule.label}再次复现。`, 4200);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function showToast(message, duration = 2800) {
    const node = document.createElement("div");
    node.className = "toast";
    node.textContent = message;
    toastRegion.appendChild(node);
    window.setTimeout(() => node.remove(), duration);
  }

  async function copyCode(button) {
    try {
      await navigator.clipboard.writeText(button.dataset.code || "");
      showToast("参考代码已复制。", 1800);
    } catch {
      showToast("浏览器未允许复制，请手动选择代码。", 2600);
    }
  }

  function exportData() {
    const payload = JSON.stringify({ ...state, exportedAt: new Date().toISOString() }, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `huixie-progress-${isoDate(new Date())}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    showToast("学习数据已导出。", 2200);
  }

  function importData(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const incoming = JSON.parse(String(reader.result));
        if (incoming.version !== VERSION || typeof incoming.problems !== "object") throw new Error("invalid");
        state = {
          ...cloneDefaultState(),
          ...incoming,
          settings: { ...defaultState.settings, ...(incoming.settings || {}) },
          history: Array.isArray(incoming.history) ? incoming.history : []
        };
        state.session = null;
        saveState();
        render();
        showToast("学习数据已导入。", 2600);
      } catch {
        showToast("无法导入：文件不是有效的回写学习数据。", 3600);
      }
    };
    reader.readAsText(file);
  }

  function clearData(button) {
    const now = Date.now();
    if (now > clearArmedUntil) {
      clearArmedUntil = now + 5000;
      button.textContent = "再次点击确认清除";
      showToast("此操作会删除当前浏览器中的全部进度。", 3200);
      window.setTimeout(() => {
        if (Date.now() >= clearArmedUntil) {
          clearArmedUntil = 0;
          if (button.isConnected) button.textContent = "清除全部数据";
        }
      }, 5100);
      return;
    }

    localStorage.removeItem(STORAGE_KEY);
    state = cloneDefaultState();
    clearArmedUntil = 0;
    currentView = "today";
    updateNavigation();
    render();
    showToast("本机学习数据已清除，无法恢复。", 3600);
  }

  root.addEventListener("click", (event) => {
    const target = event.target.closest("button, a");
    if (!target) return;
    const action = target.dataset.action;

    if (target.dataset.view) {
      event.preventDefault();
      setView(target.dataset.view);
      return;
    }

    if (!action) return;
    if (action === "accept-defaults") {
      state.onboarded = true;
      saveState();
      renderToday();
      showToast("默认计划已启用。", 2200);
    } else if (action === "start-problem") {
      startProblem(target.dataset.problemId);
    } else if (action === "leave-practice") {
      saveSessionInputs();
      currentView = "today";
      updateNavigation();
      render();
    } else if (action === "disconnect-solution") {
      disconnectSolution();
    } else if (action === "relearn") {
      moveToStage(0);
    } else if (action === "show-hint") {
      showHint(Number(target.dataset.hintLevel));
    } else if (action === "reset-code") {
      resetCode();
    } else if (action === "run-tests") {
      runTests(findProblem(state.session.problemId));
    } else if (action === "skip-to-verify" || action === "show-verification") {
      moveToStage(3);
    } else if (action === "back-to-code") {
      moveToStage(2);
    } else if (action === "to-review") {
      moveToStage(4);
    } else if (action === "official-result") {
      state.session.officialAccepted = target.dataset.value === "accepted";
      saveState();
      moveToStage(4);
    } else if (action === "set-confidence") {
      state.session.confidence = Number(target.dataset.value);
      saveState();
      renderPractice();
    } else if (action === "copy-code") {
      copyCode(target);
    } else if (action === "export-data") {
      exportData();
    } else if (action === "import-data") {
      document.getElementById("import-file")?.click();
    } else if (action === "clear-data") {
      clearData(target);
    }
  });

  root.addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.target.id === "recall-form") {
      const data = new FormData(event.target);
      const idea = String(data.get("idea") || "").trim();
      if (idea.length < 12) {
        showToast("先用自己的话写出至少两步解法，再进入编辑器。", 3300);
        document.getElementById("recall-idea")?.focus();
        return;
      }
      const progress = ensureProblemState(state.session.problemId);
      progress.recallPattern = String(data.get("pattern") || "");
      progress.recallIdea = idea;
      progress.recallInvariant = String(data.get("invariant") || "");
      saveState();
      moveToStage(2);
    } else if (event.target.id === "review-form") {
      const data = new FormData(event.target);
      state.session.errors = data.getAll("error").map(String);
      state.session.variantAnswer = String(data.get("variant") || "");
      finishReview();
    } else if (event.target.id === "settings-form") {
      const data = new FormData(event.target);
      state.settings.minutes = Number(data.get("minutes")) || 25;
      state.settings.syntaxReady = data.get("syntaxReady") === "true";
      state.onboarded = true;
      saveState();
      showToast("设置已保存，今日队列已重新计算。", 2800);
      setView("today");
    }
  });

  root.addEventListener("change", (event) => {
    if (event.target.id === "import-file") importData(event.target.files?.[0]);
  });

  document.querySelectorAll("[data-view]").forEach((button) => {
    if (button.closest("#view-root")) return;
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  window.addEventListener("beforeunload", saveSessionInputs);

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {
        // 离线缓存失败不影响核心学习流程。
      });
    });
  }

  window.huixie = {
    getState: () => JSON.parse(JSON.stringify(state)),
    getTodayQueue: () => getQueue().map((problem) => ({ id: problem.id, title: problem.title, topic: problem.topic })),
    startProblem: (problemId) => startProblem(problemId),
    openView: (view) => setView(view)
  };

  function registerWebMCPTools() {
    const context = document.modelContext;
    if (!context?.registerTool) return;

    const lifecycle = new AbortController();
    const register = (tool) => {
      try {
        Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {});
      } catch {
        // WebMCP 仍是渐进能力，注册失败不影响可见界面。
      }
    };

    register({
      name: "get_today_training",
      title: "读取今日训练",
      description: "读取回写当前生成的今日训练队列和预计用时，不修改学习状态。",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute() {
        const queue = getQueue();
        return {
          dailyMinutes: state.settings.minutes,
          items: queue.map((problem) => ({
            problemId: problem.id,
            title: problem.title,
            topic: problem.topic,
            kind: problemState(problem.id).firstSeenAt ? "review" : "new"
          }))
        };
      }
    });

    register({
      name: "start_training_problem",
      title: "开始一道训练",
      description: "打开指定题目的可见训练流程；省略 problemId 时开始今日队列第一项。",
      inputSchema: {
        type: "object",
        properties: { problemId: { type: "string", description: "路线中的稳定题目 ID" } },
        additionalProperties: false
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        const requested = input?.problemId;
        const problem = requested ? PROBLEMS.find((item) => item.id === requested) : getQueue()[0];
        if (!problem) throw new Error("没有找到可开始的题目");
        startProblem(problem.id);
        return { started: true, problemId: problem.id, title: problem.title, stage: state.session.stage };
      }
    });

    register({
      name: "set_daily_training_minutes",
      title: "调整每日训练时间",
      description: "把每日训练预算设置为 15、25 或 45 分钟，并立即重新计算今日队列。",
      inputSchema: {
        type: "object",
        properties: { minutes: { type: "integer", enum: [15, 25, 45] } },
        required: ["minutes"],
        additionalProperties: false
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (![15, 25, 45].includes(input?.minutes)) throw new Error("minutes 必须是 15、25 或 45");
        state.settings.minutes = input.minutes;
        state.onboarded = true;
        saveState();
        currentView = "today";
        updateNavigation();
        render();
        return { saved: true, dailyMinutes: state.settings.minutes, queueSize: getQueue().length };
      }
    });

    register({
      name: "get_learning_progress",
      title: "读取学习进度",
      description: "读取已学习、曾闭卷通过和稳定掌握的题目数量，不修改学习状态。",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute() {
        return {
          totalProblems: PROBLEMS.length,
          learned: PROBLEMS.filter((problem) => problemState(problem.id).firstSeenAt).length,
          independentlyReproduced: PROBLEMS.filter((problem) => problemState(problem.id).independentPasses > 0).length,
          mastered: PROBLEMS.filter((problem) => problemState(problem.id).status === "mastered").length
        };
      }
    });
  }

  registerWebMCPTools();

  updateNavigation();
  render();
})();
