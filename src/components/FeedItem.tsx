import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
interface FeedItemProps {
  title: string;
  description: string;
  date: string;
  path: string;
  tags?: string[];
  coverImage?: string;
  readingTime?: number;
}
export const FeedItem = ({
  title,
  description,
  date,
  path,
  tags,
  coverImage,
  readingTime
}: FeedItemProps) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  return <article className="feed-item group relative rounded-lg border border-border bg-card p-4 sm:p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
      <Link to={path} aria-label={`Read more about ${title}`} className="absolute inset-0 z-10 text-xs" />
      
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Cover Image */}
        {coverImage && <div className="relative w-full aspect-[16/10] sm:aspect-[10/8] rounded-md overflow-hidden bg-muted">
            <img src={coverImage} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>}
        
        <div className="flex-1 space-y-3">
          {/* Meta info - stacked on mobile, row on larger */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <time dateTime={date} className="font-medium">
              {formattedDate}
            </time>
            {readingTime && <>
                <span className="text-border">•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {readingTime} min read
                </span>
              </>}
          </div>

          {/* Title */}
          <h2 className="text-lg sm:text-xl font-serif font-semibold leading-tight group-hover:text-primary transition-colors duration-200 md:text-lg">
            {title}
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
            {description}
          </p>

          {/* Tags */}
          {tags && tags.length > 0 && <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
              {tags.map(tag => <Badge key={tag} variant="secondary" className="text-[10px] sm:text-xs px-2 py-0.5 pointer-events-none">
                  {tag}
                </Badge>)}
            </div>}

          {/* Read more indicator */}
          <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 pt-2">
            Read more
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </article>;
};