import React from "react";
import { useArticle } from "../context/ArticleContext";

const Generate: React.FC = () => {
  const { generatedArticle } = useArticle();
  const paragraphs = generatedArticle.split("\n\n");

  return (
    <div className="mx-auto my-8 max-w-3xl text-gray-800">
      <h2 className="mb-4 text-xl font-bold">Article généré</h2>
      {paragraphs.map((paragraph, index) => (
        <React.Fragment key={index}>
          {paragraph.startsWith("```") ? (
            <code className="mb-4 block rounded-md bg-gray-100 p-4">
              {paragraph.slice(3)}
            </code>
          ) : (
            <p className="mb-4">{paragraph}</p>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Generate;
