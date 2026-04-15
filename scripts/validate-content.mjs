import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { contentSections, getSectionForRelativePath, getExpectedMarkdownGlob } from "./content-workflow-config.mjs";

const rootDirectory = process.cwd();
const sectionRoots = new Set(contentSections.map((section) => section.directory));

function normalizeRelativePath(filePath) {
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(rootDirectory, filePath);
  return path.relative(rootDirectory, absolutePath).split(path.sep).join("/");
}

function listRegisteredFiles() {
  return contentSections.flatMap((section) => {
    const absoluteDirectory = path.join(rootDirectory, section.directory);
    if (!fs.existsSync(absoluteDirectory)) {
      return [];
    }

    return fs
      .readdirSync(absoluteDirectory)
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => `${section.directory}/${fileName}`);
  });
}

function getCandidateFiles() {
  const cliFiles = process.argv.slice(2);

  if (cliFiles.length > 0) {
    return cliFiles.map(normalizeRelativePath);
  }

  if (process.env.CONTENT_FILES) {
    return process.env.CONTENT_FILES.split(/\r?\n/)
      .map((filePath) => filePath.trim())
      .filter(Boolean)
      .map(normalizeRelativePath);
  }

  return listRegisteredFiles();
}

function isValidDateString(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    return false;
  }

  return date.toISOString().slice(0, 10) === value;
}

function validateType(fieldName, value, rule, relativePath, errors) {
  if (value === undefined || value === null) {
    if (rule.required) {
      errors.push(`${relativePath}: missing required frontmatter field \`${fieldName}\`.`);
    }
    return;
  }

  switch (rule.type) {
    case "string": {
      if (typeof value !== "string" || value.trim().length === 0) {
        errors.push(`${relativePath}: frontmatter field \`${fieldName}\` must be a non-empty string.`);
      }
      return;
    }
    case "boolean": {
      if (typeof value !== "boolean") {
        errors.push(`${relativePath}: frontmatter field \`${fieldName}\` must be a boolean.`);
      }
      return;
    }
    case "date": {
      if (value instanceof Date) {
        if (Number.isNaN(value.getTime())) {
          errors.push(`${relativePath}: frontmatter field \`${fieldName}\` must be a valid date.`);
        }
        return;
      }

      if (typeof value !== "string" || !isValidDateString(value)) {
        errors.push(`${relativePath}: frontmatter field \`${fieldName}\` must use a valid YYYY-MM-DD date.`);
      }
      return;
    }
    case "url": {
      if (typeof value !== "string") {
        errors.push(`${relativePath}: frontmatter field \`${fieldName}\` must be a URL string.`);
        return;
      }

      try {
        const parsed = new URL(value);
        if (!["http:", "https:"].includes(parsed.protocol)) {
          throw new Error("Invalid protocol");
        }
      } catch {
        errors.push(`${relativePath}: frontmatter field \`${fieldName}\` must be a valid http or https URL.`);
      }
      return;
    }
    case "string[]": {
      if (!Array.isArray(value)) {
        errors.push(`${relativePath}: frontmatter field \`${fieldName}\` must be an array.`);
        return;
      }

      const minItems = rule.minItems ?? 0;
      if (value.length < minItems) {
        errors.push(`${relativePath}: frontmatter field \`${fieldName}\` must contain at least ${minItems} item(s).`);
        return;
      }

      if (value.some((item) => typeof item !== "string" || item.trim().length === 0)) {
        errors.push(`${relativePath}: frontmatter field \`${fieldName}\` must contain only non-empty strings.`);
      }
      return;
    }
    default:
      errors.push(`${relativePath}: unsupported validation rule for \`${fieldName}\`.`);
  }
}

function validateFile(relativePath, errors) {
  const absolutePath = path.join(rootDirectory, relativePath);

  if (!fs.existsSync(absolutePath)) {
    return;
  }

  if (!relativePath.startsWith("content/")) {
    return;
  }

  if (path.extname(relativePath) !== ".md") {
    errors.push(`${relativePath}: content changes must use Markdown files with a .md extension.`);
    return;
  }

  const pathSegments = relativePath.split("/");
  if (pathSegments.length !== 3) {
    errors.push(`${relativePath}: Markdown content must live directly under content/<section>/filename.md.`);
    return;
  }

  const [contentDirectory, sectionDirectory, fileName] = pathSegments;
  if (contentDirectory !== "content") {
    errors.push(`${relativePath}: unexpected content path.`);
    return;
  }

  const section = getSectionForRelativePath(relativePath);
  if (!section) {
    errors.push(`${relativePath}: section \`${sectionDirectory}\` is not registered. Add it to scripts/content-workflow-config.mjs before merging content there.`);
    return;
  }

  const source = fs.readFileSync(absolutePath, "utf8");
  const parsed = matter(source);
  const frontmatter = parsed.data;

  if (parsed.content.trim().length === 0) {
    errors.push(`${relativePath}: Markdown body cannot be empty.`);
  }

  for (const [fieldName, rule] of Object.entries(section.fields)) {
    validateType(fieldName, frontmatter[fieldName], rule, relativePath, errors);
  }
}

function validateRepositoryStructure(errors) {
  const absoluteContentDirectory = path.join(rootDirectory, "content");
  if (!fs.existsSync(absoluteContentDirectory)) {
    errors.push("Repository is missing the content directory.");
    return;
  }

  for (const entry of fs.readdirSync(absoluteContentDirectory, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }

    const relativeDirectory = `content/${entry.name}`;
    if (!sectionRoots.has(relativeDirectory)) {
      errors.push(`${relativeDirectory}: register this section in scripts/content-workflow-config.mjs before adding Markdown content. Existing sections: ${contentSections.map((section) => getExpectedMarkdownGlob(section)).join(", ")}.`);
    }
  }
}

function isSectionBackedContentPath(filePath) {
  if (!filePath.startsWith("content/")) {
    return false;
  }

  const pathSegments = filePath.split("/");
  return pathSegments.length === 3;
}

const candidateFiles = [...new Set(getCandidateFiles())];
const contentFiles = candidateFiles.filter(isSectionBackedContentPath);
const errors = [];

validateRepositoryStructure(errors);

if (contentFiles.length === 0) {
  console.log("No Markdown content files to validate.");
  process.exit(0);
}

for (const relativePath of contentFiles) {
  validateFile(relativePath, errors);
}

if (errors.length > 0) {
  console.error("Content validation failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Validated ${contentFiles.length} Markdown content file(s) across ${contentSections.length} registered section(s).`);
