import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuthentication = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    const isAuthenticated = true; // replace this with actual authentication logic

    // if user is not authenticated, redirect to login
    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/');
      }
    }, [navigate, isAuthenticated]);

    return <WrappedComponent {...props} />;
  }
};

export default withAuthentication;
