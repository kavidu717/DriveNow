import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 text-gray-600">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    
                    {/* Branding Section */}
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-3xl font-bold mb-4 text-[#FF8C00]">DriveNow</h2>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                            We provide a seamless and secure vehicle rental experience. 
                            Whether you need a quick city commute or a long-distance road trip, 
                            we have the perfect ride waiting for you. Excellence in motion.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-gray-900">Explore</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="hover:text-[#FF8C00] transition">Home</a></li>
                            <li><a href="/vehicle" className="hover:text-[#FF8C00] transition">Available Vehicles</a></li>
                            <li><a href="/about" className="hover:text-[#FF8C00] transition">Our Story</a></li>
                            <li><a href="/support" className="hover:text-[#FF8C00] transition">Support Center</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-gray-900">Contact Us</h3>
                        <ul className="space-y-3 text-gray-500 text-sm">
                            <li className="flex items-center gap-2"><FaMapMarkerAlt className="text-[#FF8C00]" /> 123 Drive St, Auto City</li>
                            <li className="flex items-center gap-2"><FaEnvelope className="text-[#FF8C00]" /> support@drivenow.com</li>
                            <li className="flex items-center gap-2"><FaPhone className="text-[#FF8C00]" /> +1 234 567 890</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} DriveNow. All rights reserved.</p>
                    
                    {/* Social Icons */}
                    <div className="flex gap-6 text-xl text-gray-400">
                        <a href="#" className="hover:text-[#FF8C00] transition"><FaFacebook /></a>
                        <a href="#" className="hover:text-[#FF8C00] transition"><FaInstagram /></a>
                        <a href="#" className="hover:text-[#FF8C00] transition"><FaTwitter /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}