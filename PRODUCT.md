# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static, offline-first web application. The MVP uses plain HTML, CSS, and JavaScript; stores learning state on the device; supports Python 3 exercises; and performs learning-oriented local checks in a browser worker. Official LeetCode submission remains the final verification step.

## Users

The primary users are programmers who already know how to code and want to retain common interview algorithms through repeated recall and rewriting.

## Product Purpose

Provide a completely free memory and review workspace that helps experienced programmers retain the patterns and Python implementations in LeetCode Hot 100, then reproduce them independently.

Success means a learner can progress from understanding a worked solution to recalling the approach, writing correct code, and recognizing the same pattern in a changed problem.

## Positioning

The product is not a general problem bank or a programming course. Its core mechanism is a compact active-recall loop: recall the pattern, rewrite the approach or Python solution, reveal concise solution variants on demand, compare, and schedule the next review.

## Operating Context

Learners use the website in short daily sessions. A session mixes new examples, recall reviews, coding attempts, and short reflection. The initial curriculum is limited to LeetCode Hot 100.

## Capabilities and Constraints

- The built-in library focuses only on LeetCode Hot 100; users may manage their own imported libraries.
- The experience assumes programming fluency and avoids repeating basic syntax instruction.
- The learning route and review timing should adapt to each learner.
- The service is intended to remain free to learners.
- Explanations, examples, exercises, code, diagrams, and tests must be independently authored; the product links to official problem pages rather than scraping or mirroring them.
- The product supports Python 3 only.
- Each problem may contain multiple concise Python solution variants, revealed only when requested.
- Imported libraries may include explanations, Python code, and tests, and must be validated and rendered safely.
- The MVP does not require accounts, cloud synchronization, paid AI, community features, or authoritative server-side judging.
- Progress remains on the current device and must be exportable and clearable by the learner.

## Evidence on Hand

No proprietary question corpus, licensed LeetCode content, user research, benchmark data, or brand assets have been provided. Future work must not invent licensing rights or efficacy claims.

## Product Principles

- Retrieval over recognition: the default view asks for recall before revealing complete solutions.
- Reveal on demand: long explanations and full code stay out of the primary review surface.
- Master patterns, not answer strings: require explanation and transfer to related variants.
- Personalize the next best action rather than exposing an overwhelming question list.
- Keep the core learning path free and usable without paid dependencies.

## Accessibility & Inclusion

The interface should use concise Chinese explanations, keyboard-accessible interactions, readable code presentation, and terminology familiar to working programmers.
