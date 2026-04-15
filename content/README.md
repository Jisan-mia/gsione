# Content workflow

The site reads editorial content from markdown files in this directory.

## Blog posts

Create a new file in `content/articles/your-slug.md` with frontmatter like this:

```md
---
title: Example title
excerpt: Short summary for cards and metadata.
category: Cybersecurity
author: Author Name
authorRole: Researcher at GSi
publishedAt: 2026-03-10
sourceLabel: GSi LinkedIn
sourceUrl: https://example.com/post
featured: false
tags:
  - Example
  - Policy
---

# Article heading

Write the article in markdown.
```

`publishedAt` is optional. If it is omitted, the site shows `Undated`.

## Training pages

Create a new file in `content/training/your-slug.md` with frontmatter like this:

```md
---
title: Programme title
summary: One-paragraph overview for cards and metadata.
level: Executive
duration: Half-day to multi-session
format: In-person or online
featured: false
audience:
  - Public-sector leaders
focusAreas:
  - AI governance
outcomes:
  - Practical outcome one
---

# Programme overview

Use markdown for modules, delivery notes, and case studies.
```

The page generator will pick up new files automatically.


## Editorial pull request workflow

- Create or update Markdown on a branch, not on `main`.
- Open a draft pull request with the matching content PR template.
- Wait for the content validation workflow to check content paths and required frontmatter.
- Mark the pull request ready for review when the content is editorially ready.
- Maintainers merge approved pull requests to `main` to publish them.
