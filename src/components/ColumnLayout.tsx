import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ColumnLayoutProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export const ColumnLayout = ({ children, columns = 3, className = "" }: ColumnLayoutProps) => {
  return (
    <div 
      className={cn("column", className)}
      style={{ '--multicols': columns } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

interface ColumnSpanProps {
  children: ReactNode;
  className?: string;
}

export const ColumnSpan = ({ children, className = "" }: ColumnSpanProps) => {
  return (
    <div className={cn("column__span", className)}>
      {children}
    </div>
  );
};
