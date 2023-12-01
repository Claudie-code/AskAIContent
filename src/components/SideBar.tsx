// Sidebar.tsx

import React from "react";
import Parameters from "./Parameters";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onOpen }) => {
  const sidebarClasses = `flex h-screen flex-col justify-between border-e sticky top-0 h-full p-4 ${
    isOpen ? "w-64" : "w-16 "
  } overflow-x-hidden transition-all duration-500 ease-in-out
  `;

  return (
    <div className={sidebarClasses}>
      <div>
        {isOpen ? (
          <div>
            <Link to="/" className="text-xl font-bold text-blue-500">
              ContentAI
            </Link>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>
            </div>
            <div
              className={`transition-all duration-500 ease-in-out ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            ></div>
          </div>
        ) : (
          <div>
            <Link to="/" className="text-xl font-bold text-blue-500">
              ContentAI
            </Link>
            <button
              onClick={onOpen}
              className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
