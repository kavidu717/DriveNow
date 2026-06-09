import { useParams } from "react-router-dom";

export default function Payment() {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-bold">Payment Page</h1>
        <p className="mt-2">Booking ID:</p>
        <p className="text-orange-500 font-mono">{id}</p>
      </div>
    </div>
  );
}