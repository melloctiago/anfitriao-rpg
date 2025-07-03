import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import NovoPersonagem from './pages/NovoPersonagem';
import EditarPersonagem from './pages/EditarPersonagem';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import PrivateRoute from './components/PrivateRouter';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            } />
            <Route path="/novo" element={
              <PrivateRoute>
                <NovoPersonagem />
              </PrivateRoute>
            } />
            <Route path="/editar/:id" element={
              <PrivateRoute>
                <EditarPersonagem />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
