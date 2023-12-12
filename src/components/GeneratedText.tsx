import React, { useEffect, useState } from "react";
import { useArticle } from "../context/ArticleContext";

interface GeneratedTextProps {}

const GeneratedText: React.FC<GeneratedTextProps> = () => {
  const { generatedArticles, selectedId, handleSelectedId } = useArticle();
  const [selectedArticle, setSelectedArticle] = useState<string[]>([]);

  useEffect(() => {
    const newSelectedId = generatedArticles.length - 1;
    setSelectedArticle(generatedArticles[newSelectedId]);
    handleSelectedId(newSelectedId);
  }, [generatedArticles]);

  useEffect(() => {
    setSelectedArticle(generatedArticles[selectedId]);
  }, [selectedId]);
  return (
    <div className="mx-auto my-8 max-w-4xl text-text">
      {selectedArticle &&
        selectedArticle.map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
    </div>
  );
};

export default GeneratedText;
