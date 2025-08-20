"use client";

import { useEffect, useMemo, useRef } from 'react';
import { Badge } from '@/components/ui/badge';

interface TagsScrollerProps {
  tags: string[];
}

export function TagsScroller({ tags }: TagsScrollerProps) {
  const unique = useMemo(() => Array.from(new Set(tags)).slice(0, 24), [tags]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    let x = 0;
    const step = () => {
      x -= 0.25;
      el.style.transform = `translateX(${x}px)`;
      if (Math.abs(x) > el.scrollWidth / 2) x = 0;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [unique.length]);

  const doubled = [...unique, ...unique];

  return (
    <div className="relative overflow-hidden rounded-xl border bg-card">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-card to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-card to-transparent" />
      <div className="whitespace-nowrap py-3 will-change-transform" ref={containerRef}>
        {doubled.map((t, i) => (
          <Badge key={`${t}-${i}`} variant="secondary" className="mx-2">
            #{t}
          </Badge>
        ))}
      </div>
    </div>
  );
}


