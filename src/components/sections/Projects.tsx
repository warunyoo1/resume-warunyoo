import { useState } from 'react';
import type { Project } from '@/types/resume';
import { ProjectDetailsDialog } from '@/components/ProjectDetailsDialog';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { resume } from '@/data/resume';
import { ProjectArtwork } from '@/components/ProjectArtwork';
import { Reveal } from '../Reveal';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="section section-bordered" id="work" aria-labelledby="work-title">
      <div className="container">
        <Reveal className="section-top">
          <div>
            <h2 id="work-title">ผลงาน</h2>
          </div>
        </Reveal>
        <div className="projects-grid">
          {resume.projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1}>
              <article className="project">
                <ProjectArtwork
                  variant={project.preview}
                  title={project.title}
                  imageUrl={project.previewImageUrl}
                />
                <div className="project-heading">
                  <div>
                    <p className="item-meta">{project.category}</p>
                    <h3>{project.title}</h3>
                  </div>
                  {project.url && (
                    <a
                      className="social-link liquid-glass"
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`เปิดผลงาน ${project.title}`}
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  )}
                </div>
                <p className="item-description">{project.description}</p>
                {project.details && (
                  <Button
                    variant="glass"
                    className="project-details-button"
                    onClick={() => setSelectedProject(project)}
                    aria-haspopup="dialog"
                    aria-label={`ดูรายละเอียด ${project.title}`}
                  >
                    ดูรายละเอียด
                  </Button>
                )}
                <ul className="project-tools" aria-label={`เครื่องมือใน ${project.title}`}>
                  {project.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      {selectedProject && (
        <ProjectDetailsDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
