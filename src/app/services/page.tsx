import React from "react";

export default function ServicesPage() {
  const services = [
    { title: "Haircut", desc: "Modern styles for all hair types.", price: "150 MAD", image: "/services/haircut.jpg" },
    { title: "Hair Coloring", desc: "Express your personality with vibrant colors.", price: "300 MAD", image: "/services/hair-coloring.jpg" },
    { title: "Facial Treatment", desc: "Deep cleansing for glowing skin.", price: "200 MAD", image: "/services/facial-treatment.jpg" },
    { title: "Manicure", desc: "Perfect nails with elegant finish.", price: "120 MAD", image: "/services/manicure.jpg" },
    { title: "Bridal Makeup", desc: "Look stunning on your big day.", price: "600 MAD", image: "/services/bridal-makeup.jpg" },
    { title: "Hair Styling", desc: "Elegant or bold styles for any occasion.", price: "180 MAD", image: "/services/hair-styling.jpg" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 py-20 px-6">
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our range of luxurious services tailored to enhance your natural beauty
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ title, desc, price, image }, i) => (
            <div
              key={i}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400 opacity-0 group-hover: blur transition-opacity duration-500 -z-10"></div>

              <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />

              <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-rose-600 transition-colors duration-300">
                {title}
              </h3>

              <p className="mb-6 text-gray-600 leading-relaxed">{desc}</p>

              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  {price}
                </span>
              </div>

              <button className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-rose-600 hover:via-pink-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
