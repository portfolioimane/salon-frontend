import PopularServiceWrapper from '@/components/frontend/services/popularservices/PopularServiceWrapper';
import api from '@/utils/axios';
import Gallery from "@/components/frontend/gallery";


export default async function HomePage() {


   const res = await api.get('/popular-services');
  const popularservices = res.data;
  console.log('popularproperties', popularservices);


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
          className="absolute inset-0 bg-cover bg-center opacity-10"
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

<a
  href="/services"
  className="group relative px-8 py-4 bg-white text-gray-800 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 inline-block"
>
  <span className="relative z-10">Book Your Transformation</span>
  <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 opacity-0 group-hover:opacity-20 animate-pulse"></span>
</a>

          </div>
        </div>
      </section>

  

      {/* Our Services */}

      {/* Property List */}
      <section id="services">
         <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent py-5 px-6 max-w-4xl mx-auto text-center">
     Our Services
  </h2>
        <PopularServiceWrapper services={popularservices} />
      </section>

          {/* About Section */}
<section id="about" className="py-20 px-6 max-w-4xl mx-auto text-center">
  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent py-5">
    About Us
  </h2>
  <p className="text-lg text-gray-700 leading-relaxed mb-6">
    At our salon, we believe in bringing out the best version of you. With years of experience and a passion for beauty, our expert team offers personalized care tailored to your unique style and needs.
  </p>
  <p className="text-lg text-gray-700 leading-relaxed">
    Whether you're preparing for a special occasion or simply want to treat yourself, we're here to make every visit unforgettable with premium services and warm, professional care.
  </p>
</section>




      {/* ✅ Gallery Component */}
      <Gallery />

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
