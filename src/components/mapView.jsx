// src/components/MapComponent.js
import React, { useEffect, useRef, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MarkersContext } from '../contexts/MarkersContext';
import FullScreenLoader from './FullScreenLoader';

mapboxgl.accessToken = 'pk.eyJ1IjoidW5pcmJ4ZXJ2byIsImEiOiJjbWE0b2Zva3MwOWhzMnZvYmNiZWFydjBkIn0.TBOs2w0YdqhHUJCUhnzGbA';

const MapComponent = () => {
    const mapContainer = useRef();
    const map = useRef();
    const { markers, loading } = useContext(MarkersContext);

    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            "name": "some-parking",
            "version": 8,
          
            // default camera position
            "center":  [-74.10776,4.63084],
            "zoom": 12,
          
            // sprites and fonts
            "sprite": "mapbox://sprites/mapbox/light-v11",
            "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
          
            // spatial data to include, used one-to-many with layers
            "sources": {
              "some-vector-source": {
                "type": "vector",
                "url": "mapbox://mapbox.mapbox-streets-v8"
              }
            },
            // layers define rendering the map, in order; used many-to-one with sources
            "layers": [
              {
                "id": "some-layer",
                "type": "fill",
                "source": "some-vector-source",
                "source-layer": "some-source-layer",
                "layout": {
                  "visibility": "visible"
                },
                "paint": {
                  "fill-color": "red",
                  "fill-opacity": 0.5
                }
              },
              {
                "id": "another-layer",
                "type": "circle",
                "source": "some-geojson-source",
                "paint": {
                  "circle-radius": 10,
                  "circle-color": "#FF0000"
                }
              },
              {
                "id": "some-raster-layer",
                "type": "raster",
                "source": "some-raster-source",
                "minzoom": 0,
                "maxzoom": 22,
                "paint": {
                  "raster-opacity": 0.5
                }
              }
            ]
          }
          );

        // Add geolocate control to the map.
        map.current.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true,
                showUserHeading: true
            }),
            'bottom-right'
        );

        map.current.addControl(new mapboxgl.NavigationControl(),'bottom-right');

    }, []);

    useEffect(() => {
        if (!map.current) return;

        // Limpiar markers anteriores (opcional si se actualizan dinámicamente)
        map.current.markers?.forEach(m => m.remove());
        map.current.markers = [];

        markers.forEach(markerData => {
            const el = document.createElement('div');
            el.className = 'custom-marker';

            const popupContent = `
                <div style="font-family: Arial; text-align: center;">
                    <h3 style="margin: 0;">${markerData.title}</h3>
                    <p style="margin: 5px 0;">${markerData.description}</p>
                    <a href="/detail/${markerData.id}" class="boton">Detalle</a>
                </div>
            `;

            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);

            const marker = new mapboxgl.Marker(el)
                .setLngLat(markerData.coordinates)
                .setPopup(popup)
                .addTo(map.current);

            // Guardar los markers para limpiar después si es necesario
            map.current.markers.push(marker);
        });
    }, [markers]);
    

    return (
        <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
            <div
                ref={mapContainer}
                className="map-container"
                style={{ height: '100%', width: '100%' }}
            />
            {loading && <FullScreenLoader />}
        </div>
    );
};

export default MapComponent;