import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const heroImages = [
  "https://res.cloudinary.com/doujmzgn3/image/upload/v1780847553/joey-banks-YApiWyp0lqo-unsplash_heewfu.jpg",
  "https://res.cloudinary.com/doujmzgn3/image/upload/v1780847544/tyler-clemmensen-d1Jum1vVLew-unsplash_bkqez1.jpg",
  "https://res.cloudinary.com/doujmzgn3/image/upload/v1780847532/olav-tvedt-6lSBynPRaAQ-unsplash_ajasjq.jpg",
  "https://res.cloudinary.com/doujmzgn3/image/upload/v1780847526/grahame-jenkins-p7tai9P7H-s-unsplash_vs6gsl.jpg",
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-[90vh] md:h-[80vh] overflow-hidden">
      {heroImages.map((url, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={url}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-6">
            
            {/* Reduced Headline Size */}
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
              Drive Your <span className="text-[#FF8C00]">Dreams</span>
            </h1>
            
            {/* Reduced Sub-text Size */}
            <p className="text-gray-100 text-base sm:text-lg md:text-xl max-w-2xl mb-10 font-medium leading-relaxed drop-shadow-md">
              Your journey, your rules. Rent top-tier vehicles for your next adventure 
              with <span className="font-semibold text-[#FF8C00]">unmatched comfort</span> and <span className="font-semibold text-[#FF8C00]">premium style</span>.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center px-4">
              <Link to="/vehicle" className="bg-[#FF8C00] hover:bg-[#e67e00] text-white px-8 py-3 rounded-xl font-bold text-base transition-all transform hover:scale-105 shadow-xl w-full sm:w-auto">
                View All Vehicles
              </Link>
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}