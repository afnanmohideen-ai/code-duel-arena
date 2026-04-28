import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Copy, Swords, Plus, LogIn } from "lucide-react";
import { friends } from "@/lib/mock";
import { toast } from "sonner";

export const Route = createFileRoute("/friends")({
  head: () => ({
    meta: [
      { title: "Friends — CodeClash" },
      { name: "description", content: "Challenge friends to private DSA battles via room codes." },
    ],
  }),
  component: FriendsPage,
});

const generateCode = () => Math.random().toString(36).slice(2, 8).toUpperCase();

function FriendsPage() {
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [joinCode, setJoinCode] = useState("");

  const createRoom = () => {
    const c = generateCode();
    setRoomCode(c);
    toast.success(`Room created: ${c}`);
  };
  const copyCode = () => {
    if (!roomCode) return;
    navigator.clipboard.writeText(roomCode);
    toast.success("Code copied");
  };
  const joinRoom = () => {
    if (joinCode.length < 4) return toast.error("Enter a valid code");
    toast.success(`Joining room ${joinCode.toUpperCase()}...`);
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-8">
      <header>
        <h1 className="font-display text-4xl lg:text-5xl font-bold">Friends</h1>
        <p className="text-muted-foreground mt-2">Create a private room and battle your friends 1v1.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Create room */}
        <Card className="p-6 bg-card/60 border-border/60 space-y-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2 text-primary"><Plus className="h-4 w-4" /></div>
            <h2 className="font-display text-xl font-bold">Create a Room</h2>
          </div>
          <p className="text-sm text-muted-foreground">Generate a 6-character code. Share it with a friend to start the battle.</p>
          {roomCode ? (
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded-lg border border-primary/40 bg-primary/5 px-4 py-3 font-mono text-2xl font-bold tracking-[0.4em] text-center text-primary">
                {roomCode}
              </div>
              <Button variant="outline" size="icon" onClick={copyCode}><Copy className="h-4 w-4" /></Button>
            </div>
          ) : (
            <Button onClick={createRoom} className="w-full gap-2" style={{ background: "var(--gradient-ember)" }}>
              <Plus className="h-4 w-4" /> Generate Room Code
            </Button>
          )}
          {roomCode && (
            <Button variant="outline" className="w-full gap-2">
              <Swords className="h-4 w-4" /> Waiting for opponent...
            </Button>
          )}
        </Card>

        {/* Join room */}
        <Card className="p-6 bg-card/60 border-border/60 space-y-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2 text-primary"><LogIn className="h-4 w-4" /></div>
            <h2 className="font-display text-xl font-bold">Join a Room</h2>
          </div>
          <p className="text-sm text-muted-foreground">Got a code from a friend? Drop it in.</p>
          <Input
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase().slice(0, 6))}
            placeholder="ABC123"
            className="font-mono text-center text-2xl tracking-[0.4em] h-14 uppercase"
          />
          <Button onClick={joinRoom} variant="outline" className="w-full gap-2">
            <LogIn className="h-4 w-4" /> Join Battle
          </Button>
        </Card>
      </div>

      {/* Friends list */}
      <Card className="p-6 bg-card/60 border-border/60">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="font-display text-xl font-bold">Your Friends</h2>
          </div>
          <Badge variant="secondary">{friends.length} total</Badge>
        </div>
        <div className="space-y-2">
          {friends.map((f) => (
            <div key={f.handle} className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-display font-bold">
                    {f.name[0]}
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card ${
                    f.status === "online" ? "bg-success" :
                    f.status === "in-battle" ? "bg-primary animate-pulse" : "bg-muted-foreground"
                  }`} />
                </div>
                <div>
                  <p className="font-medium">{f.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{f.rating} • {f.status}</p>
                </div>
              </div>
              <Button
                size="sm"
                variant={f.status === "online" ? "default" : "outline"}
                disabled={f.status !== "online"}
                className="gap-1.5"
                onClick={() => toast.success(`Challenge sent to ${f.name}`)}
              >
                <Swords className="h-3.5 w-3.5" /> Challenge
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
