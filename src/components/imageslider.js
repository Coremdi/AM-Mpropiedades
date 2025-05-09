import React, { useState } from 'react';
import './imageslider.css';

const ImageSlider = ({ images = [], title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="image-slider">
        <img
            src={images[currentIndex]}
            alt="Property"
            className="slider-image"
            />        
      </div>
    );
  }

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="image-slider">
      <img
        src={images[currentIndex]}
        alt={`${title} ${currentIndex + 1}`}
        className="slider-image"
      />
      <button className="slider-button prev" onClick={prevImage}>&#10094;</button>
      <button className="slider-button next" onClick={nextImage}>&#10095;</button>
    </div>
  );
};

export default ImageSlider;
