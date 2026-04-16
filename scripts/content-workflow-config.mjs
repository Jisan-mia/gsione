export const contentSections = [
  {
    id: "articles",
    directory: "content/articles",
    owners: ["@Jisan-mia"],
    fields: {
      title: { type: "string", required: true },
      excerpt: { type: "string", required: true },
      category: { type: "string", required: true },
      author: { type: "string", required: true },
      authorRole: { type: "string", required: true },
      publishedAt: { type: "date", required: false },
      sourceLabel: { type: "string", required: false },
      sourceUrl: { type: "url", required: false },
      featured: { type: "boolean", required: true },
      tags: { type: "string[]", required: true, minItems: 1 },
    },
  },
  {
    id: "training",
    directory: "content/training",
    owners: ["@Jisan-mia"],
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
    name: "state:published",
    color: "0E8A16",
    description: "Content pull request has been merged and published.",
    autoManaged: true,
  },
];

export const retiredWorkflowLabelNames = [
  "state:approved",
  "type:new-content",
  "type:update",
  "type:correction",
  "section:articles",
  "section:training",
  "needs:revision",
  "blocked",
  "ready:publish",
];

export const autoManagedLabels = [
  ...new Set([
    ...workflowLabels.filter((label) => label.autoManaged).map((label) => label.name),
    ...retiredWorkflowLabelNames,
  ]),
];

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
