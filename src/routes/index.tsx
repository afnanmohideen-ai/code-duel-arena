import { createFileRoute, Link } from "@tanstack/react-router";
import { Swords, Trophy, Flame, Target, TrendingUp, Users, IndianRupee, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { currentUser, leaderboard, recentBattles } from "@/lib/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — CodeClash" },
      { name: "description", content: "Your DSA battle dashboard. Track rating, recent battles, and prize earnings." },
    ],
  }),
  component: Dashboard,
});

function StatCard({ icon: Icon, label, value, accent }: { icon: any; label: string; value: string; accent?: boolean }) {
  return (
    <Card className="p-5 bg-card/60 border-border/60 backdrop-blur">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className={`mt-2 font-display text-3xl font-bold ${accent ? "text-primary" : ""}`}>{value}</p>
        </div>
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}

function Dashboard() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-[1400px] mx-auto">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-border/60 p-8 lg:p-10" style={{ background: "var(--gradient-dark)" }}>
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-ember)" }} />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
              <Flame className="mr-1 h-3 w-3" /> {currentUser.streak} win streak
            </Badge>
            <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">
              Welcome back, <span className="text-primary">{currentUser.name.split(" ")[0]}</span>
            </h1>
            <p className="text-muted-foreground">
              You're ranked <span className="text-foreground font-semibold">#{currentUser.rank}</span> globally. One more win and you crack the top 40.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="gap-2 shadow-lg" style={{ background: "var(--gradient-ember)", boxShadow: "var(--shadow-ember)" }}>
              <Link to="/arena"><Swords className="h-4 w-4" /> Find a Match</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/friends"><Users className="h-4 w-4 mr-2" /> Play with Friends</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={TrendingUp} label="Rating" value={String(currentUser.rating)} accent />
        <StatCard icon={Trophy} label="Wins" value={String(currentUser.wins)} />
        <StatCard icon={Target} label="Solved" value={String(currentUser.solved)} />
        <StatCard icon={IndianRupee} label="Prize Won" value={`₹${currentUser.prize.toLocaleString("en-IN")}`} accent />
      </section>

      {/* Battles + Top Players */}
      <section className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 bg-card/60 border-border/60">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-bold">Recent Battles</h2>
            <Badge variant="secondary" className="font-mono">last 24h</Badge>
          </div>
          <div className="space-y-2">
            {recentBattles.map((b, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-4 hover:bg-background/70 transition-colors">
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-sm ${
                    b.result === "win" ? "bg-success/20 text-success" :
                    b.result === "loss" ? "bg-destructive/20 text-destructive" :
                    "bg-warning/20 text-warning"
                  }`}>
                    {b.result === "win" ? "W" : b.result === "loss" ? "L" : "D"}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">vs {b.opponent}</p>
                    <p className="text-xs text-muted-foreground truncate">{b.problem}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-mono font-semibold ${b.points > 0 ? "text-primary" : "text-muted-foreground"}`}>
                    {b.points > 0 ? `+${b.points}` : "0"}
                  </p>
                  <p className="text-xs text-muted-foreground">{b.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-card/60 border-border/60">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-bold">Top Players</h2>
            <Link to="/leaderboard" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {leaderboard.slice(0, 5).map((p) => (
              <div key={p.rank} className="flex items-center gap-3">
                <span className={`font-display text-sm font-bold w-6 ${p.rank <= 3 ? "text-primary" : "text-muted-foreground"}`}>
                  #{p.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{p.rating}</p>
                </div>
                {p.rank === 1 && <Zap className="h-4 w-4 text-primary" />}
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
