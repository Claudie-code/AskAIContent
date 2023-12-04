import React, { useState } from "react";
import Cookies from "js-cookie";
import { useArticle } from "../context/ArticleContext";
import Filter from "./Filter";
import Loader from "./Loader";

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
  EXAMPLE: "example",
  EXTERNAL_URL: "external",
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

const commonExamples = ["Yes", "No"];

const commonExternalURL = ["Yes", "No"];

const Parameters: React.FC<ParametersProps> = ({ loading, setLoading }) => {
  const [articleLength, setArticleLength] = useState<string>("500");
  const [tone, setTone] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [example, setExample] = useState<string>("Yes");
  const [externalURL, setExternalURL] = useState<string>("Yes");
  const [detailLevels, setDetailLevels] = useState<string>("");
  const { updateGeneratedArticle } = useArticle();
  const setCookie = (key: string, value: string | number) =>
    Cookies.set(key, value.toString());

  const handleArticleLengthChange = (selectedValue: string) => {
    handleStateChange(
      setArticleLength,
      COOKIE_KEYS.ARTICLE_LENGTH,
      selectedValue,
    );
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
  const handleExampleChange = (selectedValue: string) => {
    handleStateChange(setExample, COOKIE_KEYS.EXAMPLE, selectedValue);
  };
  const handleExternalURL = (selectedValue: string) => {
    handleStateChange(setExternalURL, COOKIE_KEYS.EXTERNAL_URL, selectedValue);
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
      detailLevels,
      target,
      language,
      example,
      externalURL,
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
        <Filter
          label="Article Length"
          type="input"
          value={articleLength}
          onChange={handleArticleLengthChange}
          cookieKeySelectedOption={COOKIE_KEYS.ARTICLE_LENGTH}
        />

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

        {/* Example Filter */}
        <Filter
          label="Example"
          type="select"
          options={commonExamples}
          value={example}
          onChange={handleExampleChange}
          cookieKeySelectedOption={COOKIE_KEYS.EXAMPLE}
        />

        {/* External Source URL Filter */}
        <Filter
          label="External Source URL"
          type="select"
          options={commonExternalURL}
          value={externalURL}
          onChange={handleExternalURL}
          cookieKeySelectedOption={COOKIE_KEYS.EXTERNAL_URL}
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
      {loading && <Loader />}
    </div>
  );
};

export default Parameters;
