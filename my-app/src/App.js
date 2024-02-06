import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import StackExchange from './pages/StackExchange';
import AirlineSQLInfo from './pages/AirlineSQLInfo';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stackexchange" element={<StackExchange />} />
        <Route path="/airlinesqlinfo" element={<AirlineSQLInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
