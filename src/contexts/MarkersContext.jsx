// src/contexts/MarkersContext.js
import React, { createContext, useState } from 'react';

// Creamos el contexto
export const MarkersContext = createContext();

// Proveedor del contexto
export const MarkersProvider = ({ children }) => {
    const [markers, setMarkers] = useState([
        {
            id: 1,
            coordinates: [-74.13553,4.61856],
            title: 'Plaza de las americas',
            description: 'Este es el primer marker.',
        },
        {
            id: 2,
            coordinates: [-74.084255,4.616764],
            title: 'Paloquemado',
            description: 'Este es el segundo marker.',
        },
        {
            id: 3,
            coordinates: [ -74.101726, 4.647380],
            title: 'Gran estacion',
            description: 'Este es el tercer marker.',
        }
    ]);

    // Función para agregar un nuevo marker
    const addMarker = (marker) => {
        setMarkers(prev => [...prev, marker]);
    };

    return (
        <MarkersContext.Provider value={{ markers, addMarker }}>
            {children}
        </MarkersContext.Provider>
    );
};
