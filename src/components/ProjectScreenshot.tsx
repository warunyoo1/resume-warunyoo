import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/animation';
import type { ProjectArtworkProps } from '@/types/components';

export function ProjectScreenshot({ imageUrl, title }: ProjectArtworkProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = container.current;
      const image = element?.querySelector('img');
      if (!element || !image) return;
      const media = gsap.matchMedia();
      media.add('screen and (prefers-reduced-motion: no-preference)', () => {
        const floating = element.querySelector('.project-screenshot-float');
        const shadow = element.querySelector('.project-screenshot-shadow');
        const motion = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
        motion.fromTo(floating, { y: -4 }, { y: -16, duration: 3.2, ease: 'sine.inOut' });
        motion.fromTo(
          shadow,
          { scaleX: 1, opacity: 0.16 },
          { scaleX: 0.86, opacity: 0.08, duration: 3.2, ease: 'sine.inOut' },
          0,
        );
        const observer = new IntersectionObserver(([entry]) => {
          if (entry?.isIntersecting) motion.play();
          else motion.pause();
        });
        observer.observe(element);
        return () => observer.disconnect();
      });
      media.add(
        '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          let bounds: DOMRect | undefined;
          gsap.set(image, { transformPerspective: 900, rotationX: 3, rotationY: -5 });
          const rotateX = gsap.quickTo(image, 'rotationX', { duration: 0.45, ease: 'power2.out' });
          const rotateY = gsap.quickTo(image, 'rotationY', { duration: 0.45, ease: 'power2.out' });
          const enter = () => {
            bounds = element.getBoundingClientRect();
          };
          const move = (event: PointerEvent) => {
            if (!bounds) return;
            const x = Math.max(
              -0.5,
              Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5),
            );
            const y = Math.max(
              -0.5,
              Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5),
            );
            rotateX(-y * 10);
            rotateY(x * 14);
          };
          const leave = () => {
            bounds = undefined;
            rotateX(3);
            rotateY(-5);
          };
          element.addEventListener('pointerenter', enter);
          element.addEventListener('pointermove', move);
          element.addEventListener('pointerleave', leave);
          return () => {
            element.removeEventListener('pointerenter', enter);
            element.removeEventListener('pointermove', move);
            element.removeEventListener('pointerleave', leave);
          };
        },
      );
      return () => media.revert();
    },
    { scope: container },
  );

  return (
    <div ref={container} className="project-artwork project-screenshot">
      <span className="project-screenshot-shadow" aria-hidden="true" />
      <div className="project-screenshot-float">
        <img
          src={imageUrl}
          alt={`หน้าเว็บไซต์ ${title}`}
          width={1440}
          height={1000}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
