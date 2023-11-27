import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Parameters from "./components/Parameters";
import Generate from "./components/Generate";

const App: React.FC = () => {
  return (
    <Router>
      <div className="relative m-auto min-h-full max-w-6xl p-4">
        <Navbar />
        <Routes>
          <Route path="/" Component={Parameters} />
          <Route path="/generate-article" Component={Generate} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
