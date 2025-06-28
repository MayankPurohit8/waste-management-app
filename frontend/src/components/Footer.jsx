const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-2">EcoWaste</h2>
          <p className="text-sm text-gray-400">
            Bridging the gap between citizens and cleanliness — one pickup at a
            time.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:underline">
                How it Works
              </a>
            </li>
            <li>
              <a href="/request" className="hover:underline">
                Request Pickup
              </a>
            </li>
            <li>
              <a href="/feedback" className="hover:underline">
                Feedback
              </a>
            </li>
            <li>
              <a href="/profile" className="hover:underline">
                Profile
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm text-gray-300">
            Email:{" "}
            <a href="mailto:support@ecowaste.in" className="underline">
              support@ecowaste.in
            </a>
          </p>
          <p className="text-sm text-gray-300 mt-2">Phone: +91 98765 43210</p>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} EcoWaste. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
