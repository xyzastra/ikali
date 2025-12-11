import { Link } from "react-router-dom";
import { Target, FileText, Heart, ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./JournalCard.module.css";

export type JournalStyle = "minimal" | "notebook" | "typewriter";
export type JournalEntryType = "Strategy" | "Policy" | "Reflection";

interface JournalCardProps {
  id: string;
  title: string;
  description?: string | null;
  tags?: string[] | null;
  publishedDate?: string | null;
  readingTime?: number | null;
  entryType?: JournalEntryType;
  journalStyle?: JournalStyle;
  showTimelineDot?: boolean;
  className?: string;
  enableLayoutAnimation?: boolean;
}

const typeConfig = {
  Strategy: {
    icon: Target,
    className: styles.typeStrategy,
  },
  Policy: {
    icon: FileText,
    className: styles.typePolicy,
  },
  Reflection: {
    icon: Heart,
    className: styles.typeReflection,
  },
};

const styleConfig = {
  minimal: styles.styleMinimal,
  notebook: styles.styleNotebook,
  typewriter: styles.styleTypewriter,
};

export function getEntryType(
  title: string,
  tags: string[] | null | undefined
): JournalEntryType {
  const titleLower = title.toLowerCase();
  const tagString = (tags || []).join(" ").toLowerCase();

  if (
    titleLower.includes("strategy") ||
    titleLower.includes("plan") ||
    tagString.includes("strategy")
  ) {
    return "Strategy";
  }
  if (
    titleLower.includes("policy") ||
    titleLower.includes("guideline") ||
    tagString.includes("policy")
  ) {
    return "Policy";
  }
  return "Reflection";
}

export function JournalCard({
  id,
  title,
  description,
  tags,
  publishedDate,
  readingTime,
  entryType,
  journalStyle = "minimal",
  showTimelineDot = true,
  className = "",
  enableLayoutAnimation = true,
}: JournalCardProps) {
  const type = entryType || getEntryType(title, tags);
  const TypeIcon = typeConfig[type].icon;
  const styleClass = styleConfig[journalStyle];

  return (
    <Link
      to={`/journal/${id}`}
      className={`block ${className}`}
    >
      <motion.div
        layoutId={enableLayoutAnimation ? `journal-card-${id}` : undefined}
        className={`${styles.card} ${styleClass}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Timeline dot */}
        {showTimelineDot && <div className={styles.timelineDot} />}

        {/* Gradient overlay */}
        <div className={styles.gradientOverlay} />

        <div className={styles.content}>
          {/* Header with title and type badge */}
          <div className={styles.header}>
            <motion.h3 
              layoutId={enableLayoutAnimation ? `journal-title-${id}` : undefined}
              className={styles.title}
            >
              {title}
            </motion.h3>
            <span className={`${styles.typeBadge} ${typeConfig[type].className}`}>
              <TypeIcon className="w-3 h-3" />
              {type}
            </span>
          </div>

          {/* Description */}
          {description && (
            <motion.p 
              layoutId={enableLayoutAnimation ? `journal-desc-${id}` : undefined}
              className={styles.description}
            >
              {description}
            </motion.p>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <motion.div 
              layoutId={enableLayoutAnimation ? `journal-tags-${id}` : undefined}
              className={styles.tags}
            >
              {tags.slice(0, 3).map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className={styles.tag}>+{tags.length - 3}</span>
              )}
            </motion.div>
          )}

          {/* Footer */}
          <div className={styles.footer}>
            <div className={styles.meta}>
              {publishedDate && (
                <time>
                  {new Date(publishedDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              )}
              {readingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {readingTime} min
                </span>
              )}
            </div>
            <span className={styles.readMore}>
              Read <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default JournalCard;
