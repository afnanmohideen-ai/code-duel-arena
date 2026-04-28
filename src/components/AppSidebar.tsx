import { Link, useRouterState } from "@tanstack/react-router";
import { Swords, Trophy, Users, User, Home, Code2, BookOpen, Calendar, Settings, HelpCircle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const playItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Battle Arena", url: "/arena", icon: Swords },
  { title: "Tournaments", url: "/tournaments", icon: Calendar },
  { title: "Practice", url: "/practice", icon: BookOpen },
  { title: "Friends", url: "/friends", icon: Users },
];

const youItems = [
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "How it Works", url: "/how-it-works", icon: HelpCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "var(--gradient-ember)", boxShadow: "var(--shadow-ember)" }}>
            <Code2 className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-display text-base font-bold">CodeClash</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">DSA Battles</span>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {[
          { label: "Play", items: playItems },
          { label: "You", items: youItems },
        ].map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active = currentPath === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={active}>
                        <Link to={item.url} className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          {!collapsed && <span>{item.title}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
