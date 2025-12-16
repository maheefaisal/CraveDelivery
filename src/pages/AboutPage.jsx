import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-wrapper">
            <div className="container">
                <div className="page-header animate-fade-in">
                    <h1>Our Story</h1>
                    <p>Redefining delivery with passion and precision.</p>
                </div>

                <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto 100px', textAlign: 'center', fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)' }}>
                    <p style={{ marginBottom: '20px' }}>
                        Founded in 2024, <strong style={{ color: 'var(--primary)' }}>CraveDelivery</strong> started with a simple mission:
                        to bridge the gap between gourmet dining and home comfort. We believe that food delivery shouldn't mean compromising on quality.
                    </p>
                    <p>
                        We partner with only the finest local chefs and restaurants, ensuring that every dish arrives as fresh and plated as if you were dining in.
                    </p>
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '60px', color: 'white' }}>Our Core Values</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '100px' }}>
                        {[
                            { title: "Culinary Excellence", desc: "We curate only the best. If it's not delicious, it's not on Crave." },
                            { title: "Lightning Speed", desc: "Our advanced logistics ensure your food arrives hot, every time." },
                            { title: "Sustainable Future", desc: "We are committed to eco-friendly packaging and carbon-neutral delivery." }
                        ].map((item, index) => (
                            <div key={index} className="glass-panel" style={{ padding: '40px', borderRadius: '24px', textAlign: 'center', transition: 'transform 0.3s ease' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--accent)' }}>{item.title}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.7)' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '0.4s', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', color: 'white' }}>Meet the Visionaries</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="glass-panel" style={{ width: '250px', padding: '30px', borderRadius: '24px' }}>
                                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, #333, #555)', margin: '0 auto 20px' }}></div>
                                <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '5px' }}>Team Member {i}</h4>
                                <p style={{ fontSize: '0.9rem', color: '#888' }}>Co-Founder</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
