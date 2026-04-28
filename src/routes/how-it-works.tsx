import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Swords, Trophy, Shield, IndianRupee, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — CodeClash" },
      { name: "description", content: "Rules, scoring, anti-cheat, and prize payout policy for CodeClash." },
    ],
  }),
  component: HowPage,
});

const steps = [
  { icon: Swords, title: "Get matched", desc: "Click Find a Match. We pair you with someone near your rating in seconds." },
  { icon: Shield, title: "Solve fair", desc: "Same problem, same timer. Copy-paste is disabled. Tab-switching is tracked." },
  { icon: Trophy, title: "Win points", desc: "First to pass all test cases wins. Skip a question? Opponent gets a chance to steal it." },
  { icon: IndianRupee, title: "Earn cash", desc: "Climb the leaderboard. Top players get weekly and monthly cash payouts in INR." },
];

const rules = [
  { ok: true, text: "Write your own code from scratch in the editor" },
  { ok: true, text: "Use any language reference docs (no AI assistants)" },
  { ok: true, text: "Skip a question if you're stuck — opponent gets 3 min to steal" },
  { ok: false, text: "Copy-paste, screen sharing, or external help" },
  { ok: false, text: "Multiple accounts or rating manipulation" },
  { ok: false, text: "Using AI tools (ChatGPT, Copilot, etc.) during a battle" },
];

function HowPage() {
  return (
    <div className="p-6 lg:p-8 max-w-[1100px] mx-auto space-y-10">
      <div className="text-center">
        <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary mb-3">The rules</Badge>
        <h1 className="font-display text-4xl lg:text-5xl font-bold">How CodeClash Works</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Real-time 1v1 DSA battles. Fair play, transparent scoring, real cash prizes.
        </p>
      </div>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((s, i) => (
          <Card key={i} className="p-5 bg-card/60 border-border/60">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg mb-3" style={{ background: "var(--gradient-ember)" }}>
              <s.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <p className="font-display font-bold">{i + 1}. {s.title}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
          </Card>
        ))}
      </section>

      <Card className="p-6 lg:p-8 bg-card/60 border-border/60">
        <h2 className="font-display text-2xl font-bold">Scoring</h2>
        <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg bg-background/40 border border-border/60 p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Easy solve</p>
            <p className="font-display text-2xl font-bold text-primary mt-1">+100</p>
          </div>
          <div className="rounded-lg bg-background/40 border border-border/60 p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Medium solve</p>
            <p className="font-display text-2xl font-bold text-primary mt-1">+150</p>
          </div>
          <div className="rounded-lg bg-background/40 border border-border/60 p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Hard solve</p>
            <p className="font-display text-2xl font-bold text-primary mt-1">+250</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Skipped questions transfer to your opponent for 3 minutes. If they solve it, they get the points. If neither solves, no points awarded.
        </p>
      </Card>

      <Card className="p-6 lg:p-8 bg-card/60 border-border/60">
        <h2 className="font-display text-2xl font-bold">Fair Play</h2>
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          {rules.map((r, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg bg-background/40 border border-border/60 p-3">
              {r.ok ? <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" /> : <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />}
              <p className="text-sm">{r.text}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 lg:p-8 bg-card/60 border-border/60">
        <h2 className="font-display text-2xl font-bold">Prize Payouts</h2>
        <p className="text-sm text-muted-foreground mt-2">Weekly leaderboard payouts in INR. Withdraw via UPI once you cross ₹500.</p>
        <div className="mt-4 space-y-2">
          {[
            { rank: "Rank #1", prize: "₹10,000" },
            { rank: "Rank #2-3", prize: "₹5,000 each" },
            { rank: "Rank #4-10", prize: "₹2,000 each" },
            { rank: "Rank #11-50", prize: "₹500 each" },
          ].map((p, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-3">
              <span className="text-sm font-medium">{p.rank}</span>
              <span className="font-mono font-bold text-primary">{p.prize}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="text-center">
        <Button asChild size="lg" className="gap-2" style={{ background: "var(--gradient-ember)", boxShadow: "var(--shadow-ember)" }}>
          <Link to="/arena"><Swords className="h-4 w-4" /> Enter the Arena</Link>
        </Button>
      </div>
    </div>
  );
}
