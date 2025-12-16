import React from 'react';
import { Link } from 'react-router-dom';

const Community = () => {
    return (
        <section className="community-section" style={{ padding: '100px 0', background: 'linear-gradient(180deg, var(--dark) 0%, #1a1a1a 100%)' }}>
            <div className="container">
                <div className="page-header reveal" style={{ marginBottom: '60px' }}>
                    <h2>Join the Crave Community</h2>
                    <p>Connect with us for exclusive perks, visual inspiration, and daily deals.</p>
                </div>

                <div className="community-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    {/* Twitter Card */}
                    <Link to="/twitter" style={{ textDecoration: 'none' }}>
                        <div className="glass-panel reveal stagger-1" style={{ padding: '40px', borderRadius: '24px', height: '100%', transition: 'transform 0.3s ease', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🐦</div>
                            <h3 style={{ color: 'white', marginBottom: '10px' }}>Twitter / X</h3>
                            <p style={{ color: 'var(--accent)', fontWeight: 'bold', marginBottom: '15px' }}>⚡ Real-time Flash Sales</p>
                            <p style={{ color: '#888', fontSize: '0.95rem' }}>Be the first to know about our lightning deals. Don't miss out!</p>
                        </div>
                    </Link>

                    {/* Instagram Card */}
                    <Link to="/instagram" style={{ textDecoration: 'none' }}>
                        <div className="glass-panel reveal stagger-2" style={{ padding: '40px', borderRadius: '24px', height: '100%', transition: 'transform 0.3s ease', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📸</div>
                            <h3 style={{ color: 'white', marginBottom: '10px' }}>Instagram</h3>
                            <p style={{ color: 'var(--accent)', fontWeight: 'bold', marginBottom: '15px' }}>😍 Feast Your Eyes</p>
                            <p style={{ color: '#888', fontSize: '0.95rem' }}>Daily culinary inspiration and behind-the-scenes kitchen access.</p>
                        </div>
                    </Link>

                    {/* Facebook Card */}
                    <Link to="/facebook" style={{ textDecoration: 'none' }}>
                        <div className="glass-panel reveal stagger-3" style={{ padding: '40px', borderRadius: '24px', height: '100%', transition: 'transform 0.3s ease', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>👥</div>
                            <h3 style={{ color: 'white', marginBottom: '10px' }}>Facebook</h3>
                            <p style={{ color: 'var(--accent)', fontWeight: 'bold', marginBottom: '15px' }}>🤝 Exclusive Group</p>
                            <p style={{ color: '#888', fontSize: '0.95rem' }}>Join 50,000+ members. Share reviews, events, and get community rewards.</p>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Community;
