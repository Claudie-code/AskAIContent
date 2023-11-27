// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav>
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-500">
          ContentForge
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/"
              className="text-gray-800 transition duration-300 ease-in-out hover:text-blue-500"
            >
              Spécifier un Sujet
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
