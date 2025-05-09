import React, { useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './fullscreenslider.css';

const FullScreenSlider = ({ images, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="fullscreen-slider-overlay">
      <button className="close-button" onClick={onClose}>
        <FaTimes />
      </button>
      <button className="nav-button left" onClick={handlePrev}>
        <FaChevronLeft />
      </button>
      <div className="slider-window">
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((img, index) => (
            <div 
              key={index}
              className={`slide ${index === currentIndex ? 'active' : ''}`}
            >
              <img src={img} alt={`Propiedad ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <button className="nav-button right" onClick={handleNext}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default FullScreenSlider;