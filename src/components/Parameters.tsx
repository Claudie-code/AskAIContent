// src/components/Parameters.tsx
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Parameters: React.FC = () => {
  const [articleLength, setArticleLength] = useState<number>(500);
  const [tone, setTone] = useState<string>("neutral");
  const [language, setLanguage] = useState<string>("english");
  const [topic, setTopic] = useState<string>("technology");
  const [customFilter, setCustomFilter] = useState<string>("");
  const [allTones, setAllTones] = useState<string[]>([
    "neutral",
    "formal",
    "casual",
  ]);
  const [newTone, setNewTone] = useState<string>("");

  useEffect(() => {
    // Charger les valeurs des cookies lors du montage du composant
    setArticleLength(Number(Cookies.get("articleLength")) || 500);
    setTone(Cookies.get("tone") || "neutral");
    setLanguage(Cookies.get("language") || "english");
    setTopic(Cookies.get("topic") || "technology");
  }, []);

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
  };

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    Cookies.set("language", selectedLanguage);
  };

  const handleTopicChange = (selectedTopic: string) => {
    setTopic(selectedTopic);
    Cookies.set("topic", selectedTopic);
  };

  const handleNewToneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTone(e.target.value);
  };

  const handleAddCustomTone = () => {
    if (newTone.trim() !== "" && !allTones.includes(newTone.trim())) {
      setAllTones([...allTones, newTone.trim()]);
      Cookies.set("allTones", JSON.stringify([...allTones, newTone.trim()]));
      setNewTone("");
    }
  };

  const handleRemoveCustomTone = (index: number) => {
    const updatedTones = [...allTones];
    updatedTones.splice(index, 1);
    setAllTones(updatedTones);
    Cookies.set("allTones", JSON.stringify(updatedTones));
  };
  const handleToggleTone = (selectedTone: string) => {
    // Vérifie si le ton est déjà dans la liste, s'il l'est, le retire, sinon l'ajoute
    if (tone === selectedTone) {
      setTone(""); // Retire le ton sélectionné
    } else {
      setTone(selectedTone); // Ajoute le ton sélectionné
    }
  };

  const handleSubmit = () => {
    // Construire l'objet avec les paramètres à envoyer
    const dataToSend = {
      articleLength,
      tone,
      language,
      topic,
    };

    // Utiliser fetch pour envoyer une requête POST vers votre backend local
    fetch("http://localhost:3000/generate-article", {
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
        // Vérifier si la réponse est positive
        if (data && data.finish_reason === "stop") {
          // Récupérer le contenu de l'article généré
          const generatedArticle = data.message.content;

          // Faire quelque chose avec l'article généré, par exemple, l'afficher dans la console
          console.log("Article généré:", generatedArticle);

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
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="mb-4 text-3xl font-bold">Adjust Parameters</h2>

      {/* Topic Filter */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Topic
        </label>
        <select
          value={topic}
          onChange={(e) => handleTopicChange(e.target.value)}
          className="w-full"
        >
          <option value="technology">Technology</option>
          <option value="health">Health</option>
          <option value="travel">Travel</option>
        </select>
      </div>

      {/* Article Length */}
      <div className="mb-4">
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
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Writing Tone
        </label>
        <div className="flex items-center">
          {allTones.map((toneOption, index) => (
            <button
              key={index}
              onClick={() => handleToggleTone(toneOption)}
              className={`mr-2 rounded-md border p-2 ${
                tone.includes(toneOption)
                  ? "bg-blue-500 text-white hover:bg-blue-600 focus:border-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
                  : "border-gray-300 text-gray-700 hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
              }`}
            >
              {toneOption}
            </button>
          ))}
          <input
            type="text"
            value={newTone}
            onChange={handleNewToneChange}
            className="mr-2 rounded-md border border-gray-300 p-2"
          />
          <button
            onClick={handleAddCustomTone}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            +
          </button>
        </div>
      </div>

      {/* Language Filter */}
      <div className="mb-4">
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

      {/* Validation Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Generate Article
      </button>
    </div>
  );
};

export default Parameters;
