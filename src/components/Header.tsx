import { Link, useLocation } from "react-router-dom";
import { Brain, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const navigation = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Idea Dumps", path: "/idea-dumps" },
  { name: "Journal", path: "/journal" },
  { name: "Resume", path: "/resume" },
];

export const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const NavLink = ({ name, path, mobile = false }: { name: string; path: string; mobile?: boolean }) => {
    const isActive = location.pathname === path;
    
    return (
      <Link
        to={path}
        onClick={() => mobile && setOpen(false)}
        className={`
          px-4 py-2 rounded-md text-sm font-medium transition-colors
          ${isActive 
            ? "text-primary bg-nav-hover" 
            : "text-foreground hover:text-primary hover:bg-nav-hover"
          }
        `}
      >
        {name}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-header/95 backdrop-blur supports-[backdrop-filter]:bg-header/80">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-foreground hover:text-primary transition-colors">
          <Brain className="h-6 w-6 text-primary" />
          <span>brainOS</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {navigation.map((item) => (
            <NavLink key={item.path} {...item} />
          ))}
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
              {navigation.map((item) => (
                <NavLink key={item.path} {...item} mobile />
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};
