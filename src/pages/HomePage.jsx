import React from 'react';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex flex-col items-center justify-center">
        <img src="/bridge-logo.png" alt="Bridge Security Logo" className="w-48 h-auto mb-8" />
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Bridge Security Expense Tracker
        </h1>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
