import { useState, useEffect } from "react";

const messages = [
  "Consultando informacion...",
  "Un momento...",
  "Ya casi la  tenemos...",
  "Agrupando informacion....",
];

const FullScreenLoader = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-99999 flex flex-col items-center justify-center bg-white bg-opacity-80">
      <img
        src="/logos/icon-parking.svg"
        alt="Cargando..."
        className="w-24 h-24 animate-bounce"
      />
      <span className="mt-6 text-lg font-semibold text-gray-700 animate-pulse">
        {messages[msgIndex]}
      </span>
    </div>
  );
};

export default FullScreenLoader;
