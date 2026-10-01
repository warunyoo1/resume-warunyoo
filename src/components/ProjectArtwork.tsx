import { ProjectScreenshot } from './ProjectScreenshot';
import type { ProjectArtworkProps } from '@/types/components';

export function ProjectArtwork({ variant, title, imageUrl }: ProjectArtworkProps) {
  if (imageUrl) {
    return <ProjectScreenshot variant={variant} title={title} imageUrl={imageUrl} />;
  }
  if (variant === 'typography') {
    return (
      <div className="project-artwork typography-art" aria-hidden="true">
        <span>{title}</span>
        <span className="art-caption">ภาพประกอบโปรเจกต์</span>
      </div>
    );
  }

  return (
    <div className="project-artwork interface-art" aria-hidden="true">
      <div className="mock-browser">
        <div className="browser-top">
          <span />
          <span />
          <span />
          <div />
        </div>
        <div className="browser-content">
          <span className="mock-label">ภาพประกอบโปรเจกต์</span>
          <div className="mock-heading">{title}</div>
          <div className="mock-lines">
            <span />
            <span />
          </div>
          <div className="mock-cards">
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}
