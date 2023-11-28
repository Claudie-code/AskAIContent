import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Main} />
      </Routes>
    </Router>
  );
};

export default App;
