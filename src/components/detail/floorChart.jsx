// src/components/FloorChart.jsx

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = {
  free: "#4ade80",   // verde
  occupied: "#f87171" // rojo
};

export default function FloorChart({ floor }) {
  const slots = floor.slots;

  const getStats = (type) => {
    const free = slots.filter(s => s.type === type && s.status === false).length;
    const occupied = slots.filter(s => s.type === type && s.status === true).length;
    return [
      { name: "Libres", value: free },
      { name: "Ocupados", value: occupied }
    ];
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
      {["Carro", "Moto"].map((type) => (
        <div key={type} className="bg-white shadow-md p-4 rounded-xl">
          <h3 className="text-lg font-semibold text-center mb-2">{type}s</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={getStats(type)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                <Cell key="libre" fill={COLORS.free} />
                <Cell key="ocupado" fill={COLORS.occupied} />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
}
