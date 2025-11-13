import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ContentCardProps {
  title: string;
  description: string;
  date: string;
  path: string;
  tags?: string[];
}

export const ContentCard = ({ title, description, date, path, tags }: ContentCardProps) => {
  return (
    <Link to={path} className="block group">
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-primary/50">
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>{new Date(date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</time>
          </div>
          <CardTitle className="group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        {tags && tags.length > 0 && (
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </Link>
  );
};
