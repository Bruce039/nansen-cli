---
"nansen-cli": patch
---

Version comparison (update notifier, `doctor`, `changelog --since`) reads a prerelease-suffixed component numerically instead of as 0, so `1.2.10-beta` no longer compares below `1.2.9`
