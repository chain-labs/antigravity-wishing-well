'use client';
import React from 'react';
import Value from './Value';
import Timer from './Timer';
import Features from './Features';
import Team from './Team';
import StayUpdated from './StayUpdated';
import Footer from './Footer';
import Register from './RegisterContainer';

const HomeContainer = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Register />
            <Value />
            <Timer />
            <Features />
            <Team />
            <StayUpdated />
            <Footer />
        </div>
    );
};

export default HomeContainer;
