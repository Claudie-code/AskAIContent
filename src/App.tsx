import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Generator from "./components/Generator";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Sidebar from "./components/SideBar";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex text-text">
        {/* Sidebar */}
        <Sidebar />
        <div className="h-screen w-full bg-appBg p-4">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/generator" Component={Generator} />
            <Route path="*" Component={NotFound} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
