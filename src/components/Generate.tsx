import React from "react";
import { useArticle } from "../context/ArticleContext";

const Generate: React.FC = () => {
  const { generatedArticle } = useArticle();

  return (
    <div className="w-full rounded p-4 shadow">
      <h2 className="mb-4 text-xl font-bold">Article généré</h2>
      <p>{generatedArticle}</p>
    </div>
  );
};

export default Generate;
