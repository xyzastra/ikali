import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProject, useProjects } from "@/hooks/useProjects";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectDetail = () => {
  const { id } = useParams();
  const { data: project, isLoading, error } = useProject(id);
  const { data: allProjects } = useProjects();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-8 py-24 max-w-4xl">
          <Skeleton className="h-6 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-2/3 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-8 py-24 max-w-4xl text-center">
          <div className="rounded-xl border border-border bg-card p-8">
            <h1 className="text-4xl font-serif font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist or may have been moved.</p>
            <p className="text-sm text-muted-foreground mb-6">
              <span className="font-mono bg-muted px-2 py-1 rounded">Tip:</span> Project URLs use UUIDs like{" "}
              <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">/projects/e81b8f07-ba0e-4ea3-bf8b-42c5df439a5b</span>
            </p>
            <Link to="/projects">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const relatedProjects = allProjects?.filter((p) => p.id !== project.id).slice(0, 2) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-8 py-24 max-w-4xl">
        <Link to="/projects" className="inline-flex items-center text-sm mb-8 hover:opacity-60 transition-opacity uppercase tracking-widest">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>

        <article>
          <header className="mb-12 pb-8 border-b border-border">
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-mono mb-4">
              <time dateTime={project.published_date || project.created_at}>
                {new Date(project.published_date || project.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </time>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 tracking-tight">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              {project.description}
            </p>
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="font-mono uppercase tracking-wider">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          <div className="prose prose-lg max-w-none">
            {project.content?.split('\n').map((paragraph, index) => {
              if (paragraph.trim().startsWith('##')) {
                return (
                  <h2 key={index} className="text-3xl font-serif font-bold mt-12 mb-4">
                    {paragraph.replace('##', '').trim()}
                  </h2>
                );
              }
              if (paragraph.trim().startsWith('-')) {
                return (
                  <li key={index} className="ml-6 my-2">
                    {paragraph.replace('-', '').trim()}
                  </li>
                );
              }
              if (paragraph.trim()) {
                return (
                  <p key={index} className="mb-6 text-lg leading-relaxed">
                    {paragraph}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </article>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <section className="mt-24 pt-12 border-t border-border">
            <h2 className="text-2xl font-serif font-bold mb-8 uppercase tracking-widest">Related Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  to={`/projects/${relatedProject.id}`}
                  className="group block p-6 border border-border rounded-sm hover:bg-muted/50 transition-colors"
                >
                  <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-2">
                    {new Date(relatedProject.published_date || relatedProject.created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short'
                    })}
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2 group-hover:opacity-70 transition-opacity">
                    {relatedProject.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {relatedProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {relatedProject.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="font-mono text-xs uppercase tracking-wider">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ProjectDetail;