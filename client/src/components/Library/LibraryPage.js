import React from 'react';
import NavigationBar from '../NavigationBar';

const LibraryPage = () => {
  return (
    <NavigationBar>
      <h1>Welcome to the Library Page!</h1>
      <nav>
        <ul>
          <li>Saved</li>
          <li>Recent</li>
        </ul>
      </nav>
    </NavigationBar>
  )
};

export default LibraryPage;