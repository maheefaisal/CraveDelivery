import React, { useEffect } from 'react';

const TwitterPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Mock data with Neuromarketing triggers
    const tweets = [
        {
            handle: "@CraveDelivery",
            time: "2h ago",
            content: "🍕 Pizza night just got better! Get 20% off all artisan pizzas tonight.",
            trigger: "🔥 Only 2 hours left to claim!",
            stats: { replies: 24, retweets: 156, likes: 892 }
        },
        {
            handle: "@CraveDelivery",
            time: "5h ago",
            content: "We're expanding to 3 new cities next month! Stay tuned for the big announcement. 🚀",
            trigger: "Join 50,000+ satisfied customers.",
            stats: { replies: 142, retweets: 543, likes: "2.1K" }
        },
        {
            handle: "@CraveDelivery",
            time: "1d ago",
            content: "Did someone say sushi? 🍣 Our fresh catch is rolling out now.",
            stats: { replies: 45, retweets: 89, likes: 432 }
        }
    ];

    return (
        <div className="page-wrapper" style={{ background: '#15202B', minHeight: '100vh', paddingBottom: '0' }}>
            <div className="container" style={{ maxWidth: '600px', borderLeft: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)', minHeight: '100vh', padding: '0' }}>

                {/* Header */}
                <div style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', position: 'sticky', top: '80px', zIndex: 10, background: 'rgba(21, 32, 43, 0.8)' }}>
                    <h2 style={{ fontSize: '1.2rem', color: 'white', fontFamily: 'var(--font-heading)' }}>CraveDelivery</h2>
                    <p style={{ color: '#8899a6', fontSize: '0.8rem' }}>10.5K Tweets</p>
                </div>

                {/* Profile Hero */}
                <div style={{ height: '200px', background: 'linear-gradient(135deg, var(--primary), #FF8C61)', position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: '-45px', left: '20px', width: '90px', height: '90px', borderRadius: '50%', background: 'black', border: '4px solid #15202B', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '2.5rem' }}>🍔</span>
                    </div>
                </div>

                {/* Profile Controls */}
                <div style={{ padding: '15px 20px 0', textAlign: 'right' }}>
                    <button style={{
                        background: 'transparent',
                        border: '1px solid var(--primary)',
                        color: 'var(--primary)',
                        borderRadius: '50px',
                        padding: '8px 20px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>Following</button>
                </div>

                {/* Profile Info */}
                <div style={{ padding: '20px 20px 30px' }}>
                    <h3 style={{ fontSize: '1.5rem', color: 'white', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        CraveDelivery
                        <span style={{ color: '#1da1f2', fontSize: '1.2rem' }}>✓</span>
                    </h3>
                    <p style={{ color: '#8899a6', marginBottom: '15px' }}>@CraveDelivery</p>
                    <p style={{ color: 'white', fontSize: '1rem', lineHeight: '1.5' }}>
                        Delivering gourmet happiness, one meal at a time. 🍔🍕🍣 <br />
                        <span style={{ color: 'var(--primary)' }}>#CraveDelivery</span> <span style={{ color: 'var(--primary)' }}>#Foodie</span>
                    </p>
                    <div style={{ display: 'flex', gap: '20px', marginTop: '15px', color: '#8899a6', fontSize: '0.9rem' }}>
                        <span><strong>156</strong> Following</span>
                        <span><strong>45.2K</strong> Followers</span>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    {['Tweets', 'Replies', 'Media', 'Likes'].map((tab, i) => (
                        <div key={i} style={{ flex: 1, textAlign: 'center', padding: '15px', color: i === 0 ? 'var(--primary)' : '#8899a6', fontWeight: 'bold', borderBottom: i === 0 ? '2px solid var(--primary)' : 'none', cursor: 'pointer' }}>
                            {tab}
                        </div>
                    ))}
                </div>

                {/* Tweets Feed */}
                <div>
                    {tweets.map((tweet, index) => (
                        <div key={index} style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '15px', transition: 'background 0.2s' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#333', flexShrink: 0 }}></div>
                            <div style={{ flex: 1 }}>
                                <div style={{ marginBottom: '5px' }}>
                                    <span style={{ fontWeight: 'bold', color: 'white' }}>CraveDelivery</span> <span style={{ color: '#1da1f2' }}>✓</span> <span style={{ color: '#8899a6' }}>{tweet.handle} · {tweet.time}</span>
                                </div>
                                <p style={{ color: 'white', fontSize: '1rem', marginBottom: '10px' }}>{tweet.content}</p>
                                {tweet.trigger && (
                                    <p style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '10px' }}>{tweet.trigger}</p>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8899a6', fontSize: '0.9rem', maxWidth: '80%' }}>
                                    <span>💬 {tweet.stats.replies}</span>
                                    <span>Example {tweet.stats.retweets}</span>
                                    <span>❤️ {tweet.stats.likes}</span>
                                    <span>📤</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default TwitterPage;
