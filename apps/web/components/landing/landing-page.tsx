"use client";

import Link from "next/link";
import type React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, BrainCircuit, Check, FileUp, Lock, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";

type Feature = [string, React.ComponentType<{ size?: number; className?: string }>, string];

const features: Feature[] = [
  ["Structured AI parsing", BrainCircuit, "Extract verified JSON from PDF, DOCX, DOC, OCR scans, and profile links."],
  ["Semantic ranking", Search, "Compare candidates against job descriptions with embeddings and transparent skill gaps."],
  ["Recruiting analytics", BarChart3, "See funnel health, top skills, universities, locations, and monthly hiring velocity."],
  ["Enterprise controls", Lock, "Role-based access, audit logs, rate limits, secure storage, and API key governance."],
];

const plans = ["Starter", "Growth", "Enterprise"];

export function LandingPage() {
  return (
    <main className="overflow-hidden">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-base font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-white">R</span>
          Resume Parser AI
        </Link>
        <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </div>
        <Button asChild>
          <Link href="/dashboard">
            Open app <ArrowRight size={16} />
          </Link>
        </Button>
      </nav>

      <section className="mx-auto grid min-h-[calc(100vh-78px)] max-w-7xl items-center gap-10 px-6 pb-12 pt-8 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-5 inline-flex rounded-full border bg-white/70 px-3 py-1 text-sm text-emerald-800">
            AI recruiting workspace for high-volume hiring teams
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="max-w-4xl text-5xl font-semibold leading-tight tracking-normal text-emerald-950 md:text-7xl">
            Resume Parser AI
          </motion.h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Upload resumes, extract reliable candidate profiles, rank them against open roles, and give recruiters a calm command center for every hiring decision.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="default">
              <Link href="/upload">
                Parse resumes <FileUp size={17} />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/matching">Rank candidates</Link>
            </Button>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="relative">
          <GlassCard className="p-6">
            <div className="rounded-lg border border-dashed border-emerald-300 bg-white/50 p-8 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-md bg-emerald-100 text-emerald-700">
                <FileUp size={28} />
              </div>
              <h2 className="mt-5 text-xl font-semibold">Drop resumes here</h2>
              <p className="mt-2 text-sm text-muted-foreground">PDF, DOCX, DOC, 50MB each, encrypted at rest.</p>
              <div className="mt-6 space-y-3 text-left">
                {["Parsing work history", "Normalizing skills", "Calculating job fit"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-md bg-white/80 p-3">
                    <Sparkles className="text-primary" size={18} />
                    <span className="flex-1 text-sm">{item}</span>
                    <span className="h-2 w-28 overflow-hidden rounded-full bg-emerald-100">
                      <motion.span className="block h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${72 + index * 8}%` }} transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      <section id="features" className="mx-auto grid max-w-7xl gap-4 px-6 py-16 md:grid-cols-4">
        {features.map(([title, Icon, body]) => (
          <GlassCard key={title}>
            <Icon className="text-primary" size={24} />
            <h3 className="mt-4 font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
          </GlassCard>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <GlassCard className="grid gap-8 md:grid-cols-3">
          {["Reduced screening time by 74%", "Found stronger matches for niche roles", "Centralized compliance evidence"].map((quote) => (
            <blockquote key={quote} className="text-lg font-medium">
              "{quote}"
              <footer className="mt-4 text-sm text-muted-foreground">Talent Operations Lead</footer>
            </blockquote>
          ))}
        </GlassCard>
      </section>

      <section id="pricing" className="mx-auto grid max-w-7xl gap-4 px-6 py-16 md:grid-cols-3">
        {plans.map((plan, index) => (
          <GlassCard key={plan} className={index === 1 ? "ring-2 ring-primary" : ""}>
            <h3 className="text-xl font-semibold">{plan}</h3>
            <p className="mt-3 text-4xl font-semibold">${[99, 299, 899][index]}</p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {["AI parsing", "Candidate CRM", "Analytics", "Secure exports"].map((item) => (
                <li key={item} className="flex gap-2"><Check size={16} className="text-primary" />{item}</li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </section>

      <section id="faq" className="mx-auto max-w-4xl px-6 py-16">
        {["How accurate is parsing?", "Can we use our own OpenAI key?", "Is role access supported?"].map((q) => (
          <details key={q} className="border-b py-5">
            <summary className="cursor-pointer font-medium">{q}</summary>
            <p className="mt-3 text-sm text-muted-foreground">Yes. The platform validates structured output, retries failures, and keeps security controls configurable per workspace.</p>
          </details>
        ))}
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <span>Resume Parser AI</span>
        <span>Secure AI hiring infrastructure for modern teams.</span>
      </footer>
    </main>
  );
}
