export const contentSections = [
  {
    id: "articles",
    directory: "content/articles",
    label: "section:articles",
    owners: ["@Jisan-mia"],
    contentTypeLabel: "type:new-content",
    fields: {
      title: { type: "string", required: true },
      excerpt: { type: "string", required: true },
      category: { type: "string", required: true },
      author: { type: "string", required: true },
      authorRole: { type: "string", required: true },
      publishedAt: { type: "date", required: false },
      sourceLabel: { type: "string", required: true },
      sourceUrl: { type: "url", required: false },
      featured: { type: "boolean", required: true },
      tags: { type: "string[]", required: true, minItems: 1 },
    },
  },
  {
    id: "training",
    directory: "content/training",
    label: "section:training",
    owners: ["@Jisan-mia"],
    contentTypeLabel: "type:new-content",
    fields: {
      title: { type: "string", required: true },
      summary: { type: "string", required: true },
      level: { type: "string", required: true },
      duration: { type: "string", required: true },
      format: { type: "string", required: true },
      publishedAt: { type: "date", required: false },
      featured: { type: "boolean", required: true },
      audience: { type: "string[]", required: true, minItems: 1 },
      focusAreas: { type: "string[]", required: true, minItems: 1 },
      outcomes: { type: "string[]", required: true, minItems: 1 },
    },
  },
];

export const workflowLabels = [
  {
    name: "state:draft",
    color: "C5DEF5",
    description: "Content pull request is still in draft.",
    autoManaged: true,
  },
  {
    name: "state:review",
    color: "F9D0C4",
    description: "Content pull request is ready for editorial review.",
    autoManaged: true,
  },
  {
    name: "state:approved",
    color: "C2E0C6",
    description: "Required review and checks passed; ready for publication scheduling.",
    autoManaged: true,
  },
  {
    name: "state:published",
    color: "0E8A16",
    description: "Content pull request has been merged and published.",
    autoManaged: true,
  },
  {
    name: "type:new-content",
    color: "5319E7",
    description: "Introduces new Markdown content.",
    autoManaged: true,
  },
  {
    name: "type:update",
    color: "1D76DB",
    description: "Updates existing Markdown content.",
    autoManaged: true,
  },
  {
    name: "type:correction",
    color: "FBCA04",
    description: "Correction to previously published content.",
    autoManaged: false,
  },
  {
    name: "section:articles",
    color: "B60205",
    description: "Changes affect article content in content/articles.",
    autoManaged: true,
  },
  {
    name: "section:training",
    color: "0E8A16",
    description: "Changes affect training content in content/training.",
    autoManaged: true,
  },
  {
    name: "needs:revision",
    color: "D93F0B",
    description: "Review feedback must be addressed before publication.",
    autoManaged: true,
  },
  {
    name: "blocked",
    color: "000000",
    description: "Maintainers have paused publication pending another dependency.",
    autoManaged: false,
  },
  {
    name: "ready:publish",
    color: "006B75",
    description: "Maintainers can merge when publication timing is approved.",
    autoManaged: true,
  },
];

export const autoManagedLabels = workflowLabels
  .filter((label) => label.autoManaged)
  .map((label) => label.name);

export function getSectionById(id) {
  return contentSections.find((section) => section.id === id);
}

export function getSectionForRelativePath(relativePath) {
  return contentSections.find((section) => {
    const prefix = `${section.directory}/`;
    return relativePath.startsWith(prefix);
  });
}

export function getExpectedMarkdownGlob(section) {
  return `${section.directory}/*.md`;
}
