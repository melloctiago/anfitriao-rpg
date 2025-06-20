import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-title-container">
        <img src="/images/logo.png" alt="Logo" className="navbar-logo" />
        <h1>Anfitrião</h1>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/novo">Criar</Link>
      </div>
    </nav>
  );
}
export default Navbar;
