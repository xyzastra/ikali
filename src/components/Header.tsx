import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const navigation = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Idea Dumps", path: "/idea-dumps" },
  { name: "Journal", path: "/journal" },
  { name: "Resume", path: "/resume" },
  { name: "Contact", path: "/contact" },
];

export const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const NavLink = ({
    name,
    path,
    mobile = false,
  }: {
    name: string;
    path: string;
    mobile?: boolean;
  }) => {
    const isActive = location.pathname === path;

    return (
      <Link
        to={path}
        onClick={() => mobile && setOpen(false)}
        aria-current={isActive ? "page" : undefined}
        className={`
          px-3 py-2 text-sm font-medium transition-opacity uppercase tracking-wide
          focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm
          ${
            isActive
              ? "text-foreground border-b-2 border-foreground"
              : "text-muted-foreground hover:text-foreground hover:opacity-70"
          }
        `}
      >
        {name}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-header backdrop-blur-sm">
      <nav
        aria-label="Main navigation"
        className="container mx-auto px-8 h-20 flex items-center justify-between max-w-7xl"
      >
        <Link
          to="/"
          className="font-serif font-bold text-2xl text-foreground hover:opacity-60 transition-opacity tracking-tight uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        >
          brainOS
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2" role="menubar">
          {navigation.map((item) => (
            <NavLink key={item.path} {...item} />
          ))}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open navigation menu"
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <nav aria-label="Mobile navigation" className="flex flex-col gap-4 mt-8">
              {navigation.map((item) => (
                <NavLink key={item.path} {...item} mobile />
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};
