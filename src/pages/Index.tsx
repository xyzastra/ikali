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
      description: "Energy systems, academic platforms, and compliance-first architectures built for local constraints.",
      path: "/projects",
    },
    {
      title: "Idea Dumps",
      description: "Raw concepts exploring decentralized solutions, policy frameworks, and student innovation.",
      path: "/idea-dumps",
    },
    {
      title: "Journal",
      description: "Reflections on bridging hardware, policy, and education through strategic systems work.",
      path: "/journal",
    },
    {
      title: "Resume",
      description: "Professional experience in energy, manufacturing, and education consulting.",
      path: "/resume",
    },
    {
      title: "Contact",
      description: "Get in touch for collaboration, questions, or opportunities.",
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

        {/* Sections Grid */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {sections.map((section) => (
              <Link
                key={section.path}
                to={section.path}
                className="group relative border border-border rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 hover:bg-muted/50 hover:border-primary/20 transition-all duration-300 active:scale-[0.98]"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-2 sm:mb-3 md:mb-4 group-hover:text-primary transition-colors">
                  {section.title}
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed line-clamp-3">
                  {section.description}
                </p>
                <div className="mt-4 sm:mt-5 md:mt-6 text-xs sm:text-sm uppercase tracking-widest font-medium text-primary opacity-70 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  Explore 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
