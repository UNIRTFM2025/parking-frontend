import { useState } from "react";
import FloorStats from "./detail/floorStats";
import HeaderDetail from "./detail/headerDetail";
import Sidebar from "./detail/sidebar";
import { site } from "./detail/siteData";

export const MarkerDetail = () => {
    const [selectedFloor, setSelectedFloor] = useState(site.paking[0].floors[0].number);

    const currentFloor = site.paking[0].floors.find(
        (floor) => floor.number === selectedFloor
    );

    return (
        <div className="flex h-screen">
            <Sidebar selectedFloor={selectedFloor} onSelectFloor={setSelectedFloor} />
            <div className="flex-1 flex flex-col">
                <HeaderDetail />
                <main className="flex-1 p-6 bg-gray-100 overflow-auto">
                    <FloorStats floor={currentFloor} />
                </main>
            </div>
        </div>
    );
}