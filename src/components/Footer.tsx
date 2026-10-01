import { resume } from '@/data/resume';

export function Footer() {
  return (
    <footer className="container footer">
      <p>
        © {new Date().getFullYear()} {resume.name}
      </p>
      <p>
        {resume.role} · {resume.location}
      </p>
      <a href="#home">กลับขึ้นด้านบน</a>
    </footer>
  );
}
