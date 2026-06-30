"use client";

import type React from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CalendarClock, FileText, Target, Users } from "lucide-react";
import { GlassCard } from "@/components/ui/card";

type Stat = [string, string, React.ComponentType<{ size?: number; className?: string }>];

const monthly = [
  { month: "Jan", candidates: 92 },
  { month: "Feb", candidates: 121 },
  { month: "Mar", candidates: 154 },
  { month: "Apr", candidates: 187 },
  { month: "May", candidates: 231 },
  { month: "Jun", candidates: 268 },
];
const funnel = [
  { stage: "Uploaded", value: 1280 },
  { stage: "Parsed", value: 1184 },
  { stage: "Shortlist", value: 342 },
  { stage: "Interview", value: 96 },
  { stage: "Offer", value: 21 },
];

export function DashboardOverview() {
  const stats: Stat[] = [
    ["Candidates", "1,284", Users],
    ["Parsed resumes", "1,184", FileText],
    ["Average match", "82%", Target],
    ["Interviews", "96", CalendarClock],
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Hiring command center</h1>
        <p className="mt-2 text-muted-foreground">Live signal from parsing, ranking, interviews, and pipeline health.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map(([label, value, Icon]) => (
          <GlassCard key={label}>
            <Icon className="text-primary" size={20} />
            <p className="mt-5 text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 text-3xl font-semibold">{value}</p>
          </GlassCard>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <GlassCard>
          <h2 className="mb-5 font-semibold">Monthly hiring</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthly}>
                <defs><linearGradient id="greenArea" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4CAF50" stopOpacity={0.5} /><stop offset="95%" stopColor="#4CAF50" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#d8eadb" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area dataKey="candidates" stroke="#4CAF50" fill="url(#greenArea)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        <GlassCard>
          <h2 className="mb-5 font-semibold">Candidate pipeline</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnel} layout="vertical">
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="stage" width={78} />
                <Tooltip />
                <Bar dataKey="value" fill="#4CAF50" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard>
          <h2 className="font-semibold">Recent uploads</h2>
          {["Aarav Sharma.pdf", "Mia Chen.docx", "Lina Gomez.pdf"].map((name) => (
            <div key={name} className="mt-4 flex items-center justify-between rounded-md bg-white/60 p-3 text-sm">
              <span>{name}</span><span className="text-primary">Parsed</span>
            </div>
          ))}
        </GlassCard>
        <GlassCard>
          <h2 className="font-semibold">Upcoming interviews</h2>
          {["Senior Backend Engineer", "ML Platform Lead", "Frontend Architect"].map((role) => (
            <div key={role} className="mt-4 flex items-center justify-between rounded-md bg-white/60 p-3 text-sm">
              <span>{role}</span><span className="text-muted-foreground">This week</span>
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}
