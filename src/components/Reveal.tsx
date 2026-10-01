import { prepareAnimation } from '@/lib/prepare-animation';
import { useRef } from 'react';
import type { RevealProps } from '@/types/components';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/animation';

export function Reveal({ children, className, delay = 0, sequence = false }: RevealProps) {
  const container = useRef<HTMLDivElement>(null);
  const animation = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    (_context, contextSafe) => {
      const element = container.current;
      if (!element || !contextSafe) return;
      if (!window.matchMedia('screen and (prefers-reduced-motion: no-preference)').matches) return;
      let revert = () => {};
      const initialize = contextSafe(() => {
        const media = gsap.matchMedia();
        media.add('screen and (prefers-reduced-motion: no-preference)', () => {
          let disposed = false;
          let ready = false;
          let entered = sequence;
          const targets = sequence ? Array.from(element.children) : element;
          const tween = gsap.fromTo(
            targets,
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              duration: sequence ? 1 : 0.75,
              delay,
              stagger: sequence ? 0.08 : 0,
              ease: 'power2.out',
              force3D: true,
              paused: true,
              immediateRender: true,
              onComplete: () => {
                gsap.set(targets, { clearProps: 'transform,opacity,visibility,willChange' });
              },
            },
          );
          animation.current = tween;
          const play = () => {
            if (!disposed && ready && entered && tween.progress() < 1) tween.play();
          };
          if (!sequence) {
            ScrollTrigger.create({
              trigger: element,
              start: 'top 88%',
              once: true,
              onEnter: () => {
                entered = true;
                play();
              },
            });
          }
          const images = Array.from(element.querySelectorAll('img'));
          void Promise.allSettled([
            document.fonts.ready,
            ...images.map((image) => image.decode()),
          ]).then(() => {
            if (disposed) return;
            ready = true;
            entered ||= element.getBoundingClientRect().top <= window.innerHeight * 0.88;
            play();
          });
          return () => {
            disposed = true;
            animation.current = null;
          };
        });
        revert = () => media.revert();
      });
      const cancel = prepareAnimation(element, initialize);
      return () => {
        cancel();
        revert();
      };
    },
    { scope: container, dependencies: [delay, sequence], revertOnUpdate: true },
  );

  return (
    <div
      ref={container}
      className={className}
      onFocusCapture={() => animation.current?.progress(1)}
    >
      {children}
    </div>
  );
}
