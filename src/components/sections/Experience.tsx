import { prepareAnimation } from '@/lib/prepare-animation';
import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/animation';
import { resume } from '@/data/resume';
import { Reveal } from '../Reveal';

export function Experience() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const element = container.current;
      if (!element || !contextSafe) return;
      if (!window.matchMedia('screen and (prefers-reduced-motion: no-preference)').matches) return;
      let revert = () => {};
      const initialize = contextSafe(() => {
        const media = gsap.matchMedia();
        media.add('screen and (prefers-reduced-motion: no-preference)', () => {
          let disposed = false;
          let ready = false;
          const pending: (() => void)[] = [];
          const cleanups: (() => void)[] = [];
          element.querySelectorAll<HTMLElement>('.experience-group').forEach((group) => {
            const progress = group.querySelector('.timeline-progress');
            gsap.fromTo(
              progress,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: { trigger: group, start: 'top 65%', end: 'bottom 65%', scrub: 0.4 },
              },
            );
          });
          element.querySelectorAll<HTMLElement>('.timeline-item').forEach((item) => {
            const content = Array.from(item.children);
            const reveal = gsap.fromTo(
              content,
              { autoAlpha: 0, y: 12 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.045,
                ease: 'power2.out',
                force3D: true,
                paused: true,
                immediateRender: true,
                onComplete: () => gsap.set(content, { clearProps: 'transform,opacity,visibility' }),
              },
            );
            const play = () => {
              if (
                !disposed &&
                ready &&
                item.getBoundingClientRect().top <= window.innerHeight * 0.88 &&
                reveal.progress() < 1
              ) {
                reveal.play();
              }
            };
            ScrollTrigger.create({ trigger: item, start: 'top 88%', once: true, onEnter: play });
            pending.push(play);
            const showOnFocus = () => reveal.progress(1);
            item.addEventListener('focusin', showOnFocus);
            gsap.to(item, {
              '--timeline-dot': '#ffffff',
              duration: 0.3,
              scrollTrigger: {
                trigger: item,
                start: 'top 65%',
                end: 'bottom 65%',
                toggleActions: 'play reverse play reverse',
              },
            });
            cleanups.push(() => item.removeEventListener('focusin', showOnFocus));
          });
          void document.fonts.ready.then(() => {
            if (disposed) return;
            ready = true;
            pending.forEach((play) => play());
          });
          return () => {
            disposed = true;
            cleanups.forEach((cleanup) => cleanup());
          };
        });
        revert = () => media.revert();
      });
      const cancel = prepareAnimation(element, initialize);
      return () => {
        cancel();
        revert();
      };
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="section section-bordered experience-section"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="container experience-layout">
        <Reveal className="experience-heading">
          <h2 id="experience-title">
            ประสบการณ์
            <br />
            และการศึกษา
          </h2>
        </Reveal>
        <div className="timeline">
          <section className="experience-group" aria-labelledby="work-title">
            <span className="timeline-rail" aria-hidden="true">
              <span className="timeline-progress" />
            </span>
            <h3 className="experience-group-title" id="work-title">
              ประสบการณ์ทำงาน
            </h3>
            {resume.experiences.map((item) => (
              <article className="timeline-item" key={item.id}>
                <p className="item-meta">{item.period}</p>
                <h4>{item.role}</h4>
                <p className="item-company">{item.company}</p>
                <p className="item-description">{item.description}</p>
                {item.highlights && (
                  <ul className="experience-highlights">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </section>
          <section className="experience-group" aria-labelledby="education-title">
            <span className="timeline-rail" aria-hidden="true">
              <span className="timeline-progress" />
            </span>
            <h3 className="experience-group-title" id="education-title">
              การศึกษา
            </h3>
            {resume.education.map((item) => (
              <article className="timeline-item" key={`${item.institution}-${item.degree}`}>
                <p className="item-meta">{item.period}</p>
                <h4>{item.institution}</h4>
                <p className="item-description">{item.degree}</p>
              </article>
            ))}
          </section>
        </div>
      </div>
    </section>
  );
}
