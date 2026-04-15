# GitHub editorial workflow

This repository uses a pull-request-first editorial workflow for every Markdown-backed section under `content/<section>`.

## Editorial states

GitHub pull requests are the source of truth for work in progress.

| State | GitHub signal | Meaning |
| --- | --- | --- |
| Draft | Draft PR + `state:draft` | Contributor is still preparing the content. |
| Review | Ready-for-review PR + `state:review` | Editors and maintainers can review substance, metadata, and fit. |
| Approved | Required reviews and checks passed + `state:approved` + `ready:publish` | Content is review-complete and can be merged when publication timing is approved. |
| Published | Merge to `main` + successful Pages deployment + `state:published` | Content is live on the site. |

`type:correction`, `blocked`, and future labels remain maintainer-controlled labels for exceptions and special handling.

## Supported content sections

All Markdown sections must be registered in `scripts/content-workflow-config.mjs`.

Current sections:

- `content/articles/*.md`
- `content/training/*.md`

To add another Markdown section later:

1. Add the new content path and frontmatter rules to `scripts/content-workflow-config.mjs`
2. Update `src/lib/content.ts` and any route readers if the site should render that section
3. Add or replace CODEOWNERS for the new section
4. Add a matching `section:<name>` label if the new section needs one

## Pull request templates

Use the matching PR template when opening content work:

- `content-submission.md` for new Markdown files
- `content-update.md` for edits to existing Markdown files

Templates capture section, intended audience, publication timing, and reviewer notes so contributors can work entirely from GitHub.

## Automated checks

The repository now ships three content workflow automations:

1. `Content validation`
   - validates changed Markdown files under `content/**`
   - enforces registered section paths and section-specific frontmatter
   - runs `npm run lint` and `npm run build`
2. `Content governance`
   - synchronizes the editorial label taxonomy
   - applies section labels, type labels, and state labels on PR/review events
3. `Content publication state`
   - marks merged content PRs as `state:published` after the Pages deployment workflow succeeds on `main`

## Required branch protection on `main`

Configure GitHub branch protection or a ruleset for `main` with these settings:

- Require a pull request before merging
- Require CODEOWNER review
- Require at least one approval (increase to two if a section needs stronger editorial control)
- Require status checks before merging
  - `Validate content metadata`
  - `Run site checks`
- Restrict direct pushes to maintainers only
- Prefer squash merge for editorial PRs

These settings live in repository administration, not in versioned files, so maintainers must enable them in GitHub.

## Review model

- Editors review substance, clarity, factual support, metadata quality, and publication readiness.
- Maintainers review repository policy, CI results, workflow compliance, and final merge timing.
- Workflow/configuration changes remain under maintainer ownership via `CODEOWNERS`.

## Contributor path

1. Create or update Markdown on a branch.
2. Open a draft PR using the appropriate content template.
3. Let automation validate metadata and apply section/type labels.
4. Mark the PR ready for review when the content is ready.
5. Address requested revisions until approvals and checks pass.
6. Wait for maintainer publication approval.
7. Merge to `main` to publish.
