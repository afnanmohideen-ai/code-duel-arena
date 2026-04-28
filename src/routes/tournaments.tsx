import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, IndianRupee, Users, Clock, Trophy } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/tournaments")({
  head: () => ({
    meta: [
      { title: "Tournaments — CodeClash" },
      { name: "description", content: "Join scheduled DSA tournaments and win cash prizes." },
    ],
  }),
  component: TournamentsPage,
});

const tournaments = [
  { name: "Weekend Warrior #42", status: "live", players: 248, prize: 25000, starts: "Live now", duration: "90 min", level: "All ratings" },
  { name: "Sunday Sprint", status: "upcoming", players: 156, prize: 10000, starts: "in 4h 12m", duration: "60 min", level: "<1800 rating" },
  { name: "Campus Clash — IIT/NIT", status: "upcoming", players: 89, prize: 50000, starts: "Sat, 7:00 PM", duration: "120 min", level: "College ID required" },
  { name: "Monthly Championship", status: "upcoming", players: 412, prize: 150000, starts: "Apr 30, 6:00 PM", duration: "180 min", level: "1900+ rating" },
  { name: "Beginner Battle", status: "ended", players: 320, prize: 5000, starts: "Yesterday", duration: "45 min", level: "<1500 rating" },
];

const statusBadge = (s: string) =>
  s === "live" ? "bg-destructive/20 text-destructive border-destructive/30 animate-pulse" :
  s === "upcoming" ? "bg-primary/20 text-primary border-primary/30" :
  "bg-muted text-muted-foreground border-border";

function TournamentsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div>
        <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary mb-2">
          <Trophy className="mr-1 h-3 w-3" /> Cash prizes
        </Badge>
        <h1 className="font-display text-3xl lg:text-4xl font-bold">Tournaments</h1>
        <p className="text-muted-foreground mt-1">Compete in scheduled events. Bigger fields, bigger pots.</p>
      </div>

      <Card className="p-6 bg-card/60 border-border/60 overflow-hidden relative" style={{ background: "var(--gradient-dark)" }}>
        <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-ember)" }} />
        <div className="relative grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <Badge className="bg-destructive/30 text-destructive border-destructive/40 mb-2">● LIVE</Badge>
            <h2 className="font-display text-2xl font-bold">Weekend Warrior #42</h2>
            <p className="text-muted-foreground text-sm mt-1">5 problems · 90 minutes · 248 players battling right now</p>
            <div className="flex items-center gap-4 mt-4 text-sm">
              <span className="flex items-center gap-1 text-primary font-mono"><IndianRupee className="h-4 w-4" />25,000 pot</span>
              <span className="flex items-center gap-1 text-muted-foreground"><Users className="h-4 w-4" />248</span>
            </div>
          </div>
          <Button size="lg" className="gap-2" style={{ background: "var(--gradient-ember)", boxShadow: "var(--shadow-ember)" }} onClick={() => toast.success("Joining tournament...")}>
            Join Now
          </Button>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {tournaments.map((t, i) => (
          <Card key={i} className="p-5 bg-card/60 border-border/60">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Badge className={statusBadge(t.status)}>{t.status.toUpperCase()}</Badge>
                <h3 className="font-display text-lg font-bold mt-2 truncate">{t.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{t.level}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-display text-xl font-bold text-primary flex items-center gap-0.5">
                  <IndianRupee className="h-4 w-4" />{t.prize.toLocaleString("en-IN")}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">prize pool</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground"><Calendar className="h-3 w-3" />{t.starts}</div>
              <div className="flex items-center gap-1.5 text-muted-foreground"><Clock className="h-3 w-3" />{t.duration}</div>
              <div className="flex items-center gap-1.5 text-muted-foreground"><Users className="h-3 w-3" />{t.players}</div>
            </div>
            <Button
              size="sm"
              className="w-full mt-4"
              variant={t.status === "ended" ? "outline" : "default"}
              disabled={t.status === "ended"}
              onClick={() => toast.success(t.status === "live" ? "Joining..." : "Registered!")}
            >
              {t.status === "live" ? "Join Now" : t.status === "upcoming" ? "Register" : "Ended"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
