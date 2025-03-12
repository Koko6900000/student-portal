"use client";
import React from "react";

function MainComponent() {
  const features = [
    {
      icon: "fa-solid fa-graduation-cap",
      title: "Grades & Academic Progress",
      description:
        "Track your academic performance and view detailed grade reports",
    },
    {
      icon: "fa-solid fa-clock",
      title: "Class Schedule",
      description: "Access your daily class schedule and room assignments",
    },
    {
      icon: "fa-solid fa-clipboard-user",
      title: "Attendance Tracking",
      description: "Monitor your attendance records and history",
    },
    {
      icon: "fa-solid fa-user",
      title: "Student Profile",
      description: "Manage your personal information and academic details",
    },
    {
      icon: "fa-solid fa-bullhorn",
      title: "School Announcements",
      description: "Stay updated with important school news and events",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-screen min-h-[600px]">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://ucarecdn.com/25521cdd-1932-4fee-b2ec-f5372df34e38/-/format/auto/')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(2px) brightness(0.7)",
          }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center py-16 md:py-24 text-center">
            <img
              src="https://ucarecdn.com/7358ea0f-828d-4ff7-8093-72a48c894ae7/-/format/auto/"
              alt="Vedasto R. Santiago High School Logo"
              className="w-24 h-24 md:w-28 md:h-28 mb-8 drop-shadow-lg bg-white rounded-full"
            />
            <h1 className="text-3xl md:text-5xl font-bold text-white font-roboto mb-4 drop-shadow-lg">
              Welcome to Vedasto R. Santiago High School
            </h1>
            <p className="text-xl text-white mb-8 font-roboto drop-shadow-md">
              Your Official Student Portal - Access Everything in One Place
            </p>
            <a
              href="/account/signin"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors text-lg shadow-lg hover:shadow-xl"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 font-roboto mb-12">
            Everything You Need as a Student
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <i
                  className={`${feature.icon} text-4xl text-blue-600 mb-4`}
                ></i>
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-roboto">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 font-roboto mb-8">
            Ready to Get Started?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/account/signin"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors text-lg"
            >
              Sign In
            </a>
            <a
              href="/account/signup"
              className="bg-gray-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-900 transition-colors text-lg"
            >
              Create Account
            </a>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold font-roboto mb-4">
              Vedasto R. Santiago High School
            </h3>
            <p className="text-gray-400">
              Empowering students through education and technology
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold font-roboto mb-4">Contact Us</h3>
            <div className="text-gray-400 space-y-2">
              <p>
                <i className="fa-solid fa-location-dot mr-2"></i>
                123 School Address, City, Province
              </p>
              <p>
                <i className="fa-solid fa-phone mr-2"></i>
                (123) 456-7890
              </p>
              <p>
                <i className="fa-solid fa-envelope mr-2"></i>
                info@vrshs.edu.ph
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2025 Vedasto R. Santiago High School. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default MainComponent;