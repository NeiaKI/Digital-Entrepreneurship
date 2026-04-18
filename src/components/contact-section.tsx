import { Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CREATOR_PROFILE } from "@/lib/projects";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 space-y-6">
      <div>
        <p className="text-xs font-medium tracking-[0.18em] text-cyan-200/80 uppercase">Contact</p>
        <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
          Let&apos;s Collaborate
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-300">
          Kirim detail project lewat form berikut. Frontend ini belum terhubung ke backend,
          jadi gunakan juga link sosial untuk kontak langsung.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-white/10 bg-zinc-950/70">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-white">
              <Send className="size-4 text-cyan-200" />
              Contact Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-200">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    className="border-white/15 bg-white/[0.03] text-zinc-100 placeholder:text-zinc-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    className="border-white/15 bg-white/[0.03] text-zinc-100 placeholder:text-zinc-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-zinc-200">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Project inquiry"
                  className="border-white/15 bg-white/[0.03] text-zinc-100 placeholder:text-zinc-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-zinc-200">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Describe your project scope, timeline, and budget."
                  className="border-white/15 bg-white/[0.03] text-zinc-100 placeholder:text-zinc-400"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-zinc-400">Timezone: {CREATOR_PROFILE.location}</p>
                <Button
                  type="submit"
                  className="border border-cyan-200/45 bg-cyan-200/10 text-cyan-50 hover:bg-cyan-200/20"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-zinc-950/70">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-white">
              <Mail className="size-4 text-cyan-200" />
              External Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {CREATOR_PROFILE.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 text-zinc-200 transition-colors hover:border-cyan-200/30 hover:bg-cyan-300/[0.06]"
              >
                <span>{link.label}</span>
                <span className="text-zinc-400">Open</span>
              </a>
            ))}
            <a
              href="mailto:hello@example.com"
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-white/15 bg-white/[0.02] px-3 py-2.5 text-zinc-100 transition-colors hover:bg-white/[0.06]"
            >
              hello@example.com
            </a>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
