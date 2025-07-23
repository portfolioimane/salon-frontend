export default function HomePage() {
  const services = [
    { title: "Haircut", desc: "Modern styles for all hair types.", price: "150 MAD", image: "/services/haircut.jpg" },
    { title: "Hair Coloring", desc: "Express your personality with vibrant colors.", price: "300 MAD", image: "/services/hair-coloring.jpg" },
    { title: "Facial Treatment", desc: "Deep cleansing for glowing skin.", price: "200 MAD", image: "/services/facial-treatment.jpg" },
    { title: "Manicure", desc: "Perfect nails with elegant finish.", price: "120 MAD", image: "/services/manicure.jpg" },
    { title: "Bridal Makeup", desc: "Look stunning on your big day.", price: "600 MAD", image: "/services/bridal-makeup.jpg" },
    { title: "Hair Styling", desc: "Elegant or bold styles for any occasion.", price: "180 MAD", image: "/services/hair-styling.jpg" },
  ];

  const galleryImages = [
    "/gallery1.jpg", "/gallery2.jpg", "/gallery3.jpg",
    "/gallery4.jpg", "/gallery5.jpg", "/gallery6.jpg"
  ];

  const testimonials = [
    { name: "Sarah", text: "Best salon experience! Professional & kind staff.", rating: 5 },
    { name: "Imane", text: "Beautiful results & relaxing atmosphere. Highly recommend!", rating: 5 },
    { name: "Leila", text: "Loved the makeup & hair styling. Will come again!", rating: 5 },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rose-400/80 via-pink-400/70 to-orange-400/80"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        ></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm animate-bounce delay-100"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm animate-bounce delay-300"></div>
        <div className="absolute top-1/3 right-10 w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm animate-bounce delay-700"></div>

        <div className="relative max-w-4xl z-10">
          <div className="animate-fade-in-up">
            <h2 className="text-6xl md:text-7xl font-bold mb-8 text-white drop-shadow-2xl leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                Beauty
              </span>
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto text-white/95 mb-10 drop-shadow-lg">
              Discover your inner radiance with our expert team. Hair, skin, and style – crafted with passion and precision.
            </p>
            <button className="group relative px-8 py-4 bg-white text-gray-800 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300">
              <span className="relative z-10">Book Your Transformation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 opacity-0 group-hover:opacity-20 animate-pulse"></span>
            </button>
          </div>
        </div>
      </section>

  

      {/* Our Services */}
      <section id="services" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Indulge in our carefully curated services designed to enhance your natural beauty
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ title, desc, price, image }, i) => (
            <div
              key={i}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50"
            >
              {/* Gradient border effect */}
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

              <p className="mb-6 text-gray-600 leading-relaxed">
                {desc}
              </p>

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

          {/* About Section */}
<section id="about" className="py-20 px-6 max-w-7xl mx-auto">
  <div className="grid md:grid-cols-2 gap-12 items-center">
    {/* Image Column */}
    <div className="overflow-hidden rounded-3xl shadow-xl">
      <img
        src="/about.jpg"
        alt="About Our Salon"
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        loading="lazy"
      />
    </div>

    {/* Text Column */}
    <div>
      <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
        About Us
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        At our salon, we believe in bringing out the best version of you. With years of experience and a passion for beauty, our expert team offers personalized care tailored to your unique style and needs.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed">
        Whether you're preparing for a special occasion or simply want to treat yourself, we're here to make every visit unforgettable with premium services and warm, professional care.
      </p>
    </div>
  </div>
</section>



      {/* Our Work Gallery */}
      <section id="work" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Our Work
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Witness the artistry and transformation through our featured work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((src, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 aspect-square"
            >
              <img
                src={src}
                alt={`Gallery image ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Hover content */}
              <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="text-xl font-semibold mb-2">Beautiful Transformation</h3>
                <p className="text-sm opacity-90">Professional styling & care</p>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-br from-rose-500 via-pink-500 to-orange-500 rounded-3xl shadow-2xl overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
          </div>

          <div className="relative p-12 md:p-16">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Client Love Stories
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Hear what our beautiful clients have to say about their experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map(({ name, text, rating }, i) => (
                <div
                  key={i}
                  className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 hover:bg-white/30 transition-all duration-300"
                >
                  {/* Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(rating)].map((_, starIndex) => (
                      <span key={starIndex} className="text-yellow-300 text-xl">⭐</span>
                    ))}
                  </div>

                  <p className="text-white/95 text-lg italic text-center mb-6 leading-relaxed">
                    "{text}"
                  </p>

                  <div className="text-center">
                    <h4 className="font-bold text-white text-xl">{name}</h4>
                    <p className="text-white/80 text-sm">Valued Client</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group">
          <span className="text-white text-2xl">💬</span>
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Chat with us!
          </div>
        </button>
      </div>

    </main>
  );
}
