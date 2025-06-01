import React, { useState } from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { EnglishFlag, FrenchFlag, ArabicFlagSimple } from './FlagIcons';
import '../styles/LanguageSelector.css';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en' as Language, name: 'English', flag: EnglishFlag },
    { code: 'fr' as Language, name: 'Français', flag: FrenchFlag },
    { code: 'ar' as Language, name: 'العربية', flag: ArabicFlagSimple },
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = (langCode: Language) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="language-selector">
      <div 
        className="language-selector-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentLang && (
          <>
            <currentLang.flag width={24} height={16} className="flag-icon" />
            <span className="language-name">{currentLang.name}</span>
          </>
        )}
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </div>
      
      {isOpen && (
        <div className="language-dropdown">
          {languages.map((language) => (
            <div
              key={language.code}
              className={`language-option ${currentLanguage === language.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(language.code)}
            >
              <language.flag width={20} height={14} className="flag-icon" />
              <span className="language-name">{language.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 