import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Target, TrendingUp, IndianRupee, Flame, Zap, Award } from "lucide-react";
import { currentUser, recentBattles } from "@/lib/mock";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — CodeClash" },
      { name: "description", content: "Your stats, achievements, and battle history." },
    ],
  }),
  component: ProfilePage,
});

const achievements = [
  { icon: Flame, label: "5-win streak", color: "text-primary" },
  { icon: Zap, label: "Sub-60s solve", color: "text-warning" },
  { icon: Award, label: "Top 50 player", color: "text-success" },
  { icon: Trophy, label: "100 wins club", color: "text-primary" },
];

function ProfilePage() {
  const winRate = Math.round((currentUser.wins / (currentUser.wins + currentUser.losses + currentUser.draws)) * 100);

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      {/* Header card */}
      <Card className="overflow-hidden bg-card/60 border-border/60">
        <div className="h-32 relative" style={{ background: "var(--gradient-ember)" }}>
          <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-glow)" }} />
        </div>
        <div className="px-6 pb-6 -mt-12 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="h-24 w-24 rounded-2xl border-4 border-card bg-secondary flex items-center justify-center font-display text-4xl font-bold">
                {currentUser.name[0]}
              </div>
              <div className="pb-2">
                <h1 className="font-display text-3xl font-bold">{currentUser.name}</h1>
                <p className="text-muted-foreground font-mono text-sm">{currentUser.handle}</p>
              </div>
            </div>
            <div className="flex gap-2 pb-2">
              <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1">
                <Trophy className="h-3 w-3 mr-1" /> Rank #{currentUser.rank}
              </Badge>
              <Button variant="outline" size="sm">Edit Profile</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: TrendingUp, label: "Rating", value: currentUser.rating, hl: true },
          { icon: Target, label: "Win Rate", value: `${winRate}%` },
          { icon: Trophy, label: "Wins / Losses", value: `${currentUser.wins}/${currentUser.losses}` },
          { icon: IndianRupee, label: "Total Earned", value: `₹${currentUser.prize.toLocaleString("en-IN")}`, hl: true },
        ].map((s, i) => (
          <Card key={i} className="p-5 bg-card/60 border-border/60">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <p className={`mt-2 font-display text-2xl font-bold ${s.hl ? "text-primary" : ""}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Battle history */}
        <Card className="lg:col-span-2 p-6 bg-card/60 border-border/60">
          <h2 className="font-display text-xl font-bold mb-5">Battle History</h2>
          <div className="space-y-2">
            {recentBattles.map((b, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-4">
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-sm ${
                    b.result === "win" ? "bg-success/20 text-success" :
                    b.result === "loss" ? "bg-destructive/20 text-destructive" :
                    "bg-warning/20 text-warning"
                  }`}>
                    {b.result === "win" ? "W" : b.result === "loss" ? "L" : "D"}
                  </div>
                  <div>
                    <p className="font-medium">vs {b.opponent}</p>
                    <p className="text-xs text-muted-foreground">{b.problem}</p>
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

        {/* Achievements */}
        <Card className="p-6 bg-card/60 border-border/60">
          <h2 className="font-display text-xl font-bold mb-5">Achievements</h2>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((a, i) => (
              <div key={i} className="rounded-lg border border-border/60 bg-background/40 p-4 text-center">
                <a.icon className={`h-6 w-6 mx-auto ${a.color}`} />
                <p className="mt-2 text-xs font-medium">{a.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
