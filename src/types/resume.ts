export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights?: string[];
}

export interface ProjectDetails {
  overview: string;
  role: string;
  features: string[];
  architecture: string[];
  technicalNote: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  preview: 'interface' | 'typography';
  previewImageUrl?: string;
  details?: ProjectDetails;
  url?: string;
}

export interface BackgroundMedia {
  src: string;
  kind: 'mp4' | 'hls';
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface SkillGroup {
  id: 'frontend' | 'backend' | 'workflow';
  label: string;
  items: string[];
}

export interface Resume {
  name: string;
  displayName?: string;
  avatarUrl?: string;
  initials: string;
  role: string;
  specializations: string[];
  location: string;
  available: boolean;
  introduction: string;
  about: string;
  email?: string;
  phone?: string;
  lineUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  cvUrl?: string;
  heroMedia?: BackgroundMedia;
  contactMedia?: BackgroundMedia;
  experiences: Experience[];
  education: Education[];
  skillGroups: SkillGroup[];
  projects: Project[];
}
