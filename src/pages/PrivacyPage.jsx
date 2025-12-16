import React, { useEffect } from 'react';

const PrivacyPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-wrapper">
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="page-header">
                    <h1>Privacy Policy</h1>
                    <p>We value your privacy.</p>
                </div>
                <div style={{ color: '#ccc', lineHeight: '1.8' }}>
                    <p style={{ marginBottom: '20px' }}>
                        At CraveDelivery, we are committed to protecting your personal information. This policy explains how we collect and use your data.
                    </p>

                    <h3 style={{ color: 'white', marginTop: '30px', marginBottom: '16px' }}>Data Collection</h3>
                    <p>We collect information you provide directly to us, such as your name, address, and payment information when you place an order.</p>

                    <h3 style={{ color: 'white', marginTop: '30px', marginBottom: '16px' }}>Data Usage</h3>
                    <p>We use your data to process orders, improve our services, and communicate with you about promotions.</p>

                    <h3 style={{ color: 'white', marginTop: '30px', marginBottom: '16px' }}>Security</h3>
                    <p>We implement top-tier security measures to protect your data from unauthorized access.</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
