import { useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDialogScroll } from '@/hooks/useDialogScroll';
import type { ProjectDetailsDialogProps } from '@/types/components';

export function ProjectDetailsDialog({ project, onClose }: ProjectDetailsDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useDialogScroll(dialog);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    heading.current?.focus({ preventScroll: true });
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  const details = project.details;
  if (!details) return null;

  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="project-detail-title"
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const controls = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex="0"]',
          ),
        );
        const first = controls[0];
        const last = controls.at(-1);
        if (!first || !last) return;
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            !controls.includes(document.activeElement as HTMLElement))
        ) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        )
          onClose();
      }}
    >
      <div className="project-dialog-content">
        <header className="project-dialog-header">
          <div>
            <p className="project-dialog-category">{project.category}</p>
            <h2 id="project-detail-title" ref={heading} tabIndex={-1}>
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            className="project-dialog-close"
            onClick={onClose}
            aria-label="ปิดรายละเอียด"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </header>
        {project.previewImageUrl && (
          <figure className="project-dialog-preview">
            <img
              src={project.previewImageUrl}
              alt={`หน้าสินค้าบนเว็บไซต์ ${project.title}`}
              width={1440}
              height={1000}
              decoding="async"
            />
            <figcaption>ภาพหน้าเว็บไซต์ {project.title}</figcaption>
          </figure>
        )}
        <p className="project-dialog-overview">{details.overview}</p>
        {project.url && (
          <div className="project-dialog-actions">
            <Button asChild>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                เปิดเว็บไซต์จริง
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        )}
        <section className="project-dialog-role" aria-labelledby="project-role-title">
          <h3 id="project-role-title">บทบาท</h3>
          <p>{details.role}</p>
        </section>
        <div className="project-dialog-columns">
          <section aria-labelledby="project-features-title">
            <h3 id="project-features-title">ขอบเขตระบบ</h3>
            <ul className="project-detail-features">
              {details.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="project-tools-title">
            <h3 id="project-tools-title">เทคโนโลยี</h3>
            <ul className="project-detail-tools">
              {project.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </section>
        </div>
        <section
          className="project-dialog-architecture"
          aria-labelledby="project-architecture-title"
        >
          <h3 id="project-architecture-title">การทำงานของระบบ</h3>
          <ol className="project-system-flow">
            {details.architecture.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p>{details.technicalNote}</p>
        </section>
      </div>
    </dialog>
  );
}
