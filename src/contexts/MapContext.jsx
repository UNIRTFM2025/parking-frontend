// src/contexts/MapContext.js
import React, { createContext, useState, useRef, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidW5pcmJ4ZXJ2byIsImEiOiJjbWE0b2Zva3MwOWhzMnZvYmNiZWFydjBkIn0.TBOs2w0YdqhHUJCUhnzGbA';

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const mapContainer = useRef();
    const mapRef = useRef();
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {

        console.log('holaaa entre')
        
        mapRef.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-74.5, 40],
            zoom: 9
        });

        setMap(mapRef.current);
        // mapRef.current.on('load', () => {
        // });

        return () => {
            initMap.remove();
        };
    });

    // const addMarker = (markerData) => {
    //     if (!map) return;

    //     const el = document.createElement('div');
    //     el.className = 'custom-marker';
    //     el.style.backgroundImage = `url(${markerData.icon})`;
    //     el.style.width = '40px';
    //     el.style.height = '40px';
    //     el.style.backgroundSize = 'cover';
    //     el.style.borderRadius = '50%';
    //     el.style.cursor = 'pointer';

    //     const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
    //         <div style="font-family: Arial; text-align: center;">
    //             <h3 style="margin: 0;">${markerData.title}</h3>
    //             <p style="margin: 5px 0;">${markerData.description}</p>
    //         </div>
    //     `);

    //     const marker = new mapboxgl.Marker(el)
    //         .setLngLat(markerData.coordinates)
    //         .setPopup(popup)
    //         .addTo(map);

    //     setMarkers(prev => [...prev, { ...markerData, markerObject: marker }]);
    // };

    // const clearMarkers = () => {
    //     markers.forEach(m => m.markerObject.remove());
    //     setMarkers([]);
    // };

    return (
        <MapContext.Provider value={{ map, mapContainer }}>
            {children}
        </MapContext.Provider>
    );
};

// export const MapsGeneral = () => {
//     const mapContainerRef = useRef();
//     const mapRef = useRef();
//     const [map, setMap] = useState(mapRef);
  
//     useEffect(() => {
//         map.current = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         center: [-74.5, 40], // starting position [lng, lat]
//         zoom: 9 // starting zoom
//       });
//     });
  
//     return (
//         <div
//             style={{ height: '100vh', width: '100vw' }}
//             ref={mapContainerRef}
//             className="map-container"
//         />
//     );
// };