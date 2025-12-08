import React from "react";
import { HashLink } from "react-router-hash-link";
import "./About.css";
import {
    FaMapMarkerAlt,
    FaBriefcase,
    FaLanguage,
    FaEnvelope,
    FaGithub,
    FaLinkedin,
    FaCodeBranch,
    FaWindows,
} from "react-icons/fa";
import {
    SiLinux,
    SiDocker,
    SiReact,
    SiJavascript,
    SiPostgresql,
    SiMysql,
    SiGit,
    SiFirebase,
    SiJira,
} from "react-icons/si";
import { useTranslation, Trans } from "react-i18next";

const About = () => {
    const { t } = useTranslation();

    const SkillRing = ({ label, value, color }) => {
        const size = 88;
        const stroke = 10;
        const r = (size - stroke) / 2;
        const cx = size / 2;
        const cy = size / 2;
        const circ = 2 * Math.PI * r;
        const dash = (value / 100) * circ;
        const rest = circ - dash;
        return (
            <div className="skillring" aria-label={`${label} ${value}%`}>
                <svg
                    className="skillring__svg"
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                >
                    <circle
                        cx={cx}
                        cy={cy}
                        r={r}
                        stroke="rgba(255,255,255,.12)"
                        strokeWidth={stroke}
                        fill="none"
                    />
                    <circle
                        cx={cx}
                        cy={cy}
                        r={r}
                        stroke={color}
                        strokeWidth={stroke}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${dash} ${rest}`}
                        transform={`rotate(-90 ${cx} ${cy})`}
                    />
                </svg>
                <div className="skillring__label">
                    <span className="skillring__name">{label}</span>
                    <span className="skillring__val">{value}%</span>
                </div>
            </div>
        );
    };

    return (
        <section id="about" className="about">
            <span className="about__blob about__blob--a"></span>
            <span className="about__blob about__blob--b"></span>

            <div className="about__container">
                <header className="about__header animate-fade-in">
                    <h2 className="about__title">
                        {t("about.title").split(" ")[0]} <span>{t("about.title").split(" ")[1] || ""}</span>
                    </h2>
                    <p className="about__kicker">
                        {t("about.kicker")}
                    </p>
                </header>

                <div className="about__grid">
                    <div className="about__text animate-slide-up">
                        <p>
                            <Trans i18nKey="about.p1" components={{ strong: <strong /> }} />
                        </p>
                        <p className="about__subhead"><strong>{t("about.approachTitle")}</strong></p>
                        <p>
                            <Trans i18nKey="about.approachIntro" />
                        </p>

                        <ul className="about__bullets">
                            <li>
                                <Trans i18nKey="about.points.design" components={{ strong: <strong /> }} />
                            </li>
                            <li>
                                <Trans i18nKey="about.points.deploy" components={{ strong: <strong /> }} />
                            </li>
                            <li>
                                <Trans i18nKey="about.points.support" components={{ strong: <strong /> }} />
                            </li>
                        </ul>

                        <p className="about__subhead"><strong>{t("about.growthTitle")}</strong></p>
                        <p>
                            <Trans i18nKey="about.growth" />
                        </p>

                        <p className="about__subhead"><strong>{t("about.goalTitle")}</strong></p>
                        <p>
                            <Trans i18nKey="about.goal" />
                        </p>

                        <div className="about__actions">
                            <HashLink smooth to="/experience#experience" className="btn btn--primary">
                                {t("about.ctaExperience")}
                            </HashLink>
                            <HashLink smooth to="/contact#contact" className="btn btn--outline">
                                {t("about.ctaContact")}
                            </HashLink>
                        </div>

                        <div className="about__social">
                            <a href="mailto:crusty.it.office@gmail.com" aria-label={t("about.social.emailAria")} target="_blank" rel="noopener noreferrer">
                                <FaEnvelope />
                            </a>
                            <a href="https://github.com/Crusty-IT" aria-label={t("about.social.githubAria")} target="_blank" rel="noopener noreferrer">
                                <FaGithub />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/tomasz-skorupski-a078ba389"
                                aria-label={t("about.social.linkedinAria")}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                    <aside className="about__card animate-fade-in delay-1s">
                        <div className="about__fact">
                            <FaMapMarkerAlt />
                            <div>
                                <h4>{t("about.facts.locationTitle")}</h4>
                                <p>{t("about.facts.locationValue")}</p>
                            </div>
                        </div>
                        <div className="about__fact">
                            <FaBriefcase />
                            <div>
                                <h4>{t("about.facts.statusTitle")}</h4>
                                <p>{t("about.facts.statusValue")}</p>
                            </div>
                        </div>
                        <div className="about__fact">
                            <FaLanguage />
                            <div>
                                <h4>{t("about.facts.languagesTitle")}</h4>
                                <p>{t("about.facts.languagesValue")}</p>
                            </div>
                        </div>
                        <div>
                            <h4>{t("about.facts.certsTitle")}</h4>
                            <ul className="certs-list">
                                <li>
                                    <a
                                        href={t("about.facts.cert1Url")}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {t("about.facts.cert1Name")}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={t("about.facts.cert2Url")}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {t("about.facts.cert2Name")}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="about__rings-block">

                            <div className="about__rings-grid">
                                <SkillRing label={t("about.soft.pass")} value={95} color="#9b5cff" />
                                <SkillRing label={t("about.soft.account")} value={90} color="#3aa2ff" />
                                <SkillRing label={t("about.soft.team")} value={80} color="#ffb640" />
                                <SkillRing label={t("about.soft.creativity")} value={74} color="#31d287" />
                                <SkillRing label={t("about.soft.flex")} value={90} color="#22e1d9" />
                                <SkillRing label={t("about.soft.lead")} value={60} color="#ff6f7d" />
                            </div>
                        </div>
                    </aside>
                </div>

                <section className="about__tech animate-slide-up delay-2s">
                    <h3>{t("about.techTitle")}</h3>
                    <div className="about__tech-grid">
                        <span className="chip"><FaWindows /> {t("about.techChips.win")}</span>
                        <span className="chip"><SiLinux /> {t("about.techChips.linux")}</span>
                        <span className="chip"><SiDocker /> {t("about.techChips.docker")}</span>
                        <span className="chip"><SiGit /> {t("about.techChips.git")}</span>
                        <span className="chip"><SiReact /> {t("about.techChips.react")}</span>
                        <span className="chip"><SiJavascript /> {t("about.techChips.js")}</span>
                        <span className="chip"><SiPostgresql /> {t("about.techChips.pg")}</span>
                        <span className="chip"><SiMysql /> {t("about.techChips.mysql")}</span>
                        <span className="chip"><SiFirebase /> {t("about.techChips.firebase")}</span>
                        <span className="chip"><SiJira /> {t("about.techChips.jira")}</span>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default About;