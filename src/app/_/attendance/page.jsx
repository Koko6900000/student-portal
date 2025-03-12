"use client";
import React from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { useUpload } from "../utilities/runtime-helpers";

function MainComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);
  const [upload, { loading: uploading }] = useUpload();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/students/profile", {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setStudent(data.student);
      } catch (err) {
        console.error(err);
        setError("Could not load your profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleImageUpload = async (file) => {
    try {
      const { url, error: uploadError } = await upload({ file });
      if (uploadError) {
        throw new Error(uploadError);
      }
      setStudent((prev) => ({ ...prev, image: url }));
    } catch (err) {
      console.error(err);
      setError("Could not upload image");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={student} />
        <div className="flex">
          <Sidebar activePath="/attendance" />
          <div className="flex-1 p-8">
            <div className="text-center">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={student} />
        <div className="flex">
          <Sidebar activePath="/attendance" />
          <div className="flex-1 p-8">
            <div className="text-red-500">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  const mockAttendance = [
    { date: "2025-01-15", status: "Present", time: "7:45 AM" },
    { date: "2025-01-14", status: "Late", time: "8:15 AM" },
    { date: "2025-01-13", status: "Present", time: "7:50 AM" },
    { date: "2025-01-12", status: "Absent", time: "-" },
    { date: "2025-01-11", status: "Present", time: "7:55 AM" },
  ];

  const stats = {
    present: 15,
    late: 3,
    absent: 2,
    total: 20,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={student} />
      <div className="flex">
        <Sidebar activePath="/attendance" />
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold font-roboto mb-8">
              Attendance Record
            </h1>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold font-roboto mb-6">
                  Student Profile
                </h2>
                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    <img
                      src={student?.image || "/default-avatar.png"}
                      alt="Student profile"
                      className="w-32 h-32 rounded-full object-cover"
                    />
                    <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                      <i className="fa-solid fa-camera"></i>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) =>
                          e.target.files && handleImageUpload(e.target.files[0])
                        }
                      />
                    </label>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-600 font-roboto">Name</label>
                    <p className="font-semibold">{student?.name}</p>
                  </div>
                  <div>
                    <label className="text-gray-600 font-roboto">Email</label>
                    <p className="font-semibold">{student?.email}</p>
                  </div>
                  <div>
                    <label className="text-gray-600 font-roboto">
                      Student ID
                    </label>
                    <p className="font-semibold">{student?.id}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold font-roboto mb-6">
                  Attendance Statistics
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      {stats.present}
                    </div>
                    <div className="text-sm text-gray-600">Present</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-yellow-600">
                      {stats.late}
                    </div>
                    <div className="text-sm text-gray-600">Late</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-red-600">
                      {stats.absent}
                    </div>
                    <div className="text-sm text-gray-600">Absent</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      {stats.total}
                    </div>
                    <div className="text-sm text-gray-600">Total Days</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold font-roboto mb-6">
                Attendance History
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-roboto">Date</th>
                      <th className="text-left py-3 px-4 font-roboto">Time</th>
                      <th className="text-left py-3 px-4 font-roboto">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockAttendance.map((record, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4">{record.date}</td>
                        <td className="py-3 px-4">{record.time}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              record.status === "Present"
                                ? "bg-green-100 text-green-800"
                                : record.status === "Late"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;