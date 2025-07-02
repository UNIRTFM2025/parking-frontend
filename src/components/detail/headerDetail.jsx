export default function HeaderDetail({space}) {
    // Sumar la capacidad total de todos los parkings
    const totalCapacity = Array.isArray(space.paking)
        ? space.paking.reduce((acc, p) => acc + (p.capacity || 0), 0)
        : 0;

    return (
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <div>
                <h1 className="text-xl font-bold text-gray-800">{space.name}</h1>
                <p className="text-sm text-gray-600">
                    {space.address.street} #{space.address.number}, {space.address.city}, {space.address.state}
                </p>
            </div>
            <div className="flex space-x-4 text-sm text-gray-700">
                <span>⭐ {space.rating}</span>
                <span>{space.covered ? "✅ Cubierto" : "❌ No cubierto"}</span>
                <span>🚘 Total Slots: {totalCapacity}</span>
            </div>
        </header>
    );
}