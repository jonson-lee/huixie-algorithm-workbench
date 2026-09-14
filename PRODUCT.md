# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static, offline-first web application. The MVP uses plain HTML, CSS, and JavaScript; stores learning state on the device; supports Python 3 exercises; and performs learning-oriented local checks in a browser worker. Official LeetCode submission remains the final verification step.

## Users

The primary users are university students with no algorithm-problem-solving foundation who want to prepare for computer-related roles.

## Product Purpose

Provide a completely free learning workspace that helps beginners learn and retain the patterns in LeetCode Hot 100, then reproduce solutions independently.

Success means a learner can progress from understanding a worked solution to recalling the approach, writing correct code, and recognizing the same pattern in a changed problem.

## Positioning

The product is not a general problem bank. Its core mechanism is an answer-first, active-recall learning loop: show an approachable solution and reasoning first, then progressively remove support and schedule personalized reattempts, similar to vocabulary learning.

## Operating Context

Learners use the website in short daily sessions. A session mixes new examples, recall reviews, coding attempts, and short reflection. The initial curriculum is limited to LeetCode Hot 100.

## Capabilities and Constraints

- The first release focuses only on LeetCode Hot 100.
- The experience must support true beginners and explain prerequisite concepts.
- The learning route and review timing should adapt to each learner.
- The service is intended to remain free to learners.
- Explanations, examples, exercises, code, diagrams, and tests must be independently authored; the product links to official problem pages rather than scraping or mirroring them.
- The MVP does not require accounts, cloud synchronization, paid AI, community features, or authoritative server-side judging.
- Progress remains on the current device and must be exportable and clearable by the learner.

## Evidence on Hand

No proprietary question corpus, licensed LeetCode content, user research, benchmark data, or brand assets have been provided. Future work must not invent licensing rights or efficacy claims.

## Product Principles

- Teach before testing: every new pattern begins with a concrete worked example.
- Retrieval over recognition: support is gradually removed until the learner can reproduce the solution.
- Master patterns, not answer strings: require explanation and transfer to related variants.
- Personalize the next best action rather than exposing an overwhelming question list.
- Keep the core learning path free and usable without paid dependencies.

## Accessibility & Inclusion

The interface should use beginner-friendly Chinese explanations, keyboard-accessible interactions, readable code presentation, and avoid assuming prior algorithm terminology.
