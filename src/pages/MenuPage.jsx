import React, { useEffect } from 'react';
import MenuPreview from '../components/MenuPreview';

const MenuPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-wrapper">
            <div className="page-header">
                <h1>Our Menu</h1>
                <p>Explore our wide variety of delicious options.</p>
            </div>
            <MenuPreview />
        </div>
    );
};

export default MenuPage;
