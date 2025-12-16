import React, { useEffect } from 'react';
import HowItWorks from '../components/HowItWorks';

const HowItWorksPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-wrapper">
            <div className="page-header">
                <h1>How It Works</h1>
                <p>From our kitchen to your doorstep in 3 simple steps.</p>
            </div>
            <HowItWorks />
        </div>
    );
};

export default HowItWorksPage;
