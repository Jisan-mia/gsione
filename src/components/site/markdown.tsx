import type { Components } from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { cn } from '@/lib/utils'

const markdownComponents: Components = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        'mt-10 text-4xl font-semibold leading-tight text-balance text-foreground first:mt-0 sm:text-5xl',
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        'mt-12 border-t border-border/60 pt-8 text-3xl font-semibold leading-tight text-balance text-foreground first:border-t-0 first:pt-0 sm:text-4xl',
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        'mt-10 text-2xl font-semibold leading-tight text-foreground sm:text-3xl',
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn('mt-8 text-xl font-semibold leading-tight text-foreground', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn('mt-5 text-base leading-8 text-muted-foreground first:mt-0', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn('mt-5 list-disc space-y-3 pl-6 marker:text-primary', className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn('mt-5 list-decimal space-y-3 pl-6 marker:font-semibold marker:text-primary', className)} {...props} />
  ),
  li: ({ className, children, ...props }) => (
    <li className={cn('text-base leading-8 text-muted-foreground', className)} {...props}>
      {children}
    </li>
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        'mt-8 rounded-[1.5rem] border-l-4 border-primary bg-primary/5 px-6 py-5 text-base leading-8 text-foreground',
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn(
        'font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary/80',
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn('my-10 border-border/60', className)} {...props} />
  ),
  strong: ({ className, ...props }) => (
    <strong className={cn('font-semibold text-foreground', className)} {...props} />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        'rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.925em] text-foreground',
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        'mt-6 overflow-x-auto rounded-[1.5rem] border border-border/70 bg-[#101828] p-5 text-sm text-white',
        className,
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }) => (
    <div className="mt-6 overflow-x-auto">
      <table className={cn('min-w-full border-collapse text-left', className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        'border-b border-border/70 px-4 py-3 text-sm font-semibold text-foreground',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn('border-b border-border/50 px-4 py-3 text-sm text-muted-foreground', className)}
      {...props}
    />
  ),
}

export function Markdown({
  content,
  className,
}: {
  content: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'max-w-none',
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
