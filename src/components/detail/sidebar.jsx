import ALink from "../ALink";
import { site } from "./siteData";

export default function Sidebar({ ListParking, selectedFloor, onSelectFloor }) {
  const floors = site.paking[0].floors;



  console.log("listParking", ListParking);

  return (
    <aside className="h-screen w-64 bg-blue-400 text-white">
      <div className="p-4 border-b">
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
                  onClick={() => onSelectFloor(floor.number)}
                  className={`w-full text-left px-4 py-2 hover:bg-blue-700 ${
                    selectedFloor === floor.number ? "bg-blue-700 font-bold" : ""
                  }`}
                >
                  Piso {floor.number}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

    </aside>
  );
}