import React, { useEffect } from 'react';
import pizzaImg from '../assets/pizza.png';
import sushiImg from '../assets/sushi.png';
import saladImg from '../assets/salad.png';

const InstagramPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Duplicate content to fill grid
    const posts = [saladImg, pizzaImg, sushiImg, sushiImg, saladImg, pizzaImg, pizzaImg, sushiImg, saladImg];

    return (
        <div className="page-wrapper" style={{ background: '#fafafa', color: '#262626', paddingTop: '100px' }}>
            <div className="container" style={{ maxWidth: '935px', padding: '0 20px' }}>

                {/* Profile Header */}
                <div style={{ display: 'flex', gap: '80px', padding: '30px 50px', marginBottom: '40px', borderBottom: '1px solid #dbdbdb' }}>
                    <div style={{ width: '150px', height: '150px', borderRadius: '50%', padding: '2px', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', flexShrink: 0 }}>
                        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'white', padding: '3px' }}>
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '3rem', color: 'white' }}>C</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: '300' }}>cravedelivery</h2>
                            <button className="btn btn-primary" style={{ padding: '8px 24px', fontSize: '0.9rem' }}>Follow</button>
                            <span style={{ fontSize: '1.5rem', cursor: 'pointer' }}>•••</span>
                        </div>

                        <div style={{ display: 'flex', gap: '40px', marginBottom: '20px', fontSize: '1rem' }}>
                            <span><strong>1,254</strong> posts</span>
                            <span><strong>45.2k</strong> followers</span>
                            <span><strong>12</strong> following</span>
                        </div>

                        <div>
                            <p style={{ fontWeight: '600' }}>CraveDelivery</p>
                            <p style={{ color: '#8e8e8e' }}>Food & Beverage</p>
                            <p>Delivering gourmet happiness directly to your door. 🏎️💨</p>
                            <p>👇 Order now for 20% OFF your first meal!</p>
                            <a href="#" style={{ color: '#00376b', fontWeight: '600', textDecoration: 'none' }}>crave.delivery/order</a>
                        </div>
                    </div>
                </div>

                {/* Highlights (Mock) */}
                <div style={{ display: 'flex', gap: '40px', padding: '0 50px 40px', borderBottom: '1px solid #dbdbdb', marginBottom: '40px' }}>
                    {['Reviews', 'Menu', 'Behind Scenes', 'Events'].map((item, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{ width: '77px', height: '77px', borderRadius: '50%', background: '#efefef', border: '1px solid #dbdbdb', marginBottom: '10px' }}></div>
                            <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{item}</span>
                        </div>
                    ))}
                </div>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px', paddingBottom: '50px' }}>
                    {posts.map((img, index) => (
                        <div key={index} className="insta-post" style={{ aspectRatio: '1/1', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
                            <img src={img} alt="Post" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'filter 0.3s' }} />
                            <div className="overlay" style={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                background: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center',
                                gap: '30px', color: 'white', fontWeight: 'bold', fontSize: '1.2rem', opacity: 0, transition: 'opacity 0.3s'
                            }}>
                                <span>❤️ 1.2K</span>
                                <span>💬 45</span>
                            </div>
                        </div>
                    ))}
                </div>

                <style>{`
                    .insta-post:hover .overlay { opacity: 1; }
                `}</style>

            </div>
        </div>
    );
};

export default InstagramPage;
