const queue = new Set<() => void>();
let frame: number | undefined;

function flush() {
  frame = undefined;
  const task = queue.values().next().value;
  if (task) {
    queue.delete(task);
    task();
  }
  if (queue.size) frame = requestAnimationFrame(flush);
}

export function prepareAnimation(element: HTMLElement, initialize: () => void) {
  let disposed = false;
  let queued = false;
  const task = () => {
    if (disposed) return;
    initialize();
    delete element.dataset.animationPending;
  };
  const observer = new IntersectionObserver(
    (entries) => {
      if (queued || !entries.some((entry) => entry.isIntersecting)) return;
      queued = true;
      observer.disconnect();
      void document.fonts.ready.then(() => {
        if (disposed) return;
        queue.add(task);
        frame ??= requestAnimationFrame(flush);
      });
    },
    { rootMargin: '200px' },
  );
  element.dataset.animationPending = 'true';
  observer.observe(element);
  return () => {
    disposed = true;
    observer.disconnect();
    queue.delete(task);
    delete element.dataset.animationPending;
    if (!queue.size && frame !== undefined) {
      cancelAnimationFrame(frame);
      frame = undefined;
    }
  };
}
