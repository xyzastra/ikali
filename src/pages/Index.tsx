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
        <section className="container mx-auto px-8 py-24 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            {sections.map((section) => (
              <Link
                key={section.path}
                to={section.path}
                className="group border border-border p-12 hover:bg-muted transition-colors"
              >
                <h2 className="text-3xl font-serif font-bold mb-4 group-hover:opacity-60 transition-opacity">
                  {section.title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {section.description}
                </p>
                <div className="mt-6 text-sm uppercase tracking-widest font-medium">
                  Explore →
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
