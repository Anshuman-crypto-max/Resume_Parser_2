import { AppShell } from "@/components/dashboard/app-shell";
import { GlassCard } from "@/components/ui/card";

export default function AdminPage() {
  const rows = [
    ["User management", "42 active users across admin, recruiter, and viewer roles"],
    ["Storage", "218 GB resumes and generated JSON in Supabase Storage"],
    ["API usage", "128k requests this month with per-tenant rate limits"],
    ["Security", "JWT auth, audit logs, secure cookies, CORS, and key rotation"],
  ];
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Admin panel</h1>
        <div className="grid gap-4 md:grid-cols-2">
          {rows.map(([title, body]) => (
            <GlassCard key={title}>
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
