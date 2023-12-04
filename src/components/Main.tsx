import React, { useState } from "react";
import Sidebar from "./SideBar";
import Generate from "./Generate";
import Parameters from "./Parameters";

const Main: React.FC = () => {
  const [isParametersOpen, setParametersOpen] = useState(false);
  const handleOpenParameters = () => {
    setParametersOpen(true);
  };

  const handleCloseParameters = () => {
    setParametersOpen(true);
  };
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar handleOpenParameters={handleOpenParameters} />
      <div className="w-full rounded p-4 shadow">
        <Parameters
          isParametersOpen={isParametersOpen}
          handleCloseParameters={handleCloseParameters}
        />

        {/* Contenu de l'article */}
        <Generate />
      </div>
    </div>
  );
};

export default Main;
