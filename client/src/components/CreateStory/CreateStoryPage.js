import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import NavigationBar from '../NavigationBar';

const CreateStoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [readTime, setReadTime] = useState('2 minutes');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genres = ["horror", "romance", "adventure", "mystery", "fantasy"];
  const navigate = useNavigate();

  const handleGenreChange = (e) => {
    const value = e.target.value;

    if (selectedGenres.includes(value)) {
      setSelectedGenres(prev => prev.filter(genre => genre !== value));
    } else {
      if (selectedGenres.length < 2) {
        setSelectedGenres(prev => [...prev, value]);
      } else {
        alert("You can only select up to 2 genres.");
      }
    }
  };


  const createStory = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/stories/new', {
        readTime,
        genres: selectedGenres
      });

      setLoading(false);
      navigate(`/reader/${response.data}`);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <NavigationBar>
      <h1>Create a Story</h1>

      <form onSubmit={createStory}>
        <div>
          <label>Read Time: </label>
          <select value={readTime} onChange={(e) => setReadTime(e.target.value)}>
            <option value="2 minutes">2 minutes</option>
            <option value="4 minutes">4 minutes</option>
            <option value="6 minutes">6 minutes</option>
            <option value="8 minutes">8 minutes</option>
          </select>
        </div>

        <div>
          <label>Genres: </label>
          {genres.map((genre) => (
            <div key={genre}>
              <input
                type="checkbox"
                value={genre}
                checked={selectedGenres.includes(genre)}
                onChange={handleGenreChange}
              />
              {genre}
            </div>
          ))}
        </div>

        <button type="submit" disabled={loading}>Generate Story</button>
      </form>

      {loading ? <h2>Generating... May take over 30 seconds.</h2> : null}
    </NavigationBar>
  )
};

export default CreateStoryPage;
