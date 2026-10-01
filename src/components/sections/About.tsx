import { resume } from '@/data/resume';
import { Reveal } from '../Reveal';

export function About() {
  return (
    <section className="section container about-section" id="about" aria-labelledby="about-title">
      <Reveal>
        <div
          className={resume.avatarUrl ? 'about-profile' : 'about-profile about-profile-text-only'}
        >
          {resume.avatarUrl && (
            <div className="about-portrait">
              <img
                src={resume.avatarUrl}
                alt={`${resume.name} นักพัฒนาซอฟต์แวร์`}
                width={324}
                height={576}
                decoding="async"
              />
            </div>
          )}
          <div className="about-profile-copy">
            <h2 id="about-title">ข้อมูลและทักษะ</h2>
            <p className="about-copy">{resume.about}</p>
          </div>
        </div>
        <div className="skill-groups" aria-label="ทักษะตามประเภทงาน">
          {resume.skillGroups.map((group) => (
            <section className="skill-group" key={group.id} aria-labelledby={`skills-${group.id}`}>
              <h3 id={`skills-${group.id}`}>{group.label}</h3>
              <ul className="skills-list">
                {group.items.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
