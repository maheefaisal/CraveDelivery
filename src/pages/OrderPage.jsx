import React, { useEffect } from 'react';

const OrderPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-wrapper" style={{ paddingTop: '150px', minHeight: '60vh', textAlign: 'center' }}>
            <div className="container">
                <h1>Start Your Order</h1>
                <p style={{ color: '#888', margin: '20px 0' }}>Select your location to find restaurants near you.</p>
                <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Enter your address..."
                        style={{
                            flex: 1,
                            padding: '12px 20px',
                            borderRadius: '50px',
                            border: 'none',
                            outline: 'none'
                        }}
                    />
                    <button className="btn btn-primary">Go</button>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
