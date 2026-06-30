"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { Bell, Command, FileUp, LayoutDashboard, Moon, Search, Settings, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = [string, string, React.ComponentType<{ size?: number; className?: string }>];

const nav: NavItem[] = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/upload", "Upload", FileUp],
  ["/candidates", "Candidates", Users],
  ["/matching", "Matching", Search],
  ["/analytics", "Analytics", Command],
  ["/admin", "Admin", Shield],
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden border-r bg-white/55 p-4 backdrop-blur-xl lg:block">
        <Link href="/dashboard" className="mb-8 flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-white">R</span>
          Resume Parser AI
        </Link>
        <nav className="space-y-1">
          {nav.map(([href, label, Icon]) => (
            <Link key={href} href={href} className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-emerald-50 hover:text-foreground", pathname === href && "bg-emerald-100 text-emerald-950")}>
              <Icon size={17} />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main>
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white/70 px-4 backdrop-blur-xl lg:px-8">
          <div className="flex min-w-0 items-center gap-3 rounded-md border bg-white/70 px-3 py-2 text-sm text-muted-foreground md:w-96">
            <Search size={16} />
            <span className="truncate">Search candidates, skills, universities...</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Toggle dark mode"><Moon size={18} /></Button>
            <Button variant="ghost" size="icon" aria-label="Notifications"><Bell size={18} /></Button>
            <Button variant="ghost" size="icon" aria-label="Settings"><Settings size={18} /></Button>
          </div>
        </header>
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
