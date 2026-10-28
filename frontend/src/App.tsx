import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainTerminal from './MainTerminal';
import Manifesto from './pages/Manifesto';
import GemmaDocs from './pages/GemmaDocs';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainTerminal />} />
        <Route path="/manifesto" element={<Manifesto />} />
        <Route path="/gemma-docs" element={<GemmaDocs />} />
      </Routes>
    </Router>
  );
};

export default App;
