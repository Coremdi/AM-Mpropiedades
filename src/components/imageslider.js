import React, { useState } from 'react';
import './imageslider.css';
import API_URL from "../config"; // Import API_URL

const ImageSlider = ({ images = [], title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="image-slider">
        <p>No hay imágenes.</p>
      </div>
    );
  }

  const getFullImageUrl = (imgUrl) => {
    if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) {
      return imgUrl; // External image (like picsum)
    }
    return `${API_URL}${imgUrl}`; // Internal image stored on your backend
  };

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
        src={getFullImageUrl(images[currentIndex])}
        alt={`${title} ${currentIndex + 1}`}
        className="slider-image"
      />
      <button className="slider-button prev" onClick={prevImage}>
        &#10094;
      </button>
      <button className="slider-button next" onClick={nextImage}>
        &#10095;
      </button>
    </div>
  );
};

export default ImageSlider;