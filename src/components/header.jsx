import React from 'react';

const Header = () => {
    return (
        <header className="bg-blue-400 text-gray-900 p-4 shadow-md">
            <div className="flex flex-col items-center space-y-2 md:flex-row md:justify-center md:space-y-0 md:space-x-6">
                <div className="flex items-center space-x-3">
                    <img
                        src="/logos/logo-parking.svg"
                        alt="Logo de Parking"
                        className="h-10 w-10"
                    />
                    <h1 className="text-2xl font-semibold">Parking</h1>
                </div>

                <input
                    type="text"
                    placeholder="Buscar"
                    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
                />
            </div>
        </header>
    );
};

export default Header;
