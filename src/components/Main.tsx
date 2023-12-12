import React, { useState } from "react";
import Sidebar from "./SideBar";
import GeneratedText from "./GeneratedText";
import Parameters from "./Parameters";

const Main: React.FC = () => {
  const [isParametersOpen, setParametersOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(0);

  const handleSelectedId = (id: number) => {
    setSelectedId(id);
  };

  const handleOpenParameters = () => {
    setParametersOpen(true);
  };

  const handleCloseParameters = () => {
    setParametersOpen(false);
  };
  return (
    <div className="flex text-text">
      {/* Sidebar */}
      <Sidebar
        handleOpenParameters={handleOpenParameters}
        handleSelectedId={handleSelectedId}
        selectedId={selectedId}
      />
      <div className="w-full bg-appBg p-4">
        {/* Parameters */}
        <Parameters
          isParametersOpen={isParametersOpen}
          handleCloseParameters={handleCloseParameters}
          handleOpenParameters={handleOpenParameters}
        />

        {/* Text */}
        <GeneratedText
          selectedId={selectedId}
          handleSelectedId={handleSelectedId}
        />
      </div>
    </div>
  );
};

export default Main;
