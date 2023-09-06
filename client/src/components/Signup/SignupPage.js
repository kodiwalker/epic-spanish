import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
import axios from 'axios';

const SignupPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', first_name: '', last_name: '', marketing_opted_in: true, proficiency_level: '', dialect: '' });
  const { user, login } = useUser();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/account" replace />;
  }

  const handleFormChange = (e) => {
    const { name } = e.target;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };


  const handleSignup = async (e) => {
    e.preventDefault();

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email.');
      return;
    }

    if (formData.first_name.length < 2 || formData.first_name.length > 50 || !/^[a-zA-Z-' ]+$/.test(formData.first_name)) {
      setError('Please enter a valid first name (2-50 characters, alphabets only).');
      return;
    }

    if (formData.last_name.length < 2 || formData.last_name.length > 50 || !/^[a-zA-Z-' ]+$/.test(formData.last_name)) {
      setError('Please enter a valid last name (2-50 characters, alphabets only).');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    let passwordErrors = '';

    if (formData.password.length < 8) {
      passwordErrors += 'At least 8 characters. '
    }

    if (!/[a-z]/.test(formData.password)) {
      passwordErrors += 'At least one lowercase letter. ';
    }

    if (!/[A-Z]/.test(formData.password)) {
      passwordErrors += 'At least one uppercase letter. ';
    }

    if (!/\d/.test(formData.password)) {
      passwordErrors += 'At least one number. ';
    }

    if (!/[!@#$%^&*()]/.test(formData.password)) {
      passwordErrors += 'At least one special character (!@#$%^&*()). ';
    }

    if (passwordErrors) {
      setError(`Password must contain: ${passwordErrors}`);
      return;
    }

    try {
      const response = await axios.post('/signup', formData);

      if (response.data && response.data.user) {
        login(response.data.user);
        navigate('/create');
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };


  return (
    <div>
      <h1>Sign Up</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          required
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleFormChange}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleFormChange}
        />
        <input
          required
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleFormChange}
        />
        <input
          required
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleFormChange}
        />
        <input
          required
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleFormChange}
        />
        <select
          required
          value={formData.proficiency_level}
          name="proficiency_level"
          onChange={handleFormChange}
        >
          <option value="" defaultValue disabled >Select your proficiency</option>
          <option value="Super Beginner">Super Beginner (A1)</option>
          <option value="Beginner">Beginner (A2)</option>
          <option value="Intermediate">Intermediate (B1-B2)</option>
          <option value="Advanced">Advanced (C1-C2)</option>
        </select>
        <select
          required
          value={formData.dialect}
          name="dialect"
          onChange={handleFormChange}
        >
          <option value="" defaultValue disabled >Select your dialect</option>
          <option value="Latin">Latin (US & Mexico)</option>
          <option value="Castillian">Castillian (Spain)</option>
        </select>
        <label>
          Receive updates and promotions for Epic Spanish?
          <input
            type="checkbox"
            name="marketing_opted_in"
            checked={formData.marketing_opted_in}
            onChange={handleFormChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
};

export default SignupPage;