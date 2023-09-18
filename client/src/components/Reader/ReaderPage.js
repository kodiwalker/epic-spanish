import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';



const ReaderPage = () => {
  const [story, setStory] = useState([]);
  const [storyTitle, setStoryTitle] = useState('');
  const [MP3, setMP3] = useState('');
  const [translatedWord, setTranslatedWord] = useState('');
  const [tooltip, setTooltip] = useState({ word: '', position: { x: 0, y: 0 } });
  const audioRef = useRef(null);
  const { storyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`/story/${storyId}`);
        const data = await response.json();

        setStory(data.text);
        setStoryTitle(data.title);
        setMP3(data.mp3_url)

        if (audioRef.current) {
          audioRef.current.play();
        }
      } catch (error) {
        console.error("Failed to fetch story:", error);
        navigate('/error')
      }
    };

    fetchStory();
  }, [storyId]);

  useEffect(() => {
    if (audioRef.current) {
      if (translatedWord) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  }, [translatedWord]);

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const handleTitleClick = async (event) => {
    const titleElement = event.target;
    const rect = titleElement.getBoundingClientRect();
    const word = titleElement.textContent;
    const position = {
      x: rect.left + (rect.width / 2),
      y: rect.bottom  // This ensures the tooltip is displayed below the clicked title
    };
    setTooltip({ word, position });

    try {
      const response = await fetch(`/translate/${word}`);
      if (response.ok) {
        const data = await response.json();
        setTranslatedWord(data.translated);
      } else {
        console.error("Failed to fetch translation");
      }
    } catch (error) {
      console.error("Error fetching translation:", error);
    }
  };

  const handleWordClick = async (word, event) => {
    const spanElement = event.target;
    const rect = spanElement.getBoundingClientRect();
    word = word.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '');
    // Adjusting the X position to be the center of the clicked word
    const position = {
      x: rect.left + (rect.width / 2),
      y: rect.top  // This ensures the tooltip is displayed above the clicked word
    };
    setTooltip({ word, position });

    try {
      const response = await fetch(`/translate/${word}`);
      if (response.ok) {
        const data = await response.json();
        setTranslatedWord(data.translated);
      } else {
        console.error("Failed to fetch translation");
      }
    } catch (error) {
      console.error("Error fetching translation:", error);
    }
  };

  const debouncedHandleWordClick = debounce(handleWordClick, 300);

  const handleBackdropClick = () => {
    setTooltip({ word: '', position: { x: 0, y: 0 } });
    setTranslatedWord('');
  };

  return (
    <div className="story-content">
      <h1>
        <span onClick={handleTitleClick}>
          {storyTitle}
        </span>
      </h1>

      {story.length > 0 && story.map((word, index) => (
        <span
          key={index}
          className="story-word"
          onClick={(event) => debouncedHandleWordClick(word, event)}
        >
          {word + ' '}
        </span>
      ))}

      {translatedWord && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1
            }}
            onClick={handleBackdropClick}
          />

          <div
            style={{
              position: 'absolute',
              left: `${tooltip.position.x}px`,
              top: `${tooltip.position.y}px`,
              backgroundColor: 'white',
              border: '1px solid black',
              padding: '5px',
              borderRadius: '3px',
              transform: 'translate(-50%, -100%)',
              zIndex: 2, // Ensure this is above the backdrop
              whiteSpace: 'nowrap'
            }}
          >
            {translatedWord}
          </div>
        </>
      )}

      <div style={{ position: 'fixed', bottom: '10px', width: '100%', padding: '10px', backgroundColor: '#f5f5f5' }}>
        {MP3 && (
          <audio ref={audioRef} controls style={{ width: '100%' }}>
            <source src={MP3} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  )
};



export default ReaderPage;