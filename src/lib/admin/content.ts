import { githubAdminConfig } from "@/lib/admin/github";

export type AdminContentSection =
  | "articles"
  | "analysis"
  | "podcast"
  | "training"
  | "team";

export type AdminDashboardSectionRoute =
  | "articles"
  | "analysis"
  | "podcasts"
  | "training"
  | "team"
  | "media"
  | "pull-requests"
  | "settings";

export type AdminContentStatus = "published" | "draft" | "archived";

export interface UploadedAssetDraft {
  name: string;
  path: string;
  alt: string;
  markdown: string;
  size: number;
  dataUrl: string;
}

export interface AdminContentItem {
  section: AdminContentSection;
  slug: string;
  path: string;
  sha: string;
  title: string;
  summary: string;
  status: AdminContentStatus;
  frontmatter: Record<string, unknown>;
  body: string;
  raw: string;
}

export interface AdminEditableContent {
  section: AdminContentSection;
  originalSlug?: string;
  slug: string;
  frontmatter: Record<string, unknown>;
  body: string;
}

export const adminSections: Array<{
  id: AdminContentSection;
  label: string;
  directory: string;
}> = [
  { id: "articles", label: "Articles", directory: "content/articles" },
  { id: "analysis", label: "Analysis", directory: "content/analysis" },
  { id: "podcast", label: "Podcasts", directory: "content/podcast" },
  { id: "training", label: "Training", directory: "content/training" },
  { id: "team", label: "Team", directory: "content/team" },
];

export const adminDashboardRoutes: Array<{
  route: AdminDashboardSectionRoute;
  label: string;
  section?: AdminContentSection;
}> = [
  { route: "articles", label: "Articles", section: "articles" },
  { route: "analysis", label: "Analysis", section: "analysis" },
  { route: "podcasts", label: "Podcasts", section: "podcast" },
  { route: "training", label: "Training", section: "training" },
  { route: "team", label: "Team", section: "team" },
  { route: "media", label: "Media" },
  { route: "pull-requests", label: "Pull Requests" },
  { route: "settings", label: "Settings" },
];

function getLocalTeamFallbackItems(): AdminContentItem[] {
  return [
  {
    section: "team",
    slug: "asheer-shah",
    path: "content/team/asheer-shah.md",
    sha: "local-asheer-shah",
    title: "Asheer Shah",
    summary: "Founder & Director",
    status: "published",
    frontmatter: normalizeFrontmatter("team", {
      name: "Asheer Shah",
      role: "Founder & Director",
      image: "/founder.jpg",
      imageAlt: "Asheer Shah",
      linkedin: "https://www.linkedin.com/in/asheer-shah",
      email: "asheer.gsi@gmail.com",
      sortOrder: 0,
      founder: true,
      status: "published",
      articles: [
        "Artificial Intelligence and Social Media Governance in Bangladesh",
        "Bot Warfare and the 13th National Elections",
      ],
      areas: ["Cybersecurity governance", "AI policy", "Emerging technology risk"],
    }),
    body: "Asheer Shah is the Founder and Director of the Governance and Security Initiative (GSi).",
    raw: "",
  },
  {
    section: "team",
    slug: "syeda-nafisa-anjum",
    path: "content/team/syeda-nafisa-anjum.md",
    sha: "local-syeda-nafisa-anjum",
    title: "Syeda Nafisa Anjum",
    summary: "Digital Security Researcher",
    status: "published",
    frontmatter: normalizeFrontmatter("team", {
      name: "Syeda Nafisa Anjum",
      role: "Digital Security Researcher",
      image: "/team-nafisa.jpeg",
      imageAlt: "Syeda Nafisa Anjum",
      sortOrder: 1,
      status: "published",
      articles: [
        "Connected but Not Protected: Bangladesh Data Ordinance Act 2025, Legal Loopholes and the Costs to Women",
        "Dhaka: A Killing Test Tube for Children - Hemayetpur Supplying the Poisonous Gas",
      ],
      areas: ["Digital violence", "Data protection", "Environmental governance"],
    }),
    body: "Syeda Nafisa Anjum is a Digital Security Researcher at GSi.",
    raw: "",
  },
  {
    section: "team",
    slug: "abul-kasem",
    path: "content/team/abul-kasem.md",
    sha: "local-abul-kasem",
    title: "Abul Kasem",
    summary: "Governance Researcher",
    status: "published",
    frontmatter: normalizeFrontmatter("team", {
      name: "Abul Kasem",
      role: "Governance Researcher",
      imageAlt: "Abul Kasem",
      sortOrder: 2,
      status: "published",
      articles: [
        "From Random Clicks to a Human Firewall: First-Order Defenses Against Phishing in Bangladesh",
      ],
      areas: ["Cybersecurity governance", "Urban environmental policy"],
    }),
    body: "Abul Kasem is a Governance Researcher at GSi.",
    raw: "",
  },
  {
    section: "team",
    slug: "nusrat-khan",
    path: "content/team/nusrat-khan.md",
    sha: "local-nusrat-khan",
    title: "Nusrat Khan",
    summary: "Cybersecurity Researcher",
    status: "published",
    frontmatter: normalizeFrontmatter("team", {
      name: "Nusrat Khan",
      role: "Cybersecurity Researcher",
      imageAlt: "Nusrat Khan",
      sortOrder: 3,
      status: "published",
      articles: [
        "Cyber Law and the Illusion of Protection: When Personal Data Is Leaked in Bangladesh, Who Is Accountable?",
      ],
      areas: ["Cyber law", "Data protection", "Corporate accountability"],
    }),
    body: "Nusrat Khan is a Cybersecurity Researcher at GSi.",
    raw: "",
  },
  {
    section: "team",
    slug: "md-atiquer-rahman",
    path: "content/team/md-atiquer-rahman.md",
    sha: "local-md-atiquer-rahman",
    title: "Md. Atiquer Rahman",
    summary: "Cyber Incident Analyst",
    status: "published",
    frontmatter: normalizeFrontmatter("team", {
      name: "Md. Atiquer Rahman",
      role: "Cyber Incident Analyst",
      imageAlt: "Md. Atiquer Rahman",
      sortOrder: 4,
      status: "published",
      articles: [
        "Steadfast Courier Data Leak Raises Fresh Cybersecurity Questions in Bangladesh",
        "Crypto at Sea: Iran's Reported Hormuz Tolls Could Change Global Trade",
      ],
      areas: ["Cyber incident analysis", "Digital risk", "Geopolitical security"],
    }),
    body: "Md. Atiquer Rahman is a Cyber Incident Analyst at GSi.",
    raw: "",
  },
  ];
}

const statusOptions: AdminContentStatus[] = ["published", "draft", "archived"];

function decodeBase64(value: string) {
  const binary = window.atob(value.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function encodeQuotedString(value: string) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function parseScalar(value: string): unknown {
  const trimmed = value.trim();

  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === '""' || trimmed === "''") return "";
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

export function parseMarkdownFile(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    return { frontmatter: {}, body: source };
  }

  const frontmatter: Record<string, unknown> = {};
  const lines = match[1].split(/\r?\n/);
  let activeArrayKey = "";

  for (const line of lines) {
    if (!line.trim()) continue;

    const arrayItem = line.match(/^\s+-\s*(.*)$/);
    if (arrayItem && activeArrayKey) {
      const current = frontmatter[activeArrayKey];
      frontmatter[activeArrayKey] = [
        ...(Array.isArray(current) ? current : []),
        parseScalar(arrayItem[1]),
      ];
      continue;
    }

    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!field) continue;

    const [, key, rawValue] = field;
    activeArrayKey = "";

    if (rawValue.trim() === "") {
      frontmatter[key] = [];
      activeArrayKey = key;
    } else {
      frontmatter[key] = parseScalar(rawValue);
    }
  }

  return { frontmatter, body: match[2].trim() };
}

export function stringifyMarkdownFile(content: AdminEditableContent) {
  const frontmatter = normalizeFrontmatter(content.section, content.frontmatter);
  const yaml = Object.entries(frontmatter)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length === 0) return `${key}: []`;

        return `${key}:\n${value
          .map((item) => `  - ${encodeQuotedString(String(item))}`)
          .join("\n")}`;
      }

      if (typeof value === "boolean" || typeof value === "number") {
        return `${key}: ${value}`;
      }

      return `${key}: ${encodeQuotedString(String(value))}`;
    })
    .join("\n");

  return `---\n${yaml}\n---\n\n${content.body.trim()}\n`;
}

function normalizeStatus(value: unknown): AdminContentStatus {
  return statusOptions.includes(value as AdminContentStatus)
    ? (value as AdminContentStatus)
    : "published";
}

function getTitle(section: AdminContentSection, frontmatter: Record<string, unknown>) {
  if (section === "team") return String(frontmatter.name || "Untitled team member");
  return String(frontmatter.title || "Untitled content");
}

function getSummary(section: AdminContentSection, frontmatter: Record<string, unknown>) {
  if (section === "training") return String(frontmatter.summary || "");
  if (section === "team") return String(frontmatter.role || "");
  if (section === "podcast") {
    return `${String(frontmatter.hostName || "Unknown host")} with ${String(
      frontmatter.guestName || "unknown guest",
    )}`;
  }

  return String(frontmatter.excerpt || "");
}

function normalizeStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function normalizeFrontmatter(
  section: AdminContentSection,
  frontmatter: Record<string, unknown>,
) {
  const status = normalizeStatus(frontmatter.status);

  if (section === "articles" || section === "analysis") {
    return {
      title: String(frontmatter.title || ""),
      excerpt: String(frontmatter.excerpt || ""),
      category: String(frontmatter.category || ""),
      author: String(frontmatter.author || ""),
      authorRole: String(frontmatter.authorRole || ""),
      publishedAt: String(frontmatter.publishedAt || ""),
      sourceLabel: String(frontmatter.sourceLabel || ""),
      sourceUrl: String(frontmatter.sourceUrl || ""),
      featured: Boolean(frontmatter.featured),
      tags: normalizeStringArray(frontmatter.tags),
      status,
    };
  }

  if (section === "podcast") {
    return {
      title: String(frontmatter.title || ""),
      publishedAt: String(frontmatter.publishedAt || ""),
      guestName: String(frontmatter.guestName || ""),
      hostName: String(frontmatter.hostName || ""),
      youtubeUrl: String(frontmatter.youtubeUrl || ""),
      status,
    };
  }

  if (section === "training") {
    return {
      title: String(frontmatter.title || ""),
      summary: String(frontmatter.summary || ""),
      level: String(frontmatter.level || ""),
      duration: String(frontmatter.duration || ""),
      format: String(frontmatter.format || ""),
      publishedAt: String(frontmatter.publishedAt || ""),
      featured: Boolean(frontmatter.featured),
      audience: normalizeStringArray(frontmatter.audience),
      focusAreas: normalizeStringArray(frontmatter.focusAreas),
      outcomes: normalizeStringArray(frontmatter.outcomes),
      status,
    };
  }

  return {
    name: String(frontmatter.name || ""),
    role: String(frontmatter.role || ""),
    image: String(frontmatter.image || ""),
    imageAlt: String(frontmatter.imageAlt || ""),
    linkedin: String(frontmatter.linkedin || ""),
    email: String(frontmatter.email || ""),
    sortOrder: Number(frontmatter.sortOrder || 1),
    founder: Boolean(frontmatter.founder),
    status,
    articles: normalizeStringArray(frontmatter.articles),
    areas: normalizeStringArray(frontmatter.areas),
  };
}

async function githubRequest<T>(token: string, path: string): Promise<T> {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub content request failed with ${response.status}.`);
  }

  return response.json() as Promise<T>;
}

function isMissingContentDirectory(error: unknown) {
  return error instanceof Error && error.message.includes("404");
}

export async function loadAdminContent(token: string) {
  const allItems = await Promise.all(
    adminSections.map(async (section) => {
      let files: Array<{ name: string; path: string; type: string; sha: string }>;

      try {
        files = await githubRequest<
          Array<{ name: string; path: string; type: string; sha: string }>
        >(
          token,
          `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/contents/${section.directory}?ref=main`,
        );
      } catch (error) {
        if (isMissingContentDirectory(error)) {
          if (section.id === "team") {
            return getLocalTeamFallbackItems();
          }

          return [];
        }

        throw error;
      }

      const markdownFiles = files.filter(
        (file) => file.type === "file" && file.name.endsWith(".md"),
      );

      return Promise.all(
        markdownFiles.map(async (file) => {
          const detail = await githubRequest<{
            content: string;
            encoding: string;
            sha: string;
          }>(
            token,
            `/repos/${githubAdminConfig.owner}/${githubAdminConfig.repo}/contents/${file.path}?ref=main`,
          );
          const raw =
            detail.encoding === "base64" ? decodeBase64(detail.content) : detail.content;
          const parsed = parseMarkdownFile(raw);
          const slug = file.name.replace(/\.md$/, "");
          const normalized = normalizeFrontmatter(section.id, parsed.frontmatter);

          return {
            section: section.id,
            slug,
            path: file.path,
            sha: detail.sha,
            title: getTitle(section.id, normalized),
            summary: getSummary(section.id, normalized),
            status: normalizeStatus(normalized.status),
            frontmatter: normalized,
            body: parsed.body,
            raw,
          } satisfies AdminContentItem;
        }),
      );
    }),
  );

  return allItems.flat().sort((left, right) => left.title.localeCompare(right.title));
}

export function slugifyContentTitle(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function getContentPath(section: AdminContentSection, slug: string) {
  const directory = adminSections.find((item) => item.id === section)?.directory;
  return `${directory}/${slug}.md`;
}

export function getNewContentTemplate(section: AdminContentSection): AdminEditableContent {
  const today = new Date().toISOString().slice(0, 10);
  const frontmatter =
    section === "team"
      ? normalizeFrontmatter(section, {
          name: "New team member",
          role: "Researcher",
          imageAlt: "New team member",
          sortOrder: 10,
          founder: false,
          status: "draft",
          articles: [],
          areas: ["Research"],
        })
      : normalizeFrontmatter(section, {
          title: `New ${section === "podcast" ? "podcast episode" : section}`,
          publishedAt: today,
          featured: false,
          status: "draft",
          tags: ["GSi"],
          audience: ["Institutional teams"],
          focusAreas: ["Governance"],
          outcomes: ["Clarify core concepts"],
        });

  return {
    section,
    slug: slugifyContentTitle(getTitle(section, frontmatter)),
    frontmatter,
    body: `# ${getTitle(section, frontmatter)}\n\nWrite the content here.`,
  };
}
