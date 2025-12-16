import React, { useEffect } from 'react';

const BlogPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const posts = [
        {
            title: "The Future of Food Delivery",
            excerpt: "How AI and drones are changing the way we eat.",
            date: "October 12, 2025",
            category: "Technology"
        },
        {
            title: "Top 5 Sushi Spots in NYC",
            excerpt: "A curated list of our favorite Omakase experiences.",
            date: "September 28, 2025",
            category: "Lifestyle"
        },
        {
            title: "Meet Chef Antonio",
            excerpt: "The master behind our most popular truffle burger.",
            date: "September 15, 2025",
            category: "Partner Spotlight"
        },
        {
            title: "Sustainability at Crave",
            excerpt: "Our journey towards becoming 100% carbon neutral.",
            date: "August 30, 2025",
            category: "Impact"
        }
    ];

    return (
        <div className="page-wrapper">
            <div className="container">
                <div className="page-header animate-fade-in">
                    <h1>The Crave Journal</h1>
                    <p>Stories about food, technology, and culture.</p>
                </div>

                <div className="animate-fade-in" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '40px',
                    marginBottom: '100px'
                }}>
                    {posts.map((post, index) => (
                        <div key={index} className="glass-panel" style={{
                            padding: '40px',
                            borderRadius: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            minHeight: '300px',
                            transition: 'all 0.4s ease',
                            cursor: 'pointer'
                        }}>
                            <div>
                                <span style={{
                                    textTransform: 'uppercase',
                                    fontSize: '0.8rem',
                                    color: 'var(--primary)',
                                    letterSpacing: '0.1em',
                                    fontWeight: '600'
                                }}>{post.category}</span>
                                <h2 style={{
                                    fontSize: '1.8rem',
                                    color: 'white',
                                    marginTop: '15px',
                                    marginBottom: '15px',
                                    lineHeight: '1.3'
                                }}>{post.title}</h2>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>{post.excerpt}</p>
                            </div>
                            <div style={{ marginTop: '30px', color: '#666', fontSize: '0.9rem' }}>
                                {post.date}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
