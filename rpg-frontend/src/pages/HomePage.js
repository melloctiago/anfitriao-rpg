import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListaPersonagens from '../components/ListaPersonagens';
import { isAuthenticated } from '../utils/auth';

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/');
    }
  }, []);

  return (
    <div className="home-page">
      <ListaPersonagens />
    </div>
  );
}

export default HomePage;
