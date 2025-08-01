export default function ContactPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
       <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent py-5 px-6 max-w-4xl mx-auto text-center">
       Contact Us
  </h2>      <p className="text-gray-600 mb-10 text-center">
        We'd love to hear from you. Fill out the form or reach us through the info below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              rows={5}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
              placeholder="Write your message here..."
              required
            />
          </div>

          <button
            type="submit"
            className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-6 text-gray-700">
          <div>
            <h2 className="text-xl font-semibold">Visit Us</h2>
            <p>123 Main Street<br />Casablanca, Morocco</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Call Us</h2>
            <p>+212 6 00 00 00 00</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Email</h2>
            <p>info@example.com</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Business Hours</h2>
            <p>Mon - Fri: 9:00am – 6:00pm<br />Sat: 10:00am – 4:00pm</p>
          </div>
        </div>
      </div>

      {/* Optional Map */}
      <div className="mt-16">
        <iframe
          title="Our Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53182.170113350425!2d-7.712990578320329!3d33.582318600000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d34771da2f79%3A0xf4ff25cfc3a4000e!2sSalon%20Mondial%20Casablanca!5e0!3m2!1sfr!2sma!4v1753296973838!5m2!1sfr!2sma"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="rounded-lg shadow-md"
        ></iframe>

          
      </div>
    </main>
  );
}
