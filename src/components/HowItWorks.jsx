import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            title: "Choose Your Favorite",
            desc: "Browse our extensive menu of gourmet dishes and add them to your cart.",
            icon: "📱"
        },
        {
            id: 2,
            title: "We Prepare It",
            desc: "Our expert chefs start cooking your order immediately with fresh ingredients.",
            icon: "🔥"
        },
        {
            id: 3,
            title: "Fast Delivery",
            desc: "Our delivery partners pick up your order and bring it straight to your door.",
            icon: "🛵"
        }
    ];

    return (
        <section className="how-it-works" id="how-it-works">
            <div className="container">
                <div className="section-header text-center">
                    <h2>How It Works</h2>
                    <p>Simple steps to get your food delivered.</p>
                </div>
                <div className="steps-container">
                    <div className="progress-line"></div>
                    {steps.map((step, index) => (
                        <div className="step-card" key={step.id}>
                            <div className="step-icon-wrapper">
                                <span className="step-icon">{step.icon}</span>
                                <div className="step-number">{step.id}</div>
                            </div>
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
