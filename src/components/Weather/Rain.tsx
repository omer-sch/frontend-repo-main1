import React, { useEffect } from 'react';
import './Rain.css';

const Rain: React.FC = () => {
  useEffect(() => {
    // Function to create a raindrop element
    const createRaindrop = () => {
      const raindrop = document.createElement('div');
      raindrop.classList.add('raindrop');
      raindrop.style.left = `${Math.random() * 100}vw`; // Random horizontal position
      raindrop.style.animationDuration = `${Math.random() * 2 + 1}s`; // Random falling speed
      document.body.appendChild(raindrop);

      // Remove the raindrop from the DOM after it falls out of view
      setTimeout(() => {
        raindrop.remove();
      }, 5000); // Adjust this value based on the duration of the animation
    };

    // Create raindrops at intervals
    const rainInterval = setInterval(createRaindrop, 100); // Adjust interval for density of raindrops

    // Cleanup function to stop creating raindrops when component unmounts
    return () => clearInterval(rainInterval);
  }, []);

  return <div className="rain-container"></div>;
};

export default Rain;
