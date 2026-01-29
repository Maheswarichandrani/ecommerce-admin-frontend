'use client';

import { Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFullscreen } from '@/hooks/use-fullscreen';

export function ScreenMode() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFullscreen}
      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
    >
      {isFullscreen ? (
        <Minimize  className="h-[1.2rem] w-[1.2rem] text-white" />
      ) : (
        <Maximize  className="h-[1.2rem] w-[1.2rem] text-white" />
      )}
    </Button>
  );
}
