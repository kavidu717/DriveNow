import FilterBar from "../Components/FilterBar";

export default function Vehicles() {
    return (
        <>
        <div className="flex">
            <div className="w-1/5 h-screen bg-orange-400">
            <FilterBar />
            </div>
            <div>vehicle cards</div>
        </div>
        </>
    );
}