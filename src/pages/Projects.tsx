import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { FeedItem } from "@/components/FeedItem";
import { Carousel, CarouselItem } from "@/components/Carousel";
import flowLinesVertical from "@/assets/flow-lines-vertical.svg";

// Project data - Energy, Education, Policy focus
const projects = [
  {
    id: "1",
    title: "Campus Energy Automation",
    description: "AI-driven system to flag overconsumption across heating, grid power, and solar on college campuses. Built with localized logic to avoid constant micromanagement.",
    date: "2025-03-15",
    tags: ["Energy", "AI", "Hardware Integration"],
    coverImage: flowLinesVertical,
    readingTime: 6,
  },
  {
    id: "2",
    title: "Academic Matchmaking Platform",
    description: "Decentralized platform replacing low-scale vendor outsourcing with student-powered work. Connects departments with aligned students for credit and hands-on experience.",
    date: "2025-02-10",
    tags: ["Education", "Platform", "Penn State"],
    readingTime: 5,
  },
  {
    id: "3",
    title: "NJ Energy Supplier Integration",
    description: "Designed compliance-first architecture for metered hardware integration, combining sensor data with localized decision logic.",
    date: "2025-01-20",
    tags: ["Energy", "Compliance", "Localized Logic"],
    readingTime: 7,
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-8 py-24 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title="Projects"
            description="Energy systems, academic platforms, and compliance-first architectures. Each built for the specific constraints of its local environment."
          />
          <a
            href="https://photos.app.goo.gl/1LkM3S9vfY7EE4Do9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-green-600 hover:bg-green-700 text-white transition-colors whitespace-nowrap"
          >
            edu/energy samples
          </a>
        </div>

        {/* Featured Projects Carousel */}
        {projects.length > 3 && (
          <section className="mb-16">
            <h3 className="text-2xl font-serif font-semibold mb-6">Featured</h3>
            <Carousel>
              {projects.slice(0, 3).map((project) => (
                <CarouselItem key={project.id}>
                  <FeedItem
                    title={project.title}
                    description={project.description}
                    date={project.date}
                    path={`/projects/${project.id}`}
                    tags={project.tags}
                    coverImage={project.coverImage}
                    readingTime={project.readingTime}
                  />
                </CarouselItem>
              ))}
            </Carousel>
          </section>
        )}

        {/* All Projects Grid */}
        <section>
          <h3 className="text-2xl font-serif font-semibold mb-6">All Projects</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <FeedItem
                key={project.id}
                title={project.title}
                description={project.description}
                date={project.date}
                path={`/projects/${project.id}`}
                tags={project.tags}
                coverImage={project.coverImage}
                readingTime={project.readingTime}
              />
            ))}
          </div>
        </section>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No projects yet. Start building!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Projects;
