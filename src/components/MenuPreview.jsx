import React from 'react';
import pizzaImg from '../assets/pizza.png';
import sushiImg from '../assets/sushi.png';
import saladImg from '../assets/salad.png';
import './MenuPreview.css';

const MenuPreview = () => {
    const items = [
        {
            id: 1,
            name: "Artisan Pizza",
            desc: "Fresh basil, pepperoni, and mozzarella cheese.",
            price: "$18",
            image: pizzaImg,
            rating: "4.8"
        },
        {
            id: 2,
            name: "Sushi Deluxe",
            desc: "Premium salmon and tuna rolls with wasabi.",
            price: "$24",
            image: sushiImg,
            rating: "4.9"
        },
        {
            id: 3,
            name: "Greek Salad",
            desc: "Crisp vegetables, feta, and olive oil dressing.",
            price: "$12",
            image: saladImg,
            rating: "4.7"
        }
    ];

    return (
        <section className="menu-preview" id="menu">
            <div className="container">
                <div className="section-header">
                    <h2>Top Picks</h2>
                    <p>Our most popular dishes, curated for you.</p>
                </div>
                <div className="menu-grid">
                    {items.map(item => (
                        <div className="menu-card" key={item.id}>
                            <div className="menu-img-wrapper">
                                <img src={item.image} alt={item.name} />
                                <span className="rating">⭐ {item.rating}</span>
                            </div>
                            <div className="menu-content">
                                <div className="menu-title-row">
                                    <h3>{item.name}</h3>
                                    <span className="price">{item.price}</span>
                                </div>
                                <p>{item.desc}</p>
                                <button className="btn btn-primary add-btn">Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MenuPreview;
