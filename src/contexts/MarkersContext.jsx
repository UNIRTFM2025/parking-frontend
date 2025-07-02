// src/contexts/MarkersContext.js
import { createContext, useState , useEffect } from 'react';
import axios from 'axios';

// Creamos el contexto
export const MarkersContext = createContext();

// Proveedor del contexto
export const MarkersProvider = ({ children }) => {
    const [markers, setMarkers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Cargar marcadores iniciales desde la API al montar
    useEffect(() => {
        const fetchInitialMarkers = async () => {
            console.log('Fetching initial markers...');
            try {
                const response = await axios.get('https://parking-backend-dr53.onrender.com/spaces');
                if (Array.isArray(response.data)) {
                    console.log('Initial markers fetched:', response.data);
                    const initialMarkers = response.data.map(space => ({
                        id: space.id,
                        coordinates: [space.site.location.longitude, space.site.location.latitude],
                        title: space.site.name || 'Sin nombre',
                        description: space.site.address.street || '',
                    }));
                    setMarkers(initialMarkers);
                }
            } catch (error) {
                console.error('Error fetching initial markers:', error);
            }
        };
        fetchInitialMarkers();
    }, []);

    // Revisión periódica del estado de markers para controlar el loader
    useEffect(() => {
        if (!loading) return;
        let timeoutId;
        const checkMarkers = () => {
            if (markers && markers.length > 0) {
                setLoading(false);
            } else {
                timeoutId = setTimeout(checkMarkers, 3000);
            }
        };
        timeoutId = setTimeout(checkMarkers, 3000);
        return () => clearTimeout(timeoutId);
    }, [markers, loading]);

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
