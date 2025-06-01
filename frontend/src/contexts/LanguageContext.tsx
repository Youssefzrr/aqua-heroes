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
    // First Page
    title: 'AquaHeroes',
    subtitle: 'Save Water, Be a Hero!',
    startButton: 'Start Adventure!',
    welcome: 'Welcome to AquaHeroes!',
    
    // Login Page
    loginTitle: 'Log In to AquaHeroes',
    loginSubtitle: 'Access your account to continue your water-saving journey!',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Password',
    loginButton: 'Log In',
    noAccount: "Don't have an account?",
    signUpLink: 'Sign Up',
    
    // Signup Page  
    signupTitle: 'Join AquaHeroes',
    signupSubtitle: 'Create an account to start saving water!',
    signupButton: 'Sign Up',
    haveAccount: 'Already have an account?',
    loginLink: 'Log In',
    
    // Level Select
    levelSelectTitle: 'Water-Saving Adventures',
    levelSelectSubtitle: 'Choose your next mission!',
    levelLabel: 'Level',
    previousButton: '🌊 Previous',
    nextButton: 'Next 🌊',
    waterSaved: 'saved',
    unlockMessage: 'Complete the previous level first to unlock this one!',
    
    // Level Titles
    level1Title: 'Water & Lake Conservation',
    level2Title: 'Water-Conscious Pool Manager',
    level3Title: 'Eco-Friendly Garden Expert',
    level4Title: 'Efficient Laundry Specialist',
    level5Title: 'Sustainable Car Washing',
    level6Title: 'Water-Conscious Pool Manager 2',
    level7Title: 'Rainwater Harvesting Pro',
    level8Title: 'Water Conservation Detective',
    level9Title: 'Environmental Water Explorer',
    level10Title: 'Ultimate Water Champion',
    
    // Game Common
    backButton: 'Back',
    loading: 'Loading...',
    continue: 'Continue',
    yes: 'Yes',
    no: 'No',
    completed: 'Completed!',
    congratulations: 'Congratulations!',
    nextLevel: 'Next Level',
    playAgain: 'Play Again',
    
    // Level 1 Game - Mission Start
    missionStartTitle: 'WATER HERO MISSION',
    missionWelcome: 'Welcome to the Garden of Conservation! Your mission:',
    missionExplore: 'Explore the beautiful garden path',
    missionFind: 'Find the water-wasting faucet',
    missionTurnOff: 'Turn off the faucet to save water',
    missionProtect: 'Help protect our precious water resources!',
    startMissionButton: 'START MISSION!',
    
    // Level 1 Game - Faucet Dialog
    waterConservationAlert: 'WATER CONSERVATION ALERT!',
    faucetFoundMessage: 'You found a running faucet wasting precious water!',
    everyDropCounts: 'Every drop counts for our planet',
    helpSaveResources: 'Help save our precious water resources',
    faucetQuestion: 'What would you like to do?',
    turnOffFaucet: 'Yes, Turn Off!',
    leaveFaucet: 'No, Leave It',
    
    // Level 1 Game - Lake Dialog
    saveFishTitle: 'SAVE THE FISH!',
    lakePolluteMessage: 'The lake is polluted with trash and the fish are in danger!',
    fishStruggling: 'Poor fish are struggling to survive',
    trashPolluting: 'Trash is polluting their home',
    cleanLakeQuestion: 'Do you want to clean the lake and save them?',
    saveFishButton: 'Yes, Save Fish!',
    leaveLakeButton: 'No, Leave It',
    
    // Level 1 Game - UI Elements
    progressLabel: 'Progress:',
    timeLabel: 'Time:',
    faucetTask: 'Faucet',
    lakeTask: 'Lake',
    finishText: 'FINISH',
    
    // Level 1 Game - Results
    missionCompleteTitle: 'MISSION COMPLETE!',
    starsEarnedTitle: 'Stars Earned:',
    taskCompletion: 'Task Completion:',
    timeBonus: 'Time Bonus: 1 star',
    totalStars: 'Total:',
    starsUnit: 'stars',
    nextLevelButton: 'Next Level 🚀',
    mainMenuButton: 'Main Menu 🏠',
    
    // Error Messages
    errorLogin: 'An error occurred during login.',
    errorSignup: 'An error occurred during signup.',
    errorUserNotFound: 'No user found with this email.',
    errorWrongPassword: 'Incorrect password.',
    errorInvalidEmail: 'Invalid email address.',
    errorEmailInUse: 'This email is already registered.',
    errorWeakPassword: 'Password is too weak. Use at least 6 characters.',
    errorAuthDisabled: 'Email/Password authentication is not enabled.'
  },
  fr: {
    // First Page
    title: 'AquaHéros',
    subtitle: 'Économisez l\'eau, soyez un héros!',
    startButton: 'Commencer l\'aventure!',
    welcome: 'Bienvenue dans AquaHéros!',
    
    // Login Page
    loginTitle: 'Se connecter à AquaHéros',
    loginSubtitle: 'Accédez à votre compte pour continuer votre voyage d\'économie d\'eau!',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Mot de passe',
    loginButton: 'Se connecter',
    noAccount: 'Vous n\'avez pas de compte?',
    signUpLink: 'S\'inscrire',
    
    // Signup Page  
    signupTitle: 'Rejoindre AquaHéros',
    signupSubtitle: 'Créez un compte pour commencer à économiser l\'eau!',
    signupButton: 'S\'inscrire',
    haveAccount: 'Vous avez déjà un compte?',
    loginLink: 'Se connecter',
    
    // Level Select
    levelSelectTitle: 'Aventures d\'économie d\'eau',
    levelSelectSubtitle: 'Choisissez votre prochaine mission!',
    levelLabel: 'Niveau',
    previousButton: '🌊 Précédent',
    nextButton: 'Suivant 🌊',
    waterSaved: 'économisé',
    unlockMessage: 'Terminez le niveau précédent pour débloquer celui-ci!',
    
    // Level Titles
    level1Title: 'Conservation de l\'eau et des lacs',
    level2Title: 'Gestionnaire de piscine économe en eau',
    level3Title: 'Expert en jardinage écologique',
    level4Title: 'Spécialiste de lessive efficace',
    level5Title: 'Lavage de voiture durable',
    level6Title: 'Gestionnaire de piscine économe en eau 2',
    level7Title: 'Pro de la collecte d\'eau de pluie',
    level8Title: 'Détective de conservation d\'eau',
    level9Title: 'Explorateur d\'eau environnementale',
    level10Title: 'Champion ultime de l\'eau',
    
    // Game Common
    backButton: 'Retour',
    loading: 'Chargement...',
    continue: 'Continuer',
    yes: 'Oui',
    no: 'Non',
    completed: 'Terminé!',
    congratulations: 'Félicitations!',
    nextLevel: 'Niveau suivant',
    playAgain: 'Rejouer',
    
    // Level 1 Game - Mission Start
    missionStartTitle: 'MISSION HÉROS DE L\'EAU',
    missionWelcome: 'Bienvenue au Jardin de la Conservation! Votre mission:',
    missionExplore: 'Explorez le beau sentier du jardin',
    missionFind: 'Trouvez le robinet qui gaspille l\'eau',
    missionTurnOff: 'Fermez le robinet pour économiser l\'eau',
    missionProtect: 'Aidez à protéger nos précieuses ressources en eau!',
    startMissionButton: 'COMMENCER LA MISSION!',
    
    // Level 1 Game - Faucet Dialog
    waterConservationAlert: 'ALERTE CONSERVATION DE L\'EAU!',
    faucetFoundMessage: 'Vous avez trouvé un robinet qui gaspille de l\'eau précieuse!',
    everyDropCounts: 'Chaque goutte compte pour notre planète',
    helpSaveResources: 'Aidez à sauver nos précieuses ressources en eau',
    faucetQuestion: 'Que voulez-vous faire?',
    turnOffFaucet: 'Oui, fermez-le!',
    leaveFaucet: 'Non, laissez-le',
    
    // Level 1 Game - Lake Dialog
    saveFishTitle: 'SAUVEZ LES POISSONS!',
    lakePolluteMessage: 'Le lac est pollué par des déchets et les poissons sont en danger!',
    fishStruggling: 'Les pauvres poissons luttent pour survivre',
    trashPolluting: 'Les déchets polluent leur maison',
    cleanLakeQuestion: 'Voulez-vous nettoyer le lac et les sauver?',
    saveFishButton: 'Oui, sauvez les poissons!',
    leaveLakeButton: 'Non, laissez-le',
    
    // Level 1 Game - UI Elements
    progressLabel: 'Progrès:',
    timeLabel: 'Temps:',
    faucetTask: 'Robinet',
    lakeTask: 'Lac',
    finishText: 'ARRIVÉE',
    
    // Level 1 Game - Results
    missionCompleteTitle: 'MISSION TERMINÉE!',
    starsEarnedTitle: 'Étoiles gagnées:',
    taskCompletion: 'Achèvement des tâches:',
    timeBonus: 'Bonus de temps: 1 étoile',
    totalStars: 'Total:',
    starsUnit: 'étoiles',
    nextLevelButton: 'Niveau suivant 🚀',
    mainMenuButton: 'Menu principal 🏠',
    
    // Error Messages
    errorLogin: 'Une erreur s\'est produite lors de la connexion.',
    errorSignup: 'Une erreur s\'est produite lors de l\'inscription.',
    errorUserNotFound: 'Aucun utilisateur trouvé avec cet email.',
    errorWrongPassword: 'Mot de passe incorrect.',
    errorInvalidEmail: 'Adresse email invalide.',
    errorEmailInUse: 'Cet email est déjà enregistré.',
    errorWeakPassword: 'Le mot de passe est trop faible. Utilisez au moins 6 caractères.',
    errorAuthDisabled: 'L\'authentification par email/mot de passe n\'est pas activée.'
  },
  ar: {
    // First Page
    title: 'أبطال المياه',
    subtitle: 'احفظ الماء، كن بطلاً!',
    startButton: 'ابدأ المغامرة!',
    welcome: 'مرحباً بك في أبطال المياه!',
    
    // Login Page
    loginTitle: 'تسجيل الدخول إلى أبطال المياه',
    loginSubtitle: 'ادخل إلى حسابك لمتابعة رحلة توفير المياه!',
    emailPlaceholder: 'البريد الإلكتروني',
    passwordPlaceholder: 'كلمة المرور',
    loginButton: 'تسجيل الدخول',
    noAccount: 'ليس لديك حساب؟',
    signUpLink: 'إنشاء حساب',
    
    // Signup Page  
    signupTitle: 'انضم إلى أبطال المياه',
    signupSubtitle: 'أنشئ حساباً لتبدأ في توفير المياه!',
    signupButton: 'إنشاء حساب',
    haveAccount: 'هل لديك حساب بالفعل؟',
    loginLink: 'تسجيل الدخول',
    
    // Level Select
    levelSelectTitle: 'مغامرات توفير المياه',
    levelSelectSubtitle: 'اختر مهمتك التالية!',
    levelLabel: 'المرحلة',
    previousButton: '🌊 السابق',
    nextButton: 'التالي 🌊',
    waterSaved: 'محفوظ',
    unlockMessage: 'أكمل المرحلة السابقة أولاً لفتح هذه المرحلة!',
    
    // Level Titles
    level1Title: 'حفظ المياه والبحيرات',
    level2Title: 'مدير المسبح الواعي بالمياه',
    level3Title: 'خبير البستنة الصديقة للبيئة',
    level4Title: 'متخصص الغسيل الفعال',
    level5Title: 'غسيل السيارات المستدام',
    level6Title: 'مدير المسبح الواعي بالمياه 2',
    level7Title: 'محترف جمع مياه الأمطار',
    level8Title: 'محقق حفظ المياه',
    level9Title: 'مستكشف المياه البيئية',
    level10Title: 'بطل المياه النهائي',
    
    // Game Common
    backButton: 'عودة',
    loading: 'جاري التحميل...',
    continue: 'متابعة',
    yes: 'نعم',
    no: 'لا',
    completed: 'مكتمل!',
    congratulations: 'تهانينا!',
    nextLevel: 'المرحلة التالية',
    playAgain: 'العب مرة أخرى',
    
    // Level 1 Game - Mission Start
    missionStartTitle: 'مهمة بطل المياه',
    missionWelcome: 'مرحباً بك في حديقة الحفاظ على البيئة! مهمتك:',
    missionExplore: 'استكشف طريق الحديقة الجميل',
    missionFind: 'ابحث عن الصنبور الذي يُضيع المياه',
    missionTurnOff: 'أغلق الصنبور لتوفير المياه',
    missionProtect: 'ساعد في حماية مواردنا المائية الثمينة!',
    startMissionButton: 'ابدأ المهمة!',
    
    // Level 1 Game - Faucet Dialog
    waterConservationAlert: 'تنبيه حفظ المياه!',
    faucetFoundMessage: 'لقد وجدت صنبوراً يُضيع المياه الثمينة!',
    everyDropCounts: 'كل قطرة مهمة لكوكبنا',
    helpSaveResources: 'ساعد في توفير مواردنا المائية الثمينة',
    faucetQuestion: 'ماذا تريد أن تفعل؟',
    turnOffFaucet: 'نعم، أغلقه!',
    leaveFaucet: 'لا، اتركه',
    
    // Level 1 Game - Lake Dialog
    saveFishTitle: 'أنقذ الأسماك!',
    lakePolluteMessage: 'البحيرة ملوثة بالقمامة والأسماك في خطر!',
    fishStruggling: 'الأسماك المسكينة تكافح من أجل البقاء',
    trashPolluting: 'القمامة تلوث منزلهم',
    cleanLakeQuestion: 'هل تريد تنظيف البحيرة وإنقاذهم؟',
    saveFishButton: 'نعم، أنقذ الأسماك!',
    leaveLakeButton: 'لا، اتركها',
    
    // Level 1 Game - UI Elements
    progressLabel: 'التقدم:',
    timeLabel: 'الوقت:',
    faucetTask: 'الصنبور',
    lakeTask: 'البحيرة',
    finishText: 'النهاية',
    
    // Level 1 Game - Results
    missionCompleteTitle: 'المهمة مكتملة!',
    starsEarnedTitle: 'النجوم المكتسبة:',
    taskCompletion: 'إنجاز المهام:',
    timeBonus: 'مكافأة الوقت: نجمة واحدة',
    totalStars: 'المجموع:',
    starsUnit: 'نجوم',
    nextLevelButton: 'المرحلة التالية 🚀',
    mainMenuButton: 'القائمة الرئيسية 🏠',
    
    // Error Messages
    errorLogin: 'حدث خطأ أثناء تسجيل الدخول.',
    errorSignup: 'حدث خطأ أثناء إنشاء الحساب.',
    errorUserNotFound: 'لم يتم العثور على مستخدم بهذا البريد الإلكتروني.',
    errorWrongPassword: 'كلمة مرور غير صحيحة.',
    errorInvalidEmail: 'عنوان بريد إلكتروني غير صالح.',
    errorEmailInUse: 'هذا البريد الإلكتروني مسجل بالفعل.',
    errorWeakPassword: 'كلمة المرور ضعيفة جداً. استخدم 6 أحرف على الأقل.',
    errorAuthDisabled: 'مصادقة البريد الإلكتروني/كلمة المرور غير مفعلة.'
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