import { useEffect, type RefObject } from 'react';
import { gsap } from '@/lib/animation';

export function useDialogScroll(dialog: RefObject<HTMLDialogElement | null>) {
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scrollTo = gsap.quickTo(element, 'scrollTop', { duration: 0.35, ease: 'power2.out' });
    let target = element.scrollTop;
    const stop = () => {
      scrollTo.tween.pause();
      target = element.scrollTop;
    };
    const onWheel = (event: WheelEvent) => {
      if (
        motion.matches ||
        event.ctrlKey ||
        event.deltaY === 0 ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      )
        return;
      const limit = element.scrollHeight - element.clientHeight;
      if (limit <= 0) return;
      event.preventDefault();
      if (!scrollTo.tween.isActive()) target = element.scrollTop;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientHeight : 1;
      target = Math.max(0, Math.min(limit, target + event.deltaY * unit));
      scrollTo(target);
    };
    element.addEventListener('wheel', onWheel, { passive: false });
    element.addEventListener('pointerdown', stop);
    element.addEventListener('keydown', stop);
    motion.addEventListener('change', stop);
    return () => {
      scrollTo.tween.kill();
      element.removeEventListener('wheel', onWheel);
      element.removeEventListener('pointerdown', stop);
      element.removeEventListener('keydown', stop);
      motion.removeEventListener('change', stop);
    };
  }, [dialog]);
}
