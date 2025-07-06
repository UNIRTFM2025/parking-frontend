import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FullScreenLoader from "../components/FullScreenLoader";
import HeaderDetail from "../components/parkingsDetails/HeaderDetail";
import FloorDetail from "../components/parkingsDetails/FloorDetail";
import Sidebar from "../components/parkingsDetails/Sidebar";

export const ParkingsDetails = () => {
    const { spaceId } = useParams();
    const [spaceData, setSpaceData] = useState(null);
    const [selectedFloor, setSelectedFloor] = useState([0,1]);

    useEffect(() => {
        console.log('Fetching space data for ID:', spaceId);
        let timeoutId;
        const fetchSpace = async () => {
            try {
                const response = await axios.get(`https://parking-backend-dr53.onrender.com/spaces/${spaceId}`);
                console.log('Initial space data for ID:', response.data);
                setSpaceData(response.data);
            } catch (error) {
                console.error('Error fetching space:', error);
            }
        };
        if (spaceId) {
            timeoutId = setTimeout(fetchSpace, 400);
        }
        return () => clearTimeout(timeoutId);
    }, [spaceId]);

    const handleClickfloors = (parking, floor) => {  
        setSelectedFloor([parking, floor]);
    }

    if (!spaceData) {
        return <FullScreenLoader />;
    }

    return (
        <div className="flex h-screen">
            <Sidebar 
                ListParking={spaceData.site.paking}
                selectedParking={selectedFloor[0]} 
                selectedFloor={selectedFloor[1]} 
                onSelectFloor={handleClickfloors} 
            />
            <div className="flex-1 flex flex-col">
                <HeaderDetail space={spaceData.site} />
                <main className="flex-1 p-6 bg-gray-100 overflow-auto">
                    <FloorDetail 
                        nameParking={spaceData.site.paking.find(p => p.id === selectedFloor[0])?.zone || 'Zona Desconocida'}
                        parkingLayout={spaceData.site.paking[selectedFloor[0]].layout}
                        floor={selectedFloor} 
                        space={spaceId} 
                    />
                </main>
            </div>
        </div>
    );
}