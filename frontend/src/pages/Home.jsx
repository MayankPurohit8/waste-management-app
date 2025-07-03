import heroImage from "../assets/clean_city_hero.jpg";
import { Camera, Send, CheckCircle } from "lucide-react";
const Home = ({ username }) => (
  <>
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row  items-center justify-center text-center px-4">
      <div className="flex flex-col items-center p-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
          Welcome to SafaiSetu
        </h2>
        <p className="text-gray-600 max-w-xl mb-6 text-base">
          Empowering you to work with the government for a cleaner community.
        </p>
        <div className="flex gap-4">
          <a
            href={username === "" ? "/login" : "/request"}
            className="bg-gray-800 text-white px-6 py-2 rounded-md text-sm hover:bg-gray-700"
          >
            Schedule Pickup
          </a>
          <a
            href={username === "" ? "/login" : "/profile"}
            className="border border-gray-400 text-gray-800 px-6 py-2 rounded-md text-sm hover:bg-gray-100"
          >
            Track Requests
          </a>
        </div>
        {username === "" ? (
          <a href="/login" className="text-gray-600 max-w-xl mt-6 text-base">
            Login/Signup to Continue!
          </a>
        ) : null}
      </div>
      <div className="w-full md:w-1/2">
        <img src={heroImage} alt="" />
      </div>
    </div>
    <section className="w-full py-16 px-6 bg-white" id="how-it-works">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-600 mb-12">
          Quick and easy steps to request a cleanup
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <Camera className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Click a Picture</h3>
            <p className="text-gray-500">
              Capture the waste area that needs attention.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Send className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Send a Request</h3>
            <p className="text-gray-500">
              Submit the image and location through our app.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-yellow-100 p-4 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Cleanup</h3>
            <p className="text-gray-500">
              Our team will schedule and clean up the spot.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className="w-full bg-gray-50 py-16 px-6" id="feedback">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">We value your feedback</h2>
        <p className="text-gray-600 mb-8">
          Let us know how we’re doing or suggest improvements.
        </p>

        <form className="space-y-6">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Your Email (optional)"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Feedback Textarea */}
          <textarea
            rows="5"
            required
            placeholder="Write your feedback here..."
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </section>
  </>
);

export default Home;
