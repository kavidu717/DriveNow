import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBookingStore from "../Store/bookingStore";
import {
  FiCalendar,
  FiMapPin,
  FiArrowLeft,
} from "react-icons/fi";

export default function Checkout() {
  const navigate = useNavigate();

  const booking = useBookingStore((state) => state.booking);
  const createBooking = useBookingStore((state) => state.createBooking);
  const loading = useBookingStore((state) => state.loading);

  // ✅ FIXED REDIRECT (NO navigate in render)
  useEffect(() => {
    if (!booking) {
      navigate("/vehicle");
    }
  }, [booking, navigate]);

  // prevent crash before redirect
  if (!booking) return null;

  // =========================
  // CONFIRM BOOKING
  // =========================
  const handleConfirm = async () => {
    const result = await createBooking();

    if (result) {
      navigate(`/payment/${result._id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <FiArrowLeft /> Back
          </button>

          <div className="text-sm font-bold flex gap-2">
            <span className="text-green-600">Details</span>
            <span>→</span>
            <span className="text-orange-600">Checkout</span>
            <span>→</span>
            <span className="text-gray-400">Payment</span>
          </div>
        </div>

        {/* MAIN */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT */}
          <div className="bg-white p-6 rounded-xl shadow">
            <img
              src={booking.vehicleImage}
              className="w-full h-64 object-cover rounded-lg"
              alt="vehicle"
            />

            <h2 className="text-2xl font-bold mt-4">
              {booking.vehicleName}
            </h2>

            <p className="text-gray-500">
              Rs {booking.pricePerKm} / km
            </p>

            <div className="mt-4 text-sm space-y-2">
              <p className="flex items-center gap-2">
                <FiCalendar /> {booking.startDate}
              </p>
              <p className="flex items-center gap-2">
                <FiMapPin /> {booking.estimatedKm} km
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold mb-4">
              Summary
            </h2>

            <div className="space-y-2 text-sm">
              <p className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs {booking.totalAmount}</span>
              </p>

              <p className="flex justify-between text-green-600">
                <span>Fees</span>
                <span>Included</span>
              </p>
            </div>

            <hr className="my-4" />

            <p className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>Rs {booking.totalAmount}</span>
            </p>

            <button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full mt-6 bg-orange-500 text-white py-3 rounded-xl font-bold"
            >
              {loading ? "Creating Booking..." : "Confirm Booking"}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}