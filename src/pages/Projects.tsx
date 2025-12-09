import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { FeedItem } from "@/components/FeedItem";
import { Carousel, CarouselItem } from "@/components/Carousel";
import { useProjects } from "@/hooks/useProjects";
import { Skeleton } from "@/components/ui/skeleton";

const Projects = () => {
  const { data: projects, isLoading, error } = useProjects();

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

        {isLoading && (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-destructive text-lg">Error loading projects. Please try again.</p>
          </div>
        )}

        {projects && projects.length > 0 && (
          <>
            {/* Featured Projects Carousel */}
            {projects.length > 3 && (
              <section className="mb-16">
                <h3 className="text-2xl font-serif font-semibold mb-6">Featured</h3>
                <Carousel>
                  {projects.slice(0, 3).map((project) => (
                    <CarouselItem key={project.id}>
                      <FeedItem
                        title={project.title}
                        description={project.description || ""}
                        date={project.published_date || project.created_at}
                        path={`/projects/${project.id}`}
                        tags={project.tags}
                        coverImage={project.cover_image_url || undefined}
                        readingTime={project.reading_time}
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
                    description={project.description || ""}
                    date={project.published_date || project.created_at}
                    path={`/projects/${project.id}`}
                    tags={project.tags}
                    coverImage={project.cover_image_url || undefined}
                    readingTime={project.reading_time}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {projects && projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No projects yet. Start building!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Projects;