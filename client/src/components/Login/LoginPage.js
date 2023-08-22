import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { user, login } = useUser();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/account" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { email, password });
      if (response.status === 200) {
        console.log(response.data.user)
        login(response.data.user);
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
      <h1>Login</h1>
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

      <p>Not an Epic Spanish member yet?</p>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
};

export default LoginPage;
