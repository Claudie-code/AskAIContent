import React, { useState } from "react";
import Sidebar from "./SideBar";
import Generate from "./Generate";
import Parameters from "./Parameters";

const Main: React.FC = () => {
  const [isParametersOpen, setParametersOpen] = useState(true);
  const handleOpenParameters = () => {
    setParametersOpen(true);
  };

  const handleCloseParameters = () => {
    setParametersOpen(false);
  };
  return (
    <div className="text-text flex">
      {/* Sidebar */}
      <Sidebar handleOpenParameters={handleOpenParameters} />
      <div className="bg-appBg w-full p-4">
        <Parameters
          isParametersOpen={isParametersOpen}
          handleCloseParameters={handleCloseParameters}
          handleOpenParameters={handleOpenParameters}
        />

        {/* Contenu de l'article */}
        <Generate />
      </div>
    </div>
  );
};

export default Main;
