"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Play, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  url: string;
  title: string;
  eyebrow?: string;
  description?: string;
  meta?: string;
  minimal?: boolean;
  className?: string;
}

function getYouTubeVideoId(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.replace(/^\/+/, "");
    }

    if (
      parsed.hostname === "youtube.com" ||
      parsed.hostname === "www.youtube.com" ||
      parsed.hostname === "m.youtube.com"
    ) {
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/embed/")[1]?.split("/")[0] || "";
      }

      return parsed.searchParams.get("v") || "";
    }
  } catch {
    return "";
  }

  return "";
}

export function VideoPlayer({
  url,
  title,
  eyebrow = "Featured video",
  description,
  meta,
  minimal = false,
  className,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = useMemo(() => getYouTubeVideoId(url), [url]);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
    : url;
  const thumbnailUrl = videoId
    ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
    : "";

  if (minimal) {
    return (
      <div
        className={cn(
          "group relative overflow-hidden rounded-xl border border-border bg-foreground shadow-2xl shadow-foreground/10",
          className,
        )}
      >
        <div className="relative aspect-video overflow-hidden">
          {isPlaying ? (
            <iframe
              src={embedUrl}
              title={title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="relative flex h-full w-full items-center justify-center overflow-hidden"
              aria-label={`Play ${title}`}
            >
              {thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.015]"
                />
              ) : (
                <span className="absolute inset-0 bg-primary/20" />
              )}
              <span className="absolute inset-0 bg-foreground/10" />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-background/95 text-primary shadow-2xl transition duration-300 group-hover:scale-105 sm:h-16 sm:w-16">
                <Play className="ml-1 h-6 w-6 fill-current sm:h-7 sm:w-7" />
              </span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl hover:shadow-primary/10",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </p>
            {meta ? (
              <p className="truncate text-xs text-muted-foreground">{meta}</p>
            ) : null}
          </div>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${title} on YouTube`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="relative aspect-video overflow-hidden bg-foreground">
        {isPlaying ? (
          <iframe
            src={embedUrl}
            title={title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="relative flex h-full w-full items-center justify-center overflow-hidden text-left"
            aria-label={`Play ${title}`}
          >
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            ) : (
              <span className="absolute inset-0 bg-primary/25" />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/25 to-foreground/10" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-background/95 text-primary shadow-2xl transition duration-300 group-hover:scale-105 sm:h-20 sm:w-20">
              <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" />
            </span>
            <span className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground sm:p-5">
              <span className="block max-w-xl text-lg font-semibold leading-tight sm:text-xl">
                {title}
              </span>
              {description ? (
                <span className="mt-2 hidden max-w-xl text-sm leading-6 text-primary-foreground/80 sm:block">
                  {description}
                </span>
              ) : null}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
