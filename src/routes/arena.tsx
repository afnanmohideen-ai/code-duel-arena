import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Swords, SkipForward, Send, Clock, Shield, AlertTriangle } from "lucide-react";
import { sampleProblem, starterCode } from "@/lib/mock";
import { toast } from "sonner";

export const Route = createFileRoute("/arena")({
  head: () => ({
    meta: [
      { title: "Battle Arena — CodeClash" },
      { name: "description", content: "Live 1v1 DSA battle. No copy-paste, real-time scoring, real opponent." },
    ],
  }),
  component: Arena,
});

function Arena() {
  const [matched, setMatched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [code, setCode] = useState(starterCode);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [opponentScore] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!matched) return;
    const t = setInterval(() => setTimeLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [matched]);

  const findMatch = () => {
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      setMatched(true);
      toast.success("Opponent found: Rohan Mehta (1812)");
    }, 1800);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    toast.error("Paste blocked — write your own code", { icon: <Shield className="h-4 w-4" /> });
  };
  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
    toast.error("Copy blocked");
  };
  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const k = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && (k === "v" || k === "c" || k === "x")) {
      e.preventDefault();
      toast.error(`${k.toUpperCase()} shortcut disabled`);
    }
  };

  const submit = () => {
    setMyScore((s) => s + 100);
    toast.success("All test cases passed! +100 points");
  };
  const skip = () => {
    toast("Question skipped. Opponent has 3 min to solve it.", { icon: <SkipForward className="h-4 w-4" /> });
  };

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  if (!matched) {
    return (
      <div className="p-6 lg:p-12 flex items-center justify-center min-h-[80vh]">
        <Card className="max-w-md w-full p-8 text-center bg-card/60 border-border/60">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: "var(--gradient-ember)", boxShadow: "var(--shadow-ember)" }}>
            <Swords className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold">Battle Arena</h1>
          <p className="text-sm text-muted-foreground mt-2">
            You'll be matched with a player near your rating. Same problem, same time. First to solve wins.
          </p>
          <Button size="lg" className="mt-6 w-full gap-2" onClick={findMatch} disabled={searching}
            style={{ background: "var(--gradient-ember)", boxShadow: "var(--shadow-ember)" }}>
            {searching ? "Finding opponent..." : (<><Swords className="h-4 w-4" /> Find a Match</>)}
          </Button>
          {searching && (
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Searching pool...
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 max-w-[1500px] mx-auto space-y-4">
      {/* Battle bar */}
      <Card className="p-4 bg-card/60 border-border/60 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">YOU</p>
            <p className="font-display font-bold">Aarav</p>
            <p className="font-mono text-primary text-lg">{myScore}</p>
          </div>
          <div className="font-display text-2xl text-muted-foreground">vs</div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">OPPONENT</p>
            <p className="font-display font-bold">Rohan</p>
            <p className="font-mono text-lg">{opponentScore}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-center rounded-full border border-primary/40 bg-primary/10 px-4 py-2">
          <Clock className="h-4 w-4 text-primary" />
          <span className="font-mono font-bold text-lg">{mm}:{ss}</span>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Problem */}
        <Card className="p-6 bg-card/60 border-border/60 overflow-auto max-h-[70vh]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-2xl font-bold">{sampleProblem.title}</h2>
            <Badge className="bg-success/20 text-success border-success/30">{sampleProblem.difficulty}</Badge>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{sampleProblem.description}</p>
          <div className="mt-5 space-y-3">
            {sampleProblem.examples.map((ex, i) => (
              <div key={i} className="rounded-lg bg-background/60 border border-border/60 p-3 font-mono text-xs space-y-1">
                <p><span className="text-muted-foreground">Input:</span> {ex.input}</p>
                <p><span className="text-muted-foreground">Output:</span> {ex.output}</p>
                {ex.explanation && <p className="text-muted-foreground italic">{ex.explanation}</p>}
              </div>
            ))}
          </div>
          <div className="mt-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Constraints</p>
            <ul className="space-y-1 text-xs font-mono text-muted-foreground">
              {sampleProblem.constraints.map((c, i) => <li key={i}>• {c}</li>)}
            </ul>
          </div>
        </Card>

        {/* Editor */}
        <Card className="bg-card/60 border-border/60 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5 bg-background/40">
            <span className="font-mono text-xs text-muted-foreground">solution.js</span>
            <div className="flex items-center gap-1.5 text-xs text-warning">
              <AlertTriangle className="h-3 w-3" />
              <span>Anti-cheat: paste disabled</span>
            </div>
          </div>
          <textarea
            ref={editorRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onPaste={handlePaste}
            onCopy={handleCopy}
            onCut={handleCopy}
            onContextMenu={handleContextMenu}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="flex-1 min-h-[400px] w-full resize-none bg-background/30 p-4 font-mono text-sm text-foreground outline-none selection:bg-primary/30"
          />
          <div className="flex items-center justify-end gap-2 border-t border-border/60 px-4 py-3 bg-background/40">
            <Button variant="outline" onClick={skip} className="gap-2">
              <SkipForward className="h-4 w-4" /> Skip
            </Button>
            <Button onClick={submit} className="gap-2" style={{ background: "var(--gradient-ember)" }}>
              <Send className="h-4 w-4" /> Submit
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
