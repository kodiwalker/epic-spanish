import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuthentication = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      fetch('/authcheck')
        .then(res => res.json())
        .then(data => {
          if (!data.isAuthenticated) {
            navigate('/');
          }
        });
    }, [navigate]);

    return <WrappedComponent {...props} />;
  }
};

export default withAuthentication;
