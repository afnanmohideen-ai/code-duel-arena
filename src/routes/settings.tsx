import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell, Wallet, Shield, LogOut } from "lucide-react";
import { toast } from "sonner";
import { currentUser } from "@/lib/mock";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — CodeClash" },
      { name: "description", content: "Manage your account, notifications, and payout details." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved");
  };

  return (
    <div className="p-6 lg:p-8 max-w-[900px] mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences.</p>
      </div>

      <Card className="p-6 bg-card/60 border-border/60">
        <h2 className="font-display text-lg font-bold mb-4">Account</h2>
        <form onSubmit={save} className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Display name</Label>
            <Input id="name" defaultValue={currentUser.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="handle">Handle</Label>
            <Input id="handle" defaultValue={currentUser.handle} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="aarav@college.edu" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="college">College</Label>
            <Input id="college" defaultValue="IIT Bombay" />
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <Button type="submit" style={{ background: "var(--gradient-ember)" }}>Save changes</Button>
          </div>
        </form>
      </Card>

      <Card className="p-6 bg-card/60 border-border/60">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-4 w-4 text-primary" />
          <h2 className="font-display text-lg font-bold">Notifications</h2>
        </div>
        <div className="space-y-4">
          {[
            { id: "n1", label: "Match invites from friends", def: true },
            { id: "n2", label: "Tournament reminders", def: true },
            { id: "n3", label: "Weekly leaderboard recap", def: true },
            { id: "n4", label: "Marketing emails", def: false },
          ].map((n) => (
            <div key={n.id} className="flex items-center justify-between">
              <Label htmlFor={n.id} className="font-normal">{n.label}</Label>
              <Switch id={n.id} defaultChecked={n.def} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-card/60 border-border/60">
        <div className="flex items-center gap-2 mb-4">
          <Wallet className="h-4 w-4 text-primary" />
          <h2 className="font-display text-lg font-bold">Payout</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="upi">UPI ID</Label>
            <Input id="upi" placeholder="yourname@upi" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pan">PAN (for payouts &gt; ₹10,000)</Label>
            <Input id="pan" placeholder="ABCDE1234F" />
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-border/60 bg-background/40 p-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Available balance</p>
            <p className="font-display text-2xl font-bold text-primary mt-1">₹{currentUser.prize.toLocaleString("en-IN")}</p>
          </div>
          <Button variant="outline" onClick={() => toast.success("Withdrawal initiated")}>Withdraw</Button>
        </div>
      </Card>

      <Card className="p-6 bg-card/60 border-border/60">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-4 w-4 text-primary" />
          <h2 className="font-display text-lg font-bold">Security</h2>
        </div>
        <Button variant="outline" onClick={() => toast("Password reset email sent")}>Change password</Button>
        <Separator className="my-5" />
        <Button variant="outline" className="gap-2 text-destructive hover:text-destructive" onClick={() => toast("Signed out")}>
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </Card>
    </div>
  );
}
