import React, { useMemo, useState, useEffect } from 'react';
import './Portfolio.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import cookbookThumbnail from './assets/mobile_cook.jpg';
import animalsThumbnail from './assets/one_page_animals.jpg';
import { useTranslation, Trans } from 'react-i18next';

// ... existing code ...
const Portfolio = () => {
  const { t, i18n } = useTranslation();
  // USUNIĘTO: activeFilter (niepotrzebne po skasowaniu podziału)
  // const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tm = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(tm);
  }, []);

  const projects = useMemo(() => ([
    {
      id: "pwaCookbook",
      image: cookbookThumbnail,
      demoLink: 'https://mobilnaksiazkakucharska.netlify.app',
      githubLink: 'https://github.com/shellupski/Mobilna-ksiazka-kucharska',
      title: t('portfolio.projects.pwaCookbook.title'),
      subtitle: t('portfolio.projects.pwaCookbook.subtitle'),
      description: t('portfolio.projects.pwaCookbook.description'),
      technologies: t('portfolio.projects.pwaCookbook.tech', { returnObjects: true }),
      role: t('portfolio.projects.pwaCookbook.role', { defaultValue: 'Developer' }),
      year: '2024',
      caseStudyLink: t('portfolio.projects.pwaCookbook.case', { defaultValue: '' }) || null,
    },
    {
      id: "animalsOnePage",
      image: animalsThumbnail,
      demoLink: 'https://zwierzeta.netlify.app/#fourty-page',
      githubLink: 'https://github.com/shellupski/Strona-typu-One-Page',
      title: t('portfolio.projects.animalsOnePage.title'),
      subtitle: t('portfolio.projects.animalsOnePage.subtitle'),
      description: t('portfolio.projects.animalsOnePage.description'),
      technologies: t('portfolio.projects.animalsOnePage.tech', { returnObjects: true }),
      role: t('portfolio.projects.animalsOnePage.role', { defaultValue: 'Developer' }),
      year: '2023',
      caseStudyLink: t('portfolio.projects.animalsOnePage.case', { defaultValue: '' }) || null,
    }
  ]), [t, i18n.language]);

  // USUNIĘTO: allTech i filtered (nie filtrujemy)
  // const allTech = useMemo(() => { ... }, [projects]);
  // const filtered = useMemo(() => { ... }, [projects]);

  return (
    <div className="portfolio-container" id="portfolio">
      <div className="gradient-background" aria-hidden="true"></div>
      <div className="content-wrapper">
        <header className="portfolio-header animate-fade-in">
          <h1 className="portfolio-title">{t('portfolio.title')}</h1>
          <p className="portfolio-subtitle">
            <Trans
              i18nKey="portfolio.subtitleHtml"
              components={{
                link: <a href="https://github.com/shellupski" target="_blank" rel="noopener noreferrer" />
              }}
            />
          </p>

          {/* USUNIĘTO cały pasek filtrów */}
          {/* <nav className="filters" ...> ... </nav> */}
        </header>

        <section className="projects-grid" aria-live="polite">
          {isLoading ? (
            <>
              <div className="project-card skeleton" aria-hidden="true">
                <div className="project-image-wrapper skeleton-box" />
                <div className="project-content">
                  <div className="skeleton-line w-60" />
                  <div className="skeleton-line w-40" />
                  <div className="skeleton-line w-90" />
                  <div className="skeleton-line w-70" />
                  <div className="skeleton-badges" />
                </div>
              </div>
              <div className="project-card skeleton" aria-hidden="true">
                <div className="project-image-wrapper skeleton-box" />
                <div className="project-content">
                  <div className="skeleton-line w-60" />
                  <div className="skeleton-line w-40" />
                  <div className="skeleton-line w-90" />
                  <div className="skeleton-line w-70" />
                  <div className="skeleton-badges" />
                </div>
              </div>
            </>
          ) : (
            // WYŚWIETLAMY WSZYSTKIE PROJEKTY BEZ FILTRÓW
            projects.map((project, index) => (
              <article
                key={project.id}
                className={`project-card animate-slide-up delay-${index + 1}`}
                itemScope
                itemType="https://schema.org/CreativeWork"
              >
                {project.image && (
                  <div className="project-image-wrapper">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="image-overlay">
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="overlay-cta"
                        aria-label={`${t('portfolio.actions.demo')} — ${project.title}`}
                      >
                        <FaExternalLinkAlt /> {t('portfolio.actions.demo')}
                      </a>
                    </div>
                  </div>
                )}

                <div className="project-content">
                  <header className="project-header">
                    <h3 className="project-heading" itemProp="name">{project.title}</h3>
                    <div className="project-meta">
                      {project.subtitle && <span className="project-subtitle" itemProp="about">{project.subtitle}</span>}
                      {(project.year || project.role) && (
                        <span className="project-chipset">
                          {project.year && <span className="chip">{project.year}</span>}
                          {project.role && <span className="chip">{project.role}</span>}
                        </span>
                      )}
                    </div>
                  </header>

                  <p className="project-description" itemProp="description">{project.description}</p>

                  {/* TECH jako etykiety (bez ustawiania filtra) */}
                  <div className="project-tech-stack" aria-label={t('portfolio.tech.aria', { defaultValue: 'Technologie' })}>
                    {project.technologies?.map((tech) => (
                      <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-link">
                      <FaExternalLinkAlt /> {t('portfolio.actions.demo')}
                    </a>
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                      <FaGithub /> {t('portfolio.actions.code')}
                    </a>
                    {project.caseStudyLink && (
                      <a href={project.caseStudyLink} target="_blank" rel="noopener noreferrer" className="project-link subtle">
                        {t('portfolio.actions.case', { defaultValue: 'Case study' })}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))
          )}

          {/* USUNIĘTO „empty-state” dla filtra */}
          {/* {!isLoading && filtered.length === 0 && ( ... )} */}
        </section>
      </div>
    </div>
  );
};

export default Portfolio;
// ... existing code ...