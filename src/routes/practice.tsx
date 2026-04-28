import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle2, Circle, Flame } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Practice — CodeClash" },
      { name: "description", content: "Sharpen your DSA skills solo before entering the arena." },
    ],
  }),
  component: PracticePage,
});

const topics = [
  { name: "Arrays & Hashing", solved: 18, total: 24 },
  { name: "Two Pointers", solved: 9, total: 14 },
  { name: "Sliding Window", solved: 7, total: 12 },
  { name: "Binary Search", solved: 11, total: 16 },
  { name: "Linked List", solved: 6, total: 13 },
  { name: "Trees", solved: 12, total: 22 },
  { name: "Graphs", solved: 4, total: 18 },
  { name: "Dynamic Programming", solved: 5, total: 25 },
];

const problems = [
  { title: "Two Sum", topic: "Arrays & Hashing", difficulty: "Easy", solved: true, acceptance: 54 },
  { title: "Valid Anagram", topic: "Arrays & Hashing", difficulty: "Easy", solved: true, acceptance: 63 },
  { title: "Longest Substring Without Repeating", topic: "Sliding Window", difficulty: "Medium", solved: false, acceptance: 34 },
  { title: "Container With Most Water", topic: "Two Pointers", difficulty: "Medium", solved: true, acceptance: 55 },
  { title: "Binary Tree Level Order Traversal", topic: "Trees", difficulty: "Medium", solved: false, acceptance: 64 },
  { title: "Course Schedule", topic: "Graphs", difficulty: "Medium", solved: false, acceptance: 46 },
  { title: "Coin Change", topic: "Dynamic Programming", difficulty: "Medium", solved: false, acceptance: 41 },
  { title: "Word Ladder", topic: "Graphs", difficulty: "Hard", solved: false, acceptance: 38 },
];

const diffColor = (d: string) =>
  d === "Easy" ? "bg-success/20 text-success border-success/30" :
  d === "Medium" ? "bg-warning/20 text-warning border-warning/30" :
  "bg-destructive/20 text-destructive border-destructive/30";

function PracticePage() {
  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary mb-2">
            <BookOpen className="mr-1 h-3 w-3" /> Solo mode
          </Badge>
          <h1 className="font-display text-3xl lg:text-4xl font-bold">Practice Hub</h1>
          <p className="text-muted-foreground mt-1">Train without the pressure. No rating, no opponent — just you and the problem.</p>
        </div>
        <Button size="lg" className="gap-2" style={{ background: "var(--gradient-ember)" }} onClick={() => toast.success("Daily challenge: Binary Tree Level Order")}>
          <Flame className="h-4 w-4" /> Daily Challenge
        </Button>
      </div>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {topics.map((t) => {
          const pct = Math.round((t.solved / t.total) * 100);
          return (
            <Card key={t.name} className="p-4 bg-card/60 border-border/60">
              <p className="text-sm font-medium truncate">{t.name}</p>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono">{t.solved}/{t.total}</span>
                <span className="font-mono text-primary">{pct}%</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "var(--gradient-ember)" }} />
              </div>
            </Card>
          );
        })}
      </section>

      <Card className="p-6 bg-card/60 border-border/60">
        <h2 className="font-display text-xl font-bold mb-4">Problems</h2>
        <div className="space-y-2">
          {problems.map((p, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-4 hover:bg-background/70 transition-colors">
              <div className="flex items-center gap-4 min-w-0">
                {p.solved ? <CheckCircle2 className="h-5 w-5 text-success shrink-0" /> : <Circle className="h-5 w-5 text-muted-foreground shrink-0" />}
                <div className="min-w-0">
                  <p className="font-medium truncate">{p.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{p.topic}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-xs font-mono text-muted-foreground">{p.acceptance}%</span>
                <Badge className={diffColor(p.difficulty)}>{p.difficulty}</Badge>
                <Button size="sm" variant="outline" onClick={() => toast("Loading problem...")}>Solve</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
