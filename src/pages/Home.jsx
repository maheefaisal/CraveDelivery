import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import WeeklySpecials from '../components/WeeklySpecials';
import Community from '../components/Community';
import ScrollObserver from '../components/ScrollObserver';

const Home = () => {
    return (
        <>
            <ScrollObserver />
            <Hero />
            <WeeklySpecials />
            <Features />
            <Community />
        </>
    );
};

export default Home;
