import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import UISettingsPanel from "./components/UISettingsPanel";
import { UISettingsProvider } from "./context/UISettingsContext";

const App = () => {
  return (
    <UISettingsProvider>
      <Router>
        <div className="app-shell">
          <UISettingsPanel />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </div>
      </Router>
    </UISettingsProvider>
  );
};

export default App;
