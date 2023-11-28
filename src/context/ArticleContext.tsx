// ArticleContext.tsx

import React, { createContext, useContext, ReactNode, useState } from "react";

// Définir le type pour la valeur du contexte
interface ArticleContextType {
  generatedArticle: string;
}

// Création du contexte avec une valeur initiale de type ArticleContextType
const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

// Hook personnalisé pour accéder au contexte
export const useArticle = (): ArticleContextType => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticle must be used within an ArticleProvider");
  }
  return context;
};

// Props pour le composant ArticleProvider
interface ArticleProviderProps {
  children: ReactNode;
}

// Composant contexte fournisseur avec TypeScript
export const ArticleProvider: React.FC<ArticleProviderProps> = ({
  children,
}) => {
  const [generatedArticle, setGeneratedArticle] = useState<string>("");

  const value: ArticleContextType = {
    generatedArticle,
  };

  return (
    <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
  );
};
