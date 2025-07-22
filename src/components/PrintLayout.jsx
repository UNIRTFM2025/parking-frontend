import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const PrintLayout = ({ numLayout, slots }) => {
    const containerRef = useRef(null);
    const [svgLoaded, setSvgLoaded] = useState(false);
    const [svgInital, setSvgInitial] = useState();

    // Cargar el SVG solo cuando cambia numLayout
    useEffect(() => {
        const loadSVG = async () => {
            try {
                const response = await fetch(`/layout/layout${numLayout}.svg`);
                const svgText = await response.text();
                if (containerRef.current) {
                    setSvgLoaded(true);
                    setSvgInitial(svgText);
                }
            } catch (error) {
                console.error('Error cargando SVG:', error);
                setSvgLoaded(false);
            }
        };
        loadSVG();
        console.log("ya inicio el SVG");
    }, [numLayout]);

    // Animar los slots cada vez que cambian los datos de slots o el SVG se cargue
    useEffect(() => {
        if (!svgLoaded || !Array.isArray(slots)) return;
        containerRef.current.innerHTML = svgInital;
        const svgElement = containerRef.current?.querySelector('svg');
        if (svgElement) {
            slots.forEach(slot => {
                const selectedFloor = slot.type === 'Carro' ? 'pid' : 'mid';
                const id = `${selectedFloor}-${slot.idSlot}`;
                const path = svgElement.querySelector(`#${id}`);
                if (path) {
                    gsap.to(path, {
                        fill: slot.status ? '#ff6467' : '#05df72'
                    });
                }
            });
        }
    }, [slots, svgLoaded]);

    return <div className='w-full max-w-[600px]' ref={containerRef} />;
};

export default PrintLayout;