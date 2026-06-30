import { AppShell } from "@/components/dashboard/app-shell";
import { MatchingWorkspace } from "@/components/candidates/matching-workspace";

export default function MatchingPage() {
  return (
    <AppShell>
      <MatchingWorkspace />
    </AppShell>
  );
}
