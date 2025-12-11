import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  // Prevent background scroll when open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-t-3xl border border-border bg-card p-4 pt-3 shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-muted-foreground/30" />
        
        {title && (
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
            <h2 className="text-lg font-serif font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-muted transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        )}
        
        <div className="max-h-[60vh] overflow-y-auto pr-1">
          {children}
        </div>
      </div>
    </div>
  );
}
