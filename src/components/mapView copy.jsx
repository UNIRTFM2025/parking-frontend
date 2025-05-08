import React, { useContext, useEffect } from 'react';
import { MapContext } from '../contexts/MapContext';

const MapComponent = () => {
    const { mapContainer } = useContext(MapContext);

    // useEffect(() => {
    //     // Ejemplo: agregar markers iniciales
    //     addMarker({
    //         id: 1,
    //         coordinates: [-74.5, 40],
    //         title: 'Marker 1',
    //         description: 'Este es el primer marker.',
    //         icon: 'https://cdn-icons-png.flaticon.com/512/684/684908.png'
    //     });

    //     addMarker({
    //         id: 2,
    //         coordinates: [-74.6, 40.1],
    //         title: 'Marker 2',
    //         description: 'Este es el segundo marker.',
    //         icon: 'https://cdn-icons-png.flaticon.com/512/252/252025.png'
    //     });
    // }, [addMarker]);

    return (
        <h1>Mapa con Markers y Context</h1>
    );
};

export default MapComponent;
