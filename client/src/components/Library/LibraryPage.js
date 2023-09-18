import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import the Link component
import NavigationBar from '../NavigationBar';

const LibraryPage = () => {
  const [storiesList, setStoriesList] = useState([]);

  useEffect(() => {
    axios.get('/stories')
      .then(response => {
        setStoriesList(response.data);
      })
      .catch(error => {
        console.error('Error fetching stories:', error);
      });
  }, []);

  return (
    <NavigationBar>
      <h1>Your Stories</h1>
      {/* <nav>
        <ul>
          <li>Saved</li>
          <li>Recent</li>
        </ul>
      </nav> */}
      {storiesList.map((story, index) => (
        <Link key={index} to={`/reader/${story.id}`}> {/* Add the Link wrapper here */}
          <div className="story-card">
            <h3>{story.title}</h3>
          </div>
        </Link>
      ))}
    </NavigationBar>
  );
};

export default LibraryPage;
