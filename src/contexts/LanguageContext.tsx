import { createContext, useContext, useState, type ReactNode } from 'react';
import { translations, type Language } from '@/lib/translations';

interface LanguageContextType {
  currentLang: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.es;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLang, setCurrentLang] = useState<Language>('es');

  const setLanguage = (lang: Language) => {
    setCurrentLang(lang);
  };

  const toggleLanguage = () => {
    setCurrentLang(currentLang === 'es' ? 'en' : 'es');
  };

  const t = translations[currentLang];

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
