import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useArticle } from "../context/ArticleContext";
import Filter from "./Filter";

interface ParametersProps {
  loading: boolean;
  setLoading: (arg0: boolean) => void;
}

const COOKIE_KEYS = {
  ARTICLE_LENGTH: "articleLength",
  TONE: "tone",
  LANGUAGE: "language",
  THEME: "theme",
  TARGET: "target",
  LEVELS: "levels",
  ALL_TONES: "allTones",
};

const commonTones = [
  { title: "Professional", custom: false },
  { title: "Conversational", custom: false },
  { title: "Educational", custom: false },
  { title: "Persuasive", custom: false },
  { title: "Neutral", custom: false },
  { title: "Optimistic", custom: false },
];

const commonLanguages = [
  "Arabic",
  "Bengali",
  "English",
  "French",
  "German",
  "Hindi",
  "Indonesian",
  "Italian",
  "Japanese",
  "Korean",
  "Mandarin Chinese",
  "Portuguese",
  "Russian",
  "Spanish",
  "Swahili",
  "Tamil",
  "Tagalog",
  "Turkish",
  "Urdu",
  "Vietnamese",
];

const commonDetailLevels = ["Overview", "Moderate", "Advanced"];

const Parameters: React.FC<ParametersProps> = ({ loading, setLoading }) => {
  const [articleLength, setArticleLength] = useState<number>(500);
  const [tone, setTone] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [detailLevels, setDetailLevels] = useState<string>("");
  const { updateGeneratedArticle } = useArticle();
  const setCookie = (key: string, value: string | number) =>
    Cookies.set(key, value.toString());

  const handleArticleLengthChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(e.target.value, 10);
    setArticleLength(value);
    setCookie(COOKIE_KEYS.ARTICLE_LENGTH, value);
  };

  const handleToneChange = (selectedValue: string) => {
    handleStateChange(setTone, COOKIE_KEYS.TONE, selectedValue);
  };

  const handleLanguageChange = (selectedValue: string) => {
    handleStateChange(setLanguage, COOKIE_KEYS.LANGUAGE, selectedValue);
  };

  const handleThemeChange = (selectedValue: string) => {
    handleStateChange(setTheme, COOKIE_KEYS.THEME, selectedValue);
  };
  const handleTargetChange = (selectedValue: string) => {
    handleStateChange(setTarget, COOKIE_KEYS.TARGET, selectedValue);
  };
  const handleDetailLevelsChange = (selectedValue: string) => {
    handleStateChange(setDetailLevels, COOKIE_KEYS.LEVELS, selectedValue);
  };

  const handleStateChange = (
    setState: React.Dispatch<React.SetStateAction<any>>,
    cookieKey: string,
    selectedValue: string,
  ) => {
    // Update state
    setState(selectedValue);

    // Set Cookie
    setCookie(cookieKey, selectedValue);
  };

  const handleSubmit = () => {
    setLoading(true);

    // Construire l'objet avec les paramètres à envoyer
    const dataToSend = {
      theme,
      articleLength,
      tone,
      language,
      detailLevels,
      target,
    };

    // Utiliser fetch pour envoyer une requête POST vers votre backend local
    fetch("http://localhost:3001/generate-article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Ajouter d'autres en-têtes si nécessaire
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        data = data.article;
        // Vérifier si la réponse est positive
        if (data && data.finish_reason === "stop") {
          // Récupérer le contenu de l'article généré
          const generatedArticle = data.message.content;

          updateGeneratedArticle(generatedArticle);

          // Ajouter d'autres logiques de traitement si nécessaire
        } else {
          console.error(
            "La réponse du serveur ne contient pas les données attendues.",
          );
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la communication avec le serveur:",
          error.message,
        );
        // Gérer les erreurs selon vos besoins
      })
      .finally(() => {
        // Code qui sera exécuté indépendamment du succès ou de l'échec
        setLoading(false);
      });
  };

  return (
    <div className="pb-4">
      <h2 className="mb-4 text-xl font-bold">Adjust Parameters</h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Theme Filter */}
        <Filter
          label="Theme"
          type="input"
          value={theme}
          onChange={handleThemeChange}
          cookieKeySelectedOption={COOKIE_KEYS.THEME}
        />

        {/* Article Length */}
        <div className="h-32 rounded-lg bg-gray-100 p-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Article Length
          </label>
          <input
            type="range"
            min="100"
            max="1000"
            value={articleLength}
            onChange={handleArticleLengthChange}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{articleLength} words</span>
        </div>

        {/* Writing Tone */}
        <Filter
          label="Writing Tone"
          type="customSelect"
          options={commonTones}
          value={tone}
          onChange={handleToneChange}
          cookieKeyAllOptions={COOKIE_KEYS.ALL_TONES}
          cookieKeySelectedOption={COOKIE_KEYS.TONE}
        />

        {/* Language Filter */}
        <Filter
          label="Language"
          type="select"
          options={commonLanguages}
          value={language}
          onChange={handleLanguageChange}
          cookieKeySelectedOption={COOKIE_KEYS.LANGUAGE}
        />

        {/* Detail Filter */}
        <Filter
          label="Detail Level"
          type="select"
          options={commonDetailLevels}
          value={detailLevels}
          onChange={handleDetailLevelsChange}
          cookieKeySelectedOption={COOKIE_KEYS.LEVELS}
        />

        {/* Target Filter */}
        <Filter
          label="Target audience"
          type="input"
          value={target}
          onChange={handleTargetChange}
          cookieKeySelectedOption={COOKIE_KEYS.TARGET}
        />
      </div>

      {/* Validation Button */}
      <button
        onClick={handleSubmit}
        className={`mt-4 rounded-md px-4 py-2 text-white ${
          loading
            ? "cursor-not-allowed bg-gray-500"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Article"}
      </button>
    </div>
  );
};

export default Parameters;
