import { useEffect, useRef, useState } from 'react';
import { CodeXml, BriefcaseBusiness, Menu, X } from 'lucide-react';
import { resume } from '@/data/resume';
import { Brand } from './Brand';

const links = [
  { href: '#about', label: 'เกี่ยวกับฉัน' },
  { href: '#experience', label: 'ประสบการณ์' },
  { href: '#work', label: 'ผลงาน' },
  { href: '#contact', label: 'ติดต่อ' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <header className="site-header">
      <nav className="container navbar" aria-label="เมนูหลัก">
        <a href="#home" className="brand-link" aria-label={`${resume.name} — หน้าแรก`}>
          <Brand />
          {resume.displayName ?? resume.name}
        </a>
        <div className="desktop-nav">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          {resume.githubUrl && (
            <a
              className="social-link liquid-glass"
              href={resume.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <CodeXml size={16} />
            </a>
          )}
          {resume.linkedinUrl && (
            <a
              className="social-link liquid-glass"
              href={resume.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <BriefcaseBusiness size={16} />
            </a>
          )}
          <a className="nav-contact" href="#contact">
            พูดคุยกัน
          </a>
          <button
            ref={menuButton}
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'ปิดเมนู' : 'เปิดเมนู'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className="mobile-nav" id="mobile-navigation" hidden={!open}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
