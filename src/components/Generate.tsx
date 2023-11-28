// Generate.tsx

import React from "react";

interface GenerateProps {
  generatedArticle: string;
}

const Generate: React.FC<GenerateProps> = ({ generatedArticle }) => {
  return (
    <div className="w-full rounded p-4 shadow">
      <h2 className="mb-4 text-xl font-bold">Article généré</h2>
      <p>{generatedArticle}</p>
    </div>
  );
};

export default Generate;
