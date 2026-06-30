import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <GlassCard className="w-full max-w-md">
        <h1 className="text-2xl font-semibold">Reset password</h1>
        <p className="mt-2 text-sm text-muted-foreground">Enter your email and we will send a secure reset link.</p>
        <input className="mt-6 h-11 w-full rounded-md border bg-white/70 px-3" placeholder="Email" />
        <Button className="mt-5 w-full">Send reset link</Button>
      </GlassCard>
    </main>
  );
}
