import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBookingStore from "../Store/bookingStore.js";
import toast, { Toaster } from "react-hot-toast";

export default function Checkout() {
  const navigate = useNavigate();

  const createBooking = useBookingStore((state) => state.createBooking);

  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("pendingBooking");

    if (!data) {
      navigate("/vehicle");
      return;
    }

    setTimeout(() => {
      setBooking(JSON.parse(data));
      setIsLoading(false);
    }, 400);
  }, [navigate]);

 const handleProceedToPayment = async () => {
  try {
    setIsProcessing(true);

    if (!booking) return;

    const createdBooking = await createBooking({
      vehicle: booking.vehicleId,
      startDate: booking.startDate,
      estimatedKm: 50,
    });

    toast.success("Booking created!");

    navigate(`/payment/${createdBooking.booking._id}`);
  } catch (err) {
    toast.error(err.message);
  } finally {
    setIsProcessing(false);
  }
};

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-500 font-medium">
          Preparing your secure checkout...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-6xl mx-auto">
        {/* Top Navigation & Stepper */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium w-fit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Vehicle
          </button>

          {/* Progress Stepper */}
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-green-500 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              Selection
            </span>
            <span className="text-gray-300">————</span>
            <span className="text-orange-600 font-bold">Checkout</span>
            <span className="text-gray-300">————</span>
            <span className="text-gray-400">Payment</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Booking Details & Image */}
          <div className="w-full lg:w-2/3 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">Review your booking</h2>
                <p className="text-gray-500 mt-1">Please confirm the details of your reservation before finalizing.</p>
              </div>

              <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
                {/* Vehicle Image */}
                <div className="w-full sm:w-1/3 h-48 bg-gray-100 rounded-xl overflow-hidden relative shadow-inner">
                  <img
                    src={booking.vehicleImage || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600"}
                    alt={booking.vehicleName || "Vehicle"}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                
                {/* Vehicle Specs */}
                <div className="w-full sm:w-2/3 flex flex-col justify-center">
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-4">{booking.vehicleName}</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Pick-up Date</p>
                      <p className="text-gray-900 font-medium flex items-center gap-2">
                        <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        {booking.startDate}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Est. Distance</p>
                      <p className="text-gray-900 font-medium flex items-center gap-2">
                        <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        {booking.estimatedKm} km
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary (Sticky) */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-8">
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 text-gray-600 border-b border-gray-100 pb-6">
                <div className="flex justify-between items-center">
                  <span>Base Rate</span>
                  <span className="font-medium text-gray-900">Rs {booking.totalAmount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Taxes & Fees</span>
                  <span className="font-medium text-green-600">Included</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Amount</p>
                  <p className="text-xs text-gray-400 mt-1">Including all taxes</p>
                </div>
                <p className="text-3xl font-extrabold text-gray-900">
                  Rs {booking.totalAmount?.toLocaleString()}
                </p>
              </div>

              <button
                onClick={handleProceedToPayment}
                disabled={isProcessing}
                className={`w-full flex justify-center items-center gap-2 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-md ${
                  isProcessing 
                    ? "bg-orange-400 cursor-not-allowed" 
                    : "bg-orange-500 hover:bg-orange-600 hover:shadow-orange-500/25 active:scale-[0.98]"
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    Confirm & Proceed
                  </>
                )}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                Secure Payment
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}