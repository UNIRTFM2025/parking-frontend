import React, { useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

const MapsGeneral = () => {

    const mapContainerRef = useRef();
    const mapRef = useRef();

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoidW5pcmJ4ZXJ2byIsImEiOiJjbWE0b2Zva3MwOWhzMnZvYmNiZWFydjBkIn0.TBOs2w0YdqhHUJCUhnzGbA';

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-74.10776,4.63084], // starting position [lng, lat]
            zoom: 13
        });

        // Add geolocate control to the map.
        mapRef.current.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true,
                showUserHeading: true
            }),
            'bottom-right'
        );

        mapRef.current.addControl(new mapboxgl.NavigationControl(),'bottom-right');


        const popupContent = `
            <div style="text-align: center;">
                <h3 style="margin: 0;">Título del Marker</h3>
                <p style="margin: 5px 0;">Este es un popup con contenido personalizado.</p>
                <img src="https://placekitten.com/200/100" alt="gatito" style="width: 100%; border-radius: 8px;"/>
                <br/>
                <a href="https://example.com" target="_blank" style="color: blue; text-decoration: underline;">Visitar sitio</a>
            </div>
        `;

        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.backgroundImage = 'url(/icon-parking.svg)'; // tu icono personalizado
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.backgroundSize = 'contain';
        el.style.cursor = 'pointer';

        // Crear un popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);;

        // Crear un marker con popup
        const marker = new mapboxgl.Marker(el)
            .setLngLat([-74.10776,4.63084],[-74.20776,4.93084])
            .setPopup(popup) // vincular el popup al marker
            .addTo(mapRef.current);

        return () => mapRef.current.remove();

    });



    return (
        <div
            style={{ height: '100vh', width: '100vw' }}
            ref={mapContainerRef}
            className="map-container"
        />
    );
};