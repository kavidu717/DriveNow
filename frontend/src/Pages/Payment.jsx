import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import toast from "react-hot-toast";

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 px-4 flex items-center justify-center font-sans">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
        
        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Secure Checkout</h2>
          <p className="text-sm text-gray-500 mt-2">
            Select PayPal or Debit/Credit Card to complete payment. <br />
            <span className="text-xs text-gray-400 font-mono">Ref ID: {id}</span>
          </p>
        </div>

        {/* Security Badge */}
        <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 mb-6 flex items-start gap-2.5">
          <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
          <p className="text-xs text-blue-800 leading-relaxed font-medium">
            Guaranteed safe checkout. All transactions are fully encrypted and protected under PayPal safety protocols.
          </p>
        </div>

        {/* PayPal SDK Wrapper */}
        <div className="relative z-10">
          <PayPalScriptProvider
            options={{
              "client-id": "AZkRdYNCgw1OBWpl8UHb_ylmMHKpwAR4Ve1UnwireznTY_QZUW_93Y-_byVCcNvFRjHAsTlGHxeA_7pQ",
              currency: "USD"
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical", shape: "rect", color: "gold" }}
              
              createOrder={async () => {
                try {
                  const { data } = await API.post("/payment/create-order", {
                    bookingId: id,
                  });

                  if (!data || !data.id) {
                    throw new Error("Backend did not return a valid PayPal Order ID!");
                  }

                  return data.id; 
                } catch (err) {
                  console.error("❌ createOrder Failed:", err);
                  toast.error("Order Creation Failed. Please try again.");
                }
              }}
              
              onApprove={async (data) => {
                try {
                 
                  await API.post("/payment/capture-order", {
                    orderId: data.orderID,
                    bookingId: id,
                  });
                  
                  toast.success("Payment is successful!");
                  navigate("/"); 
                } catch (err) {
                  console.error("❌ captureOrder Failed:", err);
                  
                  
                  const errorMessage = err.response?.data?.message || "Payment failed. Please try again.";
                  toast.error(errorMessage, { duration: 5000 });
                }
              }}

              onError={(err) => {
                console.error("❌ PayPal Global Error:", err);
                toast.error("Something went wrong with PayPal.");
              }}
            />
          </PayPalScriptProvider>
        </div>

      </div>
    </div>
  );
}