import React, { useState } from "react";
import Cookies from "js-cookie";
import { useArticle } from "../context/ArticleContext";
import Filter from "./Filter";
import Loader from "./Loader";
import Alert from "./Alert";

interface ParametersProps {
  isParametersOpen: boolean;
  handleCloseParameters: () => void;
}

const COOKIE_KEYS = {
  ARTICLE_LENGTH: "articleLength",
  TONE: "tone",
  LANGUAGE: "language",
  TOPIC: "topic",
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

const Parameters: React.FC<ParametersProps> = ({ isParametersOpen }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [articleLength, setArticleLength] = useState<string>("500");
  const [tone, setTone] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
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
  const handleTopicChange = (selectedValue: string) => {
    handleStateChange(setTopic, COOKIE_KEYS.TOPIC, selectedValue);
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

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setAlertVisible(true);

    // automatically hide the alert after 5 sc
    setTimeout(() => {
      hideAlert();
    }, 5000);
  };

  const hideAlert = () => {
    setAlertVisible(false);
    setAlertMessage("");
  };

  const handleSubmit = () => {
    setLoading(true);

    const dataToSend = {
      topic,
      articleLength,
      tone,
      detailLevels,
      target,
      language,
      example,
      externalURL,
    };

    fetch("http://localhost:3001/generate-article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

        // Check if the response is positive
        if (data && data.finish_reason === "stop") {
          const generatedArticle = data.message.content;

          updateGeneratedArticle(generatedArticle);
        } else {
          console.error("Server response does not contain the expected data.");
          showAlert(
            "Error: Server response does not contain the expected data.",
          );
        }
      })
      .catch((error) => {
        console.error("Error communicating with the server:", error.message);

        showAlert(`Error communicating with the server`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="mx-auto mt-20 max-w-4xl rounded-md bg-white p-6 shadow-md dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-bold">Parameters</h2>
      <form>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Topic Filter */}
          <Filter
            label="Topic"
            type="input"
            value={topic}
            onChange={handleTopicChange}
            cookieKeySelectedOption={COOKIE_KEYS.TOPIC}
          />
          {/* Target Filter */}
          <Filter
            label="Target audience"
            type="input"
            value={target}
            onChange={handleTargetChange}
            cookieKeySelectedOption={COOKIE_KEYS.TARGET}
          />
          {/* Article Length */}
          <Filter
            label="Article Length"
            type="input"
            value={articleLength}
            onChange={handleArticleLengthChange}
            cookieKeySelectedOption={COOKIE_KEYS.ARTICLE_LENGTH}
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

          {/* Detail Filter */}
          <Filter
            label="Detail Level"
            type="select"
            options={commonDetailLevels}
            value={detailLevels}
            onChange={handleDetailLevelsChange}
            cookieKeySelectedOption={COOKIE_KEYS.LEVELS}
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
        {isAlertVisible && <Alert text={alertMessage} />}
      </form>
    </section>
  );
};

export default Parameters;
