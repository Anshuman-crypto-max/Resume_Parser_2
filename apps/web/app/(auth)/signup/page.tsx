import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <GlassCard className="w-full max-w-md">
        <h1 className="text-2xl font-semibold">Create workspace</h1>
        <input className="mt-6 h-11 w-full rounded-md border bg-white/70 px-3" placeholder="Work email" />
        <input className="mt-3 h-11 w-full rounded-md border bg-white/70 px-3" placeholder="Password" type="password" />
        <Button className="mt-5 w-full">Sign up</Button>
        <Button variant="outline" className="mt-3 w-full">Continue with Google</Button>
        <p className="mt-5 text-sm text-muted-foreground">Already have an account? <Link href="/login" className="text-primary">Login</Link></p>
      </GlassCard>
    </main>
  );
}
