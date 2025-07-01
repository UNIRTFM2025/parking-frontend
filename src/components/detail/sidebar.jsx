import { site } from "./siteData";

export default function Sidebar({ selectedFloor, onSelectFloor }) {
  const floors = site.paking[0].floors;

  return (
    <aside className="h-screen w-64 bg-blue-400 text-white">
      <div className="p-4 text-xl font-bold border-b bg-blue-400">
        Pisos
      </div>
      <ul className="mt-4 space-y-1">
        {floors.map((floor) => (
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
    </aside>
  );
}