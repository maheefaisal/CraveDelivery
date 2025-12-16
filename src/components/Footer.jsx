import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { useStore } from '../context/StoreContext';
import './Footer.css';

const Footer = () => {
    const { restaurantInfo } = useStore();

    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <div className="logo">
                        <span className="logo-accent">{restaurantInfo.name.split(' ')[0]}</span>{restaurantInfo.name.split(' ').slice(1).join(' ')}
                    </div>
                    <p className="tagline">{restaurantInfo.tagline}</p>
                    <div className="social-links">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTwitter /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram /></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaFacebookF /></a>
                    </div>
                    <p className="copyright-text">© 2025 CraveDelivery Inc. All rights reserved.</p>
                </div>

                <div className="footer-links-group">
                    <div className="link-column">
                        <h4>Company</h4>
                        <Link to="/about">About Us</Link>
                        <Link to="/careers">Careers</Link>
                        <Link to="/blog">Journal</Link>
                    </div>
                    <div className="link-column">
                        <h4>Support</h4>
                        <Link to="/help">Concierge</Link>
                        <Link to="/terms">Terms</Link>
                        <Link to="/privacy">Privacy</Link>
                    </div>
                </div>

                <div className="newsletter-column">
                    <h4>Stay Inspired</h4>
                    <p>Join our exclusive list for culinary updates.</p>
                    <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Your email address" aria-label="Email for newsletter" />
                        <button type="submit" aria-label="Subscribe">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
