import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Checkout() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const pendingBooking = localStorage.getItem("pendingBooking");

    if (!pendingBooking) {
      toast.error("No booking found");
      navigate("/vehicle");
      return;
    }

    setBooking(JSON.parse(pendingBooking));
  }, [navigate]);

  if (!booking) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#FF8C00] text-white p-6">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-sm opacity-90">
            Review your booking before payment
          </p>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">

            {/* Vehicle Image */}
            <div>
              <img
                src={booking.vehicleImage}
                alt={booking.vehicleName}
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>

            {/* Booking Details */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {booking.vehicleName}
              </h2>

              <div className="border-b pb-3">
                <p className="text-gray-500 text-sm">Pick-up Date</p>
                <p className="font-semibold">
                  {booking.startDate}
                </p>
              </div>

              <div className="border-b pb-3">
                <p className="text-gray-500 text-sm">Estimated Distance</p>
                <p className="font-semibold">
                  {booking.estimatedKm} km
                </p>
              </div>

              <div className="border-b pb-3">
                <p className="text-gray-500 text-sm">Price Per Km</p>
                <p className="font-semibold">
                  Rs {booking.pricePerKm}
                </p>
              </div>

              <div className="bg-gray-100 rounded-xl p-4">
                <p className="text-gray-500 text-sm">
                  Estimated Total
                </p>
                <h3 className="text-3xl font-bold text-[#FF8C00]">
                  Rs {booking.totalAmount}
                </h3>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="mt-10 border-t pt-8">
            <h2 className="text-xl font-bold mb-4">
              Payment
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-700">
                PayPal Button will be added here.
              </p>
            </div>

            {/* Temporary Button */}
            <button
              className="mt-6 w-full bg-[#FF8C00] hover:bg-[#e67e00] text-white py-4 rounded-xl font-bold transition"
              onClick={() =>
                toast.success("PayPal integration coming next")
              }
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}