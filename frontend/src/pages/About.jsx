import React from "react";

const About = () => {
  return (
    <div className="bg-[#f3fff3] min-h-screen font-['Poppins'] text-green-900 py-12 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">
          About Our Waste Management System
        </h1>
        <p className="text-lg text-green-800 mb-4">
          Our platform is designed to streamline waste pickup services for
          residential areas, ensuring a cleaner and more sustainable
          environment.
        </p>
        <p className="text-md text-green-700 mb-2">
          Built with modern technology, the system allows users to request
          pickups, track requests, and view their history with ease. Local
          government bodies can efficiently manage and monitor waste collection
          activities.
        </p>
        <p className="text-md text-green-700">
          We aim to bridge the gap between citizens and waste management
          authorities, contributing to a cleaner society through digitized
          services.
        </p>
      </div>
    </div>
  );
};

export default About;
