import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import './WeeklySpecials.css';

const WeeklySpecials = () => {
    const { menuItems } = useStore();
    const specials = menuItems.filter(item => item.isSpecial);

    return (
        <section className="weekly-specials">
            <div className="container">
                <div className="page-header reveal">
                    <h2>Weekly Cravings 🤤</h2>
                    <p>Indulge in our most requested chef's creations. Warning: Highly Addictive.</p>
                </div>
                <div className="specials-grid">
                    {specials.map((special, index) => (
                        <div className={`special-card glass-panel reveal stagger-${index + 1}`} key={special.id}>
                            <div className="special-image">
                                <img src={special.image} alt={special.name} />
                                {special.tag && <span className="scarcity-tag">{special.tag}</span>}
                            </div>
                            <div className="special-content">
                                <h3>{special.name}</h3>
                                <p className="price">${special.price}</p>
                                <p className="description">{special.description}</p>
                                <Link to="/order" className="btn btn-primary full-width">
                                    {special.category === 'Burger' ? 'Satisfy Cravings' :
                                        special.category === 'Sushi' ? 'Indulge' : 'Devour Now'}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WeeklySpecials;
