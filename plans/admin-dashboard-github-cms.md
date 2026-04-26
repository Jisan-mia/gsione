# Admin Dashboard GitHub CMS Plan

## Goal

Build a minimalist admin dashboard for non-technical editors to manage GSi content without leaving the existing GitHub-backed publishing model.

The dashboard should support articles, analysis, podcasts, training content, team members, and image uploads while preserving GitHub as the source of truth.

## Non-Goals

- Do not introduce a separate CMS platform.
- Do not introduce a separate database for content.
- Do not write directly to `main`.
- Do not expose a public allowlist of dashboard users.
- Do not let collaborators publish or hard-delete content.
- Do not let dashboard UI permissions replace GitHub branch protection.

## Current Constraints

- The site is a static Next.js export via `output: "export"`.
- The site deploys to GitHub Pages from `main`.
- Content currently lives in markdown files under `content/**`.
- Existing GitHub workflows already support content validation, PR labels, and publication tracking.
- A static dashboard cannot safely store secrets or run server-only GitHub OAuth exchanges.

## Architecture

Build the dashboard inside the current Next app at `/admin`.

The dashboard should behave like a separate admin product:

- full-screen admin shell
- sidebar navigation
- topbar with authenticated user info
- no public website header/footer
- hidden from public navigation

Future DNS can point `admin.gsithinktank.com` to the same static app if desired, but v1 should ship as `/admin` to avoid deployment complexity.

## Authentication

Use a user-provided fine-grained GitHub Personal Access Token for v1.

Reasons:

- Works with static GitHub Pages.
- Avoids unsafe browser-side OAuth secret handling.
- Keeps audit history tied to the actual editor.
- Can be scoped tightly to this repository.
- Can be revoked from GitHub at any time.

Required token permissions:

- Repository access: only `jisan-mia/gsione`
- Metadata: read
- Contents: read/write
- Pull requests: read/write
- Actions/checks: read if needed for validation and publish status
- Issues: optional, only if the dashboard later comments on or links intake issues

Token storage rules:

- Default: memory-only token storage.
- Optional: "remember this device" with clear warning before storing in `localStorage`.
- Always provide "sign out and forget token".
- Never commit, log, or send the token anywhere except GitHub API calls.

## Access Control

Do not store an allowlist in the public repo.

Access should be based on GitHub repository permissions:

- Dashboard calls GitHub API with the user's token.
- Dashboard fetches the authenticated GitHub user.
- Dashboard checks that user's repository permission for `jisan-mia/gsione`.
- If the user has no repo permission, show access denied.

Role mapping:

- `jisan-mia` or repository `admin`: super admin
- repository `write` or `maintain`: editor
- repository `read`: viewer, optional
- no permission: denied

Security boundaries:

- UI role checks improve usability.
- GitHub branch protection and repository permissions are the real enforcement layer.
- Collaborators should not have permission to bypass PR review or push directly to `main`.

## Publishing Model

All dashboard changes must create or update a branch and pull request.

Never write directly to `main`.

One content item should map to one PR in v1:

- one article create/edit/archive = one PR
- one analysis create/edit/archive = one PR
- one podcast create/edit/archive = one PR
- one training create/edit/archive = one PR
- one team member create/edit/archive = one PR

Branch naming pattern:

```txt
dashboard/<section>/<slug>
```

Examples:

```txt
dashboard/articles/cyber-law-and-the-illusion-of-protection
dashboard/podcast/gsi-introduction-video
dashboard/team/asheer-shah
```

PR title examples:

```txt
Add article: Title
Edit analysis: Title
Archive podcast: Title
Update team member: Name
```

## Publish Button

The dashboard should include a Publish button, but it must be guarded.

Publish button rules:

- visible only to super admin
- works only on an existing dashboard-created PR
- never publishes directly from unsaved form state
- requires validation/build checks to pass
- requires no merge conflicts
- blocks PRs with unrelated non-content changes unless explicitly allowed
- shows a final confirmation before merge
- merges through GitHub API
- shows deployment status/link after merge when available

Recommended merge method:

- squash merge for clean content history

## Drafts and Editing

Published content remains unchanged until the PR is merged.

Editor flow:

1. Open existing content from `main`.
2. Edit fields/body in dashboard.
3. Click "Save draft".
4. Dashboard creates or updates branch.
5. Dashboard creates or updates one PR.
6. Live site remains unchanged.
7. Super admin publishes by merging the PR.

Autosave:

- Do not autosave to GitHub in v1.
- Use local browser draft recovery only.
- User must explicitly click "Save draft" to commit to GitHub.

Concurrency:

- One open dashboard PR per content item.
- If a content item already has an open dashboard PR, lock editing for other editors.
- Show the active PR and editor.
- Super admin can override stale locks by closing/replacing the PR.

## Delete and Archive

Do not expose hard delete as a normal v1 action.

Use frontmatter status:

```yaml
status: "published" | "draft" | "archived"
```

Public pages should only list/render `published` content.

Recommended permissions:

- editor: create/edit draft PRs
- editor: no hard delete
- super admin: archive/unpublish through PR
- super admin: hard delete only as a special PR action, not direct deletion

## Content Types

### Articles and Analysis

Structured fields:

- title
- slug
- category
- author name
- author role
- excerpt
- publish date
- source label
- source URL
- featured toggle
- tags
- status
- body markdown

### Podcast

Structured fields:

- episode title
- slug
- publish date
- host name
- guest name
- YouTube URL
- status
- episode notes markdown

### Training

Structured fields:

- title
- slug
- summary
- level
- duration
- format
- publish date
- featured toggle
- audience list
- focus areas list
- outcomes list
- status
- body markdown

### Team

Team management is part of v1.

Move team data out of `src/lib/site.ts` and into markdown files:

```txt
content/team/<slug>.md
```

Recommended frontmatter:

```yaml
name: "Asheer Shah"
role: "Founder and Director"
avatar: "/uploads/team/asheer-shah.webp"
avatarAlt: "Asheer Shah"
linkedin: "https://..."
email: ""
sortOrder: 1
status: "published"
```

Markdown body contains the team member bio.

Update site code to read team members from `content/team/*.md`.

## Editor Experience

Use structured fields instead of raw frontmatter editing.

Dashboard generates YAML frontmatter internally.

Markdown editor requirements:

- write markdown body
- preview rendered markdown
- insert image markdown
- validate required fields
- validate slug format
- validate date format
- show metadata/card preview
- show content preview before PR creation

The dashboard should not ask non-technical editors to touch YAML.

## Image Uploads

Image upload is required for v1.

Store uploaded images in the repo:

```txt
public/uploads/YYYY/MM/<safe-filename>.webp
```

Rules:

- accept only `jpg`, `jpeg`, `png`, `webp`
- reject unsupported file types
- reject huge originals above a strict limit, recommended `8 MB`
- require alt text before insert
- convert/compress to `.webp` in the browser before committing
- resize long edge by use case:
  - inline article image: `1600px`
  - card/thumbnail image: `1200px`
  - team/avatar image: `800px`
- generate safe filenames using content slug plus short id
- commit image file and markdown/content change in the same PR
- insert markdown path automatically:

```md
![Alt text](/uploads/2026/04/article-slug-short-id.webp)
```

Validation should block:

- missing alt text
- invalid local image paths
- unsupported file extensions
- oversized images

Future improvement:

- GitHub Action can re-optimize uploaded images in PRs if browser compression is not enough.

## Preview

V1:

- in-dashboard markdown preview
- metadata/card preview
- GitHub PR diff link
- validation/build check status

V2:

- GitHub Actions build artifact per PR
- dashboard shows preview build status

V3:

- protected PR preview deployments
- dashboard "Preview live page" button
- publish button appears only after preview build passes

Avoid public unauthenticated preview URLs for unpublished drafts.

## GitHub Protection Requirements

Configure repository protections so dashboard UI cannot become the only guardrail.

Required:

- protect `main`
- block force pushes to `main`
- block direct pushes to `main`
- require PR before merge
- require status checks before merge
- require content validation workflow
- require Next build workflow
- require CODEOWNERS review where supported
- make you the code/content owner for content and admin workflow files

Recommended CODEOWNERS:

```txt
/content/ @jisan-mia
/public/uploads/ @jisan-mia
/.github/ @jisan-mia
/scripts/ @jisan-mia
/src/app/admin/ @jisan-mia
/src/lib/admin/ @jisan-mia
```

Review repository casing: current CODEOWNERS appears to use `@Jisan-mia`; GitHub usernames are case-insensitive in many contexts, but the canonical username is `jisan-mia`.

## Dashboard Navigation

Sidebar:

- Dashboard
- Articles
- Analysis
- Podcasts
- Training
- Team
- Media
- Pull Requests
- Settings

Topbar:

- current repo
- current role
- GitHub user avatar/name
- token status
- sign out

## Implementation Phases

### Phase 1: Admin Shell and Auth Gate

- create `/admin`
- separate admin layout
- PAT login screen
- token memory/local storage option
- GitHub user fetch
- repo permission check
- role mapping
- access denied state
- sidebar/topbar shell

### Phase 2: Content Browser and Team Migration

- migrate team data to `content/team/*.md`
- update About page to read team from content files
- list articles, analysis, podcasts, training, team
- load markdown/frontmatter from GitHub `main`
- search/filter by section/status/date/author
- existing content preview

### Phase 3: Structured Editors

- article editor
- analysis editor
- podcast editor
- training editor
- team editor
- markdown preview
- field validation
- slug generation
- status support

### Phase 4: Image Uploads

- image picker/dropzone
- browser-side resize/compress/convert to WebP
- alt text requirement
- upload path generation
- commit image with content PR
- markdown insertion

### Phase 5: PR Workflow

- create branch from latest `main`
- create/update content file
- create/update uploaded image files
- create/update one PR per item
- detect existing PR lock
- show PR link/status/checks
- update same PR on repeated draft saves

### Phase 6: Publish Workflow

- super-admin-only publish button
- check validation/build status
- block merge conflicts
- final confirmation
- merge PR via GitHub API
- show deployment status when available

### Phase 7: Preview Improvements

- PR build artifacts
- preview status in dashboard
- protected preview deployment research if needed

## Open Risks

- Static apps cannot hide source code, so security must rely on GitHub authentication, repo permissions, and branch protection.
- Fine-grained PAT UX may be unfamiliar for non-technical editors.
- Browser-side image compression may vary by browser.
- GitHub API rate limits may affect heavy usage.
- PR status/check APIs may need extra token permissions.
- Hard delete should remain rare and heavily guarded.

## Recommended First Build

Start with Phase 1 only.

Do not build the editor until the auth gate, permission model, and admin shell are proven locally.
