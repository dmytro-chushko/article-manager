import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import english from './en/english.json';

export const defaultNS = 'translation';

i18next
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: english,
      },
    },
    defaultNS,
  });

export default i18next;
