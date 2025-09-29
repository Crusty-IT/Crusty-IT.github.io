// React i style
import React, { useMemo, useState } from "react";
import "./Skills.css";
import {
  FaWindows,
  FaLinux,
  FaNetworkWired,
  FaDatabase,
  FaTerminal,
  FaCloud,
  FaTools,
  FaComments,
  FaLightbulb,
  FaUsers,
  FaHtml5,
  FaCss3,
  FaAmazon
} from "react-icons/fa";
import {
  SiDocker,
  SiReact,
  SiJavascript,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiGitlab,
  SiGithubactions,
  SiJira,
  SiFirebase,
  SiGooglecloud,
  SiPhp
} from "react-icons/si";
import { TbBrandAzure } from "react-icons/tb";
import { useTranslation } from "react-i18next";

const Skills = () => {
  const { t, i18n } = useTranslation();
  const isEN = i18n.language?.startsWith("en");

  const LEVELS = useMemo(() => isEN
    ? { Advanced: 80, Intermediate: 65, Basics: 45 }
    : { Zaawansowany: 80, "Średniozaawansowany": 65, Podstawy: 45 }, [isEN]);

  const GROUPS = useMemo(() => [
    {
      key: "systems",
      label: t("skills.groups.systems"),
      items: [
        { name: t("skills.items.win.name"), level: t("skills.items.win.level"), Icon: FaWindows, notes: t("skills.items.win.notes") },
        { name: t("skills.items.linux.name"), level: t("skills.items.linux.level"), Icon: FaLinux, notes: t("skills.items.linux.notes") },
        { name: t("skills.items.scripts.name"), level: t("skills.items.scripts.level"), Icon: FaTerminal },
        { id: "hardening", name: t("skills.items.hardening.name"), level: t("skills.items.hardening.level"), Icon: FaTools }
      ]
    },
    {
      key: "network",
      label: t("skills.groups.network"),
      items: [
        { name: t("skills.items.netProtocols.name"), level: t("skills.items.netProtocols.level"), Icon: FaNetworkWired },
        { name: t("skills.items.netDevices.name"), level: t("skills.items.netDevices.level"), Icon: FaNetworkWired }
      ]
    },
    {
      key: "db",
      label: t("skills.groups.db"),
      items: [
        { name: t("skills.items.mysql.name"), level: t("skills.items.mysql.level"), Icon: SiMysql, notes: t("skills.items.mysql.notes") },
        { name: t("skills.items.postgres.name"), level: t("skills.items.postgres.level"), Icon: SiPostgresql },
        { name: t("skills.items.sql.name"), level: t("skills.items.sql.level"), Icon: FaDatabase }
      ]
    },
    {
      key: "devops",
      label: t("skills.groups.devops"),
      items: [
        { name: t("skills.items.git.name"), level: t("skills.items.git.level"), Icon: SiGit },
        { name: t("skills.items.cicd.name"), level: t("skills.items.cicd.level"), Icon: SiGithubactions },
        { name: t("skills.items.docker.name"), level: t("skills.items.docker.level"), Icon: SiDocker },
        {
          name: t("skills.items.cloud.name"),
          level: t("skills.items.cloud.level"),
          Icon: FaCloud,
          suffixIcons: [FaAmazon, TbBrandAzure, SiGooglecloud]
        }
      ]
    },
    {
      key: "frontend",
      label: t("skills.groups.frontend"),
      items: [
        { name: t("skills.items.react.name"), level: t("skills.items.react.level"), Icon: SiReact },
        { name: t("skills.items.js.name"), level: t("skills.items.js.level"), Icon: SiJavascript },
        { name: t("skills.items.htmlcss.name"), level: t("skills.items.htmlcss.level"), Icon: FaHtml5, twinIcon: FaCss3 },
        { name: t("skills.items.pwaFirebase.name"), level: t("skills.items.pwaFirebase.level"), Icon: SiFirebase },
        { name: t("skills.items.php.name"), level: t("skills.items.php.level"), Icon: SiPhp }
      ]
    },
    {
      key: "tools",
      label: t("skills.groups.tools"),
      items: [
        { name: t("skills.items.jira.name"), level: t("skills.items.jira.level"), Icon: SiJira },
        { name: t("skills.items.gitlab.name"), level: t("skills.items.gitlab.level"), Icon: SiGitlab },
        { name: t("skills.items.github.name"), level: t("skills.items.github.level"), Icon: SiGit },
        { name: t("skills.items.security.name"), level: t("skills.items.security.level"), Icon: FaTools }
      ]
    },
    {
      key: "soft",
      label: t("skills.groups.soft"),
      items: [
        { name: t("skills.items.problemSolving.name"), level: t("skills.items.problemSolving.level"), Icon: FaLightbulb },
        { name: t("skills.items.communication.name"), level: t("skills.items.communication.level"), Icon: FaComments },
        { id: "teamwork", name: t("skills.items.teamwork.name"), level: t("skills.items.teamwork.level"), Icon: FaUsers }
      ]
    }
  ], [t]);

  const SkillItem = ({ name, level, Icon, twinIcon: Twin, suffixIcons }) => {
    const value = LEVELS[level] || 50;
    return (
      <div className="sk-item glass">
        <div className="sk-head">
          <div className="sk-icons">
            <Icon className="sk-icon" />
            {Twin && <Twin className="sk-icon sk-icon--twin" />}
            {suffixIcons && suffixIcons.map((S, i) => <S key={i} className="sk-icon sk-icon--mini" />)}
          </div>
          <div className="sk-title">{name}</div>
          <div className={`sk-level sk-level--${level}`}>{level}</div>
        </div>

        <div className="sk-bar">
          <div className="sk-bar__fill" style={{ width: `${value}%` }} />
        </div>
      </div>
    );
  };

  const [active, setActive] = useState("all");
  const items = useMemo(() => {
    if (active === "all") return GROUPS;
    return GROUPS.filter((g) => g.key === active);
  }, [active, GROUPS]);

  return (
    <section id="skills" className="skills">
      <div className="skills__container">
        <header className="skills__header">
          <h2 className="skills__title">
            {t("skills.title")}
          </h2>
          <p className="skills__kicker">{t("skills.kicker")}</p>

          <div className="skills__legend">
            <span><b>{t("skills.legend.adv")}</b> {t("skills.legend.advPct")}</span>
            <span><b>{t("skills.legend.mid")}</b> {t("skills.legend.midPct")}</span>
            <span><b>{t("skills.legend.basic")}</b> {t("skills.legend.basicPct")}</span>
          </div>

          <div className="skills__tabs">
            <button
              className={`tab ${active === "all" ? "is-active" : ""}`}
              onClick={() => setActive("all")}
            >
              {t("skills.tabs.all")}
            </button>
            {GROUPS.map((g) => (
              <button
                key={g.key}
                className={`tab ${active === g.key ? "is-active" : ""}`}
                onClick={() => setActive(g.key)}
              >
                {g.label}
              </button>
            ))}
          </div>
        </header>

        {active === 'all'
          ? GROUPS.map((group) => (
              <section key={group.key} className="sk-group">
                <h3 className="sk-group__title">{group.label}</h3>
                <div className="sk-grid">
                  {group.items.map((s) => (
                    <SkillItem key={s.id} {...s} />
                  ))}
                </div>
              </section>
            ))
          : (() => {
              const group = GROUPS.find((g) => g.key === active);
              if (!group) return null;
              return (
                <section className="sk-group">
                  <h3 className="sk-group__title">{group.label}</h3>
                  <div className="sk-grid">
                    {group.items.map((s) => (
                      <SkillItem key={s.id} {...s} />
                    ))}
                  </div>
                </section>
              );
            })()}
      </div>
    </section>
  );
};

export default Skills;