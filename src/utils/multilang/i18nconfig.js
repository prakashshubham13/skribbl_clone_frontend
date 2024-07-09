// i18n.js (or similar)
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const detectBrowserDefaultLanguage = () => {
  return navigator.language.split("-")[0];
};

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        btn_1: "Play!",
        btn_2: "Create Private Room",
        input_1: "Enter Your Name",
      },
    },
    hi: {
      translation: {
        btn_1: "खेल!",
        btn_2: "निजी कक्ष बनाएँ",
        input_1: "अपना नाम दर्ज करें",
      },
    },
    fr: {
      translation: {
        btn_1: "Jouer !",
        btn_2: "Créer une salle privée",
        input_1: "Entrez votre nom",
      },
    },
  },
  lng: detectBrowserDefaultLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// Function to load translations from API
export const loadTranslations = async (language) => {
  try {
    const response = await fetch(`${language}`);
    const translations = await response.json();
    i18n.addResourceBundle(language, "translation", translations);
  } catch (error) {
    console.error("Failed to load translations:", error);
  }
};

export default i18n;
