import React, { useEffect } from 'react';

/**
 * ScrollObserver
 * 
 * Attaches an IntersectionObserver to all elements with the class '.reveal'.
 * When an element enters the viewport, it adds the 'active' class to trigger the CSS animation.
 * Implements "Discovery" neuromarketing principle by revealing content as the user explores.
 */
const ScrollObserver = () => {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of the element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Only animate once for "Premium" feel (no distraction)
                }
            });
        }, observerOptions);

        // Select all elements to reveal
        const textElements = document.querySelectorAll('.reveal');
        textElements.forEach((el) => observer.observe(el));

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }); // Run on every render to catch new elements (simple approach for this project size)

    return null; // This component renders nothing physically
};

export default ScrollObserver;
