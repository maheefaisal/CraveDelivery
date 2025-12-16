import React, { useEffect } from 'react';

const HelpPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const faqs = [
        {
            q: "How long does delivery take?",
            a: "Our average delivery time is 30 minutes. You can track your order in real-time within the app."
        },
        {
            q: "What is the delivery fee?",
            a: "Delivery fees vary based on distance but typically range from $1.99 to $4.99. Orders over $30 get free delivery!"
        },
        {
            q: "Can I cancel my order?",
            a: "You can cancel your order within 5 minutes of placing it for a full refund. After that, please contact support."
        }
    ];

    return (
        <div className="page-wrapper">
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="page-header">
                    <h1>Help Center</h1>
                    <p>Frequently asked questions and support.</p>
                </div>

                <div style={{ marginBottom: '60px' }}>
                    {faqs.map((faq, index) => (
                        <div key={index} style={{ marginBottom: '30px', background: '#222', padding: '24px', borderRadius: '12px', border: '1px solid #333' }}>
                            <h3 style={{ color: 'white', marginBottom: '10px' }}>{faq.q}</h3>
                            <p style={{ color: '#aaa' }}>{faq.a}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center" style={{ background: '#1a1a1a', padding: '40px', borderRadius: '20px', border: '1px solid #333' }}>
                    <h3 style={{ color: 'white', marginBottom: '16px' }}>Still need help?</h3>
                    <p style={{ color: '#888', marginBottom: '24px' }}>Our support team is available 24/7.</p>
                    <button className="btn btn-primary">Contact Support</button>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;
