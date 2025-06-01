import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    title: 'AquaHeroes',
    subtitle: 'Save Water, Be a Hero!',
    startButton: 'Start Adventure!',
    waterConservation: 'WATER CONSERVATION ALERT!',
    objectives: 'OBJECTIVES',
    gameInstructions: 'Use arrow keys to move and space bar to interact with objects.',
    welcome: 'Welcome to AquaHeroes!',
    levelSelect: 'Select Level',
    level1: 'Level 1',
    level2: 'Level 2',
    level3: 'Level 3',
    backButton: 'Back',
    loading: 'Loading...',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    continue: 'Continue',
    yes: 'Yes',
    no: 'No',
    completed: 'Completed!',
    congratulations: 'Congratulations!',
    nextLevel: 'Next Level',
    playAgain: 'Play Again',
    turnOffFaucet: 'Yes, Turn Off!',
    leaveFaucet: 'No, Leave It'
  },
  fr: {
    title: 'AquaHéros',
    subtitle: 'Économisez l\'eau, soyez un héros!',
    startButton: 'Commencer l\'aventure!',
    waterConservation: 'ALERTE CONSERVATION DE L\'EAU!',
    objectives: 'OBJECTIFS',
    gameInstructions: 'Utilisez les flèches pour vous déplacer et la barre d\'espace pour interagir.',
    welcome: 'Bienvenue dans AquaHéros!',
    levelSelect: 'Sélectionnez le niveau',
    level1: 'Niveau 1',
    level2: 'Niveau 2',
    level3: 'Niveau 3',
    backButton: 'Retour',
    loading: 'Chargement...',
    login: 'Connexion',
    signup: 'S\'inscrire',
    logout: 'Déconnexion',
    continue: 'Continuer',
    yes: 'Oui',
    no: 'Non',
    completed: 'Terminé!',
    congratulations: 'Félicitations!',
    nextLevel: 'Niveau suivant',
    playAgain: 'Rejouer',
    turnOffFaucet: 'Oui, fermez-le!',
    leaveFaucet: 'Non, laissez-le'
  },
  ar: {
    title: 'أبطال المياه',
    subtitle: 'احفظ الماء، كن بطلاً!',
    startButton: 'ابدأ المغامرة!',
    waterConservation: 'تنبيه حفظ المياه!',
    objectives: 'الأهداف',
    gameInstructions: 'استخدم مفاتيح الأسهم للتحرك ومفتاح المسافة للتفاعل مع الأشياء.',
    welcome: 'مرحباً بك في أبطال المياه!',
    levelSelect: 'اختر المرحلة',
    level1: 'المرحلة الأولى',
    level2: 'المرحلة الثانية',
    level3: 'المرحلة الثالثة',
    backButton: 'عودة',
    loading: 'جاري التحميل...',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    continue: 'متابعة',
    yes: 'نعم',
    no: 'لا',
    completed: 'مكتمل!',
    congratulations: 'تهانينا!',
    nextLevel: 'المرحلة التالية',
    playAgain: 'العب مرة أخرى',
    turnOffFaucet: 'نعم، أغلقه!',
    leaveFaucet: 'لا، اتركه'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    // Store language preference in localStorage
    localStorage.setItem('aquaheroes-language', language);
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key as keyof typeof translations[Language]] || key;
  };

  // Load language preference from localStorage on mount
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('aquaheroes-language') as Language;
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
      <div dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 