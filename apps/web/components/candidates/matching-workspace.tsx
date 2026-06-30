"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";

const results = [
  { name: "Aarav Sharma", score: 94, missing: "GraphQL", recommendation: "Shortlist for backend systems round" },
  { name: "Mia Chen", score: 91, missing: "Next.js", recommendation: "Interview for ML infrastructure role" },
  { name: "Lina Gomez", score: 84, missing: "Postgres internals", recommendation: "Consider for frontend platform" },
];

export function MatchingWorkspace() {
  const [generated, setGenerated] = useState(false);
  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <div>
        <h1 className="text-3xl font-semibold">Candidate ranking</h1>
        <p className="mt-2 text-muted-foreground">Paste a job description to generate embeddings, match candidates, and expose skill gaps.</p>
        <GlassCard className="mt-6">
          <textarea className="min-h-96 w-full resize-none rounded-md border bg-white/70 p-4 outline-none focus:ring-2 focus:ring-primary" defaultValue="We need a senior backend engineer with FastAPI, PostgreSQL, Redis, event-driven systems, cloud deployment, and excellent product judgment." />
          <Button className="mt-4" onClick={() => setGenerated(true)}><Wand2 size={16} /> Generate ranking</Button>
        </GlassCard>
      </div>
      <div className="space-y-4 xl:pt-20">
        {(generated ? results : results.slice(0, 1)).map((candidate) => (
          <GlassCard key={candidate.name}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">{candidate.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{candidate.recommendation}</p>
              </div>
              <span className="rounded-md bg-emerald-100 px-3 py-1 font-semibold text-primary">{candidate.score}%</span>
            </div>
            <p className="mt-4 text-sm"><span className="text-muted-foreground">Missing skills:</span> {candidate.missing}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
