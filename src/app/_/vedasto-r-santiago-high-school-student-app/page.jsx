"use client";
import React from "react";

function MainComponent() {
  const { data: authUser, loading: authLoading } = useUser();
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    if (window?.location?.pathname === "/") {
      window.location.href = "/account/signin";
      return;
    }

    if (!authUser && !authLoading) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    if (authUser) {
      fetchStudentProfile();
    }
  }, [authUser, authLoading]);

  const fetchStudentProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const profileResponse = await fetch("/api/get-student-profile", {
        method: "POST",
      });

      if (!profileResponse.ok) {
        throw new Error(`Error: ${profileResponse.status}`);
      }

      const profileData = await profileResponse.json();

      if (profileData.error === "Student profile not found") {
        const createResponse = await fetch("/api/create-test-student", {
          method: "POST",
          body: JSON.stringify({
            name: "Test Student",
            studentId: "1234567",
            contactNumber: "01234567890",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!createResponse.ok) {
          throw new Error("Failed to create student profile");
        }

        const createData = await createResponse.json();

        if (createData.error) {
          throw new Error(createData.error);
        }

        const verifyResponse = await fetch("/api/get-student-profile", {
          method: "POST",
        });

        if (!verifyResponse.ok) {
          throw new Error("Failed to verify student profile after creation");
        }

        const verifyData = await verifyResponse.json();

        if (verifyData.error) {
          throw new Error(verifyData.error);
        }

        setStudentData(verifyData.student);
      } else if (profileData.error) {
        throw new Error(profileData.error);
      } else {
        setStudentData(profileData.student);
      }
    } catch (err) {
      console.error("Failed to handle student profile:", err);
      setError(err.message || "Could not load or create student profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl font-roboto text-gray-600">
            Loading your profile...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    if (error.includes("Not authenticated")) {
      return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
          <div className="text-center p-4 max-w-md mx-auto">
            <div className="bg-yellow-100 rounded-lg p-4 mb-4">
              <i className="fas fa-exclamation-triangle text-yellow-600 text-2xl mb-2"></i>
              <div className="text-xl font-roboto text-yellow-600 mb-2">
                Please sign in
              </div>
              <div className="text-sm text-yellow-500 mb-4">
                You need to be signed in to access your student profile
              </div>
            </div>
            <a
              href="/account/signin?callbackUrl=/vedasto-r-santiago-high-school-student-app"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-roboto hover:bg-blue-700 transition-colors inline-block"
            >
              Sign In
            </a>
          </div>
        </div>
      );
    }
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center p-4 max-w-md mx-auto">
          <div className="bg-red-100 rounded-lg p-4 mb-4">
            <i className="fas fa-exclamation-circle text-red-600 text-2xl mb-2"></i>
            <div className="text-xl font-roboto text-red-600 mb-2">
              {error.includes("Failed to create")
                ? "Could not create your profile"
                : error.includes("Failed to verify")
                ? "Could not verify your profile"
                : "Could not load your profile"}
            </div>
            <div className="text-sm text-red-500 mb-4">
              {error}. Please try again or contact support if the problem
              persists.
            </div>
          </div>
          <button
            onClick={fetchStudentProfile}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-roboto hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 safe-area-inset-bottom">
      <header className="bg-blue-600 text-white p-3 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <img
            src="https://ucarecdn.com/31060705-4ab6-464a-967e-e901bc60d858/-/format/auto/"
            alt="Vedasto R. Santiago High School logo"
            className="h-[32px] w-auto"
          />
          <h1 className="text-lg font-bold font-roboto truncate">
            VRS High School
          </h1>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden focus:outline-none"
          >
            <img
              src={authUser?.image || "/default-avatar.png"}
              alt="Student profile picture"
              className="w-full h-full object-cover"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              <a
                href="/profile"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 font-roboto text-sm"
              >
                <i className="fas fa-user-circle mr-2"></i>
                Profile
              </a>
              <a
                href="/account/logout"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 font-roboto text-sm"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Sign Out
              </a>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        {activeTab === "home" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-roboto">
              Welcome back, {authUser?.name}!
            </h2>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-600 font-roboto">
                Select an option below to get started
              </p>
            </div>
          </div>
        )}
        {activeTab === "grades" && (
          <div className="text-center text-gray-500 font-roboto">
            Grades content coming soon
          </div>
        )}
        {activeTab === "schedule" && (
          <div className="text-center text-gray-500 font-roboto">
            Schedule content coming soon
          </div>
        )}
        {activeTab === "attendance" && (
          <div className="text-center text-gray-500 font-roboto">
            Attendance content coming soon
          </div>
        )}
        {activeTab === "profile" && (
          <div className="text-center text-gray-500 font-roboto">
            Profile content coming soon
          </div>
        )}
      </main>

      <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 safe-area-inset-bottom">
        <div className="flex justify-around items-center">
          <button
            onClick={() => setActiveTab("home")}
            className={`p-4 flex flex-col items-center w-full ${
              activeTab === "home" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <i className="fas fa-home text-xl mb-1"></i>
            <span className="text-xs font-roboto">Home</span>
          </button>
          <button
            onClick={() => setActiveTab("grades")}
            className={`p-4 flex flex-col items-center w-full ${
              activeTab === "grades" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <i className="fas fa-graduation-cap text-xl mb-1"></i>
            <span className="text-xs font-roboto">Grades</span>
          </button>
          <button
            onClick={() => setActiveTab("schedule")}
            className={`p-4 flex flex-col items-center w-full ${
              activeTab === "schedule" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <i className="fas fa-calendar text-xl mb-1"></i>
            <span className="text-xs font-roboto">Schedule</span>
          </button>
          <button
            onClick={() => setActiveTab("attendance")}
            className={`p-4 flex flex-col items-center w-full ${
              activeTab === "attendance" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <i className="fas fa-clipboard-list text-xl mb-1"></i>
            <span className="text-xs font-roboto">Attendance</span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`p-4 flex flex-col items-center w-full ${
              activeTab === "profile" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <i className="fas fa-user text-xl mb-1"></i>
            <span className="text-xs font-roboto">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default MainComponent;