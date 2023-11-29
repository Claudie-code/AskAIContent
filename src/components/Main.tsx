import React, { useState } from "react";
import Sidebar from "./SideBar";
import Generate from "./Generate";
import Parameters from "./Parameters";

const Main: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);

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
      <div className="w-full rounded p-4 shadow">
        <Parameters loading={loading} setLoading={setLoading} />

        {/* Contenu de l'article */}
        {!loading && <Generate />}
      </div>
    </div>
  );
};

export default Main;
