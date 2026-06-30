"use client";

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import type { Candidate } from "@/lib/api";

const data: Candidate[] = [
  { id: "1", name: "Aarav Sharma", email: "aarav@example.com", title: "Senior Backend Engineer", location: "Bengaluru", experience_years: 7, status: "shortlisted", skills: ["Python", "FastAPI", "Postgres"], match_score: 94, summary: "Strong distributed systems and API leadership profile." },
  { id: "2", name: "Mia Chen", email: "mia@example.com", title: "ML Platform Engineer", location: "Singapore", experience_years: 5, status: "interview", skills: ["PyTorch", "Kubernetes", "Vector Search"], match_score: 91, summary: "Excellent MLOps depth with production model deployment." },
  { id: "3", name: "Lina Gomez", email: "lina@example.com", title: "Frontend Architect", location: "Remote", experience_years: 8, status: "new", skills: ["React", "Next.js", "Design Systems"], match_score: 88, summary: "Premium UI engineering and accessibility experience." },
];

const helper = createColumnHelper<Candidate>();
const columns = [
  helper.accessor("name", { header: "Candidate", cell: (info) => <div><p className="font-medium">{info.getValue()}</p><p className="text-xs text-muted-foreground">{info.row.original.email}</p></div> }),
  helper.accessor("title", { header: "Role" }),
  helper.accessor("location", { header: "Location" }),
  helper.accessor("experience_years", { header: "Exp", cell: (info) => `${info.getValue()}y` }),
  helper.accessor("skills", { header: "Skills", cell: (info) => <div className="flex flex-wrap gap-1">{info.getValue().map((skill) => <span key={skill} className="rounded-md bg-emerald-100 px-2 py-1 text-xs text-emerald-900">{skill}</span>)}</div> }),
  helper.accessor("match_score", { header: "Match", cell: (info) => <span className="font-semibold text-primary">{info.getValue()}%</span> }),
];

export function CandidateTable() {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold">Candidates</h1>
          <p className="mt-2 text-muted-foreground">Search, filter, export, and inspect parsed candidate profiles.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download size={16} /> Export JSON</Button>
          <Button><ExternalLink size={16} /> Open profile</Button>
        </div>
      </div>
      <GlassCard className="overflow-x-auto p-0">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id} className="border-b bg-emerald-50/60">
                {group.headers.map((header) => <th key={header.id} className="px-4 py-3 text-left font-medium">{flexRender(header.column.columnDef.header, header.getContext())}</th>)}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b last:border-0">
                {row.getVisibleCells().map((cell) => <td key={cell.id} className="px-4 py-4 align-top">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}
