// src/components/Parameters.tsx
import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useArticle } from "../context/ArticleContext";

interface ParametersProps {
  loading: boolean;
  setLoading: (arg0: boolean) => void;
}

const commonTones = [
  "Professional",
  "Conversational",
  "Educational",
  "Persuasive",
  "Neutral",
  "Optimistic",
];

const Parameters: React.FC<ParametersProps> = ({ loading, setLoading }) => {
  const [articleLength, setArticleLength] = useState<number>(500);
  const [tone, setTone] = useState<string>("neutral");
  const [language, setLanguage] = useState<string>("english");
  const [theme, setTheme] = useState<string>("");
  const [allTones, setAllTones] = useState<string[]>(commonTones);
  const [newTone, setNewTone] = useState<string>("");
  const [isToneListVisible, setToneListVisibility] = useState(false);
  const { updateGeneratedArticle } = useArticle();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleArticleLengthChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(e.target.value, 10);
    setArticleLength(value);
    Cookies.set("articleLength", value.toString());
  };

  const handleToneChange = (selectedTone: string) => {
    setTone(selectedTone);
    Cookies.set("tone", selectedTone);
    setToneListVisibility(false);
  };
  const toggleToneListVisibility = () => {
    setToneListVisibility(!isToneListVisible);
  };

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    Cookies.set("language", selectedLanguage);
  };

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
    Cookies.set("theme", selectedTheme);
  };

  const handleNewToneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTone(e.target.value);
  };

  const handleAddTone = () => {
    if (newTone.trim() !== "" && !allTones.includes(newTone.trim())) {
      setAllTones([...allTones, newTone.trim()]);
      Cookies.set("allTones", JSON.stringify([...allTones, newTone.trim()]));
      setNewTone("");
    }
  };

  const handleRemoveTone = (index: number) => {
    const updatedTones = [...allTones];
    updatedTones.splice(index, 1);
    setAllTones(updatedTones);
    Cookies.set("allTones", JSON.stringify(updatedTones));
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
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setToneListVisibility(false);
    }
  };

  useEffect(() => {
    // Charger les valeurs des cookies lors du montage du composant
    setArticleLength(Number(Cookies.get("articleLength")) || 500);
    let storedTones = Cookies.get("allTones");
    storedTones = storedTones ? JSON.parse(storedTones) : commonTones;
    setAllTones(Array.isArray(storedTones) ? storedTones : commonTones);
    setLanguage(Cookies.get("language") || "english");
    setTheme(Cookies.get("theme") || "technology");
  }, []);

  useEffect(() => {
    // Ajoutez un écouteur pour les clics sur l'ensemble de la page
    document.addEventListener("click", handleClickOutside);

    // Nettoyez l'écouteur lorsque le composant est démonté
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
        <div className="h-32 rounded-lg bg-gray-100 p-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Theme
          </label>

          <input
            value={theme}
            type="text"
            id="theme"
            name="theme"
            className="mt-1 w-full rounded-md border p-2"
            required
            onChange={(e) => handleThemeChange(e.target.value)}
          />
        </div>

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
        <div className="h-32 rounded-lg bg-gray-100 p-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Writing Tone
          </label>
          <div className="relative flex flex-wrap items-center gap-2">
            <input
              id="tone"
              name="tone"
              value={tone}
              className="w-full rounded-md border p-2"
              onClick={toggleToneListVisibility}
              ref={inputRef}
            />
            <ul className="absolute left-0 top-0 mt-12 w-full rounded-md border bg-white shadow-md">
              {isToneListVisible &&
                sortedAllTones.map((toneOption, index) => (
                  <li
                    key={toneOption}
                    onClick={() => handleToneChange(toneOption)}
                    className="flex items-center justify-between p-2"
                  >
                    <span>{toneOption}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTone(index)}
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
                  </li>
                ))}
            </ul>

            <input
              type="text"
              value={newTone}
              onChange={handleNewToneChange}
              className="mr-2 rounded-md border border-gray-300 p-2"
            />
            <button
              onClick={handleAddTone}
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              +
            </button>
          </div>
        </div>

        {/* Language Filter */}
        <div className="h-32 rounded-lg bg-gray-100 p-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="w-full"
          >
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="spanish">Spanish</option>
          </select>
        </div>
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
