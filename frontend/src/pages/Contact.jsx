import React from "react";

const Contact = () => {
  return (
    <div className="bg-[#f3fff3] min-h-screen font-['Poppins'] text-green-900 py-12 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg text-green-800 mb-8">
          Have questions or need support? Reach out to us using the form below.
        </p>
        <form className="bg-white p-8 rounded-xl shadow-md space-y-6">
          <div className="flex flex-col text-left">
            <label className="mb-2 font-medium">Name</label>
            <input
              type="text"
              className="border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Your Name"
            />
          </div>
          <div className="flex flex-col text-left">
            <label className="mb-2 font-medium">Email</label>
            <input
              type="email"
              className="border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="you@example.com"
            />
          </div>
          <div className="flex flex-col text-left">
            <label className="mb-2 font-medium">Message</label>
            <textarea
              rows="5"
              className="border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
