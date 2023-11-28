// MainComponent.tsx

import React, { useState } from "react";
import Sidebar from "./SideBar";

const Main: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState("");

  const handleGenerateArticle = () => {
    // ... logique pour générer l'article et le mettre à jour dans l'état
    setGeneratedArticle("Contenu de l'article généré ici.");
    setSidebarOpen(true); // Ouvre automatiquement le volet latéral une fois l'article généré
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div>
      {/* ... autres éléments de votre page ... */}

      <button onClick={handleGenerateArticle}>Générer un article</button>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

      {/* ... autres éléments de votre page ... */}
    </div>
  );
};

export default Main;
