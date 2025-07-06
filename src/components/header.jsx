import { GoSearch } from "react-icons/go";
import { useContext, useState } from "react";
import { MarkersContext } from "../contexts/MarkersContext";

const HeaderComponent = () => {
    const { markers } = useContext(MarkersContext);
    const [search, setSearch] = useState("");
    const [showResults, setShowResults] = useState(false);

    const filteredMarkers = search.trim().length > 0
        ? markers.filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
        : [];

    return (
        <header className="fixed top-0 z-9999 w-full bg-blue-400 p-4 shadow-md">
            <div className="flex flex-col items-center space-y-2 md:flex-row md:justify-between md:space-y-0 md:space-x-6">
                <div className="flex items-center space-x-3">
                    <img
                        src="/logos/logo-parking.svg"
                        alt="Logo de Parking"
                        className="h-10 w-10"
                    />
                    <h1 className="text-2xl text-white font-semibold">Parking</h1>
                </div>
                <div className="relative w-full max-w-md min-w-[350px]">
                    <div className={`flex items-center bg-white p-2 shadow-md w-full` + (showResults && search.trim().length > 0 ? " rounded-t-2xl" : " rounded-full")}>
                        <GoSearch className="text-gray-500 w-5 h-5 mr-3" />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="flex-1 border-none focus:outline-none text-gray-700 placeholder-gray-400"
                            value={search}
                            onChange={e => {
                                setSearch(e.target.value);
                                setShowResults(true);
                            }}
                            onBlur={() => setTimeout(() => setShowResults(false), 200)}
                            onFocus={() => setShowResults(true)}
                        />
                    </div>
                    {showResults && (
                        <ul className="absolute left-0 right-0 bg-white shadow-lg rounded-b-lg z-50 max-h-60 overflow-auto">
                            {filteredMarkers.length > 0 ? (
                                filteredMarkers.map(marker => (
                                    <li key={marker.id} className="relative min-h-10 hover:bg-blue-100 cursor-pointer">
                                        <a className="absolute inset-0 px-4 py-2" href={`/detail/${marker.id}`}>
                                            {marker.title}
                                            {marker.available > 0 ? 
                                                <span className="bg-green-500 text-white float-end text-xs font-bold py-1 px-3 rounded-full">disponible</span> :
                                                <span className="bg-red-400 text-white float-end text-xs font-bold py-1 px-3 rounded-full">ocupado</span>
                                            }
                                        </a>
                                    </li>
                                ))
                            ) : (
                                search.trim().length > 0 && (
                                    <li className="px-4 py-2 text-gray-500 select-none">No he encontrado lo que buscaba</li>
                                )
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
};

export default HeaderComponent;
