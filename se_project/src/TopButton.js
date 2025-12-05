import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import './TopButton.css';

export default function TopButton() {
    const [visible, setVisible] = useState(false);

    // 스크롤 이벤트 감지
    const toggleVisibility = () => {
        if (window.scrollY > 100) { // 300px 이상 스크롤하면 버튼 표시
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button
            className={`top-button ${visible ? 'show' : ''}`}
            onClick={scrollToTop}
        >
            <FiArrowUp />
        </button>
    );
}