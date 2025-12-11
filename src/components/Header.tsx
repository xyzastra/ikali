import { Link, useLocation } from "react-router-dom";
import { Menu, Home, Brain, Lightbulb, BookOpen, Briefcase, Mail, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { LucideIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
const navigation: {
  name: string;
  path: string;
  icon: LucideIcon;
}[] = [{
  name: "Home",
  path: "/",
  icon: Home
}, {
  name: "Projects",
  path: "/projects",
  icon: Brain
}, {
  name: "Idea Dumps",
  path: "/idea-dumps",
  icon: Lightbulb
}, {
  name: "Journal",
  path: "/journal",
  icon: BookOpen
}, {
  name: "Resume",
  path: "/resume",
  icon: Briefcase
}, {
  name: "Contact",
  path: "/contact",
  icon: Mail
}];
export const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const {
    user,
    isAdmin
  } = useAuth();
  const NavLink = ({
    name,
    path,
    icon: Icon,
    mobile = false
  }: {
    name: string;
    path: string;
    icon: LucideIcon;
    mobile?: boolean;
  }) => {
    const isActive = location.pathname === path;
    return <Link to={path} onClick={() => mobile && setOpen(false)} className={`
          px-3 py-2 text-sm font-medium transition-opacity uppercase tracking-wide flex items-center gap-2
          ${isActive ? "text-foreground border-b-2 border-foreground" : "text-muted-foreground hover:text-foreground hover:opacity-70"}
        `}>
        <Icon className="h-4 w-4" />
        {name}
      </Link>;
  };
  return <header className="sticky top-0 z-50 w-full border-b border-border bg-header">
      <nav className="container mx-auto px-8 h-20 flex items-center justify-between max-w-7xl">
        <Link to="/" className="font-serif font-bold text-2xl text-foreground hover:opacity-60 transition-opacity tracking-tight uppercase">
          brainOS
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-[6px]">
          {navigation.map(item => <NavLink key={item.path} {...item} />)}
          {isAdmin && <NavLink name="Admin" path="/admin" icon={Settings} />}
          {!user && <NavLink name="Login" path="/auth" icon={User} />}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <div className="flex flex-col gap-4 mt-8">
              {navigation.map(item => <NavLink key={item.path} {...item} mobile />)}
              {isAdmin && <NavLink name="Admin" path="/admin" icon={Settings} mobile />}
              {!user && <NavLink name="Login" path="/auth" icon={User} mobile />}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>;
};