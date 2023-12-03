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
  const inputRef = useRef<HTMLDivElement>(null);
  const [isToneListVisible, setToneListVisibility] = useState(false);
  const [allTones, setAllTones] =
    useState<{ title: string; custom: boolean }[]>(commonTones);
  const [newTone, setNewTone] = useState<string>("");
  const getCookie = (key: string) => Cookies.get(key);
  const setCookie = (key: string, value: string | number) =>
    Cookies.set(key, value.toString());

  const handleArticleLengthChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(e.target.value, 10);
    setArticleLength(value);
    setCookie(COOKIE_KEYS.ARTICLE_LENGTH, value);
  };

  const handleItemClick = (
    e: React.MouseEvent,
    title: string,
    index: number,
  ) => {
    if (
      e.target instanceof HTMLElement &&
      e.target.tagName.toLowerCase() !== "button"
    ) {
      handleToneChange(title);
    }
  };

  const handleToneChange = (selectedValue: string) => {
    handleStateChange(setTone, COOKIE_KEYS.TONE, selectedValue);
    setToneListVisibility(false);
  };
  const toggleToneListVisibility = () => {
    setToneListVisibility(!isToneListVisible);
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

  const handleNewToneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTone(e.target.value);
  };

  const handleAddTone = () => {
    if (
      newTone.trim() !== "" &&
      !allTones.some((tone) => tone.title === newTone.trim())
    ) {
      const newToneObject = { title: newTone.trim(), custom: true };
      setAllTones((prevTones) => [...prevTones, newToneObject]);
      setCookie(
        COOKIE_KEYS.ALL_TONES,
        JSON.stringify([...allTones, newToneObject]),
      );
      setTone(newTone.trim());
      setNewTone("");
    }
  };

  const handleRemoveTone = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const updatedTones = allTones.filter((_, i) => i !== index);

    const newToneValue = updatedTones.length > 0 ? updatedTones[0].title : "";
    setAllTones(updatedTones);
    setTone(newToneValue);
    setCookie(COOKIE_KEYS.TONE, newToneValue);
    setCookie(COOKIE_KEYS.ALL_TONES, JSON.stringify(updatedTones));
  };

  const handleSubmit = () => {
    setLoading(true);

    // Construire l'objet avec les paramètres à envoyer
    const dataToSend = {
      articleLength,
      tone,
      language,
      theme,
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

  const handleClickOutside = (e: React.MouseEvent | MouseEvent) => {
    console.log("ici");
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setToneListVisibility(false);
    }
  };

  useEffect(() => {
    // save all tones
    const storedTones = Cookies.get("allTones");
    const parsedTones = storedTones ? JSON.parse(storedTones) : null;
    const tonesToSet =
      Array.isArray(parsedTones) &&
      parsedTones.every((item) => typeof item === "object" && item.title)
        ? parsedTones.map((item) => ({
            title: item.title,
            custom: item.custom,
          }))
        : commonTones;
    setAllTones(tonesToSet);

    setTone(getCookie(COOKIE_KEYS.TONE) || "Neutral");
    setArticleLength(Number(getCookie(COOKIE_KEYS.ARTICLE_LENGTH)) || 500);
    setLanguage(getCookie(COOKIE_KEYS.LANGUAGE) || "English");
    setTheme(getCookie(COOKIE_KEYS.THEME) || "Technology");
    setTarget(getCookie(COOKIE_KEYS.TARGET) || "");
  }, []);

  useEffect(() => {
    // Clic outside select
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const sortedAllTones = allTones.slice().sort();

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

        <Filter
          label="Writing Tone"
          type="select"
          options={commonTones}
          value={tone}
          onChange={handleToneChange}
          cookieKeyAllOptions={COOKIE_KEYS.ALL_TONES}
          cookieKeySelectedOption={COOKIE_KEYS.TONE}
        />
        {/* Writing Tone */}
        <div className="h-32 rounded-lg bg-gray-100 p-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Writing Tone
          </label>
          <div className="relative flex flex-wrap items-center gap-2">
            <div ref={inputRef} className="w-full">
              <button
                className="flex w-full cursor-pointer justify-between rounded-md border bg-white p-2"
                onClick={toggleToneListVisibility}
              >
                <p>{tone}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 512 512"
                >
                  <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                </svg>
              </button>

              {isToneListVisible && (
                <ul className="absolute left-0 top-0 mt-12 h-44 w-full overflow-y-scroll rounded-md border bg-white shadow-md">
                  <div className="flex p-2">
                    <input
                      type="text"
                      value={newTone}
                      onChange={handleNewToneChange}
                      className="mr-2 flex-1 rounded-md border border-gray-300"
                    />
                    <button
                      onClick={handleAddTone}
                      className="rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="14"
                        viewBox="0 0 448 512"
                        fill="currentColor"
                      >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                      </svg>
                    </button>
                  </div>
                  {sortedAllTones.map((toneOption, index) => (
                    <li
                      key={index}
                      onClick={(e) =>
                        handleItemClick(e, toneOption.title, index)
                      }
                      className="flex items-center justify-between p-2 hover:bg-gray-100"
                    >
                      <span>{toneOption.title}</span>
                      {toneOption.custom && (
                        <button
                          type="button"
                          onClick={(e) => handleRemoveTone(e, index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="14"
                            viewBox="0 0 448 512"
                            fill="currentColor"
                          >
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                          </svg>
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Language Filter */}
        <Filter
          label="Language"
          type="select"
          options={commonLanguages}
          value={language}
          onChange={handleLanguageChange}
          cookieKeyAllOptions={COOKIE_KEYS.ALL_TONES}
          cookieKeySelectedOption={COOKIE_KEYS.TONE}
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
