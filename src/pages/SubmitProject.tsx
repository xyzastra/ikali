import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, X } from "lucide-react";
import { useProjectMutations } from "@/hooks/useUserProjects";
import { useAuth } from "@/hooks/useAuth";

const SubmitProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createProject } = useProjectMutations();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    cover_image_url: "",
    project_type: "personal" as "personal" | "collaborative",
    looking_for_collaborators: false,
    tags: [] as string[],
  });

  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground mb-4">Please sign in to submit a project</p>
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tagToRemove) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (formData.title.length > 100) newErrors.title = "Title must be less than 100 characters";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.description.length > 500) newErrors.description = "Description must be less than 500 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await createProject.mutateAsync({
      user_id: user.id,
      title: formData.title.trim(),
      description: formData.description.trim(),
      content: formData.content.trim() || null,
      cover_image_url: formData.cover_image_url.trim() || null,
      project_type: formData.project_type,
      looking_for_collaborators: formData.looking_for_collaborators,
      tags: formData.tags,
    });

    navigate("/community");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link to="/community" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Community
        </Link>

        <SectionHeader
          title="Submit a Project"
          description="Share your work with the community"
        />

        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="My Awesome Project"
              maxLength={100}
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Short Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="A brief description of your project..."
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">{formData.description.length}/500</p>
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          {/* Project Type */}
          <div className="space-y-3">
            <Label>Project Type</Label>
            <RadioGroup
              value={formData.project_type}
              onValueChange={(v) => setFormData({ ...formData, project_type: v as "personal" | "collaborative" })}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personal" id="personal" />
                <Label htmlFor="personal" className="font-normal cursor-pointer">Personal project</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="collaborative" id="collaborative" />
                <Label htmlFor="collaborative" className="font-normal cursor-pointer">Collaborative project</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Looking for collaborators */}
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <Label htmlFor="collaborators">Looking for collaborators?</Label>
              <p className="text-sm text-muted-foreground">Let others know you need help</p>
            </div>
            <Switch
              id="collaborators"
              checked={formData.looking_for_collaborators}
              onCheckedChange={(checked) => setFormData({ ...formData, looking_for_collaborators: checked })}
            />
          </div>

          {/* Cover Image URL */}
          <div className="space-y-2">
            <Label htmlFor="cover">Cover Image URL (optional)</Label>
            <Input
              id="cover"
              type="url"
              value={formData.cover_image_url}
              onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags (up to 5)</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag..."
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" variant="outline" onClick={handleAddTag}>Add</Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Full Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Full Description (optional)</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Detailed description, goals, progress, etc..."
              rows={8}
            />
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <Button type="submit" disabled={createProject.isPending} className="flex-1">
              {createProject.isPending ? "Submitting..." : "Submit Project"}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate("/community")}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitProject;
