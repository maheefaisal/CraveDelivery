import React, { useEffect } from 'react';
import Testimonials from '../components/Testimonials';

const ReviewsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-wrapper">
            <div className="page-header">
                <h1>Customer Reviews</h1>
                <p>See what people are saying about CraveDelivery.</p>
            </div>
            <Testimonials />
        </div>
    );
};

export default ReviewsPage;
