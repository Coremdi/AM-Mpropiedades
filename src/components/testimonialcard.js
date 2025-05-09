import React from "react";
import "./testimonialcard.css";

const TestimonialCard = ({ testimonial }) => {
    return (
        <div className="testimonial-card">
            <div className="testimonial-content">
                <p className="quote">"{testimonial.feedback}"</p>
                <div className="info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                    <div className="stars">⭐️⭐️⭐️⭐️⭐️</div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;