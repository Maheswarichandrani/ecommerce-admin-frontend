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
        <Minimize size={52} />
      ) : (
        <Maximize size={52} />
      )}
    </Button>
  );
}
