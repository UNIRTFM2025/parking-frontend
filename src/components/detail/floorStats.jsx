import FloorChart from "./floorChart.jsx";

export default function FloorStats({ floor }) {
    const slots = floor.slots;

    const getStats = (type, status) =>
        slots.filter((s) => s.type === type && s.status === status).length;

    const countByType = (type) => slots.filter((s) => s.type === type).length;

    return (
        <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Piso {floor.number}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-100 p-4 rounded">
                    <h3 className="font-semibold mb-1">🚗 Carros</h3>
                    <p>Total: {countByType("Carro")}</p>
                    <p>✅ Libres: {getStats("Carro", false)}</p>
                    <p>⛔ Ocupados: {getStats("Carro", true)}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded">
                    <h3 className="font-semibold mb-1">🏍️ Motos</h3>
                    <p>Total: {countByType("Moto")}</p>
                    <p>✅ Libres: {getStats("Moto", false)}</p>
                    <p>⛔ Ocupados: {getStats("Moto", true)}</p>
                </div>
            </div>

            <FloorChart floor={floor} />

        </div>
    );
}
