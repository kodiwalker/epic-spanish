import React from 'react';
import NavigationBar from '../NavigationBar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../UserContext';


const AccountPage = () => {
  const navigate = useNavigate();
  const { logout } = useUser();

  const handleLogout = async () => {
    try {
      const response = await axios.post('/logout');

      if (response.status === 200) {
        logout();
        navigate('/');
      } else {
        alert('Logout failed...')
      }

    } catch {
      alert('Server Error')
    }
  }

  return (
    <NavigationBar>
      <h1>Welcome to the Account Page!</h1>

      <button type="button" onClick={handleLogout}>Log Out</button>
    </NavigationBar>
  )

};

export default AccountPage;