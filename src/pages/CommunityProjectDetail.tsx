import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, ArrowLeft, Users, Star, Trash2, MessageSquare, Reply } from "lucide-react";
import { useUserProject, useProjectComments, useUserVote, useProjectMutations, ProjectComment } from "@/hooks/useUserProjects";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";

const CommunityProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  
  const { data: project, isLoading } = useUserProject(id || "");
  const { data: comments } = useProjectComments(id || "");
  const { data: userVote } = useUserVote(id || "", user?.id);
  const { toggleVote, deleteProject, addComment, deleteComment, updateProject } = useProjectMutations();

  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          Loading...
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground mb-4">Project not found</p>
          <Link to="/community">
            <Button variant="outline">Back to Community</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleVote = () => {
    if (!user) return;
    toggleVote.mutate({ projectId: project.id, userId: user.id, hasVoted: !!userVote });
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject.mutateAsync(project.id);
      navigate("/community");
    }
  };

  const handleFeature = () => {
    updateProject.mutate({ id: project.id, is_featured: !project.is_featured });
  };

  const handleSubmitComment = () => {
    if (!user || !newComment.trim()) return;
    addComment.mutate({
      projectId: project.id,
      userId: user.id,
      content: newComment.trim(),
      parentId: replyTo || undefined,
    });
    setNewComment("");
    setReplyTo(null);
  };

  const isOwner = user?.id === project.user_id;
  const canDelete = isOwner || isAdmin;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back link */}
        <Link to="/community" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Community
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={project.project_type === "collaborative" ? "default" : "secondary"}>
                {project.project_type === "collaborative" ? (
                  <><Users className="h-3 w-3 mr-1" /> Collaborative</>
                ) : "Personal"}
              </Badge>
              {project.looking_for_collaborators && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Looking for collaborators
                </Badge>
              )}
              {project.is_featured && (
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  <Star className="h-3 w-3 mr-1" /> Featured
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={userVote ? "default" : "outline"}
              onClick={handleVote}
              disabled={!user || toggleVote.isPending}
              className="gap-2"
            >
              <ArrowUp className="h-4 w-4" />
              {project.upvote_count}
            </Button>
            {isAdmin && (
              <Button variant="outline" onClick={handleFeature} className="gap-2">
                <Star className={`h-4 w-4 ${project.is_featured ? "fill-yellow-500 text-yellow-500" : ""}`} />
                {project.is_featured ? "Unfeature" : "Feature"}
              </Button>
            )}
            {canDelete && (
              <Button variant="destructive" size="icon" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Cover image */}
        {project.cover_image_url && (
          <img
            src={project.cover_image_url}
            alt={project.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        {/* Description */}
        {project.description && (
          <p className="text-lg text-muted-foreground mb-6">{project.description}</p>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}

        {/* Content */}
        {project.content && (
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-8 p-6 bg-muted/30 rounded-lg">
            {project.content}
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-8">
          Posted {formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}
        </p>

        {/* Comments Section */}
        <div className="border-t border-border pt-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Comments ({comments?.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0) || 0})
          </h2>

          {/* Add comment form */}
          {user ? (
            <div className="mb-6">
              {replyTo && (
                <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <Reply className="h-3 w-3" />
                  Replying to comment
                  <Button variant="ghost" size="sm" onClick={() => setReplyTo(null)}>Cancel</Button>
                </div>
              )}
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                className="mb-2"
              />
              <Button onClick={handleSubmitComment} disabled={!newComment.trim() || addComment.isPending}>
                Post Comment
              </Button>
            </div>
          ) : (
            <p className="text-muted-foreground mb-6">
              <Link to="/auth" className="text-primary hover:underline">Sign in</Link> to comment
            </p>
          )}

          {/* Comments list */}
          <div className="space-y-4">
            {comments?.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                projectId={project.id}
                onReply={() => setReplyTo(comment.id)}
                onDelete={() => deleteComment.mutate({ id: comment.id, projectId: project.id })}
                currentUserId={user?.id}
                isAdmin={isAdmin}
              />
            ))}
            {!comments?.length && (
              <p className="text-muted-foreground text-center py-4">No comments yet. Be the first!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface CommentItemProps {
  comment: ProjectComment;
  projectId: string;
  onReply: () => void;
  onDelete: () => void;
  currentUserId?: string;
  isAdmin: boolean;
  depth?: number;
}

const CommentItem = ({ comment, projectId, onReply, onDelete, currentUserId, isAdmin, depth = 0 }: CommentItemProps) => {
  const canDelete = currentUserId === comment.user_id || isAdmin;
  const { deleteComment } = useProjectMutations();

  return (
    <div className={`${depth > 0 ? "ml-6 pl-4 border-l border-border" : ""}`}>
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
          </span>
          <div className="flex items-center gap-1">
            {depth === 0 && (
              <Button variant="ghost" size="sm" onClick={onReply} className="h-6 text-xs">
                <Reply className="h-3 w-3 mr-1" /> Reply
              </Button>
            )}
            {canDelete && (
              <Button variant="ghost" size="sm" onClick={onDelete} className="h-6 text-xs text-destructive">
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
        <p className="text-sm">{comment.content}</p>
      </div>

      {/* Nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2 space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              projectId={projectId}
              onReply={() => {}}
              onDelete={() => deleteComment.mutate({ id: reply.id, projectId })}
              currentUserId={currentUserId}
              isAdmin={isAdmin}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityProjectDetail;
