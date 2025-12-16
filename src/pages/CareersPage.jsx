import React, { useEffect } from 'react';

const CareersPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const openings = [
        { title: "Senior Frontend Engineer", dept: "Engineering", type: "Remote" },
        { title: "Product Designer", dept: "Design", type: "New York, NY" },
        { title: "Logistics Manager", dept: "Operations", type: "London, UK" },
        { title: "Marketing Specialist", dept: "Growth", type: "Remote" }
    ];

    return (
        <div className="page-wrapper">
            <div className="container">
                <div className="page-header animate-fade-in">
                    <h1>Join the Revolution</h1>
                    <p>Help us shape the future of food delivery.</p>
                </div>

                <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto 80px', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
                        At CraveDelivery, we are builders, dreamers, and foodies. We're looking for passionate individuals who care about craftsmanship and efficiency.
                    </p>
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '40px', color: 'white', textAlign: 'center' }}>Open Positions</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px', margin: '0 auto' }}>
                        {openings.map((job, index) => (
                            <div key={index} className="glass-panel" style={{
                                padding: '30px',
                                borderRadius: '20px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'all 0.3s ease'
                            }}>
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', color: 'white', marginBottom: '5px' }}>{job.title}</h3>
                                    <p style={{ color: '#888', fontSize: '0.9rem' }}>{job.dept} • {job.type}</p>
                                </div>
                                <button className="btn btn-secondary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>Apply Now</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareersPage;
