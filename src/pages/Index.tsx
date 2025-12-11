import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { useProjects } from "@/hooks/useProjects";
import { useJournalEntries } from "@/hooks/useJournalEntries";
import { useIdeaDumps } from "@/hooks/useIdeaDumps";
import { ArrowRight, Zap, BookOpen, Lightbulb, FileText, User, Mail } from "lucide-react";

// Orbital node component
const OrbNode = ({ label, icon: Icon, className = "", delay = 0 }: { 
  label: string; 
  icon: React.ElementType;
  className?: string;
  delay?: number;
}) => (
  <div
    className={`absolute ${className} h-12 w-12 rounded-xl bg-card border border-border flex items-center justify-center shadow-lg animate-float`}
    style={{ animationDelay: `${delay}s` }}
  >
    <Icon className="w-5 h-5 text-primary" />
    <span className="sr-only">{label}</span>
  </div>
);

// Preview card component
const PreviewCard = ({ 
  title, 
  label, 
  description, 
  to 
}: { 
  title: string; 
  label?: string; 
  description?: string; 
  to: string;
}) => (
  <Link
    to={to}
    className="group rounded-xl border border-border bg-card p-4 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
  >
    <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">
      {title}
    </p>
    <h3 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">
      {label || "Nothing logged yet"}
    </h3>
    <p className="text-xs text-muted-foreground line-clamp-2">
      {description || "Add your first entry to light this up."}
    </p>
    <span className="mt-3 inline-flex items-center gap-1 text-[11px] text-primary font-medium group-hover:gap-2 transition-all">
      Open <ArrowRight className="w-3 h-3" />
    </span>
  </Link>
);

const Index = () => {
  const { data: projects } = useProjects();
  const { data: journalEntries } = useJournalEntries();
  const { data: ideaDumps } = useIdeaDumps();

  const latestProject = projects?.[0];
  const latestJournal = journalEntries?.[0];
  const latestIdea = ideaDumps?.[0];

  const sections = [
    { title: "Projects", description: "Energy, platforms, and compliance-first systems.", path: "/projects", icon: Zap },
    { title: "Community", description: "Share and discover user projects.", path: "/community", icon: User },
    { title: "Ideas", description: "Raw concepts and policy frameworks.", path: "/idea-dumps", icon: Lightbulb },
    { title: "Journal", description: "Notes on hardware, policy, and education.", path: "/journal", icon: BookOpen },
    { title: "Resume", description: "Energy and manufacturing experience.", path: "/resume", icon: FileText },
    { title: "Contact", description: "Collaborate or connect.", path: "/contact", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Animated Brain */}
      <section className="relative overflow-hidden px-4 pt-12 pb-20">
        {/* Animated gradient blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-card px-3 py-1 text-[11px] uppercase tracking-widest text-primary mb-4">
              Campus Intelligence Stack
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-4">
              One place to track{" "}
              <span className="text-primary">projects</span>,{" "}
              <span className="text-accent-foreground">journal insights</span>, and{" "}
              <span className="text-muted-foreground">wild ideas</span>.
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6">
              Think of this as your personal campus lab notebook: energy pilots,
              governance experiments, and policy reflections all in one interface.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <Link
                to="/projects"
                className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                View Projects <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                to="/journal"
                className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm hover:bg-muted transition-colors"
              >
                Read Journal
              </Link>
              <Link
                to="/idea-dumps"
                className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm hover:bg-muted transition-colors"
              >
                Explore Ideas
              </Link>
            </div>
          </div>

          {/* Animated Brain Node */}
          <div className="flex-1 max-w-md w-full hidden lg:block">
            <div className="relative aspect-square rounded-3xl border border-border bg-gradient-to-br from-card via-background to-muted/30 shadow-2xl overflow-hidden">
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.15),transparent_50%),radial-gradient(circle_at_70%_70%,hsl(var(--accent)/0.2),transparent_50%)]" />

              {/* Orbital rings */}
              <div className="absolute inset-12 rounded-full border border-border/40 animate-spin-slow" />
              <div className="absolute inset-20 rounded-full border border-border/30 animate-spin-slow-reverse" />

              {/* Central node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-2xl bg-primary border border-primary flex items-center justify-center shadow-xl">
                <span className="text-xs font-semibold text-primary-foreground text-center leading-tight">
                  Campus<br />Brain
                </span>
              </div>

              {/* Orbiting nodes */}
              <OrbNode label="Projects" icon={Zap} className="top-4 left-1/2 -translate-x-1/2" delay={0} />
              <OrbNode label="Journal" icon={BookOpen} className="top-1/2 -translate-y-1/2 left-4" delay={0.5} />
              <OrbNode label="Ideas" icon={Lightbulb} className="bottom-4 left-1/2 -translate-x-1/2" delay={1} />
              <OrbNode label="Policy" icon={FileText} className="top-1/4 right-4" delay={1.5} />
              <OrbNode label="Energy" icon={Zap} className="bottom-1/4 right-4" delay={2} />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Preview Strip */}
      <section className="border-t border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 py-8 grid gap-4 md:grid-cols-3">
          <PreviewCard
            title="Latest Project"
            label={latestProject?.title}
            description={latestProject?.description}
            to={latestProject ? `/projects/${latestProject.id}` : "/projects"}
          />
          <PreviewCard
            title="Latest Journal"
            label={latestJournal?.title}
            description={latestJournal?.description}
            to={latestJournal ? `/journal/${latestJournal.id}` : "/journal"}
          />
          <PreviewCard
            title="Latest Idea"
            label={latestIdea?.title}
            description={latestIdea?.description}
            to={latestIdea ? `/idea-dumps/${latestIdea.id}` : "/idea-dumps"}
          />
        </div>
      </section>

      {/* Sections Grid */}
      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="text-2xl font-serif font-bold mb-6 text-center">Explore</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.path}
                to={section.path}
                className="group border border-border rounded-xl p-4 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 bg-card"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                    {section.title}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {section.description}
                </p>
                <span className="mt-2 text-[10px] uppercase tracking-wider text-primary flex items-center gap-1">
                  View <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Index;
