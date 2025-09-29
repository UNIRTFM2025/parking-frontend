import { useEffect, useState } from "react";
import PrintLayout from "../PrintLayout.jsx";
import { FaCarRear , FaMotorcycle } from "react-icons/fa6";
import axios from "axios";
import LoaderDetails from "./LoaderDetails.jsx";

export default function FloorDetail({ nameParking, parkingLayout, floor, space}) {
    const [floorsData, setFloorsData] = useState(null);

    useEffect(() => {
        setFloorsData(null);
    }, [floor]);

    useEffect(() => {
        let intervalId;
        let cancelled = false;
        const fetchFloors = async () => {
            console.log('parking: ',floor[0],"  floor: ",floor[1]);
            try {
                const response = await axios.get(`https://parking-backend-dr53.onrender.com/spaces/${space}/parkings/${floor[0]}/floors/${floor[1]}`);
                if (!cancelled) {
                    console.log("Floors data fetched:", response.data);
                    setFloorsData(response.data);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error('Error fetching space:', error);
                }
            }
        };
        // Ejecutar inmediatamente al cambiar floor
        fetchFloors();
        // Luego cada 15 segundos
        intervalId = setInterval(fetchFloors, 5000);
        return () => {
            cancelled = true;
            clearInterval(intervalId);
        };
    }, [floor, space]);

    const getStats = (type, status) =>
        floorsData?.slots.filter((s) => s.type === type && s.status === status).length;

    const countByType = (type) => floorsData?.slots.filter((s) => s.type === type).length;

    if (!floorsData) {
        return <LoaderDetails />;
    }

    return (
        <div className="bg-white shadow rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-4">{nameParking} - Piso {floor[1]}</h2>


            <div className="flex justify-between items-start mb-6">
                <PrintLayout numLayout={parkingLayout} slots={floorsData.slots}/>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 self-center">
                    <div className="flex flex-col gap-1.5 justify-center items-center p-4 border border-gray-700 border-dashed">
                        <FaCarRear className="text-5xl mb-3 text-gray-600"/>
                        <div className="w-full text-center py-2 px-5 bg-green-400 rounded">
                            <span className="text-4xl font-bold">{getStats("Carro", false)}</span>
                            <span className="block">Libres</span>
                        </div>
                        <div className="w-full text-center py-2 px-5 bg-red-400 rounded">
                            <span className="text-4xl font-bold">{getStats("Carro", true)}</span>
                            <span className="block">Ocupados</span>
                        </div>
                        <div className="w-full text-center py-2 px-5 bg-gray-300 rounded">
                            <span className="text-4xl font-bold">{countByType("Carro")}</span>
                            <span className="block">Total</span>
                        </div>
                    </div> 
                    <div className="flex flex-col gap-1.5 justify-center items-center p-4 border border-gray-700 border-dashed">
                        <FaMotorcycle className="text-5xl mb-3 text-gray-600" />
                        <div className="w-full text-center py-2 px-5 bg-emerald-400 rounded">
                            <span className="text-4xl font-bold">{getStats("Moto", false)}</span>
                            <span className="block">Libres</span>
                        </div>
                        <div className="w-full text-center py-2 px-5 bg-rose-400 rounded">
                            <span className="text-4xl font-bold">{getStats("Moto", true)}</span>
                            <span className="block">Ocupados</span>
                        </div>
                        <div className="w-full text-center py-2 px-5 bg-gray-300 rounded">
                            <span className="text-4xl font-bold">{countByType("Moto")}</span>
                            <span className="block">Total</span>
                        </div>
                    </div> 
                </div>
            </div>
            
        </div>
    );
}
