import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Carousel, CarouselItem } from "@/components/Carousel";
import { FeedItem } from "@/components/FeedItem";
import { Component as RevolutionHero } from "@/components/ui/revolution-hero";
import flowLinesVertical from "@/assets/flow-lines-vertical.svg";

// Featured content - Energy, Education, Policy
const featuredProjects = [
  {
    id: "1",
    title: "Campus Energy Automation",
    description: "AI-driven system to flag overconsumption across heating, grid power, and solar on college campuses. Combines metered hardware with localized logic.",
    date: "2025-03-15",
    tags: ["Energy", "AI", "Hardware Integration"],
    coverImage: flowLinesVertical,
    readingTime: 6,
    type: "project" as const,
  },
  {
    id: "2",
    title: "Academic Matchmaking Platform",
    description: "Decentralized platform connecting academic departments with aligned students for credit-based, hands-on project work.",
    date: "2025-02-10",
    tags: ["Education", "Platform", "Student-Powered"],
    readingTime: 5,
    type: "project" as const,
  },
  {
    id: "1",
    title: "Policy Strategy for University Innovation",
    description: "Advancing legislation in Pennsylvania to support decentralized, student-driven impact at universities.",
    date: "2025-04-01",
    tags: ["Policy", "Advocacy", "Higher Ed"],
    readingTime: 4,
    type: "journal" as const,
  },
];

const Index = () => {
  const sections = [
    {
      title: "Projects",
      description: "Energy, platforms, and compliance-first systems.",
      path: "/projects",
    },
    {
      title: "Community",
      description: "Share and discover user projects.",
      path: "/community",
    },
    {
      title: "Ideas",
      description: "Raw concepts and policy frameworks.",
      path: "/idea-dumps",
    },
    {
      title: "Journal",
      description: "Notes on hardware, policy, and education.",
      path: "/journal",
    },
    {
      title: "Resume",
      description: "Energy and manufacturing experience.",
      path: "/resume",
    },
    {
      title: "Contact",
      description: "Collaborate or connect.",
      path: "/contact",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* WebGL Hero */}
      <RevolutionHero />

      <div className="bg-background">
        <Header />

        {/* Featured Content Carousel */}
        <section className="container mx-auto px-8 py-16 max-w-6xl border-b border-border">
          <h2 className="text-3xl font-serif font-bold mb-8">Featured</h2>
          <Carousel>
            {featuredProjects.map((item) => (
              <CarouselItem key={`${item.type}-${item.id}`}>
                <FeedItem
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  path={`/${item.type === 'project' ? 'projects' : 'journal'}/${item.id}`}
                  tags={item.tags}
                  coverImage={item.coverImage}
                  readingTime={item.readingTime}
                />
              </CarouselItem>
            ))}
          </Carousel>
        </section>

        {/* Sections Grid - Mobile First */}
        <section className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {sections.map((section) => (
              <Link
                key={section.path}
                to={section.path}
                className="group border border-border rounded-lg p-4 bg-card shadow-sm hover:shadow-md hover:bg-muted/50 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 active:scale-[0.97]"
              >
                <h3 className="text-sm sm:text-base font-semibold mb-1 group-hover:text-primary transition-colors">
                  {section.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                  {section.description}
                </p>
                <span className="mt-2 text-[10px] uppercase tracking-wider text-primary/70 group-hover:text-primary transition-colors flex items-center gap-1">
                  View <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
