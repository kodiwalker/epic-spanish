import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', { email, password });
      if (response.status === 200) {
        // Login was successful
        navigate('/library');
      } else {
        // Handle other server responses here if needed
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      // Network error or the request was rejected
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  }

  return (
    <div>
      <h1>Welcome to the Login Page!</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
};

export default LoginPage;
