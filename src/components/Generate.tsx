import React from "react";
import { useArticle } from "../context/ArticleContext";

interface StyledCodeBlockProps {
  code: string;
}

const StyledCodeBlock: React.FC<StyledCodeBlockProps> = ({ code }) => (
  <code className="mb-4 block rounded-md bg-gray-100 p-4">{code}</code>
);

const Generate: React.FC = () => {
  const { generatedArticles } = useArticle();
  const lastArticle = generatedArticles[generatedArticles.length - 1];
  let isCodeBlock = false;
  let codeBlockContent = "";
  console.log("lastArticle", lastArticle);
  return (
    <div className="text-text mx-auto my-8 max-w-4xl">
      {lastArticle &&
        lastArticle.map((paragraph, index) => {
          if (paragraph.startsWith("```")) {
            isCodeBlock = true;
            codeBlockContent = "";
            return <StyledCodeBlock key={index} code={codeBlockContent} />;
          } else if (isCodeBlock && paragraph.startsWith("```")) {
            isCodeBlock = false;
            return <StyledCodeBlock key={index} code={codeBlockContent} />;
          } else if (isCodeBlock) {
            codeBlockContent += `${paragraph}\n`;
            return null;
          } else {
            return (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            );
          }
        })}
    </div>
  );
};

export default Generate;
