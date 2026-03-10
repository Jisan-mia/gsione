'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight, Mail, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { siteConfig } from '@/lib/site'

const initialFormState = {
  name: '',
  email: '',
  organisation: '',
  subject: '',
  message: '',
}

export function ContactForm() {
  const [formState, setFormState] = useState(initialFormState)

  const mailtoHref = useMemo(() => {
    const subject = formState.subject || 'Inquiry from the GSi website'
    const message = [
      `Name: ${formState.name || '-'}`,
      `Email: ${formState.email || '-'}`,
      `Organisation: ${formState.organisation || '-'}`,
      '',
      formState.message || '',
    ].join('\n')

    return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
  }, [formState.email, formState.message, formState.name, formState.organisation, formState.subject])

  return (
    <div className="grid gap-8 rounded-[2rem] border border-border/70 bg-card/85 p-6 shadow-sm sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Contact
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-balance text-foreground sm:text-4xl">
          Bring a project, briefing, or training need.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          The site now uses a direct email workflow instead of a fake success message. Fill in the
          fields and open the draft in your mail app, or write directly to {siteConfig.email}.
        </p>
        <div className="mt-6 space-y-3 text-sm text-muted-foreground">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
          >
            <Mail className="h-4 w-4" />
            {siteConfig.email}
          </a>
          <p>{siteConfig.location}</p>
        </div>
      </div>

      <form className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formState.name}
              onChange={(event) =>
                setFormState((current) => ({ ...current, name: event.target.value }))
              }
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formState.email}
              onChange={(event) =>
                setFormState((current) => ({ ...current, email: event.target.value }))
              }
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="organisation">Organisation</Label>
          <Input
            id="organisation"
            value={formState.organisation}
            onChange={(event) =>
              setFormState((current) => ({ ...current, organisation: event.target.value }))
            }
            placeholder="Agency, newsroom, university, NGO, or company"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            value={formState.subject}
            onChange={(event) =>
              setFormState((current) => ({ ...current, subject: event.target.value }))
            }
            placeholder="Training request, interview, collaboration, or advisory work"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={formState.message}
            onChange={(event) =>
              setFormState((current) => ({ ...current, message: event.target.value }))
            }
            placeholder="Tell GSi what you need, the timeline, and who the audience is."
            className="min-h-36"
          />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="rounded-full">
            <a href={mailtoHref}>
              Open email draft
              <Send className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <a href={`mailto:${siteConfig.email}`}>
              Write directly
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </form>
    </div>
  )
}
