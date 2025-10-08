// src/sections/home.js
import React, { useEffect, useState } from "react";
import "./Home.css";
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from "react-i18next";

// Opcjonalnie podmień ścieżkę do avatara/CV w /public
const AVATAR = "https://raw.githubusercontent.com/shellupski/Moja-strona/main/images/logo_vertical.svg"; // jeśli nie masz zdjęcia, zostaw pusty string

const ROLES_PL = [
    "Specjalista IT",
    "SysAdmin",
    "Junior DevOps (w drodze)",
    "Web Developer (React/PWA)",
    "Administrator Baz Danych",
];

const ROLES_EN = [
    "IT Specialist",
    "SysAdmin",
    "Junior DevOps (in progress)",
    "Web Developer (React/PWA)",
    "Database Administrator",
];

const TECH_PL = [
    "Windows Server • AD/GPO",
    "Linux/Bash",
    "TCP/IP • DNS • DHCP • VPN",
    "Routery • Switche • Firewalle",
    "MySQL (zaaw.) • PostgreSQL",
    "Docker • Git • CI/CD",
    "AWS/Azure/GCP (podstawy)",
    "React • PHP • Jira",
];

const TECH_EN = [
    "Windows Server • AD/GPO",
    "Linux/Bash",
    "TCP/IP • DNS • DHCP • VPN",
    "Routers • Switches • Firewalls",
    "MySQL (adv.) • PostgreSQL",
    "Docker • Git • CI/CD",
    "AWS/Azure/GCP (basics)",
    "React • PHP • Jira",
];

export default function Home() {
    const { t, i18n } = useTranslation();
    const isEN = i18n.language?.startsWith("en");
    const ROLES = isEN ? ROLES_EN : ROLES_PL;
    const TECH = isEN ? TECH_EN : TECH_PL;

    const [subIndex, setSubIndex] = useState(0);
    const [roleIndex, setRoleIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    // Reset efektu pisania przy zmianie języka (żeby nie rwało liter)
    useEffect(() => {
        setSubIndex(0);
        setRoleIndex(0);
        setReverse(false);
    }, [isEN]);

    // Typewriter effect for ROLES
    useEffect(() => {
        if (reverse) {
            if (subIndex === 0) {
                setReverse(false);
                setRoleIndex((prev) => (prev + 1) % ROLES.length);
                return;
            }
        } else if (subIndex === ROLES[roleIndex].length + 1) {
            const tmo = setTimeout(() => setReverse(true), 950);
            return () => clearTimeout(tmo);
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? 38 : 85);

        return () => clearTimeout(timeout);
    }, [subIndex, roleIndex, reverse, ROLES]);

    // Caret blink
    useEffect(() => {
        const blinkTimer = setInterval(() => setBlink((b) => !b), 420);
        return () => clearInterval(blinkTimer);
    }, []);

    // Magnetic glow for CTA buttons
    const handleMagnet = (e) => {
        const btn = e.currentTarget;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        btn.style.setProperty("--x", `${x}px`);
        btn.style.setProperty("--y", `${y}px`);
    };

    // Smooth scroll helpers
    const scrollToId = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Adresy do CV w repo (RAW + CDN fallback)
    const GITHUB_CV_RAW = 'https://raw.githubusercontent.com/shellupski/Moja-strona/main/public/cv/CV.pdf';
    const GITHUB_CV_CDN = 'https://cdn.jsdelivr.net/gh/shellupski/Moja-strona@main/public/cv/CV.pdf';

    // Wymuszone pobieranie CV (fetch -> blob -> download), z fallbackami
    const downloadCV = async (e) => {
        e.preventDefault();
        const tryDownload = async (url) => {
            const res = await fetch(url, { mode: 'cors', cache: 'no-store' });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const blob = await res.blob();
            const objUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = objUrl;
            a.download = 'CV.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(objUrl);
        };

        try {
            await tryDownload(GITHUB_CV_RAW);         // 1) RAW GitHub
        } catch (_) {
            try {
                await tryDownload(GITHUB_CV_CDN);     // 2) jsDelivr CDN fallback
            } catch {
                window.open(GITHUB_CV_RAW, '_blank', 'noopener,noreferrer'); // 3) otwórz w nowej karcie
            }
        }
    };

    return (
        <section id="home" className="home">
            {/* Decorative background */}
            <div className="aurora" aria-hidden="true" />
            <div className="stars" aria-hidden="true" />

            <div className="home__inner">
                {/* Left: Hero copy */}
                <div className="hero glass">
                    <div className="hero__eyebrow">{t("home.eyebrow")}</div>

                    <h1 className="hero__title">
                        {t("home.greeting")}
                        <span className="gradient-text"> {t("home.name")}</span>
                    </h1>

                    <h2 className="hero__subtitle">
                        {ROLES[roleIndex].substring(0, subIndex)}
                        <span className={`caret ${blink ? "is-on" : ""}`} />
                    </h2>

                    <p className="hero__lead">
                        {t("home.lead")}
                    </p>

                    <div className="hero__cta">
                        <HashLink
                            className="btn-glow"
                            onMouseMove={handleMagnet}
                            smooth
                            to="/portfolio#portfolio"
                        >
                            <span>{t("home.ctaPortfolio")}</span>
                        </HashLink>

                        <a
                            className="btn-glass"
                            onMouseMove={handleMagnet}
                            href={GITHUB_CV_RAW}        // bezpośredni adres (fallback)
                            onClick={downloadCV}        // wymuszenie pobrania przez blob
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t("home.ctaCv")}
                        </a>

                        <HashLink
                            className="btn-ghost"
                            onMouseMove={handleMagnet}
                            smooth
                            to="/contact#contact"
                        >
                            {t("home.ctaContact")}
                        </HashLink>
                    </div>

                    <div className="hero__meta">
                        <div className="stat">
                            <div className="stat__num">{t("home.stats.years.num")}</div>
                            <div className="stat__label">{t("home.stats.years.label")}</div>
                        </div>
                        <div className="stat">
                            <div className="stat__num">{t("home.stats.projects.num")}</div>
                            <div className="stat__label">{t("home.stats.projects.label")}</div>
                        </div>
                        <div className="stat">
                            <div className="stat__num">{t("home.stats.english.num")}</div>
                            <div className="stat__label">{t("home.stats.english.label")}</div>
                        </div>
                        <div className="stat">
                            <div className="stat__num">{t("home.stats.devops.num")}</div>
                            <div className="stat__label">{t("home.stats.devops.label")}</div>
                        </div>
                    </div>

                    <div className="tech-tags">
                        {TECH.map((tech) => (
                            <span className="tag" key={tech}>
                              {tech}
                            </span>
                        ))}
                    </div>

                    <div className="quick-contact">
                        <a
                            className="chip"
                            href="mailto:crusty.it.office@gmail.com"
                            aria-label={t("home.contact.emailAria")}
                        >
                            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                                <path
                                    fill="currentColor"
                                    d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.236-6.928 4.334a2 2 0 0 1-2.144 0L4 8.236V6l8 5 8-5v2.236Z"
                                />
                            </svg>
                            <span>crusty.it.office@gmail.com</span>
                        </a>

                        <a
                            className="chip"
                            href="https://crusty-it.github.io"
                            target="_blank"
                            rel="noreferrer"
                            aria-label={t("home.contact.githubAria")}
                        >
                            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                                <path
                                    fill="currentColor"
                                    d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.46-1.17-1.12-1.48-1.12-1.48-.92-.62.07-.6.07-.6 1.02.07 1.56 1.05 1.56 1.05 .91 1.56 2.39 1.11 2.97.85.09-.66.36-1.11.65-1.37-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.57 9.57 0 0 1 12 6.84c.85 0 1.7.11 2.5.32 1.9-1.29 2.74-1.02 2.74-1.02 .55 1.38.2 2.4.1 2.65.64.7 1.02 1.59 1.02 2.68 0 3.85-2.34 4.7-4.57 4.95.37.32.69.94.69 1.9 0 1.37-.01 2.47-.01 2.8 0 .26.18.57.69.47A10 10 0 0 0 12 2Z"
                                />
                            </svg>
                            <span>https://crusty-it.github.io</span>
                        </a>
                    </div>
                </div>

                {/* Right: Avatar / floating card */}
                <div className="hero-visual">
                    <div className="visual-orb" aria-hidden="true" />
                    <div className="visual-card glass">
                        <div className="badge">{t("home.badgeCity")}</div>
                        {AVATAR ? (
                            <img className="avatar" src={AVATAR} alt="Avatar" />
                        ) : (
                            <div className="avatar placeholder">TS</div>
                        )}
                        <div className="visual-caption">
                            {t("home.caption")}
                        </div>
                    </div>
                </div>
            </div>

            <button
                className="scroll-hint"
                onClick={() => scrollToId("about")}
                aria-label={t("home.scroll.aria")}
            >
                <span>{t("home.scroll.label")}</span>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path
                        fill="currentColor"
                        d="M12 5v14m0 0l-5-5m5 5l5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </section>
    );
}