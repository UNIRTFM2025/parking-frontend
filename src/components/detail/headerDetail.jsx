import { site } from "./siteData";

export default function HeaderDetail() {
    const address = site.address;
    const totalFloors = site.paking[0].floors.length;

    return (
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <div>
                <h1 className="text-xl font-bold text-gray-800">{site.name}</h1>
                <p className="text-sm text-gray-600">
                    Dirección: {address.street} #{address.number}, {address.city}, {address.state}
                </p>
            </div>
            <div className="flex space-x-4 text-sm text-gray-700">
                <span>⭐ {site.rating}</span>
                <span>{site.covered ? "✅ Cubierto" : "❌ No cubierto"}</span>
                <span>🏢 Pisos: {totalFloors}</span>
            </div>
        </header>
    );
}