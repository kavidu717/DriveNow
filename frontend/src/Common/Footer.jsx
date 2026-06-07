import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-[#982598] to-[#8100D1] text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    
                    {/* Branding Section */}
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-3xl font-bold mb-4">DriveNow</h2>
                        <p className="text-gray-200 text-sm leading-relaxed max-w-sm">
                            We provide a seamless and secure vehicle rental experience. 
                            Whether you need a quick city commute or a long-distance road trip, 
                            we have the perfect ride waiting for you. Excellence in motion.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Explore</h3>
                        <ul className="space-y-2 text-gray-200">
                            <li><a href="/" className="hover:text-white transition">Home</a></li>
                            <li><a href="/vehicle" className="hover:text-white transition">Available Vehicles</a></li>
                            <li><a href="/about" className="hover:text-white transition">Our Story</a></li>
                            <li><a href="/support" className="hover:text-white transition">Support Center</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-gray-200 text-sm">
                            <li className="flex items-center gap-2"><FaMapMarkerAlt /> 123 Drive St, Auto City</li>
                            <li className="flex items-center gap-2"><FaEnvelope /> support@drivenow.com</li>
                            <li className="flex items-center gap-2"><FaPhone /> +1 234 567 890</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-200">&copy; {new Date().getFullYear()} DriveNow. All rights reserved.</p>
                    
                    {/* Social Icons */}
                    <div className="flex gap-6 text-xl">
                        <a href="#" className="hover:text-gray-300 transition"><FaFacebook /></a>
                        <a href="#" className="hover:text-gray-300 transition"><FaInstagram /></a>
                        <a href="#" className="hover:text-gray-300 transition"><FaTwitter /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}