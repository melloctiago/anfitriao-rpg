import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import NovoPersonagem from './pages/NovoPersonagem';
import EditarPersonagem from './pages/EditarPersonagem';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<HomePage />} />
            <Route path="/novo" element={<NovoPersonagem />} />
            <Route path="/editar/:id" element={<EditarPersonagem />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
