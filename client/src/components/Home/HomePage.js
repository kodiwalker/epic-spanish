import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Epic Spanish</h1>
      <Link to="/login">
        <button>Start Learning!</button>
      </Link>
    </div>
  )
};

export default HomePage;
