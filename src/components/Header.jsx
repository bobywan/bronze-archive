import React from 'react';

const Header = () => {
    return (
        <header className="bg-slate-900 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-8 flex items-center">
                <div className="py-8">
                    <h1 className="text-2xl font-bold text-[#FFD100]">
                        BRONZE ARCHIVE
                    </h1>
                    <p className="text-xs font-bold text-white">
                        CHRONICLE OF AZEROTH
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Header;
