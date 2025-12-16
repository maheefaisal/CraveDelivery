import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.png';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-container">
                <div className="hero-text">
                    <h1>
                        Craving <span className="text-gradient">Delicious?</span> <br />
                        Delivered Fast.
                    </h1>
                    <p>
                        Experience gourmet dining from the comfort of your home.
                        <br />
                        <strong style={{ color: 'white' }}>Trusted by 10,000+ hungry customers.</strong>
                    </p>
                    <div className="hero-cta">
                        <Link to="/order" className="btn btn-primary">
                            Get it Hot & Fresh
                        </Link>
                        <Link to="/menu" className="btn btn-secondary">
                            Explore Menu
                        </Link>
                    </div>
                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-number">30m</span>
                            <span className="stat-label">Avg. Delivery</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Restaurants</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">4.9</span>
                            <span className="stat-label">Rating</span>
                        </div>
                    </div>
                </div>
                <div className="hero-image-wrapper">
                    <img src={heroImage} alt="Delicious Burger" className="hero-img" />
                    <div className="floating-card card-1">
                        <span>🔥 Hot & Fresh</span>
                    </div>
                    <div className="floating-card card-2">
                        <span>⭐ Top Rated</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
