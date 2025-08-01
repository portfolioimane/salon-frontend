import Image from "next/image";
import Faq from "@/components/FAQ"; // This should be a Client Component
import Gallery from "@/components/frontend/gallery";

export default function AboutPage() {
  return (
    <div className="px-6 py-16 max-w-7xl mx-auto space-y-20 text-gray-800">
      {/* 🌟 Hero Section */}
     {/* About Section */}
<section id="about" className="py-10 px-6 max-w-4xl mx-auto text-center">
       <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent py-5 px-6 max-w-4xl mx-auto text-center">
Glamour Salon
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


      {/* 🧭 Mission & Values Section */}
      <section className="bg-pink-50 rounded-3xl p-10 shadow-md">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Mission */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-pink-500">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To empower individuals to express their inner and outer beauty with confidence. 
              We are committed to delivering exceptional beauty services in a welcoming, inclusive, and inspiring environment.
            </p>
          </div>

          {/* Values */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-pink-500">Our Values</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe in authenticity, excellence, and self-love. 
              Every client deserves personalized care, ethical service, and the uplifting experience of feeling beautiful inside and out.
            </p>
          </div>
        </div>
      </section>

  

      {/* ❓ FAQ */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-rose-500 text-center">Frequently Asked Questions</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          Have questions about our services, policies, or what to expect? We’ve got answers.
        </p>
        <Faq />
      </section>
    </div>
  );
}
