import React, { useState } from 'react';
import './CSS/Slide.css';

const slides = [
    'https://images.uzum.uz/d18eili7s4fup34aaa40/main_page_banner.jpg',
    'https://images.uzum.uz/d18ekaq7s4fup34aaa90/main_page_banner.jpg',
    'https://images.uzum.uz/d18g7qgn274lpu39ps10/main_page_banner.jpg',
    
];

export default function Slide() {
    const [index, setIndex] = useState(0);

    const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
    const next = () => setIndex((i) => (i + 1) % slides.length);

    return (
        <div className="banner-container">
            <button className="slider-button prev" onClick={prev}>‹</button>
            <div className="slider-view">
                <div
                    className="slider-track"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {slides.map((src, i) => (
                        <a key={i} href="#" className="slide">
                            <img src={src} alt={`Slide ${i}`} />
                        </a>
                    ))}
                </div>
            </div>
            <button className="slider-button next" onClick={next}>›</button>
        </div>
    );
}
