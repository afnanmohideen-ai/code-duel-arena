import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Trophy, Crown, Medal, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { leaderboard } from "@/lib/mock";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — CodeClash" },
      { name: "description", content: "Top DSA battle players ranked by rating. Climb the board, win cash prizes." },
    ],
  }),
  component: LeaderboardPage,
});

function LeaderboardPage() {
  const [first, second, third, ...rest] = leaderboard;
  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-8">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary uppercase tracking-widest text-[10px]">Season 4</Badge>
        </div>
        <h1 className="font-display text-4xl lg:text-5xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground">Top 100 split ₹5,00,000 in monthly cash prizes.</p>
      </header>

      {/* Podium */}
      <div className="grid grid-cols-3 gap-4 items-end">
        {[second, first, third].map((p, idx) => {
          const isFirst = p.rank === 1;
          const heights = ["h-32", "h-44", "h-28"];
          return (
            <Card key={p.rank} className={`p-5 text-center bg-card/60 border-border/60 ${isFirst ? "ring-2 ring-primary" : ""}`}>
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full" style={isFirst ? { background: "var(--gradient-ember)", boxShadow: "var(--shadow-ember)" } : { background: "var(--secondary)" }}>
                {isFirst ? <Crown className="h-6 w-6 text-primary-foreground" /> : <Medal className="h-5 w-5" />}
              </div>
              <p className="font-display font-bold truncate">{p.name}</p>
              <p className="text-xs text-muted-foreground font-mono">{p.rating}</p>
              <div className={`mt-3 ${heights[idx]} rounded-md flex items-center justify-center font-display text-3xl font-bold ${isFirst ? "text-primary" : "text-muted-foreground"}`}
                style={{ background: "var(--gradient-dark)" }}>
                #{p.rank}
              </div>
              <p className="mt-2 flex items-center justify-center gap-0.5 text-sm font-semibold">
                <IndianRupee className="h-3.5 w-3.5" />{p.prize.toLocaleString("en-IN")}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Table */}
      <Card className="bg-card/60 border-border/60 overflow-hidden">
        <div className="grid grid-cols-12 border-b border-border/60 bg-background/40 px-5 py-3 text-xs uppercase tracking-wider text-muted-foreground">
          <div className="col-span-1">#</div>
          <div className="col-span-5">Player</div>
          <div className="col-span-2 text-right">Rating</div>
          <div className="col-span-2 text-right">Wins</div>
          <div className="col-span-2 text-right">Prize</div>
        </div>
        {rest.map((p) => (
          <div key={p.rank} className="grid grid-cols-12 items-center border-b border-border/40 px-5 py-4 hover:bg-background/40 transition-colors last:border-0">
            <div className="col-span-1 font-display font-bold text-muted-foreground">#{p.rank}</div>
            <div className="col-span-5">
              <p className="font-medium">{p.name} <span className="ml-1">{p.country}</span></p>
              <p className="text-xs text-muted-foreground">{p.handle}</p>
            </div>
            <div className="col-span-2 text-right font-mono text-primary">{p.rating}</div>
            <div className="col-span-2 text-right font-mono">{p.wins}</div>
            <div className="col-span-2 text-right font-mono flex items-center justify-end">
              <IndianRupee className="h-3 w-3" />{p.prize.toLocaleString("en-IN")}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
