import { RiBuilding2Fill } from "react-icons/ri";
import { FaCarRear } from "react-icons/fa6";
import StartRating from "./StarRating";
export default function PopupMarker({ infoMarker }) {
    return (
        <>
            <div className="bg-(--color-darBlue) py-[18px] absolute top-0 left-0 w-full">
                <div className="absolute left-3 bottom-0 translate-y-[50%] w-10 h-10 rounded-full bg-white text-(--color-darBlue) flex items-center justify-center text-xl border-2 border-(--color-darBlue)">
                    <RiBuilding2Fill />
                </div>
            </div>
            <div>
                <h3 className="font-bold text-lg">{infoMarker.title}</h3>
                <p className="text-sm">{infoMarker.address}</p>
                <hr className="border-(--color-darBlue) block mt-4 mb-4" />
                <div className="flex items-center justify-start gap-3">
                    <FaCarRear size={26} className="text-(--color-darBlue)"/>
                    <div>
                        <div className="mb-1">
                            <StartRating rating={infoMarker.rating} />
                        </div>
                        {infoMarker.available > 0 ? 
                            <span className="bg-green-500 text-white text-sm font-bold py-1 px-3 rounded-full">disponible</span> :
                            <span className="bg-red-400 text-white text-sm font-bold py-1 px-3 rounded-full">ocupado</span>
                        }
                    </div>
                </div>

                <a href={`/detail/${infoMarker.id}`} 
                    className="block mt-4 px-3 py-2 bg-blue-400/70 text-center text-white rounded hover:bg-blue-400 focus:outline-0 transition"
                >
                    Ver detalle
                </a>
            </div>
        </>
    );
}