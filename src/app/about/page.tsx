import Image from "next/image";
import Faq from "@/components/FAQ"; // This should be a Client Component

export default function AboutPage() {
  return (
    <div className="px-6 py-16 max-w-6xl mx-auto space-y-24 text-gray-800">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-rose-500">About Glamour Salon</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          At Glamour Salon, we believe beauty is more than skin deep. It's a celebration of individuality, confidence, and self-care.
        </p>
      </section>

      {/* Who We Are */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-rose-400">Who We Are</h2>
          <p>
            Founded with a vision to redefine beauty, Glamour Salon is a premier destination for personalized beauty services. 
            Our dedicated team of professionals brings expertise, artistry, and compassion to every client interaction.
          </p>
          <p>
            Whether you're here for a transformation or a moment of relaxation, we offer an elevated experience tailored just for you.
          </p>
        </div>
        <Image
          src="/images/team.jpg"
          alt="Glamour Salon Team"
          width={600}
          height={400}
          className="rounded-xl shadow-lg object-cover"
        />
      </section>

      {/* Our Mission */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-pink-500">Our Mission</h2>
        <p>
          To empower individuals to express their inner and outer beauty with confidence. 
          We are committed to delivering exceptional beauty services in a welcoming, inclusive, and inspiring environment.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-rose-500">Frequently Asked Questions</h2>
        <p className="text-gray-600">
          Have questions about our services, policies, or what to expect? We’ve got answers.
        </p>
        <Faq />
      </section>
    </div>
  );
}
