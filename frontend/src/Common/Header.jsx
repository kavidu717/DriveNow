import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-gradient-to-r from-[#982598] to-[#8100D1] shadow-lg sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
                
                {/* Logo */}
                <div className="text-2xl font-bold tracking-tight">
                    DriveNow
                </div>

                {/* Navigation Links */}
                <div className="flex gap-8 items-center font-medium">
                    <Link to="/" className="hover:text-gray-200 transition-colors">Home</Link>
                    <Link to="/vehicle" className="hover:text-gray-200 transition-colors">Vehicle</Link>
                    <Link to="/about" className="hover:text-gray-200 transition-colors">About Us</Link>
                </div>

                {/* Auth Links */}
                <div className="flex gap-4 items-center">
                    <Link to="/login" className="hover:underline underline-offset-4">
                        Login
                    </Link>
                    <Link 
                        to="/register" 
                        className="bg-white text-[#8100D1] px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-md"
                    >
                        Register
                    </Link>
                </div>
            </nav>
        </header>
    );
}