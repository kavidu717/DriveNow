

export default function Information() {
  return (
   
    <section className="w-full min-h-screen flex flex-col-reverse lg:flex-row bg-white">
      
      {/* 🖼️ Image Area (Mobile: Bottom / Desktop: Left) */}
      <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-screen">
        <img
          src="https://res.cloudinary.com/doujmzgn3/image/upload/v1780847553/joey-banks-YApiWyp0lqo-unsplash_heewfu.jpg"
          alt="Premium Vehicle Retail"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay for a premium look */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
      </div>

      {/* 📝 Content Area (Mobile: Top / Desktop: Right) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-20 bg-gray-50">
        
        {/* Content Container */}
        <div className="max-w-2xl w-full">
          
          {/* Top small badge/text */}
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-4 block">
            About Our Service
          </span>

          {/* Title */}
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-8">
            Premium Vehicle Retail & Booking Service
          </h2>

          {/* Description Paragraph 1 */}
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Welcome to our premier vehicle booking platform. We provide a seamless, secure, and highly reliable service to meet all your transportation needs. Whether you are looking for a luxury ride for a special occasion, a robust vehicle for a long journey, or a comfortable car for your daily commute, we have a diverse fleet ready for you.
          </p>

          {/* Description Paragraph 2 */}
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Our commitment is to offer you not just a vehicle, but a premium driving experience. Every vehicle in our collection is meticulously maintained and thoroughly inspected to guarantee your safety and comfort on the road.
          </p>

          {/* Highlight Note */}
          <div className="bg-white border-l-4 border-blue-600 p-6 rounded-r-xl shadow-sm mt-8">
            <p className="text-gray-800 font-medium italic">
              "Experience the difference with our trusted retail and booking services. Your perfect drive is just a few clicks away."
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}