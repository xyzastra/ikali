import { useState } from 'react';
import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { useProjects, useProject } from '@/hooks/useProjects';
import { useJournalEntries, useJournalEntry } from '@/hooks/useJournalEntries';
import { useIdeaDumps, useIdeaDump } from '@/hooks/useIdeaDumps';
import { ContentList } from '@/components/admin/ContentList';
import { ContentEditor, ContentFormData } from '@/components/admin/ContentEditor';
import {
  useCreateContent,
  useUpdateContent,
  useDeleteContent,
} from '@/hooks/useContentMutations';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

type ContentType = 'projects' | 'journal' | 'ideas';
type EditorMode = 'create' | 'edit' | null;

const Admin = () => {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ContentType>('projects');
  const [editorMode, setEditorMode] = useState<EditorMode>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch data
  const { data: projects = [], isLoading: projectsLoading } = useProjects();
  const { data: journalEntries = [], isLoading: journalLoading } = useJournalEntries();
  const { data: ideaDumps = [], isLoading: ideasLoading } = useIdeaDumps();

  // Fetch single item for editing
  const { data: editingProject } = useProject(activeTab === 'projects' ? editingId ?? undefined : undefined);
  const { data: editingJournal } = useJournalEntry(activeTab === 'journal' ? editingId ?? undefined : undefined);
  const { data: editingIdea } = useIdeaDump(activeTab === 'ideas' ? editingId ?? undefined : undefined);

  // Mutations
  const createMutation = useCreateContent(activeTab);
  const updateMutation = useUpdateContent(activeTab);
  const deleteMutation = useDeleteContent(activeTab);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleCreate = () => {
    setEditingId(null);
    setEditorMode('create');
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setEditorMode('edit');
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  const handleSubmit = async (data: ContentFormData) => {
    const submitData = {
      title: data.title,
      description: data.description,
      content: data.content,
      published_date: data.published_date,
      tags: data.tags,
      cover_image_url: data.cover_image_url,
    };
    
    if (editorMode === 'create') {
      await createMutation.mutateAsync(submitData);
    } else if (editorMode === 'edit' && editingId) {
      await updateMutation.mutateAsync({ id: editingId, data: submitData });
    }
    setEditorMode(null);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditorMode(null);
    setEditingId(null);
  };

  const getEditingData = () => {
    if (!editingId) return undefined;
    
    if (activeTab === 'projects' && editingProject) {
      return {
        title: editingProject.title,
        description: editingProject.description ?? '',
        content: editingProject.content ?? '',
        published_date: editingProject.published_date ?? '',
        tags: editingProject.tags ?? [],
        cover_image_url: editingProject.cover_image_url ?? '',
      };
    }
    if (activeTab === 'journal' && editingJournal) {
      return {
        title: editingJournal.title,
        description: editingJournal.description ?? '',
        content: editingJournal.content ?? '',
        published_date: editingJournal.published_date ?? '',
        tags: editingJournal.tags ?? [],
      };
    }
    if (activeTab === 'ideas' && editingIdea) {
      return {
        title: editingIdea.title,
        description: editingIdea.description ?? '',
        content: editingIdea.content ?? '',
        published_date: editingIdea.published_date ?? '',
        tags: editingIdea.tags ?? [],
      };
    }
    return undefined;
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

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

        {isAdmin ? (
          <>
            <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm font-medium text-primary">✓ Admin privileges active</p>
              <p className="text-xs text-muted-foreground mt-1">
                You can create, edit, and delete content.
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ContentType)}>
              <TabsList className="mb-6">
                <TabsTrigger value="projects">
                  Projects ({projects.length})
                </TabsTrigger>
                <TabsTrigger value="journal">
                  Journal ({journalEntries.length})
                </TabsTrigger>
                <TabsTrigger value="ideas">
                  Ideas ({ideaDumps.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="projects">
                <ContentList
                  items={projects}
                  isLoading={projectsLoading}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onCreate={handleCreate}
                  contentType="Projects"
                />
              </TabsContent>

              <TabsContent value="journal">
                <ContentList
                  items={journalEntries}
                  isLoading={journalLoading}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onCreate={handleCreate}
                  contentType="Journal Entries"
                />
              </TabsContent>

              <TabsContent value="ideas">
                <ContentList
                  items={ideaDumps}
                  isLoading={ideasLoading}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onCreate={handleCreate}
                  contentType="Idea Dumps"
                />
              </TabsContent>
            </Tabs>

            <Sheet open={editorMode !== null} onOpenChange={(open) => !open && handleCancel()}>
              <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
                <SheetHeader className="mb-6">
                  <SheetTitle>
                    {editorMode === 'create' ? 'Create New' : 'Edit'}{' '}
                    {activeTab === 'projects'
                      ? 'Project'
                      : activeTab === 'journal'
                      ? 'Journal Entry'
                      : 'Idea'}
                  </SheetTitle>
                </SheetHeader>
                <ContentEditor
                  key={editingId ?? 'new'}
                  initialData={getEditingData()}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                  isSubmitting={isSubmitting}
                  showCoverImage={activeTab === 'projects'}
                />
              </SheetContent>
            </Sheet>
          </>
        ) : (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <p className="text-muted-foreground">
              You need admin privileges to manage content.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
