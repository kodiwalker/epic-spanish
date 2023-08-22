import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
import axios from 'axios';

const SignupPage = () => {
  const { user, login } = useUser();

  if (user) {
    return <Navigate to="/account" replace />;
  }

  return <h1>Welcome to the Signup Page!</h1>;
};

export default SignupPage;