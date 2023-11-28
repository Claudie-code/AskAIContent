import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Generate from "./components/Generate";
import Main from "./components/Main";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Main} />
        <Route path="/generate-article" Component={Generate} />
      </Routes>
    </Router>
  );
};

export default App;
