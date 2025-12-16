import React from 'react';
import './Features.css';

const Features = () => {
    const features = [
        {
            icon: "🚀",
            title: "Fastest Delivery",
            description: "We guarantee delivery within 30 minutes or your meal is free."
        },
        {
            icon: "👨‍🍳",
            title: "Expert Chefs",
            description: "Our food is prepared by top-tier chefs using premium ingredients."
        },
        {
            icon: "🌱",
            title: "Fresh Ingredients",
            description: "We source our produce locally every day to ensure freshness."
        }
    ];

    return (
        <section className="features">
            <div className="container">
                <div className="section-header text-center reveal">
                    <h2>Why Choose Us?</h2>
                    <p>We're not just another delivery app. We're a culinary experience.</p>
                </div>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div className={`feature-card glass-panel reveal stagger-${index + 1}`} key={index}>
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
