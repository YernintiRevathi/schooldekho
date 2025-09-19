import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  const navigation = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.schools'), href: '/schools' },
    { name: t('navigation.compare'), href: '/compare' },
    { name: t('navigation.loans'), href: '/loans' },
    { name: t('navigation.scholarships'), href: '/scholarships' },
    { name: t('navigation.alumni'), href: '/alumni' },
    { name: t('navigation.fundraising'), href: '/fundraising' },
    { name: t('navigation.policies'), href: '/policies' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-600 text-white p-2 rounded-lg">
              <span className="text-xl font-bold">SD</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('header.title')}</h1>
              <p className="text-sm text-gray-600 hidden sm:block">{t('header.tagline')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                <Globe size={20} />
                <ChevronDown size={16} />
              </button>
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <LanguageSelector onClose={() => setIsLanguageOpen(false)} />
                </div>
              )}
            </div>

            {/* Auth buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              <button className="btn-secondary">
                {t('header.login')}
              </button>
              <button className="btn-primary">
                {t('header.register')}
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-primary-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium py-2 transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <button className="btn-secondary text-left">
                  {t('header.login')}
                </button>
                <button className="btn-primary text-left">
                  {t('header.register')}
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;