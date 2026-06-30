import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";

export default function ResetPasswordPage() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <GlassCard className="w-full max-w-md">
        <h1 className="text-2xl font-semibold">Choose a new password</h1>
        <input className="mt-6 h-11 w-full rounded-md border bg-white/70 px-3" placeholder="New password" type="password" />
        <input className="mt-3 h-11 w-full rounded-md border bg-white/70 px-3" placeholder="Confirm password" type="password" />
        <Button className="mt-5 w-full">Update password</Button>
      </GlassCard>
    </main>
  );
}
