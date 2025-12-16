import React, { useEffect } from 'react';

const FacebookPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-wrapper" style={{ background: '#f0f2f5', minHeight: '100vh', color: '#050505', paddingTop: '100px' }}>
            {/* Header/Cover */}
            <div style={{ background: 'white', maxWidth: '940px', margin: '0 auto', borderRadius: '0 0 8px 8px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                <div style={{ height: '315px', background: 'linear-gradient(to right, #1877f2, #00c6ff)', borderRadius: '0 0 8px 8px', position: 'relative' }}></div>
                <div style={{ padding: '0 30px 30px', position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '-30px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px' }}>
                        <div style={{ width: '168px', height: '168px', border: '4px solid white', borderRadius: '50%', background: '#fff', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            <span style={{ fontSize: '3rem' }}>🍔</span>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1c1e21', fontFamily: 'var(--font-heading)' }}>CraveDelivery</h1>
                            <span style={{ color: '#65676b', fontWeight: '600', fontSize: '1.1rem' }}>12K likes • 13K followers</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                        <button className="btn btn-primary" style={{ borderRadius: '6px', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>contact us</span> WhatsApp
                        </button>
                        <button style={{ padding: '10px 24px', background: '#e4e6eb', border: 'none', borderRadius: '6px', fontWeight: '600', color: '#050505' }}>Message</button>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ padding: '0 30px', borderTop: '1px solid #ced0d4', display: 'flex', gap: '20px' }}>
                    {['Posts', 'About', 'Mentions', 'Reviews', 'Followers', 'Photos'].map((tab, i) => (
                        <div key={i} style={{ padding: '15px 0', color: i === 0 ? '#1877f2' : '#65676b', fontWeight: '600', borderBottom: i === 0 ? '3px solid #1877f2' : 'none', cursor: 'pointer' }}>
                            {tab}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Grid */}
            <div className="container" style={{ maxWidth: '940px', marginTop: '20px', display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '20px', paddingBottom: '40px' }}>

                {/* Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ marginBottom: '15px', fontSize: '1.2rem' }}>About</h3>
                        <p style={{ marginBottom: '15px', color: '#050505' }}>Best Food Delivery Service 2025 🏆. Serving joy one click at a time.</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: '#65676b', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>📍 New York, NY</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>📞 (555) 123-4567</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>✉️ hello@crave.delivery</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#31a24c' }}>⚡ Very responsive to messages</div>
                        </div>
                    </div>
                </div>

                {/* Feed */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Create Post */}
                    <div style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee' }}></div>
                            <input type="text" placeholder="What's on your mind?" style={{ flex: 1, borderRadius: '20px', border: 'none', background: '#f0f2f5', padding: '10px 20px' }} />
                        </div>
                        <hr style={{ border: 'none', borderTop: '1px solid #e4e6eb' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '10px', color: '#65676b', fontWeight: '600' }}>
                            <span>📷 Photo/Video</span>
                            <span>😄 Feeling/Activity</span>
                        </div>
                    </div>

                    {/* Pinned Post */}
                    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee' }}></div>
                            <div>
                                <span style={{ fontWeight: '600' }}>CraveDelivery</span>
                                <div style={{ fontSize: '0.8rem', color: '#65676b' }}>Pinned Post • August 15 at 12:00 PM</div>
                            </div>
                        </div>
                        <p style={{ marginBottom: '15px', fontSize: '1rem' }}>
                            Use code <strong>CRAVE25</strong> for 25% off your first order! Limited time only. 🏃‍♂️💨
                        </p>
                        <div style={{ height: '300px', background: 'linear-gradient(45deg, #FF6B35, #ff9f43)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '2rem' }}>
                            SUMMER SALE
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', color: '#65676b', fontSize: '0.9rem' }}>
                            <span>❤️👍 2.4K</span>
                            <span>145 Comments</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacebookPage;
