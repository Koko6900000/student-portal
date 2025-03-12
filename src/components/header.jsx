"use client";
import React from "react";



export default function Index() {
  return (function MainComponent({
  schoolName = "VEDASTO R. SANTIAGO HIGH SCHOOL",
  user = null,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src="https://ucarecdn.com/7358ea0f-828d-4ff7-8093-72a48c894ae7/-/format/auto/"
            alt="School logo showing the emblem of Vedasto R. Santiago High School"
            className="h-12 w-12 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold font-roboto hidden md:block">
              {schoolName}
            </h1>
            <h1 className="text-xl font-bold font-roboto md:hidden">VRSHS</h1>
          </div>
        </div>

        {user ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 hover:bg-blue-700 rounded-lg p-2 transition-colors"
            >
              <img
                src={user.profilePicture || "/default-avatar.png"}
                alt="User profile picture"
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden md:block font-roboto">{user.name}</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 font-roboto"
                >
                  Profile
                </a>
                <a
                  href="/account/logout"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 font-roboto"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <a
              href="/account/signin"
              className="px-4 py-2 text-white hover:bg-blue-700 rounded-lg transition-colors font-roboto"
            >
              Sign In
            </a>
            <a
              href="/account/signup"
              className="px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-roboto"
            >
              Sign Up
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

function StoryComponent() {
  const mockUser = {
    name: "Juan Dela Cruz",
    profilePicture: null,
  };

  return (
    <div className="grid gap-4">
      <div>
        <h2 className="text-lg font-bold mb-2 font-roboto">With User:</h2>
        <MainComponent user={mockUser} />
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2 font-roboto">Without User:</h2>
        <MainComponent />
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2 font-roboto">
          Custom School Name:
        </h2>
        <MainComponent schoolName="CUSTOM SCHOOL NAME" user={mockUser} />
      </div>
    </div>
  );
});
}