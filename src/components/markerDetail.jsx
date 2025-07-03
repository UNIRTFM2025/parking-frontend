import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FloorStats from "./detail/floorStats";
import HeaderDetail from "./detail/headerDetail";
import Sidebar from "./detail/sidebar";
import { site } from "./detail/siteData";
import FullScreenLoader from "./FullScreenLoader";

export const MarkerDetail = () => {
    const { spaceId } = useParams();
    const [spaceData, setSpaceData] = useState(null);
    const [selectedFloor, setSelectedFloor] = useState(site.paking[0].floors[0].number);

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
            timeoutId = setTimeout(fetchSpace, 1000);
        }
        return () => clearTimeout(timeoutId);
    }, [spaceId]);

    const currentFloor = site.paking[0].floors.find(
        (floor) => floor.number === selectedFloor
    );

    if (!spaceData) {
        return <FullScreenLoader />;
    }

    return (
        <div className="flex h-screen">
            <Sidebar ListParking={spaceData.site.paking}  selectedFloor={selectedFloor} onSelectFloor={setSelectedFloor} />
            <div className="flex-1 flex flex-col">
                <HeaderDetail space={spaceData.site} />
                <main className="flex-1 p-6 bg-gray-100 overflow-auto">
                    <FloorStats floor={currentFloor} space = {spaceId} />
                </main>
            </div>
        </div>
    );
}