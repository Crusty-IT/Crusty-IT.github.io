import React, { useRef, useEffect, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import './Navbar.css';

const LOGO_URL = 'https://raw.githubusercontent.com/shellupski/Moja-strona/main/images/logo_horizontaly.svg';

// Zmieniamy etykiety na klucze, które będziemy tłumaczyć
const navItems = [
    { to: '/', labelKey: 'nav.home' },
    { to: '/about', labelKey: 'nav.about' },
    { to: '/experience', labelKey: 'nav.experience' },
    { to: '/skills', labelKey: 'nav.skills' },
    { to: '/portfolio', labelKey: 'nav.portfolio' },
    { to: '/contact', labelKey: 'nav.contact' },
];

const Navbar = () => {
    const { t, i18n } = useTranslation(); // Inicjalizacja hooka useTranslation
    const linksContainerRef = useRef(null);
    // Usuwamy lokalny stan 'lang', ponieważ i18n.language będzie go zastępować
    // const [lang, setLang] = useState('pl'); // Ta linia nie jest już potrzebna
    const location = useLocation();

    const setPillToElement = useCallback((el) => {
        const container = linksContainerRef.current;
        if (!container || !el) return;
        const containerRect = container.getBoundingClientRect();
        const { left, width } = el.getBoundingClientRect();
        container.style.setProperty('--pill-left', `${left - containerRect.left}px`);
        container.style.setProperty('--pill-width', `${width}px`);
        container.style.setProperty('--pill-opacity', '1');
    }, []);

    const setPillToActive = useCallback(() => {
        const container = linksContainerRef.current;
        if (!container) return;
        const active = container.querySelector('a.active');
        if (active) setPillToElement(active);
        else container.style.setProperty('--pill-opacity', '0');
    }, [setPillToElement]);

    const handleMouseEnter = (e) => {
        const link = e.currentTarget.querySelector('a');
        if (link) setPillToElement(link);
    };

    const handleMouseLeave = () => setPillToActive();

    // Zmieniamy handleLangChange, aby korzystała z i18n.changeLanguage
    const handleLangChange = (newLang) => {
        i18n.changeLanguage(newLang);
    };

    useEffect(() => {
        setPillToActive();
    }, [location.pathname, setPillToActive, i18n.language]); // Dodajemy i18n.language do zależności, aby pigułka aktualizowała się po zmianie języka

    useEffect(() => {
        const onResize = () => setPillToActive();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [setPillToActive]);

    return (
        <header className="main-header">
            <div className="header-logo">
                <NavLink to="/" className="logo-link" aria-label={t('logo.ariaLabel')}> {/* Tłumaczenie aria-label */}
                    <img
                        src={LOGO_URL}
                        alt={t('logo.altText')}
                        height="40"
                        loading="eager"
                        decoding="async"
                        draggable="false"
                    />
                </NavLink>
            </div>

            <nav
                className="main-nav"
                ref={linksContainerRef}
                onMouseLeave={handleMouseLeave}
            >
                <ul>
                    {navItems.map((item) => (
                        <li key={item.to} onMouseEnter={handleMouseEnter}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) => (isActive ? 'active' : '')}
                                end={item.to === '/'}
                            >
                                {t(item.labelKey)} {/* Używamy funkcji t() do tłumaczenia labelKey */}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="header-lang-switcher">
                {/* Używamy i18n.language do określenia aktywnego języka */}
                <button className={i18n.language === 'pl' ? 'active' : ''} onClick={() => handleLangChange('pl')}>PL</button>
                <span>|</span>
                <button className={i18n.language === 'en' ? 'active' : ''} onClick={() => handleLangChange('en')}>EN</button>
            </div>
        </header>
    );
};

export default Navbar;