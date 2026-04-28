import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Mail, Lock, User as UserIcon } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — CodeClash" },
      { name: "description", content: "Sign in or create your CodeClash account to start battling." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handle = (mode: "signin" | "signup") => (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success(mode === "signin" ? "Welcome back!" : "Account created. Let's clash!");
      navigate({ to: "/" });
    }, 900);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-6" style={{ background: "var(--gradient-dark)" }}>
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl mb-3" style={{ background: "var(--gradient-ember)", boxShadow: "var(--shadow-ember)" }}>
            <Code2 className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold">CodeClash</h1>
          <p className="text-sm text-muted-foreground mt-1">Compete. Solve. Earn.</p>
        </div>

        <Card className="p-6 bg-card/70 border-border/60 backdrop-blur">
          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-5">
              <form onSubmit={handle("signin")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="si-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="si-email" type="email" required placeholder="you@college.edu" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="si-pass">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="si-pass" type="password" required placeholder="••••••••" className="pl-9" />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading} style={{ background: "var(--gradient-ember)" }}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-5">
              <form onSubmit={handle("signup")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="su-name">Full name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="su-name" required placeholder="Aarav Sharma" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="su-email">College email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="su-email" type="email" required placeholder="you@college.edu" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="su-pass">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="su-pass" type="password" required placeholder="At least 8 characters" className="pl-9" />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading} style={{ background: "var(--gradient-ember)" }}>
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-xs text-muted-foreground text-center mt-5">
            By continuing, you agree to fair-play rules.{" "}
            <Link to="/how-it-works" className="text-primary hover:underline">Read the rules</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
