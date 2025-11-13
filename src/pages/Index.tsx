import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Carousel, CarouselItem } from "@/components/Carousel";
import { FeedItem } from "@/components/FeedItem";
import flowLinesHero from "@/assets/flow-lines-hero.svg";
import flowLinesCircle from "@/assets/flow-lines-circle.svg";
import flowLinesVertical from "@/assets/flow-lines-vertical.svg";

// Sample featured content
const featuredProjects = [
  {
    id: "1",
    title: "Personal Knowledge Base",
    description: "A React-based knowledge management system for organizing projects, ideas, and journal entries with a clean, reader-first design.",
    date: "2024-03-15",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    coverImage: flowLinesVertical,
    readingTime: 5,
    type: "project" as const,
  },
  {
    id: "2",
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for visualizing complex datasets with real-time updates and customizable charts.",
    date: "2024-02-20",
    tags: ["D3.js", "React", "API Integration"],
    readingTime: 8,
    type: "project" as const,
  },
  {
    id: "1",
    title: "Reflections on Building in Public",
    description: "Thoughts on sharing my learning journey openly and the unexpected benefits of transparency in the development process.",
    date: "2024-03-20",
    tags: ["Learning", "Community", "Growth"],
    readingTime: 4,
    type: "journal" as const,
  },
];

const Index = () => {
  const sections = [
    {
      title: "Projects",
      description: "Technical projects, experiments, and builds showcasing my work and learning journey.",
      path: "/projects",
    },
    {
      title: "Idea Dumps",
      description: "Raw thoughts, concepts, and brainstorms—a collection of ideas waiting to be refined.",
      path: "/idea-dumps",
    },
    {
      title: "Journal",
      description: "Personal reflections, learnings, and experiences documented over time.",
      path: "/journal",
    },
    {
      title: "Resume",
      description: "Professional experience, skills, and achievements in one place.",
      path: "/resume",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Flow Lines */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={flowLinesHero} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-8 py-32 max-w-4xl relative z-10">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <img 
                src={flowLinesCircle} 
                alt="" 
                className="w-24 h-24 opacity-20"
              />
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 tracking-tight">
              brainOS
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A personal knowledge base for capturing projects, ideas, journal entries, and professional milestones.
            </p>
          </div>
        </div>
      </section>

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
  );
};

export default Index;
