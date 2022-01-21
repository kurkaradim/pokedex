import React from 'react';
import "./App.scss";

import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>    
    </Router>
  );
}

export default App;
