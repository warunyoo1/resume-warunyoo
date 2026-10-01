import type { ReactNode } from 'react';
import type { BackgroundMedia, Project } from './resume';

export interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  sequence?: boolean;
}

export interface BrandProps {
  className?: string;
}

export interface BackgroundVideoProps {
  media?: BackgroundMedia;
}

export interface ProjectArtworkProps {
  variant: Project['preview'];
  imageUrl?: string;
  title: string;
}

export interface ProjectDetailsDialogProps {
  project: Project;
  onClose: () => void;
}
