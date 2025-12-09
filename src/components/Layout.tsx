import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a 
        href="#main-content" 
        className="skip-to-content focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <footer className="border-t border-border bg-background">
        <div className="container mx-auto max-w-6xl px-8 py-12">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-serif font-semibold text-lg mb-4">brainOS</p>
              <p className="text-muted-foreground text-sm">
                A personal knowledge base for organizing projects, ideas, and reflections.
              </p>
            </div>
            <div id="contact" className="sm:text-right">
              <p className="font-semibold mb-2">Contact</p>
              <p className="text-muted-foreground text-sm">hello@brainos.dev</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} brainOS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
