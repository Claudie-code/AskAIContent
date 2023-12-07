import React, {
  createContext,
  useEffect,
  useContext,
  ReactNode,
  useState,
} from "react";

interface ArticleContextType {
  generatedArticles: string[][];
  updateGeneratedArticle: (newArticle: string) => void;
  numberOfAttempts: number;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const useArticle = (): ArticleContextType => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticle must be used within an ArticleProvider");
  }
  return context;
};

interface ArticleProviderProps {
  children: ReactNode;
}

export const ArticleProvider: React.FC<ArticleProviderProps> = ({
  children,
}) => {
  const [generatedArticles, setGeneratedArticles] = useState<string[][]>(() => {
    const localStorageValue = localStorage.getItem("generatedArticles");
    return localStorageValue ? JSON.parse(localStorageValue) : [];
  });

  const [numberOfAttempts, setNumberOfAttempts] = useState<number>(() => {
    const storedValue = localStorage.getItem("nOA");
    return storedValue ? parseInt(storedValue) : 0;
  });

  useEffect(() => {
    localStorage.setItem("nOA", numberOfAttempts.toString());
  }, [numberOfAttempts]);
  useEffect(() => {
    // Mettre à jour le localStorage lorsque generatedArticles change
    localStorage.setItem(
      "generatedArticles",
      JSON.stringify(generatedArticles),
    );
  }, [generatedArticles]);

  const updateGeneratedArticle = (newArticle: string) => {
    const paragraphsNewArticle = newArticle.split("\n");

    setGeneratedArticles((prevArray) => [...prevArray, paragraphsNewArticle]);
    setNumberOfAttempts(numberOfAttempts + 1);
  };

  const value: ArticleContextType = {
    generatedArticles,
    updateGeneratedArticle,
    numberOfAttempts,
  };

  return (
    <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
  );
};
