# Napkin

## Corrections
| Date | Source | What Went Wrong | What To Do Instead |
|------|--------|----------------|-------------------|
| 2026-03-10 | self | Assumed the repo already had `.claude/napkin.md` because the skill is always active | Check for the file first and create it immediately when missing |
| 2026-03-10 | self | Tried to extract the LinkedIn PDF before checking available PDF tooling | Fall back to founder-supplied markdown or install a parser only if the PDF adds unique missing data |
| 2026-03-10 | self | Used unquoted YAML frontmatter for a title containing a colon, which broke markdown parsing during build | Quote YAML values that contain colons or other ambiguous punctuation |
| 2026-03-10 | self | Initialized theme state through `setState` inside an effect, which tripped the React lint rule | Read the initial DOM-backed theme inside the `useState` initializer when possible |

## User Preferences
- Prefer TypeScript for new code, spaces for indentation, single quotes, camelCase.
- Wants constructive pushback and tasteful emoji use in responses, but not in code.
- Wants the site content grounded in provided source material rather than generic AI marketing copy.

## Patterns That Work
- Start content-heavy website work by auditing the source documents first, then map them against the rendered pages.
- Replace fake brochure metrics and unsupported claims with source-backed descriptions or omit them entirely.
- Remove unused vulnerable packages when they are not part of the final architecture instead of carrying audit noise forward.
- For markdown-heavy publishing pages, explicit ReactMarkdown component styling is more reliable than hoping generic `prose` classes communicate enough structure on their own.
- Strip internal provenance language from public copy; a production website should not talk about “source files”, “archives”, or “founder-supplied” notes.
- When multiple leaders matter equally, avoid “primary profile plus small add-on card” layouts; use mirrored or parallel sections with equal visual weight.
- For portrait-led leadership sections, center both the crop and the content cards; top-cropping and uneven panel widths make the profiles feel misaligned even when the grid is technically correct.
- When a user wants a premium profile row, prefer one rounded parent surface around the whole composition; separate bordered cards inside the same row can make the layout feel fragmented.

## Patterns That Don't Work
- Assuming supporting repo memory files already exist.
- Treating homepage fragment URLs as real sitemap entries; only canonical pages should be indexed.

## Domain Notes
- This repo is a Next.js App Router site for Governance and Security Initiative (GSi).
- GSi is positioned as an independent think tank and training academy focused on governance, national security, cybersecurity, AI policy, and related public-interest issues.
- The founder is Asheer Shah; `gsi_details.md` contains founder-supplied biography and publication details.
- `info.md` contains aggregated organization and article/post content from public channels that should be treated as source material for rewriting site copy.
- The current implementation uses heavy client components, placeholder JSON content, fragment-based sitemap entries, and a localStorage-only theme toggle that causes first-load flicker.
- The repo currently has both `bun.lock` and `package-lock.json`; prefer minimal dependency churn and keep package manager changes deliberate.
