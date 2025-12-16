import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
    return (
        <section className="testimonials" id="testimonials">
            <div className="container">
                <div className="section-header">
                    <h2>Happy Customers</h2>
                    <p>Don't just take our word for it.</p>
                </div>
                <div className="testimonial-card">
                    <p className="quote">"This is hands down the best delivery service I've ever used. The food arrived hot and the presentation was impeccable. Highly recommended!"</p>
                    <div className="author">
                        <div className="author-avatar">JS</div>
                        <div className="author-info">
                            <h4>John Smith</h4>
                            <span>Food Blogger</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
