import React, { useEffect } from 'react';

const TermsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-wrapper">
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="page-header">
                    <h1>Terms of Service</h1>
                    <p>Last updated: December 11, 2025</p>
                </div>
                <div style={{ color: '#ccc', lineHeight: '1.8' }}>
                    <h3 style={{ color: 'white', marginTop: '30px', marginBottom: '16px' }}>1. Acceptance of Terms</h3>
                    <p>By accessing and using CraveDelivery, you agree to be bound by these Terms of Service.</p>

                    <h3 style={{ color: 'white', marginTop: '30px', marginBottom: '16px' }}>2. Use of Service</h3>
                    <p>You agree to use our service only for lawful purposes. You must be at least 18 years old to create an account.</p>

                    <h3 style={{ color: 'white', marginTop: '30px', marginBottom: '16px' }}>3. User Accounts</h3>
                    <p>You are responsible for maintaining the confidentiality of your account credentials.</p>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
