import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import { Globe, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { t } = useTranslation();
  const { currentLang, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = () => {
    const nextLang = currentLang === 'ar' ? 'en' : 'ar';
    changeLanguage(nextLang);
  };

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/departments', label: t('nav.departments') },
    { path: '/programs', label: t('nav.programs') },
    { path: '/faculty', label: t('nav.faculty') },
    { path: '/news', label: t('nav.news') },
    { path: '/events', label: t('nav.events') },
    { path: '/announcements', label: t('nav.announcements') },
    { path: '/services', label: t('nav.services') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <nav className="navbar-custom sticky-top">
      <div className="container-fluid px-md-5 py-2">
        <div className="d-flex justify-content-between align-items-center">
          
          {/* Logo Section */}
          <NavLink to="/" className="d-flex align-items-center text-decoration-none navbar-brand-custom">
            <img 
              src="/src/assets/images/logo.jpg" 
              alt="University Logo" 
              height="50" 
              className="me-2" 
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
            <div className="d-flex flex-column navbar-college-name">
              <span className="fw-bold text-dark fs-6">{t('college.name')}</span>
            </div>
          </NavLink>

          {/* Desktop Links */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path} 
                className={({ isActive }) => 
                  `nav-link fw-semibold px-2 py-1 ${isActive ? 'text-primary border-bottom border-primary border-2' : 'text-secondary'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Controls: Language Switcher + Mobile Menu Button */}
          <div className="d-flex align-items-center gap-2">
            <button 
              onClick={toggleLanguage} 
              className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
            >
              <Globe size={16} />
              <span>{currentLang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            <button 
              className="btn btn-light d-lg-none" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Drawer Menu */}
        {isOpen && (
          <div className="d-lg-none mt-3 pt-3 border-top">
            <div className="d-flex flex-column gap-2">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => 
                    `p-2 rounded text-decoration-none ${isActive ? 'bg-primary text-white' : 'text-dark hover-bg-light'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};