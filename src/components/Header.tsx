import { Link, useLocation } from "react-router-dom";
import { Menu, Home, Brain, Lightbulb, BookOpen, Briefcase, Mail, User, Settings, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LucideIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const navigation: {
  name: string;
  path: string;
  icon: LucideIcon;
}[] = [
  { name: "Home", path: "/", icon: Home },
  { name: "Projects", path: "/projects", icon: Brain },
  { name: "Community", path: "/community", icon: Users },
  { name: "Ideas", path: "/idea-dumps", icon: Lightbulb },
  { name: "Journal", path: "/journal", icon: BookOpen },
  { name: "Resume", path: "/resume", icon: Briefcase },
  { name: "Contact", path: "/contact", icon: Mail },
];

export const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  const NavLink = ({
    name,
    path,
    icon: Icon,
    mobile = false,
  }: {
    name: string;
    path: string;
    icon: LucideIcon;
    mobile?: boolean;
  }) => {
    const isActive = location.pathname === path;
    
    return (
      <Link
        to={path}
        onClick={() => mobile && setMobileMenuOpen(false)}
        className={cn(
          "group relative px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest transition-all duration-300",
          "flex items-center gap-1.5",
          // 3D effect styles
          "hover:translate-y-[-2px] hover:shadow-lg",
          "active:translate-y-[1px] active:shadow-sm",
          isActive
            ? "text-primary bg-primary/10 rounded-md shadow-[0_2px_0_0_hsl(var(--primary))]"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md",
          mobile && "text-sm py-3 px-4 w-full justify-start"
        )}
      >
        <Icon className={cn("h-3 w-3 transition-transform group-hover:scale-110", mobile && "h-4 w-4")} />
        <span className="relative">
          {name}
          {!isActive && !mobile && (
            <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
          )}
        </span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile-first: Bottom navigation bar on small screens */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border">
        <div className="flex items-center justify-around py-2 px-1">
          {navigation.slice(0, 5).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all duration-200",
                  "active:scale-95",
                  isActive
                    ? "text-primary bg-primary/10 shadow-[0_2px_8px_-2px_hsl(var(--primary)/0.4)]"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive && "animate-scale-in")} />
                <span className="text-[8px] font-medium uppercase tracking-wide">{item.name}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center gap-0.5 px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Menu className="h-4 w-4" />
            <span className="text-[8px] font-medium uppercase tracking-wide">More</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-[60] bg-background/98 backdrop-blur-lg transition-all duration-300",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-serif font-bold text-foreground uppercase text-sm tracking-tight">brainOS</span>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid gap-2">
              {navigation.map((item) => (
                <NavLink key={item.path} {...item} mobile />
              ))}
              {isAdmin && <NavLink name="Admin" path="/admin" icon={Settings} mobile />}
              {!user && <NavLink name="Login" path="/auth" icon={User} mobile />}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop header */}
      <header className="hidden md:block sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
        <nav className="container mx-auto h-12 flex items-center justify-between max-w-7xl px-4">
          <Link
            to="/"
            className="font-serif font-bold text-foreground hover:opacity-60 transition-all duration-300 tracking-tight uppercase text-xs hover:translate-y-[-1px]"
          >
            brainOS
          </Link>

          <div className="flex items-center gap-0.5">
            {navigation.map((item) => (
              <NavLink key={item.path} {...item} />
            ))}
            {isAdmin && <NavLink name="Admin" path="/admin" icon={Settings} />}
            {!user && <NavLink name="Login" path="/auth" icon={User} />}
            <ThemeToggle className="ml-2" />
          </div>
        </nav>
      </header>
    </>
  );
};
