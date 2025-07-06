import { FaSquareParking , FaWind} from "react-icons/fa6";
import { PiSolarRoofBold } from "react-icons/pi";
import StartRating from "../StarRating";

export default function HeaderDetail({space}) {
    // Sumar la capacidad total de todos los parkings
    const totalCapacity = Array.isArray(space.paking)
        ? space.paking.reduce((acc, p) => acc + ((p.capacity) || 0), 0)
        : 0;

    return (
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <div>
                <h1 className="text-xl font-bold text-gray-800">{space.name} <StartRating rating={space.rating} /></h1>
                <p className="text-sm text-gray-600">
                    {space.address.street} #{space.address.number}, {space.address.city}, {space.address.state}
                </p>
            </div>
            <div className="flex gap-2 space-x-4 text-sm text-gray-700">
                <span className="flex items-center justify-center gap-2">
                    {space.covered ? 
                        <><PiSolarRoofBold className="text-[17px]" /> Cubierto</> :
                        <><FaWind /> No cubierto</>
                    }
                </span>
                <span className="flex items-center justify-center gap-2"><FaSquareParking /> {totalCapacity} Parqueaderos</span>
            </div>
        </header>
    );
}