// MainComponent.tsx

import React, { useState } from "react";
import Sidebar from "./SideBar";
import Generate from "./Generate";

const Main: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [generatedArticle, setGeneratedArticle] = useState("");

  const handleGenerateArticle = () => {
    // ... logique pour générer l'article et le mettre à jour dans l'état
    setGeneratedArticle("Contenu de l'article généré ici.");
    setSidebarOpen(true); // Ouvre automatiquement le volet latéral une fois l'article généré
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };
  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        onOpen={handleOpenSidebar}
      />
      {/* Contenu de l'article */}
      <Generate generatedArticle={generatedArticle} />
    </div>
  );
};

export default Main;
