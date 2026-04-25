"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type SocialLink } from "@/lib/portfolio-shared";

type FormState = "idle" | "submitting" | "success" | "error";

type ContactSectionProps = {
  email: string;
  location: string;
  socialLinks: readonly SocialLink[] | SocialLink[];
};

export function ContactSection({ email, location, socialLinks }: ContactSectionProps) {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setState("success");
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMsg(
          json.error ?? "Pesan gagal dikirim. Silakan coba lagi atau hubungi lewat link sosial.",
        );
        setState("error");
      }
    } catch {
      setErrorMsg("Terjadi kesalahan jaringan. Silakan coba lagi.");
      setState("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 space-y-6">
      <div>
        <p className="text-xs font-medium tracking-[0.18em] text-cyan-200/80 uppercase">Contact</p>
        <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
          Let&apos;s Collaborate
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-300">
          Kirim detail project lewat form berikut atau hubungi langsung lewat link sosial di bawah.
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
            {state === "success" ? (
              <div className="rounded-lg border border-cyan-200/20 bg-cyan-200/5 px-4 py-6 text-center">
                <p className="text-sm font-medium text-cyan-100">Pesan berhasil dikirim!</p>
                <p className="mt-1 text-xs text-zinc-400">Saya akan membalas secepatnya.</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mt-4 text-zinc-400 hover:text-zinc-200"
                  onClick={() => setState("idle")}
                >
                  Kirim pesan lain
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-zinc-200">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
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
                      required
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
                    required
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
                    required
                    rows={6}
                    placeholder="Describe your project scope, timeline, and budget."
                    className="border-white/15 bg-white/[0.03] text-zinc-100 placeholder:text-zinc-400"
                  />
                </div>

                {state === "error" && (
                  <p className="text-xs text-red-400">{errorMsg}</p>
                )}

                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-zinc-400">Timezone: {location}</p>
                  <Button
                    type="submit"
                    disabled={state === "submitting"}
                    className="border border-cyan-200/45 bg-cyan-200/10 text-cyan-50 hover:bg-cyan-200/20 disabled:opacity-50"
                  >
                    {state === "submitting" ? "Sending…" : "Send Message"}
                  </Button>
                </div>
              </form>
            )}
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
            {socialLinks.map((link) => (
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
            {email && (
              <a
                href={`mailto:${email}`}
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-white/15 bg-white/[0.02] px-3 py-2.5 text-zinc-100 transition-colors hover:bg-white/[0.06]"
              >
                {email}
              </a>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
