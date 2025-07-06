import ALink from "../ALink";
export default function Sidebar({ ListParking, selectedFloor , selectedParking, onSelectFloor }) {

  return (
    <aside className="h-screen w-64 bg-blue-400 text-white">
      <div className="p-4.5 border-b">
        <ALink src='/' label='ir a home' className="flex gap-3">
            <img
                src="/logos/logo-parking.svg"
                alt="Logo de Parking"
                className="h-10 w-10"
            />
            <h1 className="text-2xl font-semibold">Parking</h1>
        </ALink>
      </div>

      {ListParking.map((parking) => (
        <div key={parking.id} className="my-4 pl-4">
          <h2 className="text-lg font-semibold mt-4">{parking.zone}</h2>
          <ul className="mt-4 pl-4 space-y-1">
            {parking.floors.map((floor) => (
              <li key={floor.number}>
                <button
                  onClick={() => onSelectFloor(parking.id, floor.number)}
                  className={`cursor-pointer w-full text-left px-4 py-2 rounded-s-full hover:bg-gray-100/60 hover:text-gray-600 ${
                    selectedFloor === floor.number && selectedParking === parking.id  ? "bg-gray-100 text-gray-600 font-bold" : ""
                  }`}
                >
                  Piso {floor.number}
                  
                  {parking.available > 0 ? 
                    <span className=" text-blue-400 bg-white px-3 py-1 border-1 border-blue-400 animate-pulse rounded-xl float-end font-normal text-xs">disponible</span> :
                    <span className="text-black bg-red-400 px-3 py-1 rounded-xl float-end font-normal text-xs">ocupado</span>
                  }
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

    </aside>
  );
}