import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = ({ children }) => (
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/library">Library</Link>
        </li>
        <li>
          <Link to="/create">Create Story</Link>
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
      </ul>
    </nav>
    {children}
  </div>
);

export default NavigationBar;
