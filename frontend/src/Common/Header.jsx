import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-gray-700">
                
                {/* Logo */}
                <div className="text-2xl font-bold tracking-tight text-[#FF8C00]">
                    DriveNow
                </div>

                {/* Navigation Links */}
                <div className="flex gap-8 items-center font-medium">
                    <Link to="/" className="hover:text-[#FF8C00] transition-colors duration-300">Home</Link>
                    <Link to="/vehicle" className="hover:text-[#FF8C00] transition-colors duration-300">Vehicle</Link>
                    <Link to="/about" className="hover:text-[#FF8C00] transition-colors duration-300">About Us</Link>
                </div>

                {/* Auth Links */}
                <div className="flex gap-4 items-center">
                    <Link to="/login" className="hover:text-[#FF8C00] transition-colors duration-300 font-medium">
                        Login
                    </Link>
                    <Link 
                        to="/register" 
                        className="bg-[#FF8C00] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#e67e00] transition-all shadow-md hover:shadow-lg"
                    >
                        Register
                    </Link>
                </div>
            </nav>
        </header>
    );
}