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
    <div className="text-textPrimary flex">
      {/* Sidebar */}
      <Sidebar handleOpenParameters={handleOpenParameters} />
      <div className="bg-bgPrimary w-full">
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
