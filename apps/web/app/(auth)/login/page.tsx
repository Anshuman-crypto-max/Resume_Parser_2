import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <GlassCard className="w-full max-w-md">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">Sign in to continue screening candidates.</p>
        <input className="mt-6 h-11 w-full rounded-md border bg-white/70 px-3" placeholder="Email" />
        <input className="mt-3 h-11 w-full rounded-md border bg-white/70 px-3" placeholder="Password" type="password" />
        <Button className="mt-5 w-full">Login</Button>
        <Button variant="outline" className="mt-3 w-full">Continue with Google</Button>
        <div className="mt-5 flex justify-between text-sm text-muted-foreground">
          <Link href="/forgot-password">Forgot password?</Link>
          <Link href="/signup">Create account</Link>
        </div>
      </GlassCard>
    </main>
  );
}
