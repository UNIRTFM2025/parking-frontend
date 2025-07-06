export default function LoaderDetails() {

    return (
        <div className="flex flex-col items-center justify-center bg-white shadow rounded-2xl p-6 min-h-[500px]">
            <img
                src="/logos/icon-parking.svg"
                alt="Cargando..."
                className="w-24 h-24 animate-bounce"
            />
            <span className="mt-6 text-lg font-semibold text-gray-700 animate-pulse">
                Consultando informacion...
            </span>
        </div>
    );
}