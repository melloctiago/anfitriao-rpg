import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo-title-container">
        <img src="/images/logo.png" alt="Logo" className="navbar-logo" />
        <h1>Anfitrião</h1>
      </div>
      <div className="links">
        {isAuthenticated ? (
          <>
            <Link to="/home" className="navbar-link">Home</Link>
            <Link to="/novo" className="navbar-link">Criar</Link>
            <button onClick={logout} className="navbar-link">Logout</button>
          </>
        ) : (
          <>
            <Link to="/" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Cadastrar</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;