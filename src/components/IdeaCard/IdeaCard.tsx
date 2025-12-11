import { Sprout, Leaf, TreeDeciduous } from "lucide-react";
import styles from "./IdeaCard.module.css";

export type IdeaMaturity = "seedling" | "growing" | "evergreen";
export type IdeaSize = "small" | "medium" | "large";

interface IdeaCardProps {
  id: string;
  title: string;
  description?: string | null;
  content?: string | null;
  tags?: string[] | null;
  publishedDate?: string | null;
  maturity?: IdeaMaturity;
  sizeVariant?: IdeaSize;
  isOwner?: boolean;
  ownerName?: string | null;
  ownerAvatar?: string | null;
  onClick?: () => void;
  className?: string;
}

const maturityConfig = {
  seedling: {
    label: "Seedling",
    icon: Sprout,
    className: styles.maturitySeedling,
    gradient: "linear-gradient(135deg, hsl(142 76% 36% / 0.05) 0%, transparent 50%, hsl(142 76% 36% / 0.02) 100%)",
  },
  growing: {
    label: "Growing",
    icon: Leaf,
    className: styles.maturityGrowing,
    gradient: "linear-gradient(135deg, hsl(221 83% 53% / 0.05) 0%, transparent 50%, hsl(221 83% 53% / 0.02) 100%)",
  },
  evergreen: {
    label: "Evergreen",
    icon: TreeDeciduous,
    className: styles.maturityEvergreen,
    gradient: "linear-gradient(135deg, hsl(45 93% 47% / 0.05) 0%, transparent 50%, hsl(45 93% 47% / 0.02) 100%)",
  },
};

const sizeConfig = {
  small: {
    className: styles.sizeSmall,
    borderRadius: "1rem 1rem 2rem 1rem",
  },
  medium: {
    className: styles.sizeMedium,
    borderRadius: "1.5rem 1rem 1rem 2rem",
  },
  large: {
    className: styles.sizeLarge,
    borderRadius: "2rem 1rem 2rem 1rem",
  },
};

export function getIdeaMaturity(
  content: string | null | undefined,
  tags: string[] | null | undefined
): IdeaMaturity {
  const contentLength = content?.length || 0;
  const tagCount = tags?.length || 0;

  if (contentLength > 500 && tagCount >= 3) return "evergreen";
  if (contentLength > 200 || tagCount >= 2) return "growing";
  return "seedling";
}

export function IdeaCard({
  title,
  description,
  tags,
  publishedDate,
  maturity = "seedling",
  sizeVariant = "medium",
  isOwner = false,
  ownerName,
  ownerAvatar,
  onClick,
  className = "",
}: IdeaCardProps) {
  const maturityInfo = maturityConfig[maturity];
  const sizeInfo = sizeConfig[sizeVariant];
  const MaturityIcon = maturityInfo.icon;

  return (
    <article
      className={`${styles.card} ${sizeInfo.className} ${className}`}
      style={{ borderRadius: sizeInfo.borderRadius }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Gradient overlay */}
      <div
        className={styles.gradientOverlay}
        style={{ background: maturityInfo.gradient }}
      />

      {/* Owner badge */}
      {isOwner && <span className={styles.ownerBadge}>Your idea</span>}

      <div className={styles.content}>
        {/* Header with title and maturity */}
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <span className={`${styles.maturityBadge} ${maturityInfo.className}`}>
            <MaturityIcon className="w-3 h-3" />
            {maturityInfo.label}
          </span>
        </div>

        {/* Description */}
        {description && <p className={styles.description}>{description}</p>}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.slice(0, 4).map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className={styles.tag}>+{tags.length - 4}</span>
            )}
          </div>
        )}

        {/* Footer with avatar and date */}
        <div className={styles.footer}>
          <div className={styles.meta}>
            {ownerAvatar || ownerName ? (
              <div className={styles.avatar}>
                {ownerAvatar ? (
                  <img
                    src={ownerAvatar}
                    alt={ownerName || "User"}
                    className={styles.avatarImage}
                  />
                ) : (
                  ownerName?.charAt(0).toUpperCase()
                )}
              </div>
            ) : null}
            {ownerName && <span>{ownerName}</span>}
          </div>
          {publishedDate && (
            <time className={styles.meta}>
              {new Date(publishedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </time>
          )}
        </div>
      </div>
    </article>
  );
}

export default IdeaCard;
