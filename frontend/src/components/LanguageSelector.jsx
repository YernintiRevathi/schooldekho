import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = ({ onClose }) => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  ];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('i18nextLng', langCode);
    onClose();
  };

  return (
    <div className="py-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200 ${
            i18n.language === lang.code ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">{lang.name}</span>
            <span className="text-sm text-gray-500">{lang.nativeName}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;