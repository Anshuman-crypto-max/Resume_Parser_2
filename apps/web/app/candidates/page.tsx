import { AppShell } from "@/components/dashboard/app-shell";
import { CandidateTable } from "@/components/candidates/candidate-table";

export default function CandidatesPage() {
  return (
    <AppShell>
      <CandidateTable />
    </AppShell>
  );
}
