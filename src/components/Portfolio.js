import React, { useMemo, useState, useEffect } from 'react';
import './Portfolio.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useTranslation, Trans } from 'react-i18next';

import mobisalonThumbnail from './assets/mobisalon.jpg';
import ksefThumbnail from './assets/ksef-master.jpg';
import smartquoteThumbnail from './assets/smartquote.jpg';
import postlioThumbnail from './assets/postlio.jpg';
import cookbookThumbnail from './assets/mobile_cook.jpg';
import animalsThumbnail from './assets/one_page_animals.jpg';

const Portfolio = () => {
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const tm = setTimeout(() => setIsLoading(false), 350);
        return () => clearTimeout(tm);
    }, []);

    const projects = useMemo(() => ([

        {
            id: "postlio",
            image: postlioThumbnail,
            demoLink: 'https://postlio.netlify.app/',
            githubLink: null,
            title: t('portfolio.projects.postlio.title'),
            subtitle: t('portfolio.projects.postlio.subtitle'),
            description: t('portfolio.projects.postlio.description'),
            technologies: t('portfolio.projects.postlio.tech', { returnObjects: true }),
            role: t('portfolio.projects.postlio.role', { defaultValue: 'Developer' }),
            year: '2026',
            caseStudyLink: t('portfolio.projects.postlio.case', { defaultValue: '' }) || null,
        },
        {
            id: "smartQuoteAI",
            image: smartquoteThumbnail,
            demoLink: 'https://smartquote-ai.netlify.app',
            githubLink: null,
            title: t('portfolio.projects.smartQuoteAI.title'),
            subtitle: t('portfolio.projects.smartQuoteAI.subtitle'),
            description: t('portfolio.projects.smartQuoteAI.description'),
            technologies: t('portfolio.projects.smartQuoteAI.tech', { returnObjects: true }),
            role: t('portfolio.projects.smartQuoteAI.role', { defaultValue: 'WIP' }),
            year: '2026',
            caseStudyLink: t('portfolio.projects.smartQuoteAI.case', { defaultValue: '' }) || null,
        },
        {
            id: "ksefMaster",
            image: ksefThumbnail,
            demoLink: 'https://ksef-master.netlify.app/',
            githubLink: 'https://github.com/Shellty-IT/KSeF-Master',
            title: t('portfolio.projects.ksefMaster.title'),
            subtitle: t('portfolio.projects.ksefMaster.subtitle'),
            description: t('portfolio.projects.ksefMaster.description'),
            technologies: t('portfolio.projects.ksefMaster.tech', { returnObjects: true }),
            role: t('portfolio.projects.ksefMaster.role', { defaultValue: 'WIP' }),
            year: '2026',
            caseStudyLink: t('portfolio.projects.ksefMaster.case', { defaultValue: '' }) || null,
        },
        {
            id: "mobiSalon",
            image: mobisalonThumbnail,
            demoLink: 'https://mobisalon.netlify.app/',
            githubLink: 'https://github.com/Shellty-IT/mobi-grooming',
            title: t('portfolio.projects.mobiSalon.title'),
            subtitle: t('portfolio.projects.mobiSalon.subtitle'),
            description: t('portfolio.projects.mobiSalon.description'),
            technologies: t('portfolio.projects.mobiSalon.tech', { returnObjects: true }),
            role: t('portfolio.projects.mobiSalon.role', { defaultValue: 'Developer' }),
            year: '2025',
            caseStudyLink: t('portfolio.projects.mobiSalon.case', { defaultValue: '' }) || null,
        },
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
            year: '2021',
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
            year: '2018',
            caseStudyLink: t('portfolio.projects.animalsOnePage.case', { defaultValue: '' }) || null,
        }
    ]), [t]);

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
                                link: <a href="https://github.com/shellupski" target="_blank" rel="noopener noreferrer" aria-label="GitHub" />
                            }}
                        />
                    </p>
                </header>

                {/* Usunięto sekcję featured – wszystkie projekty są w jednej siatce */}

                <section className="projects-grid" aria-live="polite">
                    {isLoading ? (
                        <>
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="project-card skeleton" aria-hidden="true">
                                    <div className="project-image-wrapper"><div className="skeleton-box"></div></div>
                                    <div className="project-content">
                                        <div className="skeleton-line w-60" />
                                        <div className="skeleton-line w-40" />
                                        <div className="skeleton-line w-90" />
                                        <div className="skeleton-line w-70" />
                                        <div className="skeleton-badges" />
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        projects
                        .map((project, index) => (
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
                                            {project.demoLink && (
                                                <a
                                                    href={project.demoLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="overlay-cta"
                                                    aria-label={`${t('portfolio.actions.demo')} — ${project.title}`}
                                                >
                                                    <FaExternalLinkAlt /> {t('portfolio.actions.demo')}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="project-content">
                                    <header className="project-header">
                                        <h3 className="project-heading" itemProp="name">{project.title}</h3>
                                        <div className="project-meta">
                                            {project.subtitle && <span className="project-subtitle" itemProp="about">{project.subtitle}</span>}
                                            {project.year && (
                                                <span className="project-chipset">
                                                    <span className="chip">{project.year}</span>
                                                </span>
                                            )}
                                        </div>
                                    </header>

                                    <p className="project-description" itemProp="description">
                                        {project.description.split('\n').map((line, i) => (
                                            <React.Fragment key={i}>
                                                {line}
                                                {i < project.description.split('\n').length - 1 && <br />}
                                            </React.Fragment>
                                        ))}
                                    </p>

                                    <div className="project-tech-stack" aria-label={t('portfolio.tech.aria', { defaultValue: 'Technologie' })}>
                                        {project.technologies?.map((tech) => (
                                            <span key={tech} className="tech-badge">{tech}</span>
                                        ))}
                                    </div>

                                    <div className="project-links">
                                        {project.demoLink && (
                                            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-link">
                                                <FaExternalLinkAlt /> {t('portfolio.actions.demo')}
                                            </a>
                                        )}
                                        {project.githubLink && (
                                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                                                <FaGithub /> {t('portfolio.actions.code')}
                                            </a>
                                        )}
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
                </section>
            </div>
        </div>
    );
};

export default Portfolio;