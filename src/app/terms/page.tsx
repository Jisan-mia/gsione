import type { Metadata } from 'next'
import { getBaseMetadata } from '@/lib/content'
import { legalContent } from '@/lib/site'

export const metadata: Metadata = getBaseMetadata({
  title: legalContent.terms.title,
  description: legalContent.terms.description,
  pathName: '/terms',
})

export default function TermsPage() {
  return (
    <main id="main-content">
      <section className="section-space">
        <div className="page-shell max-w-4xl">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-5 text-5xl font-semibold text-balance text-foreground sm:text-6xl">
            {legalContent.terms.title}
          </h1>
          <p className="mt-4 text-sm font-medium text-primary">
            Effective {legalContent.terms.effectiveDate}
          </p>
          <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
            {legalContent.terms.description}
          </p>
          <div className="mt-10 space-y-5">
            {legalContent.terms.sections.map((section) => (
              <article key={section.title} className="section-card p-6 sm:p-7">
                <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  {section.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
