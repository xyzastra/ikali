import { ReactNode, useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarouselProps {
  children: ReactNode;
  className?: string;
  showControls?: boolean;
}

export const Carousel = ({ children, className = "", showControls = true }: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        scrollContainer.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`has-crsl relative ${className}`}>
      {showControls && canScrollLeft && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      )}

      <div 
        ref={scrollRef}
        className="crsl flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border"
      >
        {children}
      </div>

      {showControls && canScrollRight && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

interface CarouselItemProps {
  children: ReactNode;
  className?: string;
}

export const CarouselItem = ({ children, className = "" }: CarouselItemProps) => {
  return (
    <div className={`flex-shrink-0 w-[85vw] sm:w-[340px] md:w-[360px] snap-start px-2 first:pl-0 last:pr-0 ${className}`}>
      {children}
    </div>
  );
};
