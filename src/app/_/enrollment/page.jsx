"use client";
import React from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { useUpload } from "../utilities/runtime-helpers";

function MainComponent() {
  const [error, setError] = useState(null);
  const [upload, { loading: uploading }] = useUpload();
  const { data: user, loading: userLoading } = useUser();
  const [reportCard, setReportCard] = useState(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState("pending");
  const [enrollmentHistory] = useState([
    {
      year: "2024-2025",
      grade: "Grade 10",
      status: "Completed",
      date: "2024-06-15",
    },
    {
      year: "2023-2024",
      grade: "Grade 9",
      status: "Completed",
      date: "2023-06-20",
    },
  ]);
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const { url, error: uploadError } = await upload({ file });
      if (uploadError) throw new Error(uploadError);
      setReportCard(url);
    } catch (err) {
      console.error(err);
      setError("Failed to upload report card");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("Form submitted:", Object.fromEntries(formData));
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <div className="flex">
        <Sidebar activePath="/enrollment" />

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold font-roboto mb-6">Enrollment</h1>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold font-roboto mb-4">
                Enrollment Form
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-roboto mb-1">School Year</label>
                  <select
                    name="schoolYear"
                    className="w-full p-2 border rounded"
                  >
                    <option value="2025-2026">2025-2026</option>
                    <option value="2024-2025">2024-2025</option>
                  </select>
                </div>

                <div>
                  <label className="block font-roboto mb-1">Grade Level</label>
                  <select
                    name="gradeLevel"
                    className="w-full p-2 border rounded"
                  >
                    <option value="7">Grade 7</option>
                    <option value="8">Grade 8</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </div>

                <div>
                  <label className="block font-roboto mb-1">
                    Strand (for Senior High)
                  </label>
                  <select name="strand" className="w-full p-2 border rounded">
                    <option value="">Not Applicable</option>
                    <option value="STEM">STEM</option>
                    <option value="ABM">ABM</option>
                    <option value="HUMSS">HUMSS</option>
                    <optgroup label="TVL">
                      <option value="TVL-ICT">
                        TVL - Information Communication Technology
                      </option>
                      <option value="TVL-BAKING">
                        TVL - Baking and Pastry Production
                      </option>
                    </optgroup>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-roboto"
                >
                  Submit Enrollment
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold font-roboto mb-4">
                  Document Upload
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block font-roboto mb-2">
                      Report Card
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="w-full"
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
                    {uploading && (
                      <p className="text-blue-500 text-sm mt-1">Uploading...</p>
                    )}
                    {reportCard && (
                      <p className="text-green-500 text-sm mt-1">
                        <i className="fa-solid fa-check mr-1"></i>
                        Report card uploaded
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold font-roboto mb-4">
                  Current Status
                </h2>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      enrollmentStatus === "approved"
                        ? "bg-green-500"
                        : enrollmentStatus === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                  <span className="font-roboto capitalize">
                    {enrollmentStatus}
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold font-roboto mb-4">
                  Enrollment History
                </h2>
                <div className="space-y-3">
                  {enrollmentHistory.map((entry, index) => (
                    <div key={index} className="p-3 border rounded">
                      <div className="font-semibold font-roboto">
                        {entry.year}
                      </div>
                      <div className="text-sm text-gray-600">
                        {entry.grade} • {entry.status}
                      </div>
                      <div className="text-xs text-gray-500">
                        Enrolled: {entry.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainComponent;