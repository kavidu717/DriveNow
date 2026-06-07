export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-[#982598] to-[#8100D1] text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Branding Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">DriveNow</h2>
                        <p className="text-gray-200 text-sm">
                            Your trusted platform for seamless vehicle rentals. 
                            Experience the best ride of your life with us.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-200">
                            <li><a href="/" className="hover:text-white transition">Home</a></li>
                            <li><a href="/vehicle" className="hover:text-white transition">Vehicle Inventory</a></li>
                            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                        <p className="text-gray-200 text-sm">Email: support@drivenow.com</p>
                        <p className="text-gray-200 text-sm">Phone: +1 234 567 890</p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm text-gray-200">
                    <p>&copy; {new Date().getFullYear()} DriveNow. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}