export default function OverView() {
  return (
    <section className="w-10/12 mx-auto mt-12 rounded-lg shadow-xl bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Discover Bangladesh with The Tourist Guide
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Explore the beauty of Bangladesh through curated travel experiences, exciting tours, and expert guides. 
          Whether you're planning your next adventure or just browsing, we provide everything you need for an unforgettable journey.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-indigo-50">
          <div className="mb-4">
            <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 text-3xl">
              📍
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Explore Destinations</h3>
          <p className="mt-2 text-gray-600">
            Discover top attractions and hidden gems across Bangladesh.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-green-50">
          <div className="mb-4">
            <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 text-3xl">
              🏞️
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Tour Packages</h3>
          <p className="mt-2 text-gray-600">
            Choose from a variety of packages to suit your needs and budget.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-yellow-50">
          <div className="mb-4">
            <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 text-yellow-600 text-3xl">
              ✈️
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Seamless Booking</h3>
          <p className="mt-2 text-gray-600">
            Easily book trips, select tour guides, and manage your bookings.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-pink-50">
          <div className="mb-4">
            <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-pink-100 text-pink-600 text-3xl">
              📝
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Share Stories</h3>
          <p className="mt-2 text-gray-600">
            Inspire others by sharing your travel experiences and photos.
          </p>
        </div>

        {/* Card 5 */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-blue-50">
          <div className="mb-4">
            <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 text-3xl">
              🤝
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Connect with Guides</h3>
          <p className="mt-2 text-gray-600">
            Work with experienced tour guides to enhance your journey.
          </p>
        </div>

        {/* Card 6 */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-red-50">
          <div className="mb-4">
            <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 text-3xl">
              🌍
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Join the Community</h3>
          <p className="mt-2 text-gray-600">
            Be part of a vibrant community of travelers and adventure seekers.
          </p>
        </div>
      </div>
    </section>
  );
}
