import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import type Hls from 'hls.js';
import type { BackgroundVideoProps } from '@/types/components';

export function BackgroundVideo({ media }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !media || reduceMotion) return;
    let disposed = false;
    let stream: Hls | undefined;
    const fail = () => {
      video.style.opacity = '0';
    };
    const show = () => {
      video.style.opacity = '1';
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) void video.play().catch(() => {});
      else video.pause();
    });
    fail();
    video.addEventListener('error', fail);
    video.addEventListener('playing', show);

    async function connect() {
      if (!video || !media) return;
      if (media.kind === 'hls' && !video.canPlayType('application/vnd.apple.mpegurl')) {
        try {
          const { default: HlsPlayer } = await import('hls.js');
          if (disposed) return;
          if (!HlsPlayer.isSupported()) {
            fail();
            return;
          }
          stream = new HlsPlayer();
          stream.on(HlsPlayer.Events.ERROR, (_event, data) => {
            if (data.fatal) fail();
          });
          stream.loadSource(media.src);
          stream.attachMedia(video);
        } catch {
          if (!disposed) fail();
        }
      } else video.src = media.src;
      if (!disposed) observer.observe(video);
    }
    void connect();
    return () => {
      disposed = true;
      observer.disconnect();
      stream?.destroy();
      video.pause();
      video.removeEventListener('error', fail);
      video.removeEventListener('playing', show);
      fail();
      video.removeAttribute('src');
      video.load();
    };
  }, [media, reduceMotion]);

  if (!media || reduceMotion) return null;
  return (
    <video
      ref={videoRef}
      className="background-video"
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
