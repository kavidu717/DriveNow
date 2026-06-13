
import { FiShield, FiStar, FiClock, FiAward } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 font-sans">
      
     
      <div className="w-full mb-16">
      
        <div className="relative w-full h-[75vh] overflow-hidden shadow-lg">
          {/* Background Image */}
          <img
            src="https://res.cloudinary.com/doujmzgn3/image/upload/v1781363046/dennis-cortes-KLF7L_lhcf0-unsplash_fobokj.jpg"
            alt="About DriveNow"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"></div>
          
        
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-7xl mx-auto w-full px-6 md:px-8 pb-12 md:pb-20">
              <span className="text-[#FF8C00] font-bold tracking-widest uppercase text-sm mb-2 md:mb-4 block">
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight max-w-4xl">
                Redefining the Premium <br className="hidden sm:block" /> Vehicle Experience.
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-20">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
        
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-black text-gray-900 mb-6">
              More than just a rental service. We deliver excellence on wheels.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              Welcome to <strong>DriveNow</strong>. Founded with a passion for exceptional automobiles and unmatched customer service, we have grown to become the premier choice for luxury and reliable vehicle rentals. 
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Whether you need a sophisticated ride for a corporate event, a rugged SUV for an adventurous weekend, or a comfortable car for your daily needs, our meticulously maintained fleet is ready to exceed your expectations. We believe that the journey is just as important as the destination.
            </p>
          </div>

         
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
              <span className="text-4xl font-black text-[#FF8C00] mb-2">5+</span>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Years of Experience</span>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
              <span className="text-4xl font-black text-[#FF8C00] mb-2">50+</span>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Premium Vehicles</span>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
              <span className="text-4xl font-black text-[#FF8C00] mb-2">2k+</span>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Happy Customers</span>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
              <span className="text-4xl font-black text-[#FF8C00] mb-2">24/7</span>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Customer Support</span>
            </div>
          </div>
          
        </div>
      </div>

    
      <div className="bg-white border-y border-gray-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Why Choose DriveNow?</h2>
            <p className="text-gray-500 text-lg">We are committed to providing a seamless, secure, and highly reliable service to meet all your transportation needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
          
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-[#FF8C00] shadow-sm border border-orange-100">
                <FiShield size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fully Insured</h3>
              <p className="text-gray-500 leading-relaxed">Every vehicle in our fleet is fully insured and goes through strict safety checks before every ride.</p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm border border-blue-100">
                <FiStar size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Quality</h3>
              <p className="text-gray-500 leading-relaxed">We maintain our cars to the highest standards, ensuring a spotless, luxurious experience inside and out.</p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-[#FF8C00] shadow-sm border border-orange-100">
                <FiClock size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Assistance</h3>
              <p className="text-gray-500 leading-relaxed">Our dedicated support team is available round the clock to assist you anywhere, anytime.</p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm border border-blue-100">
                <FiAward size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Best Rates</h3>
              <p className="text-gray-500 leading-relaxed">We offer transparent, competitive pricing with no hidden fees, giving you the best value for your money.</p>
            </div>

          </div>
        </div>
      </div>

     
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 mt-20 text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-6">Ready to hit the road?</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Browse our extensive collection of premium vehicles and book your next ride in just a few clicks.
        </p>
        <Link 
          to="/vehicle" 
          className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
        >
          Explore Our Fleet
        </Link>
      </div>

    </div>
  );
}