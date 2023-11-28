// Sidebar.tsx

import React from "react";
import Parameters from "./Parameters";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const sidebarClasses = `fixed h-full top-0 bg-gray-200 w-64 overflow-x-hidden transition-transform duration-500 ease-in-out ${
    isOpen ? "transform translate-x-0" : "transform -translate-x-full"
  }`;

  return (
    <div id="sidebar" className={sidebarClasses}>
      <button onClick={onClose} className="bg-gray-500 p-2 text-white">
        Fermer le volet
      </button>
      <Link to="/" className="text-xl font-bold text-blue-500">
        ContentForge
      </Link>
      <Parameters />
    </div>
  );
};

export default Sidebar;
