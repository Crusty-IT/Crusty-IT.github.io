import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import pl from "./locales/pl/translation.json";
import en from "./locales/en/translation.json";

const resources = {
    pl: { translation: pl },
    en: { translation: en }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "pl",
        lng: "pl",
        supportedLngs: ["pl", "en"],
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ["localStorage", "navigator", "htmlTag"],
            caches: ["localStorage"]
        },
        react: {
            useSuspense: false
        }
    });

export default i18n;