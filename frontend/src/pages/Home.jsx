const Home = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
    <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
      Welcome to EcoWaste
    </h2>
    <p className="text-gray-600 max-w-xl mb-6 text-base">
      A clean and simple way to schedule and track waste pickup requests in your
      city.
    </p>
    <div className="flex gap-4">
      <a
        href="/request"
        className="bg-gray-800 text-white px-6 py-2 rounded-md text-sm hover:bg-gray-700"
      >
        Schedule Pickup
      </a>
      <a
        href="/track"
        className="border border-gray-400 text-gray-800 px-6 py-2 rounded-md text-sm hover:bg-gray-100"
      >
        Track Requests
      </a>
    </div>
  </div>
);

export default Home;
