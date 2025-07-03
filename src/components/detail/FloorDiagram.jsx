import { useMemo } from "react";

export default function FloorDiagram({ floor }) {
    const svgWidth = 800;
    const svgHeight = 600;

    console.log("FloorDiagram", floor);

    const slotSize = {
        Carro: { width: 60, height: 30 },
        Moto: { width: 40, height: 25 },
    };

    const getColor = (type, status) => {
        if (type === "Carro") return status ? "#f44336" : "#4caf50";
        if (type === "Moto") return status ? "#e57373" : "#81c784";
        return "#ccc";
    };

    const positionedSlots = useMemo(() => {
        const spacing = 10;
        const carros = floor.slots.filter((s) => s.type === "Carro");
        const motos = floor.slots.filter((s) => s.type === "Moto");
        const positioned = [];

        let i = 0;
        let x, y;

        // 1️⃣ 10 ↓ (columna izquierda)
        x = 20;
        y = 20;
        for (; i < 10 && i < carros.length; i++) {
            const { width: w, height: h } = slotSize.Carro;
            positioned.push({ ...carros[i], x, y, width: w, height: h, key: `carro-${i}` });
            y += h + spacing;
        }

        // 2️⃣ 2 → (horizontal inferior)
        x = 20 + slotSize.Carro.width + spacing;
        y -= slotSize.Carro.height + spacing;
        for (let j = 0; j < 2 && i < carros.length; j++, i++) {
            const { width: w, height: h } = slotSize.Carro;
            positioned.push({ ...carros[i], x, y, width: w, height: h, key: `carro-${i}` });
            x += w + spacing;
        }

        // Guardar esta x,y como punto de inicio para 9 ↑
        x -= slotSize.Carro.width + spacing;
        y -= slotSize.Carro.height + spacing;

        // 3️⃣ 9 ↑ (columna hacia arriba desde segundo horizontal)
        for (let j = 0; j < 8 && i < carros.length; j++, i++) {
            const { width: w, height: h } = slotSize.Carro;
            positioned.push({ ...carros[i], x, y, width: w, height: h, key: `carro-${i}` });
            y -= h + spacing;
        }

        // 4️⃣ 6 → (horizontal superior)
        x += slotSize.Carro.width + spacing;
        y += slotSize.Carro.height + spacing;
        for (let j = 0; j < 6 && i < carros.length; j++, i++) {
            const { width: w, height: h } = slotSize.Carro;
            positioned.push({ ...carros[i], x, y, width: w, height: h, key: `carro-${i}` });
            x += w + spacing;
        }

        // 5️⃣ 9 ↓ (columna derecha final)
        y += slotSize.Carro.height + spacing;
        x -= slotSize.Carro.width + spacing; // corregir x al último
        for (let j = 0; j < 8 && i < carros.length; j++, i++) {
            const { width: w, height: h } = slotSize.Carro;
            positioned.push({ ...carros[i], x, y, width: w, height: h, key: `carro-${i}` });
            y += h + spacing;
        }

        // 6️⃣ 1 → (carro final a la derecha)
        x += slotSize.Carro.width + spacing; // mover a la derecha desde el último x
        y -= slotSize.Carro.height + spacing; // mantener y donde estaba el último carro
        if (i < carros.length) {
            const { width: w, height: h } = slotSize.Carro;
            positioned.push({ ...carros[i], x, y, width: w, height: h, key: `carro-${i}` });
            i++;
        }

        // 🛵 Motos: columna derecha fija
        x = 715;
        y = 20;
        motos.forEach((slot, index) => {
            const { width: w, height: h } = slotSize.Moto;
            positioned.push({ ...slot, x, y, width: w, height: h, key: `moto-${index}` });
            y += h + spacing;
        });

        return positioned;
    }, [floor]);

    return (
        <div className="mt-6 border rounded-lg overflow-auto">
            <h3 className="font-semibold text-sm mb-2">Distribución según plano definido</h3>
            <svg width={svgWidth} height={svgHeight} className="bg-gray-100">

                <rect x="100" y="20" width="600" height="35" fill="#ddd" rx="10" />
                <rect x="330" y="10" width="60" height="12" fill="#ffeb3b" rx="4" />

                <rect x="395" y="10" width="60" height="12" fill="#f44336" rx="4" />
                <rect x="100" y="20" width="40" height="350" fill="#ddd" rx="10" />
                <rect x="660" y="20" width="40" height="350" fill="#ddd" rx="10" />



                {/* 🚗🛵 Slots */}
                {positionedSlots.map((slot) => (
                    <g key={slot.key} transform={`translate(${slot.x}, ${slot.y})`}>
                        <rect
                            width={slot.width}
                            height={slot.height}
                            rx="5"
                            ry="5"
                            fill={getColor(slot.type, slot.status)}
                            stroke="#333"
                            strokeWidth="1"
                        />
                        <text
                            x={slot.width / 2}
                            y={slot.height / 2 + 4}
                            textAnchor="middle"
                            fontSize="10"
                            fill="#fff"
                        >
                            {slot.type.charAt(0)} {slot.status ? "⛔" : "✅"}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
}
