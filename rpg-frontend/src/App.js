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
import VisualizarPersonagem from './pages/VisualizarPersonagem';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Tabuleiro from './pages/Tabuleiro';
import CriarSala from './pages/CriarSala';
import ListaSalas from './pages/ListaSalas';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
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
                <Route path="/tabuleiro/:id" element={
                  <PrivateRoute>
                    <Tabuleiro />
                  </PrivateRoute>
                } />
                <Route path="/salas/criar" element={
                  <PrivateRoute>
                    <CriarSala />
                  </PrivateRoute>
                } />
                <Route path="/salas" element={
                  <PrivateRoute>
                    <ListaSalas />
                  </PrivateRoute>
                } />
                <Route path="/editar/:id" element={
                  <PrivateRoute>
                    <EditarPersonagem />
                  </PrivateRoute>
                } />
                <Route path="/personagem/:id" element={<VisualizarPersonagem />} />
              </Routes>
            </div>
          </div>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
