import React from "react";
import { useArticle } from "../context/ArticleContext";

interface StyledCodeBlockProps {
  code: string;
}

const StyledCodeBlock: React.FC<StyledCodeBlockProps> = ({ code }) => (
  <code className="mb-4 block rounded-md bg-gray-100 p-4">{code}</code>
);

const Generate: React.FC = () => {
  const { generatedArticle } = useArticle();
  const paragraphs = generatedArticle.split("\n");

  let isCodeBlock = false;
  let codeBlockContent = "";

  return (
    <div className="mx-auto my-8 max-w-4xl text-gray-800">
      {paragraphs.map((paragraph, index) => {
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
