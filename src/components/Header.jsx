import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Pages that have a light background and need a dark header
    const lightThemePages = ['/instagram', '/facebook'];
    const isLightTheme = lightThemePages.includes(location.pathname);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''} ${isLightTheme ? 'light-theme' : ''}`}>
            <div className="container nav-container">
                <Link to="/" className="logo-link" style={{ textDecoration: 'none' }}>
                    <div className="logo">
                        <span className="logo-accent">Crave</span>Delivery
                    </div>
                </Link>
                <nav className="nav-links">
                    <Link to="/how-it-works">How it Works</Link>
                    <Link to="/menu">Menu</Link>
                    <Link to="/reviews">Reviews</Link>
                </nav>
                <Link to="/order" className="btn btn-primary">
                    Order Now
                </Link>
            </div>
        </header>
    );
};

export default Header;
