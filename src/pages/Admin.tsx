import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '@/hooks/useProjects';
import { useJournalEntries } from '@/hooks/useJournalEntries';
import { useIdeaDumps } from '@/hooks/useIdeaDumps';
import { Skeleton } from '@/components/ui/skeleton';

const Admin = () => {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: journalEntries, isLoading: journalLoading } = useJournalEntries();
  const { data: ideaDumps, isLoading: ideasLoading } = useIdeaDumps();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const stats = [
    { 
      label: 'Projects', 
      count: projects?.length ?? 0, 
      loading: projectsLoading,
      path: '/projects' 
    },
    { 
      label: 'Journal Entries', 
      count: journalEntries?.length ?? 0, 
      loading: journalLoading,
      path: '/journal' 
    },
    { 
      label: 'Idea Dumps', 
      count: ideaDumps?.length ?? 0, 
      loading: ideasLoading,
      path: '/idea-dumps' 
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Logged in as {user?.email}
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        {isAdmin && (
          <div className="mb-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm font-medium text-primary">
              ✓ Admin privileges active
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              You can create, edit, and delete content.
            </p>
          </div>
        )}

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Content Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-border rounded-lg p-4 bg-card hover:border-primary/30 transition-colors cursor-pointer"
                onClick={() => navigate(stat.path)}
              >
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                {stat.loading ? (
                  <Skeleton className="h-8 w-16 mt-1" />
                ) : (
                  <p className="text-2xl font-bold mt-1">{stat.count}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Content management coming soon. For now, manage content directly in Supabase.
            </p>
            <a
              href="https://supabase.com/dashboard/project/qordrjcwmwkigkfyxpbm/editor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-primary hover:underline"
            >
              Open Supabase Table Editor →
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Admin;
