"use client";
import React from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

function MainComponent() {
  const [grades, setGrades] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: user } = useUser();

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await fetch("/api/students/profile", {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch grades");
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setGrades({
          currentLevel: "Grade 10",
          quarters: {
            Q1: [
              { subject: "Mathematics", grade: 92, status: "Passed" },
              { subject: "Science", grade: 88, status: "Passed" },
              { subject: "English", grade: 90, status: "Passed" },
              { subject: "Filipino", grade: 87, status: "Passed" },
            ],
            Q2: [
              { subject: "Mathematics", grade: 89, status: "Passed" },
              { subject: "Science", grade: 91, status: "Passed" },
              { subject: "English", grade: 88, status: "Passed" },
              { subject: "Filipino", grade: 90, status: "Passed" },
            ],
            Q3: [
              { subject: "Mathematics", grade: 94, status: "Passed" },
              { subject: "Science", grade: 87, status: "Passed" },
              { subject: "English", grade: 92, status: "Passed" },
              { subject: "Filipino", grade: 89, status: "Passed" },
            ],
            Q4: [
              { subject: "Mathematics", grade: 90, status: "Passed" },
              { subject: "Science", grade: 93, status: "Passed" },
              { subject: "English", grade: 89, status: "Passed" },
              { subject: "Filipino", grade: 91, status: "Passed" },
            ],
          },
          history: [
            { level: "Grade 9", yearAverage: 89.5, status: "Passed" },
            { level: "Grade 8", yearAverage: 88.7, status: "Passed" },
            { level: "Grade 7", yearAverage: 90.2, status: "Passed" },
          ],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  const renderGradeTable = (quarterGrades, quarter) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-bold mb-4 font-roboto">{quarter}</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left font-roboto">Subject</th>
              <th className="px-4 py-2 text-left font-roboto">Grade</th>
              <th className="px-4 py-2 text-left font-roboto">Status</th>
            </tr>
          </thead>
          <tbody>
            {quarterGrades.map((grade, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2 font-roboto">{grade.subject}</td>
                <td className="px-4 py-2 font-roboto">{grade.grade}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-roboto ${
                      grade.status === "Passed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {grade.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar activePath="/grades" />
        <div className="flex-1">
          <Header user={user} />
          <div className="p-6">
            <div className="flex items-center justify-center h-[calc(100vh-80px)]">
              <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-600"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen">
        <Sidebar activePath="/grades" />
        <div className="flex-1">
          <Header user={user} />
          <div className="p-6">
            <div className="bg-red-50 text-red-800 p-4 rounded-lg font-roboto">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar activePath="/grades" />
      <div className="flex-1 overflow-auto">
        <Header user={user} />
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold font-roboto">
              Academic Performance
            </h1>
            <p className="text-gray-600 font-roboto">
              Current Level: {grades.currentLevel}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(grades.quarters).map(([quarter, quarterGrades]) =>
              renderGradeTable(quarterGrades, quarter)
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 font-roboto">
              Grade History
            </h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left font-roboto">
                        Grade Level
                      </th>
                      <th className="px-4 py-2 text-left font-roboto">
                        Year Average
                      </th>
                      <th className="px-4 py-2 text-left font-roboto">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.history.map((record, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2 font-roboto">
                          {record.level}
                        </td>
                        <td className="px-4 py-2 font-roboto">
                          {record.yearAverage}
                        </td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800 font-roboto">
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