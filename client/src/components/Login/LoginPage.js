import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div>
      <h1>Welcome to the Login Page!</h1>
      <form>
        <input type="text" placeholder="Email"></input>
        <input type="passsword" placeholder="Password"></input>
        <Link to="/library">
          <button>Submit</button>
        </Link>
      </form>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>

  )
};

export default LoginPage;