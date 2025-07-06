import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const PrintLayout = ({ numLayout, slots }) => {
    const containerRef = useRef(null);
    const [svgLoaded, setSvgLoaded] = useState(false);

    // Cargar el SVG solo cuando cambia numLayout
    useEffect(() => {
        const loadSVG = async () => {
            try {
                const response = await fetch(`/layout/layout${numLayout}.svg`);
                const svgText = await response.text();
                if (containerRef.current) {
                    containerRef.current.innerHTML = svgText;
                    setSvgLoaded(true);
                }
            } catch (error) {
                console.error('Error cargando SVG:', error);
                setSvgLoaded(false);
            }
        };
        loadSVG();
    }, [numLayout]);

    // Animar los slots cada vez que cambian los datos de slots o el SVG se cargue
    useEffect(() => {
        if (!svgLoaded || !Array.isArray(slots)) return;
        const svgElement = containerRef.current?.querySelector('svg');
        if (svgElement) {
            slots.forEach(slot => {
                const selectedFloor = slot.type === 'Carro' ? 'pid' : 'mid';
                const id = `${selectedFloor}-${slot.id}`;
                const path = svgElement.querySelector(`#${id}`);
                if (path) {
                    gsap.to(path, {
                        fill: slot.status ? '#7bf1a8' : '#ffa2a2',
                        duration: 1
                    });
                }
            });
        }
    }, [slots, svgLoaded]);

    return <div className='w-full max-w-[600px]' ref={containerRef} />;
};

export default PrintLayout;