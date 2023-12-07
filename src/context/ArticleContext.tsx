import Cookies from "js-cookie";
import React, {
  createContext,
  useEffect,
  useContext,
  ReactNode,
  useState,
} from "react";

// Définir le type pour la valeur du contexte
interface ArticleContextType {
  generatedArticles: string[][];
  updateGeneratedArticle: (newArticle: string) => void;
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
  const [generatedArticles, setGeneratedArticles] = useState<string[][]>([]);

  // Update the cookie whenever generatedArticles changes
  useEffect(() => {
    let cookieValue = Cookies.get("generatedArticles");
    cookieValue = cookieValue ? JSON.parse(cookieValue) : [];

    // Ensure cookieValue is an array of arrays of strings
    const updatedArray = Array.isArray(cookieValue) ? cookieValue : [];

    setGeneratedArticles(updatedArray);
  }, []);

  const updateGeneratedArticle = (newArticle: string) => {
    console.log("newArticle", newArticle);
    const paragraphsNewArticle = newArticle.split("\n");
    console.log(
      "[...generatedArticles, paragraphsNewArticle]",
      JSON.stringify([["test test"]]),
    );
    Cookies.set("generatedArticles", JSON.stringify([["test test"]]));
    // Update the array by creating a new array with the new value
    setGeneratedArticles((prevArray) => [...prevArray, paragraphsNewArticle]);
  };

  const value: ArticleContextType = {
    generatedArticles,
    updateGeneratedArticle,
  };

  return (
    <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
  );
};
