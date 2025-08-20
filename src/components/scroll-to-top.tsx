'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;
  return (
    <div className="fixed bottom-6 right-6 z-40 animate-fade-in">
      <Button size="icon" onClick={scrollTop} aria-label="Scroll to top" className="shadow-md hover:shadow-lg hover-lift">
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
}


