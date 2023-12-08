import React, { useState } from "react";
import Cookies from "js-cookie";
import { useArticle } from "../context/ArticleContext";
import Filter from "./Filter";
import Loader from "./Loader";
import Alert from "./Alert";
import CloseButton from "./CloseButton";

interface ParametersProps {
  isParametersOpen: boolean;
  handleCloseParameters: () => void;
  handleOpenParameters: () => void;
}

const COOKIE_KEYS = {
  TONE: "tone",
  LANGUAGE: "language",
  TOPIC: "topic",
  TARGET: "target",
  LEVELS: "levels",
  ALL_TONES: "allTones",
  PLATFORM: "platform",
};

const commonTones = [
  { title: "Informative", custom: false },
  { title: "Entertaining", custom: false },
  { title: "Educational", custom: false },
  { title: "Inspiring", custom: false },
  { title: "Opinionated", custom: false },
  { title: "Interactive", custom: false },
  { title: "Visual", custom: false },
  { title: "Storytelling", custom: false },
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

const commonPlatforms = ["Blog", "Youtube", "Instagram"];

const Parameters: React.FC<ParametersProps> = ({
  isParametersOpen,
  handleCloseParameters,
  handleOpenParameters,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [tone, setTone] = useState<string>("Informative");
  const [language, setLanguage] = useState<string>("English");
  const [platform, setPlatform] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const { updateGeneratedArticle, numberOfAttempts } = useArticle();
  const setCookie = (key: string, value: string | number) =>
    Cookies.set(key, value.toString());

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
  const handlePlatformChange = (selectedValue: string) => {
    handleStateChange(setPlatform, COOKIE_KEYS.PLATFORM, selectedValue);
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
      tone,
      target,
      language,
      platform,
    };
    if (numberOfAttempts < 10) {
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
            handleCloseParameters();
          } else {
            console.error(
              "Server response does not contain the expected data.",
            );
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
    } else {
      showAlert(`Maximum number of attempts reached.`);
    }
  };

  return (
    <div className="m-auto max-w-4xl">
      <section
        className={`rounded-md border-subtleBorder bg-subtleBg shadow-md transition-all dark:bg-gray-800 ${
          isParametersOpen ? "h-auto border p-6 " : "h-0 overflow-hidden"
        } 
    `}
      >
        <div>
          <div className="flex items-center justify-between">
            <h2 className="mb-4 text-xl font-bold">
              Customize your preferences to find your content ideas.
            </h2>
            <CloseButton onClick={handleCloseParameters} />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Platform Filter */}
            <Filter
              label="Platform"
              type="select"
              options={commonPlatforms}
              value={platform}
              onChange={handlePlatformChange}
              cookieKeySelectedOption={COOKIE_KEYS.PLATFORM}
            />
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

            {/* Tone */}
            <Filter
              label="Content Approach"
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
          </div>

          {/* Validation Button */}
          <div className="m-auto flex flex-col justify-center">
            <button
              onClick={handleSubmit}
              className={`mt-8 inline-block rounded-md border px-12 py-3 text-sm font-medium transition-all focus:outline-none focus:ring ${
                loading
                  ? "cursor-not-allowed bg-gray-500"
                  : "border-border bg-elementBg text-subtleText hover:border-hoveredBorder hover:bg-hoveredElementBg active:bg-activeElementBg"
              }`}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
            <p className="text-xs text-gray-500">
              Number of attempts: {numberOfAttempts}/10
            </p>
          </div>

          {loading && <Loader />}
          {isAlertVisible && <Alert text={alertMessage} />}
        </div>
      </section>
      {!isParametersOpen && (
        <div className="flex justify-center ">
          <button
            onClick={handleOpenParameters}
            className={`inline-block w-full rounded-md border px-12 py-3 text-sm font-medium transition-all focus:outline-none focus:ring ${
              loading
                ? "cursor-not-allowed bg-gray-500"
                : "border-border bg-elementBg text-subtleText hover:border-hoveredBorder hover:bg-hoveredElementBg active:bg-activeElementBg"
            }`}
            disabled={loading}
          >
            Content Idea Generator
          </button>
        </div>
      )}
    </div>
  );
};

export default Parameters;
