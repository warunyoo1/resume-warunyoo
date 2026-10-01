import { FileText, Mail, MessageCircle, Phone } from 'lucide-react';
import { resume } from '@/data/resume';
import { BackgroundVideo } from '../BackgroundVideo';
import { Brand } from '../Brand';
import { Reveal } from '../Reveal';
import { Button } from '../ui/button';

export function Contact() {
  return (
    <section
      className="contact-section section-bordered"
      id="contact"
      aria-labelledby="contact-title"
    >
      <BackgroundVideo media={resume.contactMedia} />
      <Reveal className="container contact-content">
        <Brand />
        <h2 id="contact-title">ข้อมูลติดต่อ</h2>
        <div className="contact-actions">
          {resume.lineUrl && (
            <Button variant="glass" asChild>
              <a
                href={resume.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ทัก LINE ส่วนตัว"
              >
                <MessageCircle aria-hidden="true" />
                ทัก LINE
              </a>
            </Button>
          )}
          {resume.email && (
            <Button asChild>
              <a href={`mailto:${resume.email}`}>
                <Mail />
                ติดต่อฉัน
              </a>
            </Button>
          )}
          {resume.phone && (
            <Button variant="glass" asChild>
              <a href={`tel:${resume.phone.replace(/[^+0-9]/g, '')}`}>
                <Phone />
                {resume.phone}
              </a>
            </Button>
          )}
          {resume.cvUrl ? (
            <Button variant="glass" asChild>
              <a href={resume.cvUrl} download>
                <FileText />
                ดาวน์โหลดเรซูเม่
              </a>
            </Button>
          ) : (
            <Button variant="glass" onClick={() => window.print()}>
              <FileText />
              พิมพ์เรซูเม่
            </Button>
          )}
        </div>
        {resume.email && (
          <a className="contact-email" href={`mailto:${resume.email}`}>
            {resume.email}
          </a>
        )}
      </Reveal>
    </section>
  );
}
