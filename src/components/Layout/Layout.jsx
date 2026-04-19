import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, activeTab, setActiveTab, isMenuOpen, setIsMenuOpen }) => {
    return (
        <div className="min-h-screen flex flex-col bg-[#010101] text-white font-['Inter'] selection:bg-white/20">
            <Header
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />

            <main className="flex-grow pt-24 pb-32 md:pb-12">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    {children}
                </div>
            </main>

            <Footer />

            {/* Die globalen Styles aus deinem App.js Footer */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { background: #010101; overscroll-behavior-y: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        /* Deine restlichen Styles hier */
      `}} />
        </div>
    );
};

export default Layout;