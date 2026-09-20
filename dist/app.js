(function () {
  "use strict";

  const APP_VERSION = 2;
  const BUILTIN_LIBRARY_ID = "builtin-hot100";
  const STATE_KEY = "state-v2";
  const LIBRARIES_KEY = "libraries-v1";
  const LEGACY_KEY = "huixie-learning-state-v1";
  const MAX_IMPORT_BYTES = 2 * 1024 * 1024;
  const ERROR_OPTIONS = ["题型识别错误", "关键不变量遗忘", "边界条件遗漏", "复杂度判断错误", "代码实现错误", "Python API 遗忘"];
  const STATUS_LABELS = { new: "未开始", learning: "记忆中", recall: "待复习", mastered: "已掌握", lapsed: "需重写" };
  const builtinLibrary = {
    id: BUILTIN_LIBRARY_ID,
    name: "Hot 100",
    description: "内置精选题库 · 当前 13 题",
    readOnly: true,
    problems: Array.isArray(window.PROBLEMS) ? window.PROBLEMS : []
  };
  const defaultState = {
    version: APP_VERSION,
    activeLibraryId: BUILTIN_LIBRARY_ID,
    settings: { minutes: 25 },
    progress: {},
    history: [],
    session: null,
    migratedAt: null
  };

  let state = clone(defaultState);
  let customLibraries = [];
  let currentView = "today";
  let runner = null;
  let runnerTimeout = null;
  let clearArmedUntil = 0;
  let saveTimer = null;
  let storageMode = "IndexedDB";
  const ui = { editor: null, expandedSolutions: new Set(), revealedHint: 0, previewOpen: false, libraryError: "" };
  const root = document.getElementById("view-root");
  const toastRegion = document.getElementById("toast-region");

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function safeUrl(value) {
    try {
      const url = new URL(String(value || ""));
      return url.protocol === "https:" ? url.href : "";
    } catch {
      return "";
    }
  }

  function storageFallback() {
    storageMode = "localStorage 兼容模式";
    return {
      async get(key) {
        const raw = localStorage.getItem(`huixie-${key}`);
        return raw ? JSON.parse(raw) : undefined;
      },
      async set(key, value) {
        localStorage.setItem(`huixie-${key}`, JSON.stringify(value));
      },
      async clear() {
        localStorage.removeItem(`huixie-${STATE_KEY}`);
        localStorage.removeItem(`huixie-${LIBRARIES_KEY}`);
      }
    };
  }

  let storage = window.HuixieStorage || storageFallback();

  async function loadWorkspace() {
    try {
      const savedState = await storage.get(STATE_KEY);
      const savedLibraries = await storage.get(LIBRARIES_KEY);
      if (savedState?.version === APP_VERSION) state = normalizeState(savedState);
      if (Array.isArray(savedLibraries)) customLibraries = savedLibraries.map(normalizeLibrary).filter(Boolean);
      if (!savedState) await migrateLegacyState();
    } catch (error) {
      console.warn("IndexedDB 不可用，切换到兼容存储", error);
      storage = storageFallback();
      const savedState = await storage.get(STATE_KEY);
      const savedLibraries = await storage.get(LIBRARIES_KEY);
      if (savedState?.version === APP_VERSION) state = normalizeState(savedState);
      if (Array.isArray(savedLibraries)) customLibraries = savedLibraries.map(normalizeLibrary).filter(Boolean);
      if (!savedState) await migrateLegacyState();
    }
    if (!getLibrary(state.activeLibraryId)) state.activeLibraryId = BUILTIN_LIBRARY_ID;
    if (state.session && !findProblem(state.session.problemId, state.session.libraryId)) state.session = null;
  }

  function normalizeState(input) {
    return {
      ...clone(defaultState),
      ...input,
      version: APP_VERSION,
      settings: { ...defaultState.settings, ...(input.settings || {}) },
      progress: input.progress && typeof input.progress === "object" ? input.progress : {},
      history: Array.isArray(input.history) ? input.history.slice(0, 500) : []
    };
  }

  async function migrateLegacyState() {
    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return;
    try {
      const legacy = JSON.parse(raw);
      if (legacy?.version !== 1 || typeof legacy.problems !== "object") return;
      const migratedProgress = {};
      Object.entries(legacy.problems).forEach(([problemId, progress]) => {
        migratedProgress[progressKey(BUILTIN_LIBRARY_ID, problemId)] = progress;
      });
      state = normalizeState({
        ...defaultState,
        settings: { minutes: Number(legacy.settings?.minutes) || 25 },
        progress: migratedProgress,
        history: (legacy.history || []).map((item) => ({ ...item, libraryId: BUILTIN_LIBRARY_ID })),
        migratedAt: new Date().toISOString()
      });
      await storage.set("migration-backup-v1", legacy);
      await persistNow();
      localStorage.removeItem(LEGACY_KEY);
    } catch (error) {
      console.warn("旧版学习记录迁移失败，已保留原始数据", error);
    }
  }

  function scheduleSave() {
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => persistNow().catch(handleSaveError), 120);
  }

  async function persistNow() {
    await Promise.all([storage.set(STATE_KEY, state), storage.set(LIBRARIES_KEY, customLibraries)]);
  }

  function handleSaveError(error) {
    console.warn("保存失败", error);
    showToast("本机保存失败，请立即导出备份。", 4200);
  }

  function allLibraries() {
    return [builtinLibrary, ...customLibraries];
  }

  function getLibrary(libraryId = state.activeLibraryId) {
    return allLibraries().find((library) => library.id === libraryId) || builtinLibrary;
  }

  function activeProblems() {
    return getLibrary().problems || [];
  }

  function findProblem(problemId, libraryId = state.activeLibraryId) {
    return (getLibrary(libraryId).problems || []).find((problem) => problem.id === problemId) || null;
  }

  function progressKey(libraryId, problemId) {
    return `${libraryId}::${problemId}`;
  }

  function problemState(problemId, libraryId = state.activeLibraryId) {
    return state.progress[progressKey(libraryId, problemId)] || {
      status: "new",
      independentPasses: 0,
      attempts: 0,
      hintTotal: 0,
      draft: "",
      recallPattern: "",
      recallPlan: ""
    };
  }

  function ensureProblemState(problemId, libraryId = state.activeLibraryId) {
    const key = progressKey(libraryId, problemId);
    if (!state.progress[key]) state.progress[key] = problemState(problemId, libraryId);
    return state.progress[key];
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
    return date.toISOString().slice(0, 10);
  }

  function formatDate(value) {
    if (!value) return "未安排";
    const target = dayStart(new Date(value));
    const delta = Math.round((target - dayStart()) / 86400000);
    if (delta <= 0) return "今天";
    if (delta === 1) return "明天";
    if (delta < 7) return `${delta} 天后`;
    return new Intl.DateTimeFormat("zh-CN", { month: "short", day: "numeric" }).format(target);
  }

  function masteryScore(progress) {
    if (!progress.firstSeenAt) return 0;
    if (progress.status === "mastered") return 4;
    if (progress.status === "lapsed") return 1;
    if (progress.independentPasses >= 1) return 3;
    if (progress.attempts > 0) return 2;
    return 1;
  }

  function getQueue() {
    const problems = activeProblems();
    const now = Date.now();
    const due = problems.filter((problem) => {
      const progress = problemState(problem.id);
      return progress.nextReviewAt && new Date(progress.nextReviewAt).getTime() <= now;
    }).sort((a, b) => new Date(problemState(a.id).nextReviewAt) - new Date(problemState(b.id).nextReviewAt));
    const weak = problems.filter((problem) => {
      const progress = problemState(problem.id);
      return progress.firstSeenAt && !due.includes(problem) && progress.status !== "mastered";
    }).sort((a, b) => masteryScore(problemState(a.id)) - masteryScore(problemState(b.id)));
    const unseen = problems.filter((problem) => !problemState(problem.id).firstSeenAt);
    const sessionProblem = state.session?.libraryId === state.activeLibraryId ? findProblem(state.session.problemId, state.session.libraryId) : null;
    const limit = state.settings.minutes <= 15 ? 1 : state.settings.minutes <= 25 ? 2 : 3;
    const queue = [];
    [sessionProblem, ...due, ...weak, ...unseen].filter(Boolean).forEach((problem) => {
      if (!queue.some((item) => item.id === problem.id)) queue.push(problem);
    });
    return queue.slice(0, limit);
  }

  function setView(view) {
    saveSessionInputs();
    currentView = view;
    ui.editor = null;
    ui.libraryError = "";
    updateNavigation();
    render();
    document.getElementById("main-content")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function updateNavigation() {
    document.querySelectorAll("[data-view]").forEach((button) => {
      if (!button.closest(".main-nav")) return;
      if (button.dataset.view === currentView) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
  }

  function render() {
    if (currentView === "practice" && state.session) return renderPractice();
    const views = { today: renderToday, libraries: renderLibraries, progress: renderProgress, settings: renderSettings };
    (views[currentView] || renderToday)();
  }

  function renderToday() {
    const library = getLibrary();
    const problems = activeProblems();
    const queue = getQueue();
    const active = queue[0];
    const dueCount = problems.filter((problem) => {
      const progress = problemState(problem.id);
      return progress.nextReviewAt && new Date(progress.nextReviewAt).getTime() <= Date.now();
    }).length;
    const learned = problems.filter((problem) => problemState(problem.id).firstSeenAt).length;
    const mastered = problems.filter((problem) => problemState(problem.id).status === "mastered").length;

    if (!problems.length) {
      root.innerHTML = `<section class="empty-state"><p class="instrument-label">EMPTY LIBRARY</p><h1>这个题库还是空的</h1><p>创建一道题，或导入包含题解与测试的回写 JSON。</p><button class="primary-button" type="button" data-view="libraries">管理题库</button></section>`;
      return;
    }
    const activeProgress = active ? problemState(active.id) : null;
    root.innerHTML = `
      <section class="desk-layout" aria-label="今日复习工作台">
        <aside class="desk-rail">
          <p class="instrument-label">ACTIVE LIBRARY</p>
          <button class="library-switch" type="button" data-view="libraries"><strong>${escapeHTML(library.name)}</strong><span>${problems.length} 题 · ${library.readOnly ? "内置" : "自定义"}</span></button>
          <dl class="load-readout"><div><dt>已到期</dt><dd>${dueCount}</dd></div><div><dt>已记忆</dt><dd>${learned}</dd></div><div><dt>已掌握</dt><dd>${mastered}</dd></div></dl>
          <p class="rail-note">队列优先安排到期题，再补当前薄弱题。没有签到惩罚。</p>
        </aside>
        <div class="desk-main">
          <header class="today-heading"><div><h1>把答案写回来</h1><p>${escapeHTML(new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "long" }).format(new Date()))} · Python 3</p></div><span class="local-badge">本机复习队列</span></header>
          ${active ? `<article class="next-recall">
            <div class="problem-signal"><span>LC ${escapeHTML(active.number || "—")}</span><span>${escapeHTML(active.topic || "未分类")}</span><span>${activeProgress?.nextReviewAt ? "到期回写" : activeProgress?.firstSeenAt ? "继续巩固" : "首次记忆"}</span></div>
            <h2>${escapeHTML(active.title)}</h2><p class="problem-summary">${escapeHTML(active.summary)}</p>
            <div class="signature-line"><code>${escapeHTML(active.signature || "def solve(...)")}</code><span>${(active.solutions || []).length} 种解法</span></div>
            <button class="primary-button current-action" type="button" data-action="start-problem" data-problem-id="${escapeHTML(active.id)}">${state.session ? "继续当前回写" : activeProgress?.firstSeenAt ? "开始闭卷回写" : "记住这道题"}</button>
          </article>` : `<section class="empty-state compact"><h2>当前没有待复习题</h2><p>可以从题库任选一题开始。</p></section>`}
          <section class="queue-section"><header><h2>接下来</h2><span>${queue.length} 项 · 约 ${Math.max(8, queue.length * 10)} 分钟</span></header><div class="queue-list">
            ${queue.map((problem, index) => { const progress = problemState(problem.id); return `<button class="queue-item" type="button" data-action="start-problem" data-problem-id="${escapeHTML(problem.id)}"><span class="queue-order">${String(index + 1).padStart(2, "0")}</span><span><strong>${escapeHTML(problem.title)}</strong><small>${escapeHTML(problem.topic || "未分类")} · ${escapeHTML(STATUS_LABELS[progress.status] || "未开始")}</small></span><span class="queue-due">${progress.nextReviewAt ? escapeHTML(formatDate(progress.nextReviewAt)) : "NEW"}</span></button>`; }).join("")}
          </div></section>
        </div>
        <aside class="memory-rail"><p class="instrument-label">MEMORY SIGNAL</p><h2>${mastered ? `${mastered} 道稳定记忆` : "还没有稳定记忆"}</h2><div class="memory-pins" aria-label="题目记忆状态">${problems.slice(0, 20).map((problem) => `<span data-state="${escapeHTML(problemState(problem.id).status)}" title="${escapeHTML(problem.title)}"></span>`).join("")}</div><div class="rail-callout"><strong>答案不会常驻页面</strong><p>需要时展开；写完后再对照。记忆的是识别信号与代码骨架。</p></div><button class="secondary-button" type="button" data-view="libraries">浏览全部题目</button></aside>
      </section>`;
  }

  function renderLibraries() {
    const library = getLibrary();
    const problems = library.problems || [];
    root.innerHTML = `
      <section class="page-view library-page">
        <header class="page-heading split-heading">
          <div><h1>题库</h1><p>内置题库保持只读；自定义题库可以携带多种 Python 解法和本地测试。</p></div>
          <div class="heading-actions"><button class="quiet-button" type="button" data-action="download-library-template">下载格式示例</button><button class="secondary-button" type="button" data-action="import-library">导入题库</button><button class="primary-button" type="button" data-action="new-library">新建题库</button><input id="library-import-file" type="file" accept="application/json" hidden /></div>
        </header>
        ${ui.libraryError ? `<div class="inline-error" role="alert"><strong>导入未完成</strong><span>${escapeHTML(ui.libraryError)}</span></div>` : ""}
        <div class="library-layout">
          <aside class="library-list" aria-label="题库列表">
            ${allLibraries().map((item) => `<button type="button" data-action="select-library" data-library-id="${escapeHTML(item.id)}" class="library-list-item ${item.id === library.id ? "is-active" : ""}"><span><strong>${escapeHTML(item.name)}</strong><small>${item.readOnly ? "内置题库" : "自定义题库"}</small></span><b>${item.problems.length}</b></button>`).join("")}
          </aside>
          <section class="library-workbench">
            <header class="library-header">
              <div><span class="instrument-label">${library.readOnly ? "BUILT-IN / READ ONLY" : "CUSTOM / LOCAL"}</span><h2>${escapeHTML(library.name)}</h2><p>${escapeHTML(library.description || "没有描述")}</p></div>
              <div class="library-actions">${library.readOnly ? "" : `<button class="quiet-button" type="button" data-action="edit-library">编辑信息</button><button class="quiet-button" type="button" data-action="export-library">导出</button><button class="danger-text" type="button" data-action="delete-library">删除</button><button class="primary-button" type="button" data-action="new-problem">添加题目</button>`}</div>
            </header>
            ${ui.editor ? renderEditor(library) : ""}
            <div class="problem-index">
              ${problems.length ? problems.map((problem) => {
                const progress = problemState(problem.id, library.id);
                return `<article class="problem-row"><button class="problem-open" type="button" data-action="start-problem" data-problem-id="${escapeHTML(problem.id)}" data-library-id="${escapeHTML(library.id)}"><span class="problem-number">${escapeHTML(problem.number || "—")}</span><span><strong>${escapeHTML(problem.title)}</strong><small>${escapeHTML(problem.topic || "未分类")} · ${(problem.solutions || []).length} 解 · ${(problem.tests || []).length} 测试</small></span><span class="status-text">${escapeHTML(STATUS_LABELS[progress.status] || "未开始")}</span></button>${library.readOnly ? "" : `<button class="row-action" type="button" data-action="edit-problem" data-problem-id="${escapeHTML(problem.id)}">编辑 JSON</button><button class="row-action danger-text" type="button" data-action="delete-problem" data-problem-id="${escapeHTML(problem.id)}">删除</button>`}</article>`;
              }).join("") : `<div class="empty-state compact"><h3>还没有题目</h3><p>添加第一道题，或导入完整题库。</p></div>`}
            </div>
          </section>
        </div>
      </section>`;
  }

  function renderEditor(library) {
    if (ui.editor.type === "library") {
      const editing = ui.editor.mode === "edit";
      return `<form class="edit-drawer" id="library-form"><header><div><span class="instrument-label">${editing ? "EDIT LIBRARY" : "NEW LIBRARY"}</span><h3>${editing ? "编辑题库信息" : "创建空白题库"}</h3></div><button class="quiet-button" type="button" data-action="close-editor">关闭</button></header><div class="field-grid"><label><span>名称</span><input name="name" required maxlength="60" value="${escapeHTML(editing ? library.name : "")}" /></label><label><span>描述</span><input name="description" maxlength="180" value="${escapeHTML(editing ? library.description : "")}" /></label></div><button class="primary-button" type="submit">${editing ? "保存题库" : "创建题库"}</button></form>`;
    }
    const editingProblem = ui.editor.problemId ? findProblem(ui.editor.problemId) : null;
    const sample = editingProblem || {
      id: `problem-${Date.now().toString(36)}`,
      number: "",
      title: "",
      topic: "未分类",
      summary: "",
      signature: "solve(...) → ...",
      starter: "def solve(...):\n    pass",
      solutions: [{ id: "solution-1", name: "解法一", idea: "", steps: [], complexity: "", pitfalls: [], code: "def solve(...):\n    pass" }],
      tests: [{ label: "基础用例", args: [], expected: null }],
      compare: "exact"
    };
    const clean = clone(sample);
    delete clean.libraryId;
    return `<form class="edit-drawer json-editor" id="problem-form"><header><div><span class="instrument-label">PROBLEM JSON</span><h3>${editingProblem ? `编辑「${escapeHTML(editingProblem.title)}」` : "添加题目"}</h3></div><button class="quiet-button" type="button" data-action="close-editor">关闭</button></header><p>一题可包含多个 <code>solutions</code>；测试入口固定为 <code>solve</code>。保存前会验证结构，不执行其中任何 HTML。</p><label><span>题目 JSON</span><textarea id="problem-json" name="problemJson" spellcheck="false">${escapeHTML(JSON.stringify(clean, null, 2))}</textarea></label><div class="editor-submit"><span>格式版本 1 · Python 3</span><button class="primary-button" type="submit">验证并保存</button></div></form>`;
  }

  function renderProgress() {
    const library = getLibrary();
    const problems = activeProblems();
    const learned = problems.filter((problem) => problemState(problem.id).firstSeenAt).length;
    const recalled = problems.filter((problem) => problemState(problem.id).independentPasses > 0).length;
    const mastered = problems.filter((problem) => problemState(problem.id).status === "mastered").length;
    const history = state.history.filter((item) => item.libraryId === library.id).slice(0, 12);
    root.innerHTML = `
      <section class="page-view">
        <header class="page-heading"><h1>复习记录</h1><p>${escapeHTML(library.name)} · 只统计真正写过的题，不把浏览答案算作掌握。</p></header>
        <div class="progress-band" aria-label="复习概览"><div><strong>${learned}</strong><span>开始记忆</span></div><div><strong>${recalled}</strong><span>独立写出</span></div><div><strong>${mastered}</strong><span>稳定掌握</span></div></div>
        <div class="history-layout">
          <section><h2>最近回写</h2><div class="history-list">${history.length ? history.map((item) => {
            const problem = findProblem(item.problemId, item.libraryId);
            return `<div class="history-row"><span class="history-grade" data-grade="${item.rating}">${item.rating}</span><span><strong>${escapeHTML(problem?.title || "已删除题目")}</strong><small>${escapeHTML(new Intl.DateTimeFormat("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(item.completedAt)))}</small></span><span>${item.testsPassed ? "测试通过" : "未通过测试"}<small>下次 ${escapeHTML(formatDate(item.nextReviewAt))}</small></span></div>`;
          }).join("") : `<div class="empty-state compact"><p>完成一次回写后，这里会出现记录。</p></div>`}</div></section>
          <aside class="review-rule"><span class="instrument-label">SPACED RECALL</span><h2>评分直接决定间隔</h2><dl><div><dt>1 忘记</dt><dd>今天稍后</dd></div><div><dt>2 模糊</dt><dd>明天</dd></div><div><dt>3 记得</dt><dd>约 3–7 天</dd></div><div><dt>4 熟练</dt><dd>约 7–90 天</dd></div></dl></aside>
        </div>
      </section>`;
  }

  function renderSettings() {
    root.innerHTML = `
      <section class="page-view">
        <header class="page-heading"><h1>设置与数据</h1><p>所有题库、代码和复习记录默认只保存在当前浏览器。</p></header>
        <div class="settings-layout">
          <form class="settings-form" id="settings-form"><span class="instrument-label">DAILY LOAD</span><h2>每日复习预算</h2><div class="radio-row">${[15, 25, 45].map((minutes) => `<label><input type="radio" name="minutes" value="${minutes}" ${state.settings.minutes === minutes ? "checked" : ""} /><span>${minutes} 分钟</span></label>`).join("")}</div><p>预算只影响每日队列长度，不会删除到期题或制造连续签到压力。</p><button class="primary-button" type="submit">保存设置</button></form>
          <aside class="data-panel"><span class="instrument-label">LOCAL DATA / ${escapeHTML(storageMode)}</span><h2>备份整个工作台</h2><p>备份包含自定义题库、代码草稿与复习记录。导入会替换当前本机数据。</p><div class="data-actions"><button class="secondary-button" type="button" data-action="export-backup">导出备份</button><button class="secondary-button" type="button" data-action="import-backup">导入备份</button><input id="backup-import-file" type="file" accept="application/json" hidden /><button class="danger-button" type="button" data-action="clear-data">清除本机数据</button></div>${state.migratedAt ? `<p class="migration-note">旧版 localStorage 进度已于 ${escapeHTML(new Intl.DateTimeFormat("zh-CN").format(new Date(state.migratedAt)))} 迁移。</p>` : ""}</aside>
        </div>
      </section>`;
  }

  function startProblem(problemId, libraryId = state.activeLibraryId) {
    if (libraryId !== state.activeLibraryId) state.activeLibraryId = libraryId;
    const problem = findProblem(problemId, libraryId);
    if (!problem) return showToast("没有找到这道题。", 2600);
    if (state.session && (state.session.problemId !== problemId || state.session.libraryId !== libraryId)) {
      showToast("已保留当前草稿；先完成或退出当前回写。", 3000);
      currentView = "practice";
      render();
      return;
    }
    const progress = ensureProblemState(problemId, libraryId);
    if (!progress.firstSeenAt) {
      progress.firstSeenAt = new Date().toISOString();
      progress.status = "learning";
      progress.draft = progress.draft || problem.starter || "def solve(...):\n    pass";
    }
    const isNewSession = !state.session;
    state.session = state.session || {
      libraryId,
      problemId,
      stage: 0,
      startedAt: new Date().toISOString(),
      hintsUsed: 0,
      revealedBeforeAttempt: false,
      testsPassed: false,
      testResults: null,
      rating: null,
      errors: []
    };
    ui.previewOpen = false;
    ui.revealedHint = 0;
    if (isNewSession) progress.attempts = (progress.attempts || 0) + 1;
    scheduleSave();
    currentView = "practice";
    updateNavigation();
    render();
  }

  function renderPractice() {
    const session = state.session;
    const problem = session ? findProblem(session.problemId, session.libraryId) : null;
    if (!session || !problem) {
      state.session = null;
      return setView("today");
    }
    const progress = ensureProblemState(problem.id, session.libraryId);
    const stages = ["回忆", "默写", "对照", "复习"];
    root.innerHTML = `
      <section class="practice-view">
        <header class="practice-header"><button class="back-button" type="button" data-action="leave-practice">返回</button><div><h1>${escapeHTML(problem.title)}</h1><p>LC ${escapeHTML(problem.number || "—")} · ${escapeHTML(problem.topic || "未分类")} · ${escapeHTML(problem.signature || "")}</p></div><span>PYTHON 3</span></header>
        <ol class="recall-track" aria-label="回写进度">${stages.map((label, index) => `<li class="${index < session.stage ? "is-complete" : ""} ${index === session.stage ? "is-current" : ""}"><span>${index + 1}</span><b>${label}</b></li>`).join("")}</ol>
        <div class="practice-surface">${renderPracticeStage(problem, progress, session)}</div>
      </section>`;
    bindPracticeInputs(problem, progress);
  }

  function renderPracticeStage(problem, progress, session) {
    if (session.stage === 0) return renderRecallStage(problem, progress, session);
    if (session.stage === 1) return renderWriteStage(problem, progress, session);
    if (session.stage === 2) return renderCompareStage(problem, progress, session);
    return renderScheduleStage(problem, progress, session);
  }

  function renderRecallStage(problem, progress, session) {
    const hint = ui.revealedHint > 0 ? (problem.hints || [])[ui.revealedHint - 1] || "" : "";
    const preview = ui.previewOpen ? renderSolutions(problem, true) : "";
    return `<div class="recall-layout">
      <section class="recall-brief"><span class="instrument-label">RECOGNITION SIGNAL</span><h2>先从记忆里找模式</h2><p>${escapeHTML(problem.summary)}</p><dl class="brief-facts"><div><dt>函数</dt><dd><code>${escapeHTML(problem.signature || "")}</code></dd></div><div><dt>解法</dt><dd>${(problem.solutions || []).length} 种可对照</dd></div><div><dt>测试</dt><dd>${(problem.tests || []).length} 组本地用例</dd></div></dl>${safeUrl(problem.officialUrl) ? `<a class="official-link" href="${escapeHTML(safeUrl(problem.officialUrl))}" target="_blank" rel="noreferrer">查看官方原题</a>` : ""}<div class="memory-aids"><button class="quiet-button" type="button" data-action="show-hint">${ui.revealedHint ? "再看一条提示" : "给我一个提示"}</button><button class="quiet-button" type="button" data-action="preview-solution">${ui.previewOpen ? "收起参考解法" : "完全忘记，先看参考"}</button></div>${hint ? `<div class="hint-output"><strong>提示 ${ui.revealedHint}</strong><p>${escapeHTML(hint)}</p></div>` : ""}</section>
      <form class="recall-form" id="recall-form"><span class="instrument-label">ACTIVE RECALL</span><h2>写下代码之前的两件事</h2><label><span>识别信号</span><input id="recall-pattern" name="pattern" maxlength="240" placeholder="看到什么条件时想到这个模式？" value="${escapeHTML(progress.recallPattern || "")}" /></label><label><span>解题骨架</span><textarea id="recall-plan" name="plan" maxlength="1200" placeholder="用 3～5 句话写出关键状态、循环不变量或递归定义。">${escapeHTML(progress.recallPlan || "")}</textarea></label><button class="primary-button" type="submit">去默写代码</button></form>
      ${preview ? `<aside class="solution-drawer preview-drawer"><header><span class="instrument-label">MEMORY REFRESH</span><h2>看完后合上，再从空白写</h2></header>${preview}</aside>` : ""}
    </div>`;
  }

  function renderWriteStage(problem, progress, session) {
    return `<div class="write-layout">
      <section class="code-workbench"><header><div><span class="instrument-label">REWRITE / PYTHON 3</span><h2>${escapeHTML(problem.signature || "solve(...)")}</h2></div><div><button class="quiet-button" type="button" data-action="reset-code">重置</button><button class="quiet-button" type="button" data-action="back-stage">返回回忆</button></div></header><textarea id="code-editor" aria-label="Python 代码编辑器" spellcheck="false">${escapeHTML(progress.draft || problem.starter || "")}</textarea><div class="code-actions"><span>⌘ / Ctrl + Enter 运行</span><div><button class="secondary-button" type="button" data-action="go-compare">先去对照</button><button class="primary-button" type="button" data-action="run-tests">运行 ${problem.tests?.length || 0} 组测试</button></div></div></section>
      <aside class="test-console" id="test-console" aria-live="polite">${renderTestResults(session.testResults)}<p class="console-note">本地测试只用于学习反馈；最终结果以官方平台为准。</p></aside>
    </div>`;
  }

  function renderTestResults(results) {
    if (!Array.isArray(results)) return `<p class="console-idle">READY · 代码只在浏览器 Worker 中运行。</p>`;
    return results.map((result) => `<p class="${result.pass ? "pass" : "fail"}"><strong>${result.pass ? "PASS" : "FAIL"}</strong><span>${escapeHTML(result.label)}${result.error ? ` · ${escapeHTML(result.error)}` : ""}</span></p>`).join("");
  }

  function renderCompareStage(problem, progress, session) {
    return `<div class="compare-layout">
      <header class="compare-heading"><div><span class="instrument-label">COMPARE AFTER RECALL</span><h2>对照的不是答案文本，是决策过程</h2><p>先比较识别信号、状态定义和边界，再查看完整代码。</p></div><div class="attempt-signal ${session.testsPassed ? "is-pass" : ""}"><strong>${session.testsPassed ? "本地测试通过" : session.testResults ? "仍有用例未通过" : "尚未运行测试"}</strong><span>${session.revealedBeforeAttempt ? "写前看过参考" : "闭卷尝试"} · 使用 ${session.hintsUsed} 次提示</span></div></header>
      <section class="your-recall"><h3>你的回忆</h3><dl><div><dt>识别信号</dt><dd>${escapeHTML(progress.recallPattern || "未填写")}</dd></div><div><dt>解题骨架</dt><dd>${escapeHTML(progress.recallPlan || "未填写")}</dd></div></dl><button class="secondary-button" type="button" data-action="back-to-code">返回修改代码</button></section>
      <section class="solution-drawer"><header><span class="instrument-label">SOLUTION VARIANTS</span><h2>${(problem.solutions || []).length} 种 Python 写法</h2></header>${renderSolutions(problem, false)}</section>
      <div class="compare-next"><p>确认自己能解释“为什么这样写”后，再安排下一次回忆。</p><button class="primary-button" type="button" data-action="go-schedule">安排复习</button></div>
    </div>`;
  }

  function renderSolutions(problem, previewMode) {
    return (problem.solutions || []).map((solution, index) => {
      const key = `${problem.id}:${solution.id || index}:${previewMode ? "preview" : "compare"}`;
      const expanded = ui.expandedSolutions.has(key);
      const sourceUrl = safeUrl(solution.source?.url);
      return `<article class="solution-variant ${expanded ? "is-expanded" : ""}"><button class="solution-summary" type="button" data-action="toggle-solution" data-solution-key="${escapeHTML(key)}" aria-expanded="${expanded}"><span><b>${String(index + 1).padStart(2, "0")}</b><strong>${escapeHTML(solution.name || `解法 ${index + 1}`)}</strong><small>${escapeHTML(solution.complexity || "复杂度未填写")}</small></span><i>${expanded ? "收起" : "展开"}</i></button>${expanded ? `<div class="solution-detail"><p class="solution-idea">${escapeHTML(solution.idea || "暂无思路说明")}</p>${Array.isArray(solution.steps) && solution.steps.length ? `<ol>${solution.steps.map((step) => `<li>${escapeHTML(step)}</li>`).join("")}</ol>` : ""}${Array.isArray(solution.pitfalls) && solution.pitfalls.length ? `<div class="pitfalls"><strong>易错点</strong><ul>${solution.pitfalls.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul></div>` : ""}${codeBlock(solution.code || "", solution.name || "参考代码")}${sourceUrl ? `<a class="source-link" href="${escapeHTML(sourceUrl)}" target="_blank" rel="noreferrer">参考来源：${escapeHTML(solution.source.label || sourceUrl)}</a>` : `<span class="source-note">${escapeHTML(solution.source?.label || "站内独立实现")}</span>`}</div>` : ""}</article>`;
    }).join("");
  }

  function codeBlock(code, label) {
    return `<div class="code-block"><header><span>${escapeHTML(label)}</span><button class="copy-button" type="button" data-action="copy-code" data-code="${escapeHTML(code)}">复制</button></header><pre><code>${escapeHTML(code)}</code></pre></div>`;
  }

  function renderScheduleStage(problem, progress, session) {
    const preview = session.rating ? predictReview(session.rating, progress.intervalDays || 0) : null;
    return `<form class="schedule-layout" id="schedule-form"><section><span class="instrument-label">SELF RATING</span><h2>下一次什么时候再写？</h2><p>按刚才真实的回忆难度选择。测试通过不等于记得牢。</p><div class="rating-grid">${[[1, "忘记", "今天稍后"], [2, "模糊", "明天"], [3, "记得", "延长间隔"], [4, "熟练", "大幅延长"]].map(([value, title, note]) => `<button type="button" data-action="set-rating" data-value="${value}" aria-pressed="${session.rating === value}"><b>${value}</b><strong>${title}</strong><span>${note}</span></button>`).join("")}</div><fieldset><legend>这次卡在哪里？可多选</legend><div class="error-options">${ERROR_OPTIONS.map((label) => `<label><input type="checkbox" name="error" value="${escapeHTML(label)}" ${session.errors.includes(label) ? "checked" : ""} /><span>${escapeHTML(label)}</span></label>`).join("")}</div></fieldset></section><aside class="schedule-readout"><span class="instrument-label">NEXT REVIEW</span><strong>${preview ? escapeHTML(preview.label) : "选择评分"}</strong><p>${preview ? `间隔 ${preview.days || "<1"} 天 · ${session.testsPassed ? "测试通过" : "测试未通过"}` : "评分后会显示透明的复习间隔。"}</p><button class="primary-button" type="submit" ${session.rating ? "" : "disabled"}>完成并返回今日</button><button class="quiet-button" type="button" data-action="back-stage">返回对照</button></aside></form>`;
  }

  function bindPracticeInputs(problem, progress) {
    document.getElementById("recall-form")?.addEventListener("input", (event) => {
      const data = new FormData(event.currentTarget);
      progress.recallPattern = String(data.get("pattern") || "");
      progress.recallPlan = String(data.get("plan") || "");
      scheduleSave();
    });
    const editor = document.getElementById("code-editor");
    editor?.addEventListener("input", () => {
      progress.draft = editor.value;
      scheduleSave();
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

  function saveSessionInputs() {
    if (!state.session) return;
    const editor = document.getElementById("code-editor");
    if (editor) ensureProblemState(state.session.problemId, state.session.libraryId).draft = editor.value;
    scheduleSave();
  }

  function moveStage(stage) {
    if (!state.session) return;
    saveSessionInputs();
    state.session.stage = Math.max(0, Math.min(3, stage));
    scheduleSave();
    renderPractice();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function resetCode() {
    const problem = findProblem(state.session.problemId, state.session.libraryId);
    const progress = ensureProblemState(problem.id, state.session.libraryId);
    progress.draft = problem.starter || "def solve(...):\n    pass";
    state.session.testResults = null;
    state.session.testsPassed = false;
    scheduleSave();
    renderPractice();
    showToast("已恢复起始代码。", 2000);
  }

  function runTests(problem) {
    const editor = document.getElementById("code-editor");
    const consoleNode = document.getElementById("test-console");
    if (!editor || !consoleNode) return;
    const code = editor.value;
    ensureProblemState(problem.id, state.session.libraryId).draft = code;
    if (!/def\s+solve\s*\(/.test(code)) {
      consoleNode.innerHTML = `<p class="fail"><strong>ERROR</strong><span>请保留名为 solve 的函数入口。</span></p>`;
      return;
    }
    if (!Array.isArray(problem.tests) || !problem.tests.length) {
      consoleNode.innerHTML = `<p class="fail"><strong>NO TEST</strong><span>这道题没有可运行的测试。</span></p>`;
      return;
    }
    consoleNode.innerHTML = `<p class="console-idle">LOADING · 正在启动浏览器内 Python 环境……</p>`;
    const runButton = document.querySelector('[data-action="run-tests"]');
    if (runButton) { runButton.disabled = true; runButton.textContent = "正在运行"; }
    if (runner) runner.terminate();
    runner = new Worker("./pyodide-worker.js?v=4", { type: "module" });
    runnerTimeout = window.setTimeout(() => {
      runner?.terminate();
      runner = null;
      consoleNode.innerHTML = `<p class="fail"><strong>TIMEOUT</strong><span>运行超过 45 秒，请检查死循环。</span></p>`;
      if (runButton) { runButton.disabled = false; runButton.textContent = "重试"; }
    }, 45000);
    runner.onmessage = (event) => {
      const payload = event.data || {};
      if (payload.type === "status") {
        consoleNode.innerHTML = `<p class="console-idle">LOADING · ${escapeHTML(payload.message)}</p>`;
        return;
      }
      window.clearTimeout(runnerTimeout);
      if (payload.type === "result") {
        state.session.testResults = payload.results;
        state.session.testsPassed = payload.results.length > 0 && payload.results.every((result) => result.pass);
        scheduleSave();
        consoleNode.innerHTML = `${renderTestResults(payload.results)}<p class="console-note">${state.session.testsPassed ? "全部通过，可以进入对照。" : "修正后再次运行，或先查看参考解法。"}</p>`;
      } else {
        consoleNode.innerHTML = `<p class="fail"><strong>ERROR</strong><span>${escapeHTML(payload.message || "本地运行失败")}</span></p>`;
      }
      if (runButton) { runButton.disabled = false; runButton.textContent = "再次运行"; }
    };
    runner.onerror = () => {
      window.clearTimeout(runnerTimeout);
      consoleNode.innerHTML = `<p class="fail"><strong>ERROR</strong><span>Python 环境载入失败，代码已保存。</span></p>`;
      if (runButton) { runButton.disabled = false; runButton.textContent = "重试"; }
    };
    runner.postMessage({ code, tests: problem.tests, compare: problem.compare || "exact" });
  }

  function predictReview(rating, previousInterval) {
    let days = 0;
    if (rating === 2) days = 1;
    if (rating === 3) days = previousInterval ? Math.max(3, Math.round(previousInterval * 1.8)) : 3;
    if (rating === 4) days = previousInterval ? Math.max(7, Math.round(previousInterval * 2.5)) : 7;
    days = Math.min(days, 90);
    return { days, date: addDays(dayStart(), days), label: days === 0 ? "今天稍后" : days === 1 ? "明天" : `${days} 天后` };
  }

  function finishSession() {
    const session = state.session;
    if (!session?.rating) return showToast("先选择真实的回忆评分。", 2600);
    const problem = findProblem(session.problemId, session.libraryId);
    const progress = ensureProblemState(session.problemId, session.libraryId);
    const schedule = predictReview(session.rating, progress.intervalDays || 0);
    const independent = session.testsPassed && session.hintsUsed === 0 && !session.revealedBeforeAttempt && session.rating >= 3;
    if (independent) progress.independentPasses = (progress.independentPasses || 0) + 1;
    progress.status = session.rating === 1 ? "lapsed" : progress.independentPasses >= 3 && session.rating === 4 ? "mastered" : "recall";
    progress.intervalDays = schedule.days;
    progress.nextReviewAt = schedule.date.toISOString();
    progress.lastReviewedAt = new Date().toISOString();
    progress.lastRating = session.rating;
    progress.errors = [...new Set([...(progress.errors || []), ...session.errors])];
    state.history.unshift({ libraryId: session.libraryId, problemId: problem.id, completedAt: new Date().toISOString(), rating: session.rating, testsPassed: session.testsPassed, hintsUsed: session.hintsUsed, nextReviewAt: schedule.date.toISOString() });
    state.history = state.history.slice(0, 500);
    state.session = null;
    currentView = "today";
    persistNow().catch(handleSaveError);
    updateNavigation();
    render();
    showToast(`已保存「${problem.title}」，${schedule.label}再写一次。`, 3800);
  }

  function normalizeLibrary(input) {
    try {
      if (!input || typeof input !== "object") return null;
      const id = textField(input.id || `library-${crypto.randomUUID?.() || Date.now()}`, "题库 ID", 100);
      const name = textField(input.name, "题库名称", 60);
      const description = optionalText(input.description, 180);
      if (!Array.isArray(input.problems) || input.problems.length > 500) throw new Error("problems 必须是最多 500 项的数组");
      const seen = new Set();
      const problems = input.problems.map((problem, index) => validateProblem(problem, index)).map((problem) => {
        if (seen.has(problem.id)) throw new Error(`题目 ID 重复：${problem.id}`);
        seen.add(problem.id);
        return problem;
      });
      return { id, name, description, readOnly: false, problems };
    } catch (error) {
      console.warn("跳过无效题库", error);
      return null;
    }
  }

  function textField(value, label, max) {
    const text = String(value ?? "").trim();
    if (!text || text.length > max) throw new Error(`${label}必须为 1～${max} 个字符`);
    return text;
  }

  function optionalText(value, max) {
    const text = String(value ?? "").trim();
    if (text.length > max) throw new Error(`文本不能超过 ${max} 个字符`);
    return text;
  }

  function validateProblem(input, index = 0) {
    if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error(`第 ${index + 1} 道题不是对象`);
    const id = textField(input.id, `第 ${index + 1} 道题的 id`, 100);
    if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(id)) throw new Error(`题目 ${id} 的 id 只能包含字母、数字、下划线和连字符`);
    const solutions = Array.isArray(input.solutions) ? input.solutions : [];
    if (!solutions.length || solutions.length > 8) throw new Error(`题目 ${id} 必须包含 1～8 种 solutions`);
    const tests = Array.isArray(input.tests) ? input.tests : [];
    if (tests.length > 30) throw new Error(`题目 ${id} 最多包含 30 组测试`);
    return {
      id,
      number: optionalText(input.number, 20),
      title: textField(input.title, `题目 ${id} 的 title`, 120),
      topic: optionalText(input.topic || "未分类", 60),
      summary: textField(input.summary, `题目 ${id} 的 summary`, 1200),
      signature: optionalText(input.signature || "solve(...) → ...", 160),
      starter: textField(input.starter || "def solve(...):\n    pass", `题目 ${id} 的 starter`, 50000),
      officialUrl: safeUrl(input.officialUrl),
      hints: (Array.isArray(input.hints) ? input.hints : []).slice(0, 6).map((item) => optionalText(item, 600)),
      solutions: solutions.map((solution, solutionIndex) => validateSolution(solution, id, solutionIndex)),
      tests: tests.map((test, testIndex) => validateTest(test, id, testIndex)),
      compare: ["exact", "unordered", "nestedUnordered"].includes(input.compare) ? input.compare : "exact"
    };
  }

  function validateSolution(input, problemId, index) {
    if (!input || typeof input !== "object") throw new Error(`题目 ${problemId} 的第 ${index + 1} 种解法无效`);
    return {
      id: optionalText(input.id || `solution-${index + 1}`, 100),
      name: textField(input.name, `题目 ${problemId} 的解法名称`, 100),
      idea: textField(input.idea, `题目 ${problemId} 的解法思路`, 3000),
      steps: (Array.isArray(input.steps) ? input.steps : []).slice(0, 12).map((item) => optionalText(item, 600)),
      complexity: optionalText(input.complexity, 300),
      pitfalls: (Array.isArray(input.pitfalls) ? input.pitfalls : []).slice(0, 12).map((item) => optionalText(item, 600)),
      code: textField(input.code, `题目 ${problemId} 的解法代码`, 50000),
      source: input.source && typeof input.source === "object" ? { label: optionalText(input.source.label, 160), url: safeUrl(input.source.url) } : undefined
    };
  }

  function validateTest(input, problemId, index) {
    if (!input || typeof input !== "object") throw new Error(`题目 ${problemId} 的第 ${index + 1} 组测试无效`);
    if (!Array.isArray(input.args)) throw new Error(`题目 ${problemId} 的测试 args 必须是数组`);
    return { label: optionalText(input.label || `用例 ${index + 1}`, 120), args: clone(input.args), expected: clone(input.expected) };
  }

  function validateLibraryPayload(payload) {
    if (payload?.schema !== "huixie.problem-library" || payload?.version !== 1) throw new Error("需要 schema 为 huixie.problem-library、version 为 1 的题库文件");
    const library = normalizeLibrary(payload.library);
    if (!library) throw new Error("题库结构无效，请检查名称、题目、解法和测试字段");
    if (customLibraries.some((item) => item.id === library.id)) library.id = `${library.id}-${Date.now().toString(36)}`;
    return library;
  }

  function readJsonFile(file, handler) {
    if (!file) return;
    if (file.size > MAX_IMPORT_BYTES) {
      ui.libraryError = "文件超过 2 MB 限制。请拆分题库后再导入。";
      render();
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        handler(JSON.parse(String(reader.result)));
      } catch (error) {
        ui.libraryError = error.message || "JSON 文件无法解析";
        render();
      }
    };
    reader.onerror = () => { ui.libraryError = "浏览器无法读取这个文件。"; render(); };
    reader.readAsText(file);
  }

  function downloadJson(payload, filename) {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function exportLibrary() {
    const library = getLibrary();
    if (library.readOnly) return;
    downloadJson({ schema: "huixie.problem-library", version: 1, exportedAt: new Date().toISOString(), library }, `huixie-library-${library.id}.json`);
    showToast("题库已导出。", 1800);
  }

  function downloadLibraryTemplate() {
    downloadJson({
      schema: "huixie.problem-library",
      version: 1,
      library: {
        id: "my-python-review",
        name: "我的 Python 题库",
        description: "用于回写复习的个人题库",
        problems: [{
          id: "example-problem",
          number: "",
          title: "示例题",
          topic: "示例模式",
          summary: "用自己的话描述问题，不要粘贴受版权保护的完整题面。",
          signature: "solve(nums) → int",
          starter: "def solve(nums):\n    pass",
          hints: ["只写一条不泄露完整答案的提示。"],
          solutions: [{ id: "solution-1", name: "解法一", idea: "说明关键状态或不变量。", steps: ["第一步", "第二步"], complexity: "时间 O(n)，空间 O(1)。", pitfalls: ["说明易错点。"], code: "def solve(nums):\n    return len(nums)" }],
          tests: [{ label: "基础用例", args: [[1, 2, 3]], expected: 3 }],
          compare: "exact"
        }]
      }
    }, "huixie-library-template.json");
    showToast("题库格式示例已下载。", 1800);
  }

  function importLibrary(file) {
    readJsonFile(file, (payload) => {
      const library = validateLibraryPayload(payload);
      customLibraries.push(library);
      state.activeLibraryId = library.id;
      ui.libraryError = "";
      persistNow().catch(handleSaveError);
      renderLibraries();
      showToast(`已导入「${library.name}」的 ${library.problems.length} 道题。`, 3200);
    });
  }

  function exportBackup() {
    downloadJson({ schema: "huixie.workspace-backup", version: APP_VERSION, exportedAt: new Date().toISOString(), state, libraries: customLibraries }, `huixie-backup-${isoDate(new Date())}.json`);
    showToast("工作台备份已导出。", 1800);
  }

  function importBackup(file) {
    readJsonFile(file, (payload) => {
      if (payload?.schema !== "huixie.workspace-backup" || payload?.version !== APP_VERSION) throw new Error("这不是兼容的回写工作台备份");
      if (!Array.isArray(payload.libraries)) throw new Error("备份中缺少题库列表");
      const libraries = payload.libraries.map((library) => normalizeLibrary(library));
      if (libraries.some((library) => !library)) throw new Error("备份中包含无效题库");
      state = normalizeState(payload.state || {});
      state.session = null;
      customLibraries = libraries;
      if (!getLibrary(state.activeLibraryId)) state.activeLibraryId = BUILTIN_LIBRARY_ID;
      persistNow().catch(handleSaveError);
      currentView = "today";
      updateNavigation();
      render();
      showToast("工作台备份已恢复。", 2600);
    });
  }

  function showToast(message, duration = 2600) {
    const node = document.createElement("div");
    node.className = "toast";
    node.textContent = message;
    toastRegion.appendChild(node);
    window.setTimeout(() => node.remove(), duration);
  }

  async function copyCode(button) {
    try {
      await navigator.clipboard.writeText(button.dataset.code || "");
      showToast("代码已复制。", 1600);
    } catch {
      showToast("浏览器未允许复制，请手动选择。", 2600);
    }
  }

  root.addEventListener("click", (event) => {
    const target = event.target.closest("button, a");
    if (!target) return;
    if (target.dataset.view) {
      event.preventDefault();
      setView(target.dataset.view);
      return;
    }
    const action = target.dataset.action;
    if (!action) return;

    if (action === "start-problem") startProblem(target.dataset.problemId, target.dataset.libraryId || state.activeLibraryId);
    else if (action === "leave-practice") { saveSessionInputs(); setView("today"); }
    else if (action === "show-hint") {
      const problem = findProblem(state.session.problemId, state.session.libraryId);
      const nextHint = Math.min((ui.revealedHint || 0) + 1, Math.max(1, problem.hints?.length || 1));
      if (nextHint > ui.revealedHint) state.session.hintsUsed += 1;
      ui.revealedHint = nextHint;
      scheduleSave();
      renderPractice();
    }
    else if (action === "preview-solution") {
      ui.previewOpen = !ui.previewOpen;
      if (ui.previewOpen) state.session.revealedBeforeAttempt = true;
      scheduleSave();
      renderPractice();
    }
    else if (action === "reset-code") resetCode();
    else if (action === "back-stage") moveStage(state.session.stage - 1);
    else if (action === "run-tests") runTests(findProblem(state.session.problemId, state.session.libraryId));
    else if (action === "go-compare") moveStage(2);
    else if (action === "back-to-code") moveStage(1);
    else if (action === "go-schedule") moveStage(3);
    else if (action === "set-rating") { state.session.rating = Number(target.dataset.value); scheduleSave(); renderPractice(); }
    else if (action === "toggle-solution") {
      const key = target.dataset.solutionKey;
      if (ui.expandedSolutions.has(key)) ui.expandedSolutions.delete(key);
      else ui.expandedSolutions.add(key);
      renderPractice();
    }
    else if (action === "copy-code") copyCode(target);
    else if (action === "select-library") { state.activeLibraryId = target.dataset.libraryId; ui.editor = null; scheduleSave(); renderLibraries(); }
    else if (action === "new-library") { ui.editor = { type: "library", mode: "new" }; renderLibraries(); }
    else if (action === "edit-library") { ui.editor = { type: "library", mode: "edit" }; renderLibraries(); }
    else if (action === "new-problem") { ui.editor = { type: "problem" }; renderLibraries(); }
    else if (action === "edit-problem") { ui.editor = { type: "problem", problemId: target.dataset.problemId }; renderLibraries(); }
    else if (action === "close-editor") { ui.editor = null; renderLibraries(); }
    else if (action === "delete-problem") {
      const library = getLibrary();
      const problem = findProblem(target.dataset.problemId);
      if (problem && window.confirm(`从「${library.name}」删除「${problem.title}」？此操作无法恢复。`)) {
        library.problems = library.problems.filter((item) => item.id !== problem.id);
        delete state.progress[progressKey(library.id, problem.id)];
        persistNow().catch(handleSaveError);
        renderLibraries();
      }
    }
    else if (action === "delete-library") {
      const library = getLibrary();
      if (!library.readOnly && window.confirm(`删除题库「${library.name}」及其本机进度？此操作无法恢复。`)) {
        customLibraries = customLibraries.filter((item) => item.id !== library.id);
        Object.keys(state.progress).filter((key) => key.startsWith(`${library.id}::`)).forEach((key) => delete state.progress[key]);
        state.activeLibraryId = BUILTIN_LIBRARY_ID;
        persistNow().catch(handleSaveError);
        renderLibraries();
      }
    }
    else if (action === "import-library") document.getElementById("library-import-file")?.click();
    else if (action === "download-library-template") downloadLibraryTemplate();
    else if (action === "export-library") exportLibrary();
    else if (action === "export-backup") exportBackup();
    else if (action === "import-backup") document.getElementById("backup-import-file")?.click();
    else if (action === "clear-data") clearAllData(target);
  });

  root.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    if (form.id === "recall-form") {
      const data = new FormData(form);
      const plan = String(data.get("plan") || "").trim();
      if (plan.length < 12) return showToast("先写下至少一句完整的解题骨架。", 2800);
      const progress = ensureProblemState(state.session.problemId, state.session.libraryId);
      progress.recallPattern = String(data.get("pattern") || "").trim();
      progress.recallPlan = plan;
      scheduleSave();
      moveStage(1);
    } else if (form.id === "schedule-form") {
      const data = new FormData(form);
      state.session.errors = data.getAll("error").map(String);
      finishSession();
    } else if (form.id === "settings-form") {
      state.settings.minutes = Number(new FormData(form).get("minutes")) || 25;
      scheduleSave();
      showToast("每日复习预算已保存。", 2000);
      setView("today");
    } else if (form.id === "library-form") {
      const data = new FormData(form);
      try {
        const name = textField(data.get("name"), "题库名称", 60);
        const description = optionalText(data.get("description"), 180);
        if (ui.editor.mode === "edit") {
          const library = getLibrary();
          library.name = name;
          library.description = description;
        } else {
          const library = { id: `library-${Date.now().toString(36)}`, name, description, readOnly: false, problems: [] };
          customLibraries.push(library);
          state.activeLibraryId = library.id;
        }
        ui.editor = null;
        persistNow().catch(handleSaveError);
        renderLibraries();
      } catch (error) {
        showToast(error.message, 3000);
      }
    } else if (form.id === "problem-form") {
      try {
        const incoming = JSON.parse(String(new FormData(form).get("problemJson") || ""));
        const problem = validateProblem(incoming);
        const library = getLibrary();
        const existingId = ui.editor.problemId;
        if (library.problems.some((item) => item.id === problem.id && item.id !== existingId)) throw new Error(`题目 ID 已存在：${problem.id}`);
        if (existingId) library.problems = library.problems.map((item) => item.id === existingId ? problem : item);
        else library.problems.push(problem);
        ui.editor = null;
        persistNow().catch(handleSaveError);
        renderLibraries();
        showToast(`已保存「${problem.title}」。`, 2200);
      } catch (error) {
        showToast(`无法保存：${error.message}`, 4200);
      }
    }
  });

  root.addEventListener("change", (event) => {
    if (event.target.id === "library-import-file") importLibrary(event.target.files?.[0]);
    if (event.target.id === "backup-import-file") importBackup(event.target.files?.[0]);
    if (event.target.closest("#schedule-form") && state.session) {
      state.session.errors = new FormData(event.target.closest("#schedule-form")).getAll("error").map(String);
      scheduleSave();
    }
  });

  async function clearAllData(button) {
    const now = Date.now();
    if (now > clearArmedUntil) {
      clearArmedUntil = now + 5000;
      button.textContent = "再次点击确认清除";
      showToast("将删除自定义题库、草稿和全部复习记录。", 3200);
      window.setTimeout(() => {
        if (Date.now() >= clearArmedUntil && button.isConnected) button.textContent = "清除本机数据";
      }, 5100);
      return;
    }
    await storage.clear();
    localStorage.removeItem(LEGACY_KEY);
    state = clone(defaultState);
    customLibraries = [];
    clearArmedUntil = 0;
    currentView = "today";
    updateNavigation();
    render();
    showToast("本机数据已清除，无法恢复。", 3400);
  }

  document.querySelectorAll(".top-rail [data-view]").forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
  window.addEventListener("beforeunload", saveSessionInputs);

  function registerServiceWorker() {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  }

  function registerWebMCPTools() {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const register = (tool) => { try { Promise.resolve(context.registerTool(tool)).catch(() => {}); } catch {} };
    register({
      name: "get_today_training",
      title: "读取今日回写队列",
      description: "读取当前题库的今日复习队列，不修改学习状态。",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute() { return { library: getLibrary().name, dailyMinutes: state.settings.minutes, items: getQueue().map((problem) => ({ problemId: problem.id, title: problem.title, topic: problem.topic })) }; }
    });
    register({
      name: "start_training_problem",
      title: "开始回写一道题",
      description: "打开指定题目的回忆与默写流程。",
      inputSchema: { type: "object", properties: { problemId: { type: "string" } }, additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        const problem = input?.problemId ? findProblem(input.problemId) : getQueue()[0];
        if (!problem) throw new Error("没有可开始的题目");
        startProblem(problem.id);
        return { started: true, problemId: problem.id, title: problem.title };
      }
    });
  }

  async function init() {
    root.innerHTML = `<section class="boot-screen"><span class="boot-pulse"></span><p>正在接通本机题库与复习记录……</p></section>`;
    await loadWorkspace();
    currentView = state.session ? "practice" : "today";
    updateNavigation();
    render();
    registerServiceWorker();
    registerWebMCPTools();
    window.huixie = {
      getState: () => clone(state),
      getLibraries: () => allLibraries().map((library) => ({ id: library.id, name: library.name, problemCount: library.problems.length })),
      getTodayQueue: () => getQueue().map((problem) => ({ id: problem.id, title: problem.title })),
      openView: setView,
      startProblem
    };
  }

  init().catch((error) => {
    console.error(error);
    root.innerHTML = `<section class="empty-state"><h1>工作台没有启动</h1><p>本机存储初始化失败。请刷新页面，或使用无痕窗口排查浏览器存储权限。</p></section>`;
  });
})();
