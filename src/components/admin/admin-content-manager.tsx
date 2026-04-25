"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ImagePlus,
  Loader2,
  Rocket,
  Save,
  Trash2,
  Type,
} from "lucide-react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { Markdown } from "@/components/site/markdown";
import {
  adminSections,
  getContentPath,
  getNewContentTemplate,
  loadAdminContent,
  normalizeFrontmatter,
  slugifyContentTitle,
  type AdminContentItem,
  type AdminContentSection,
  type AdminEditableContent,
  type UploadedAssetDraft,
} from "@/lib/admin/content";
import type { VerifiedAdminSession } from "@/lib/admin/github";
import {
  getDashboardBranchName,
  discardDashboardPullRequest,
  loadDashboardPullRequests,
  publishDashboardPullRequest,
  saveDashboardDraft,
  type AdminPullRequestStatus,
} from "@/lib/admin/workflow";
import { cn } from "@/lib/utils";

interface TeamOption {
  name: string;
  role: string;
}

const fieldLabels: Record<string, string> = {
  title: "Title",
  excerpt: "Excerpt",
  category: "Category",
  author: "Author",
  authorRole: "Author role",
  publishedAt: "Date",
  sourceLabel: "Source label",
  sourceUrl: "Source URL",
  featured: "Featured",
  tags: "Tags",
  guestName: "Guest",
  hostName: "Host",
  youtubeUrl: "YouTube URL",
  summary: "Summary",
  level: "Level",
  duration: "Duration",
  format: "Format",
  audience: "Audience",
  focusAreas: "Focus areas",
  outcomes: "Outcomes",
  name: "Name",
  role: "Role",
  image: "Image",
  imageAlt: "Image alt",
  linkedin: "LinkedIn",
  email: "Email",
  sortOrder: "Order",
  founder: "Founder",
  articles: "Articles",
  areas: "Areas",
  status: "Status",
};

const arrayFields = new Set([
  "tags",
  "audience",
  "focusAreas",
  "outcomes",
  "articles",
  "areas",
]);
const longTextFields = new Set(["excerpt", "summary"]);
const statusOptions = ["published", "draft", "archived"];

/** react-select theme overrides for dark admin dashboard */
const selectClassNames = {
  control: (state: { isFocused: boolean }) =>
    cn(
      "!min-h-[2.25rem] !rounded-md !border !bg-background !text-sm !shadow-none !cursor-pointer",
      state.isFocused
        ? "!border-primary !ring-2 !ring-primary/10"
        : "!border-border/60",
    ),
  menu: () =>
    "!rounded-md !border !border-border/60 !bg-card !shadow-lg !z-50 !mt-1",
  menuList: () => "!py-1",
  option: (state: { isFocused: boolean; isSelected: boolean }) =>
    cn(
      "!text-sm !px-3 !py-2 !cursor-pointer",
      state.isSelected
        ? "!bg-primary/10 !text-primary"
        : state.isFocused
          ? "!bg-muted/60 !text-foreground"
          : "!text-foreground",
    ),
  singleValue: () => "!text-sm !text-foreground",
  placeholder: () => "!text-sm !text-muted-foreground/50",
  input: () => "!text-sm !text-foreground",
  indicatorSeparator: () => "!bg-border/40",
  dropdownIndicator: () => "!text-muted-foreground/50 !p-1.5",
  clearIndicator: () => "!text-muted-foreground/50 !p-1",
  multiValue: () => "!rounded !bg-primary/10 !text-primary",
  multiValueLabel: () => "!text-xs !text-primary !px-1.5 !py-0.5",
  multiValueRemove: () =>
    "!text-primary/60 hover:!bg-primary/20 hover:!text-primary !rounded-r",
  valueContainer: () => "!px-2.5 !gap-1",
  noOptionsMessage: () => "!text-sm !text-muted-foreground/60",
};

const selectStyles = {
  control: (base: Record<string, unknown>) => ({
    ...base,
    transition: "border-color 0.15s, box-shadow 0.15s",
  }),
  menuPortal: (base: Record<string, unknown>) => ({ ...base, zIndex: 9999 }),
};

function getDisplayTitle(content: AdminEditableContent) {
  if (content.section === "team") {
    return String(content.frontmatter.name || "Untitled team member");
  }
  return String(content.frontmatter.title || "Untitled content");
}

function getRequiredFields(section: AdminContentSection) {
  if (section === "team") return new Set(["name", "role", "status"]);
  if (section === "podcast") {
    return new Set([
      "title",
      "publishedAt",
      "hostName",
      "youtubeUrl",
      "status",
    ]);
  }
  return new Set(["title", "excerpt", "category", "publishedAt", "status"]);
}

function getFieldGroups(section: AdminContentSection) {
  if (section === "articles" || section === "analysis") {
    return [
      {
        title: "Basics",
        fields: ["title", "category", "publishedAt", "status"],
      },
      {
        title: "Description",
        fields: ["excerpt"],
      },
      {
        title: "Attribution",
        fields: ["author", "authorRole", "sourceLabel", "sourceUrl"],
      },
      {
        title: "Display",
        fields: ["featured", "tags"],
      },
    ];
  }

  if (section === "podcast") {
    return [
      {
        title: "Episode",
        fields: ["title", "publishedAt", "status"],
      },
      {
        title: "People and media",
        fields: ["hostName", "guestName", "youtubeUrl"],
      },
    ];
  }

  if (section === "training") {
    return [
      {
        title: "Basics",
        fields: [
          "title",
          "level",
          "duration",
          "format",
          "publishedAt",
          "status",
        ],
      },
      {
        title: "Description",
        fields: ["summary"],
      },
      {
        title: "Programme detail",
        fields: ["featured", "audience", "focusAreas", "outcomes"],
      },
    ];
  }

  return [
    {
      title: "Profile",
      fields: ["name", "role", "status", "sortOrder", "founder"],
    },
  ];
}

function toEditorContent(item: AdminContentItem): AdminEditableContent {
  return {
    section: item.section,
    originalSlug: item.slug,
    slug: item.slug,
    frontmatter: item.frontmatter,
    body: item.body,
  };
}

function getDraftStorageKey(section: AdminContentSection, slug: string) {
  return `gsi-dashboard-draft:${section}:${slug}`;
}

async function fileToImage(file: File) {
  const image = new Image();
  const url = URL.createObjectURL(file);

  try {
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Unable to read this image."));
      image.src = url;
    });

    return image;
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function convertImageToWebp({
  file,
  slug,
  alt,
  maxEdge,
}: {
  file: File;
  slug: string;
  alt: string;
  maxEdge: number;
}): Promise<UploadedAssetDraft> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    throw new Error("Only JPG, PNG, and WebP images are supported.");
  }

  if (file.size > 8 * 1024 * 1024) {
    throw new Error("Image is too large. Use an image under 8 MB.");
  }

  if (!alt.trim()) {
    throw new Error("Alt text is required.");
  }

  const image = await fileToImage(file);
  const scale = Math.min(1, maxEdge / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  if (!context) {
    throw new Error("This browser cannot process image uploads.");
  }

  context.drawImage(image, 0, 0, width, height);
  const dataUrl = canvas.toDataURL("image/webp", 0.82);
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const shortId = Math.random().toString(36).slice(2, 8);
  const safeSlug = slugifyContentTitle(
    slug || file.name.replace(/\.[^.]+$/, ""),
  );
  const path = `/uploads/${year}/${month}/${safeSlug}-${shortId}.webp`;

  return {
    name: file.name,
    path,
    alt: alt.trim(),
    markdown: `![${alt.trim()}](${path})`,
    size: Math.round((dataUrl.length * 3) / 4),
    dataUrl,
  };
}

function validateContent(
  content: AdminEditableContent,
  assets: UploadedAssetDraft[],
  teamOptions: TeamOption[],
) {
  const errors: string[] = [];
  const title = getDisplayTitle(content);

  if (!title.trim() || title.startsWith("Untitled")) {
    errors.push(
      content.section === "team" ? "Name is required." : "Title is required.",
    );
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(content.slug)) {
    errors.push("Slug must use lowercase words separated by hyphens.");
  }

  const publishedAt = String(content.frontmatter.publishedAt || "");

  if (publishedAt && !/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) {
    errors.push("Date must use YYYY-MM-DD.");
  }

  if (
    content.section === "podcast" &&
    !String(content.frontmatter.youtubeUrl || "")
  ) {
    errors.push("Podcast YouTube URL is required.");
  }

  if (
    (content.section === "articles" || content.section === "analysis") &&
    teamOptions.length > 0
  ) {
    const author = String(content.frontmatter.author || "");
    const teamNames = new Set(teamOptions.map((option) => option.name));

    if (!teamNames.has(author)) {
      errors.push("Author must be selected from the team list.");
    }
  }

  if (content.section === "team" && String(content.frontmatter.image || "")) {
    if (!String(content.frontmatter.imageAlt || "").trim()) {
      errors.push("Team image alt text is required.");
    }
  }

  if (!content.body.trim()) {
    errors.push("Markdown body is required.");
  }

  const markdownImages = Array.from(
    content.body.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g),
  );

  for (const image of markdownImages) {
    const alt = image[1].trim();
    const path = image[2].trim();

    if (!alt) errors.push("Every markdown image needs alt text.");
    if (path.startsWith("/uploads/") && !path.endsWith(".webp")) {
      errors.push("Uploaded image paths must use WebP.");
    }
  }

  for (const asset of assets) {
    if (!asset.alt.trim()) errors.push(`${asset.name} is missing alt text.`);
    if (!asset.path.endsWith(".webp"))
      errors.push(`${asset.name} must be WebP.`);
  }

  return Array.from(new Set(errors));
}

function EditorField({
  name,
  value,
  onChange,
  required = false,
  teamOptions = [],
}: {
  name: string;
  value: unknown;
  onChange: (value: unknown) => void;
  required?: boolean;
  teamOptions?: TeamOption[];
}) {
  const label = fieldLabels[name] || name;
  const inputBase =
    "mt-1 h-9 w-full rounded-md border border-border/60 bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/10";
  const labelNode = (
    <span className="text-[0.6875rem] font-medium text-muted-foreground">
      {label}
      {required ? (
        <span className="ml-0.5 text-destructive" aria-hidden="true">
          *
        </span>
      ) : null}
      {required ? <span className="sr-only"> (required)</span> : null}
    </span>
  );

  // Author / Host use react-select single from team list
  if (name === "author" || name === "hostName") {
    const currentValue = String(value || "");
    const selectOptions = teamOptions.map((opt) => ({
      value: opt.name,
      label: opt.name,
      role: opt.role,
    }));
    const selectedOption =
      selectOptions.find((opt) => opt.value === currentValue) || null;

    return (
      <div className="min-w-0">
        {labelNode}
        <div className="mt-1">
          <Select
            value={selectedOption}
            onChange={(opt) => {
              const val = opt?.value || "";
              onChange(val);
              if (name === "author" && opt?.role) {
                window.dispatchEvent(
                  new CustomEvent("gsi-dashboard-author-role", {
                    detail: opt.role,
                  }),
                );
              }
            }}
            options={selectOptions}
            isClearable
            placeholder="Select team member"
            classNames={selectClassNames}
            styles={selectStyles}
            menuPortalTarget={
              typeof document !== "undefined" ? document.body : null
            }
          />
        </div>
      </div>
    );
  }

  // Guest is a plain text input (not from team list)
  if (name === "guestName") {
    return (
      <label className="block min-w-0">
        {labelNode}
        <input
          type="text"
          value={String(value || "")}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter guest name"
          className={inputBase}
        />
      </label>
    );
  }

  // Status uses react-select single
  if (name === "status") {
    const currentValue = String(value || "published");
    const statusSelectOptions = statusOptions.map((opt) => ({
      value: opt,
      label: opt,
    }));
    const selectedStatus =
      statusSelectOptions.find((opt) => opt.value === currentValue) || null;

    return (
      <div className="min-w-0">
        {labelNode}
        <div className="mt-1">
          <Select
            value={selectedStatus}
            onChange={(opt) => onChange(opt?.value || "published")}
            options={statusSelectOptions}
            classNames={selectClassNames}
            styles={selectStyles}
            menuPortalTarget={
              typeof document !== "undefined" ? document.body : null
            }
          />
        </div>
      </div>
    );
  }

  // Level uses react-select single
  if (name === "level") {
    const levelOptions = [
      { value: "Introductory", label: "Introductory" },
      { value: "Intermediate", label: "Intermediate" },
      { value: "Advanced", label: "Advanced" },
    ];
    const currentLevel = String(value || "");
    const selectedLevel =
      levelOptions.find((opt) => opt.value === currentLevel) ||
      (currentLevel ? { value: currentLevel, label: currentLevel } : null);

    return (
      <div className="min-w-0">
        {labelNode}
        <div className="mt-1">
          <Select
            value={selectedLevel}
            onChange={(opt) => onChange(opt?.value || "")}
            options={levelOptions}
            isClearable
            placeholder="Select level"
            classNames={selectClassNames}
            styles={selectStyles}
            menuPortalTarget={
              typeof document !== "undefined" ? document.body : null
            }
          />
        </div>
      </div>
    );
  }

  // Format uses react-select single
  if (name === "format") {
    const formatOptions = [
      { value: "Workshop", label: "Workshop" },
      { value: "Seminar", label: "Seminar" },
      { value: "Briefing", label: "Briefing" },
      { value: "Online", label: "Online" },
      { value: "Hybrid", label: "Hybrid" },
    ];
    const currentFormat = String(value || "");
    const selectedFormat =
      formatOptions.find((opt) => opt.value === currentFormat) ||
      (currentFormat ? { value: currentFormat, label: currentFormat } : null);

    return (
      <div className="min-w-0">
        {labelNode}
        <div className="mt-1">
          <Select
            value={selectedFormat}
            onChange={(opt) => onChange(opt?.value || "")}
            options={formatOptions}
            isClearable
            placeholder="Select format"
            classNames={selectClassNames}
            styles={selectStyles}
            menuPortalTarget={
              typeof document !== "undefined" ? document.body : null
            }
          />
        </div>
      </div>
    );
  }

  // Boolean toggle switch
  if (typeof value === "boolean") {
    return (
      <div className="min-w-0 mt-[calc(0.6875rem+0.25rem)]">
        <div
          role="switch"
          aria-checked={value}
          aria-label={label}
          tabIndex={0}
          onClick={() => onChange(!value)}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              onChange(!value);
            }
          }}
          className="flex h-9 cursor-pointer items-center justify-between gap-3 rounded-md border border-border/60 bg-background px-3"
        >
          <span className="text-[0.6875rem] font-medium text-muted-foreground">
            {label}
          </span>
          <div
            className={cn(
              "relative h-5 w-9 shrink-0 rounded-full transition-colors",
              value ? "bg-primary" : "bg-border",
            )}
          >
            <div
              className={cn(
                "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
                value ? "translate-x-4" : "translate-x-0.5",
              )}
            />
          </div>
        </div>
      </div>
    );
  }

  // Array fields (tags, audience, etc.) use CreatableSelect multi
  if (arrayFields.has(name)) {
    const arrayValue = Array.isArray(value) ? value : [];
    const selectedValues = arrayValue.map((item: string) => ({
      value: item,
      label: item,
    }));

    return (
      <div className="col-span-full min-w-0">
        {labelNode}
        <div className="mt-1">
          <CreatableSelect
            isMulti
            value={selectedValues}
            onChange={(opts) =>
              onChange(opts.map((opt: { value: string }) => opt.value))
            }
            placeholder={`Type and press Enter to add ${label.toLowerCase()}`}
            classNames={selectClassNames}
            styles={selectStyles}
            menuPortalTarget={
              typeof document !== "undefined" ? document.body : null
            }
          />
        </div>
      </div>
    );
  }

  // Long text fields (excerpt, summary) - full width
  if (longTextFields.has(name)) {
    return (
      <label className="col-span-full block min-w-0">
        {labelNode}
        <textarea
          value={String(value || "")}
          onChange={(event) => onChange(event.target.value)}
          rows={3}
          className="mt-1 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      </label>
    );
  }

  // Default text / date / number input
  return (
    <label className="block min-w-0">
      {labelNode}
      <input
        type={
          name === "publishedAt"
            ? "date"
            : name === "sortOrder"
              ? "number"
              : "text"
        }
        value={String(value || "")}
        onChange={(event) =>
          onChange(
            name === "sortOrder"
              ? Number(event.target.value)
              : event.target.value,
          )
        }
        className={inputBase}
      />
    </label>
  );
}

export function AdminContentManager({
  session,
  section,
  mode,
  slug,
}: {
  session: VerifiedAdminSession;
  section: AdminContentSection;
  mode: "create" | "edit";
  slug?: string;
}) {
  const [editorContent, setEditorContent] =
    useState<AdminEditableContent | null>(null);
  const [teamOptions, setTeamOptions] = useState<TeamOption[]>([]);
  const [assets, setAssets] = useState<UploadedAssetDraft[]>([]);
  const [imageAlt, setImageAlt] = useState("");
  const [activePr, setActivePr] = useState<AdminPullRequestStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDiscarding, setIsDiscarding] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sectionLabel =
    adminSections.find((sectionItem) => sectionItem.id === section)?.label ||
    "Content";
  const requiredFields = getRequiredFields(section);

  async function loadContent() {
    setIsLoading(true);
    setError("");

    try {
      const loadedItems = await loadAdminContent(session.token);
      const nextTeamOptions = loadedItems
        .filter((item) => item.section === "team")
        .map((item) => ({
          name: String(item.frontmatter.name || item.title),
          role: String(item.frontmatter.role || item.summary),
        }))
        .filter((item) => item.name);

      setTeamOptions(nextTeamOptions);

      if (mode === "create") {
        setEditorContent(getNewContentTemplate(section));
      } else {
        const selectedItem = loadedItems.find(
          (item) => item.section === section && item.slug === slug,
        );

        setEditorContent(
          selectedItem
            ? toEditorContent(selectedItem)
            : getNewContentTemplate(section),
        );
      }
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load content.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadContent();
  }, [mode, section, session.token, slug]);

  useEffect(() => {
    function handleRoleUpdate(event: Event) {
      const role = (event as CustomEvent<string>).detail;
      if (role) updateFrontmatter("authorRole", role);
    }

    window.addEventListener("gsi-dashboard-author-role", handleRoleUpdate);

    return () => {
      window.removeEventListener("gsi-dashboard-author-role", handleRoleUpdate);
    };
  });

  useEffect(() => {
    if (!editorContent) return;

    window.localStorage.setItem(
      getDraftStorageKey(editorContent.section, editorContent.slug),
      JSON.stringify(editorContent),
    );
  }, [editorContent]);

  useEffect(() => {
    let isMounted = true;

    async function loadPrLock() {
      if (!editorContent) return;

      try {
        const prs = await loadDashboardPullRequests(session.token);
        const branch = getDashboardBranchName(
          editorContent.section,
          editorContent.slug,
        );
        const matchingPr = prs.find((pr) => pr.headRef === branch) || null;
        if (isMounted) setActivePr(matchingPr);
      } catch {
        if (isMounted) setActivePr(null);
      }
    }

    void loadPrLock();

    return () => {
      isMounted = false;
    };
  }, [editorContent?.section, editorContent?.slug, session.token]);

  const validationErrors = useMemo(
    () =>
      editorContent ? validateContent(editorContent, assets, teamOptions) : [],
    [assets, editorContent, teamOptions],
  );

  const generatedPath = editorContent
    ? getContentPath(editorContent.section, editorContent.slug)
    : "";

  function updateFrontmatter(name: string, value: unknown) {
    setEditorContent((current) => {
      if (!current) return current;
      const frontmatter = normalizeFrontmatter(current.section, {
        ...current.frontmatter,
        [name]: value,
      });

      return {
        ...current,
        slug:
          name === "title" || name === "name"
            ? slugifyContentTitle(String(value))
            : current.slug,
        frontmatter,
      };
    });
  }

  function recoverLocalDraft() {
    if (!editorContent) return;

    const stored = window.localStorage.getItem(
      getDraftStorageKey(editorContent.section, editorContent.slug),
    );

    if (!stored) return;

    try {
      setEditorContent(JSON.parse(stored) as AdminEditableContent);
      setStatusMessage("Recovered local draft.");
    } catch {
      setError("Unable to recover local draft.");
    }
  }

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !editorContent) return;

    setIsProcessingImage(true);
    setError("");

    try {
      const asset = await convertImageToWebp({
        file,
        slug: editorContent.slug,
        alt: imageAlt,
        maxEdge: editorContent.section === "team" ? 800 : 1600,
      });
      setAssets((current) => [asset, ...current]);
      setEditorContent((current) =>
        current?.section === "team"
          ? {
              ...current,
              frontmatter: normalizeFrontmatter(current.section, {
                ...current.frontmatter,
                image: asset.path,
                imageAlt: asset.alt,
              }),
            }
          : current
            ? {
                ...current,
                body: `${current.body.trim()}\n\n${asset.markdown}`,
              }
            : current,
      );
      setImageAlt("");
      setStatusMessage("Image prepared for the next PR save.");
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Image upload failed.",
      );
    } finally {
      setIsProcessingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSaveDraft() {
    if (!editorContent || validationErrors.length) return;

    setIsSaving(true);
    setError("");
    setStatusMessage("");

    try {
      const result = await saveDashboardDraft({
        token: session.token,
        content: editorContent,
        assets,
      });
      setActivePr(result.pullRequest);
      setAssets([]);
      setEditorContent((current) =>
        current
          ? {
              ...current,
              originalSlug: current.slug,
            }
          : current,
      );
      setStatusMessage("Draft saved successfully.");
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Unable to save draft.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handlePublish() {
    if (!activePr) return;

    const confirmed = window.confirm(
      "Publish this content? It will go live on the website.",
    );

    if (!confirmed) return;

    setIsPublishing(true);
    setError("");
    setStatusMessage("");

    try {
      const nextPr = await publishDashboardPullRequest({
        token: session.token,
        role: session.role,
        pullNumber: activePr.number,
      });
      setActivePr(nextPr);
      setStatusMessage("Publish request completed.");
    } catch (publishError) {
      setError(
        publishError instanceof Error
          ? publishError.message
          : "Unable to publish PR.",
      );
    } finally {
      setIsPublishing(false);
    }
  }

  async function handleDiscard() {
    if (!activePr) return;

    const confirmed = window.confirm(
      "Discard this draft? This will permanently remove the pending update.",
    );

    if (!confirmed) return;

    setIsDiscarding(true);
    setError("");
    setStatusMessage("");

    try {
      await discardDashboardPullRequest({
        token: session.token,
        pullNumber: activePr.number,
      });
      setActivePr(null);
      setStatusMessage("Draft discarded.");
    } catch (discardError) {
      setError(
        discardError instanceof Error
          ? discardError.message
          : "Unable to discard.",
      );
    } finally {
      setIsDiscarding(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
          </div>
          <p className="text-sm text-muted-foreground">Loading content</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-384 space-y-4">
      {/* Toolbar */}
      <section className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {mode === "create"
              ? `New ${sectionLabel}`
              : editorContent
                ? getDisplayTitle(editorContent)
                : `${sectionLabel} editor`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={!editorContent || validationErrors.length > 0 || isSaving}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-foreground px-4 text-xs font-semibold text-background shadow-sm transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSaving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            Save draft
          </button>
          {session.role === "superAdmin" &&
          activePr?.checksPassing &&
          !activePr.mergeBlockedReason ? (
            <button
              type="button"
              onClick={handlePublish}
              disabled={isPublishing}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPublishing ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Rocket className="h-3.5 w-3.5" />
              )}
              Publish
            </button>
          ) : null}
          {activePr ? (
            <button
              type="button"
              onClick={handleDiscard}
              disabled={isDiscarding || isSaving || isPublishing}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-red-500/30 px-3 text-xs font-medium text-red-600 transition-colors hover:bg-red-500/5 disabled:cursor-not-allowed disabled:opacity-40 dark:text-red-400"
            >
              {isDiscarding ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
              Discard
            </button>
          ) : null}
        </div>
      </section>

      {editorContent ? (
        <>
          {/* Metadata panel - custom accordion */}
          <MetadataPanel
            editorContent={editorContent}
            setEditorContent={setEditorContent}
            requiredFields={requiredFields}
            teamOptions={teamOptions}
            imageAlt={imageAlt}
            setImageAlt={setImageAlt}
            fileInputRef={fileInputRef}
            isProcessingImage={isProcessingImage}
            handleImageChange={handleImageChange}
            mode={mode}
          />

          {/* Status messages */}
          {error || statusMessage || validationErrors.length || activePr ? (
            <section className="grid gap-2 text-sm">
              {error ? (
                <div className="flex items-start gap-2.5 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-2.5 text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  {error}
                </div>
              ) : null}
              {statusMessage ? (
                <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-primary">
                  {statusMessage}
                </div>
              ) : null}
              {validationErrors.length ? (
                <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-2.5 text-amber-700 dark:text-amber-300">
                  {validationErrors.join(" ")}
                </div>
              ) : null}
              {activePr ? (
                <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border/60 bg-card px-4 py-2.5 text-muted-foreground">
                  <CheckCircle2
                    className={cn(
                      "h-4 w-4",
                      activePr.checksPassing
                        ? "text-emerald-500"
                        : "text-muted-foreground",
                    )}
                  />
                  <span className="text-xs">
                    Checks: {activePr.checksPassing ? "passing" : "waiting"}
                  </span>
                  {activePr.mergeBlockedReason ? (
                    <span className="text-xs">
                      · {activePr.mergeBlockedReason}
                    </span>
                  ) : null}
                </div>
              ) : null}
            </section>
          ) : null}

          {/* Editor split view */}
          <section className="grid h-[calc(100vh-17rem)] min-h-136 gap-4 xl:grid-cols-2">
            <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border/60 bg-card">
              <div className="flex h-10 shrink-0 items-center justify-between border-b border-border/40 px-4">
                <div className="flex items-center gap-2">
                  <Type className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-semibold text-foreground">
                    Markdown
                  </span>
                </div>
                <span className="text-[0.6875rem] tabular-nums text-muted-foreground/60">
                  {
                    editorContent.body.trim().split(/\s+/).filter(Boolean)
                      .length
                  }{" "}
                  words
                </span>
              </div>
              <textarea
                value={editorContent.body}
                onChange={(event) =>
                  setEditorContent((current) =>
                    current
                      ? { ...current, body: event.target.value }
                      : current,
                  )
                }
                spellCheck={false}
                className="h-full min-h-0 flex-1 resize-none border-0 bg-background px-5 py-4 font-mono text-[0.875rem] leading-7 text-foreground outline-none selection:bg-primary/20"
              />
            </div>

            <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border/60 bg-card">
              <div className="flex h-10 shrink-0 items-center justify-between border-b border-border/40 px-4">
                <span className="text-xs font-semibold text-foreground">
                  Preview
                </span>
                <span className="truncate text-[0.6875rem] text-muted-foreground/60">
                  {generatedPath}
                </span>
              </div>
              <div className="h-full min-h-0 flex-1 overflow-auto bg-background p-6">
                <Markdown content={editorContent.body} />
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="rounded-xl border border-border/60 bg-card p-10 text-center">
          <AlertCircle className="mx-auto h-6 w-6 text-muted-foreground/50" />
          <p className="mt-3 text-sm text-muted-foreground">
            No {sectionLabel.toLowerCase()} found.
          </p>
        </section>
      )}
    </div>
  );
}

/** Modern collapsible metadata panel replacing the <details> triangle */
function MetadataPanel({
  editorContent,
  setEditorContent,
  requiredFields,
  teamOptions,
  imageAlt,
  setImageAlt,
  fileInputRef,
  isProcessingImage,
  handleImageChange,
  mode,
}: {
  editorContent: AdminEditableContent;
  setEditorContent: React.Dispatch<
    React.SetStateAction<AdminEditableContent | null>
  >;
  requiredFields: Set<string>;
  teamOptions: TeamOption[];
  imageAlt: string;
  setImageAlt: (value: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  isProcessingImage: boolean;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  mode: "create" | "edit";
}) {
  const [isOpen, setIsOpen] = useState(true);

  function updateFrontmatter(name: string, value: unknown) {
    setEditorContent((current) => {
      if (!current) return current;
      const frontmatter = normalizeFrontmatter(current.section, {
        ...current.frontmatter,
        [name]: value,
      });

      return {
        ...current,
        slug:
          name === "title" || name === "name"
            ? slugifyContentTitle(String(value))
            : current.slug,
        frontmatter,
      };
    });
  }

  return (
    <section className="overflow-hidden rounded-xl border border-border/60 bg-card">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-11 w-full items-center justify-between px-5 text-left transition-colors hover:bg-muted/30"
        aria-expanded={isOpen}
      >
        <span className="text-[0.8125rem] font-semibold text-foreground">
          Metadata
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 border-t border-border/40 px-5 py-4">
            {/* Slug / Identity — only shown in edit mode */}
            {mode === "edit" && (
              <div>
                <p className="mb-1.5 text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground/70">
                  Identity
                </p>
                <div className="grid grid-cols-1 gap-x-3 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
                  <label className="block min-w-0">
                    <span className="text-[0.6875rem] font-medium text-muted-foreground">
                      Slug
                      <span
                        className="ml-0.5 text-destructive"
                        aria-hidden="true"
                      >
                        *
                      </span>
                      <span className="sr-only"> (required)</span>
                    </span>
                    <input
                      value={editorContent.slug}
                      onChange={(event) =>
                        setEditorContent((current) =>
                          current
                            ? {
                                ...current,
                                slug: slugifyContentTitle(event.target.value),
                              }
                            : current,
                        )
                      }
                      className="mt-1 h-9 w-full rounded-md border border-border/60 bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Field groups */}
            {getFieldGroups(editorContent.section).map((group) => (
              <div key={group.title}>
                <p className="mb-1.5 text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground/70">
                  {group.title}
                </p>
                <div className="grid grid-cols-1 gap-x-3 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
                  {group.fields.map((field) => (
                    <EditorField
                      key={field}
                      name={field}
                      value={editorContent.frontmatter[field]}
                      required={requiredFields.has(field)}
                      teamOptions={teamOptions}
                      onChange={(value) => updateFrontmatter(field, value)}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Media */}
            <div>
              <p className="mb-1.5 text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground/70">
                Media
              </p>
              <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-[1fr_auto]">
                <label className="block min-w-0">
                  <span className="text-[0.6875rem] font-medium text-muted-foreground">
                    Image alt text
                  </span>
                  <input
                    value={imageAlt}
                    onChange={(event) => setImageAlt(event.target.value)}
                    placeholder="Required before adding an image"
                    className="mt-1 h-9 w-full rounded-md border border-border/60 bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={isProcessingImage}
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border/60 px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary disabled:opacity-40"
                >
                  {isProcessingImage ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <ImagePlus className="h-3.5 w-3.5" />
                  )}
                  Add image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
