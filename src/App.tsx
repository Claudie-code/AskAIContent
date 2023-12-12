import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import NotFound from "./components/NotFound";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Main} />
        <Route path="*" Component={NotFound} />
      </Routes>
    </Router>
  );
};

export default App;
