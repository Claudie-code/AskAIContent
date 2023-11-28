// MainComponent.tsx

import React, { useState } from "react";
import Sidebar from "./SideBar";
import Generate from "./Generate";

const Main: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

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
      <Generate />
    </div>
  );
};

export default Main;
