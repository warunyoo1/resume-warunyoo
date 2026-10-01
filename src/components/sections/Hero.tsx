import { ArrowDown, FileText } from 'lucide-react';
import { resume } from '@/data/resume';
import { BackgroundVideo } from '../BackgroundVideo';
import { Reveal } from '../Reveal';
import { Button } from '../ui/button';

export function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <BackgroundVideo media={resume.heroMedia} />
      <div className="hero-shade" aria-hidden="true" />
      <Reveal className="container hero-content" sequence>
        <p className="availability">
          {resume.avatarUrl ? (
            <img
              className="profile-avatar"
              src={resume.avatarUrl}
              alt={`รูปโปรไฟล์ ${resume.name}`}
              width={112}
              height={112}
            />
          ) : (
            <span className="initials">{resume.initials}</span>
          )}
          {resume.available ? 'เปิดรับโอกาสการทำงาน' : resume.location}
        </p>
        <h1 id="hero-title">{resume.name}</h1>
        <p className="hero-role">{resume.role}</p>
        <ul className="hero-specializations" aria-label="ด้านที่พัฒนา">
          {resume.specializations.map((specialization) => (
            <li key={specialization}>{specialization}</li>
          ))}
        </ul>
        <p className="hero-intro">{resume.introduction}</p>
        <div className="hero-actions liquid-glass">
          <Button asChild>
            <a href="#work">ดูผลงาน</a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="#contact">ติดต่อฉัน</a>
          </Button>
        </div>
        <p className="hero-location">{resume.location}</p>
      </Reveal>
      <a className="scroll-cue" href="#about">
        <ArrowDown size={16} aria-hidden="true" />
        ดูข้อมูลและทักษะ
      </a>
      <div className="hero-bottom container">
        <Button variant="ghost" className="print-action" onClick={() => window.print()}>
          <FileText />
          พิมพ์เรซูเม่
        </Button>
      </div>
    </section>
  );
}
