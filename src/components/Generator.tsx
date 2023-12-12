import React, { useState } from "react";
import Sidebar from "./SideBar";
import GeneratedText from "./GeneratedText";
import Parameters from "./Parameters";

const Generate: React.FC = () => {
  return (
    <div>
      {/* Parameters */}
      <Parameters />

      {/* Text */}
      <GeneratedText />
    </div>
  );
};

export default Generate;
