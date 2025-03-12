"use client";
import React from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

function MainComponent() {
  const { data: user, loading: userLoading } = useUser();
  const [schedule, setSchedule] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch("/api/students/profile", {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch schedule");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setSchedule(data.student);
      } catch (err) {
        console.error(err);
        setError("Could not load your schedule. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const timeSlots = [
    "7:30 AM - 8:30 AM",
    "8:30 AM - 9:30 AM",
    "9:45 AM - 10:45 AM",
    "10:45 AM - 11:45 AM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
  ];

  const mockSchedule = {
    section: "Diamond - Grade 10",
    subjects: [
      {
        name: "Mathematics",
        teacher: "Ms. Santos",
        room: "Room 301",
        days: ["Monday", "Wednesday", "Friday"],
        timeSlot: 0,
      },
      {
        name: "Science",
        teacher: "Mr. Reyes",
        room: "Lab 2",
        days: ["Tuesday", "Thursday"],
        timeSlot: 1,
      },
      {
        name: "English",
        teacher: "Mrs. Cruz",
        room: "Room 205",
        days: ["Monday", "Wednesday", "Friday"],
        timeSlot: 2,
      },
      {
        name: "Filipino",
        teacher: "Ms. Garcia",
        room: "Room 207",
        days: ["Tuesday", "Thursday"],
        timeSlot: 3,
      },
      {
        name: "History",
        teacher: "Mr. Tan",
        room: "Room 401",
        days: ["Monday", "Wednesday"],
        timeSlot: 4,
      },
    ],
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  if (userLoading || loading) {
    return (
      <div className="flex h-screen">
        <Sidebar activePath="/schedule" />
        <div className="flex-1">
          <Header user={user} />
          <div className="p-8 flex items-center justify-center">
            <div className="text-xl font-roboto">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen">
        <Sidebar activePath="/schedule" />
        <div className="flex-1">
          <Header user={user} />
          <div className="p-8">
            <div className="text-red-500 font-roboto">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar activePath="/schedule" />
      <div className="flex-1 overflow-hidden">
        <Header user={user} />
        <div className="p-4 md:p-8 overflow-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold font-roboto mb-2">
              Class Schedule
            </h1>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="font-roboto text-lg font-semibold">
                {mockSchedule.section}
              </h2>
              <p className="font-roboto text-gray-600">
                Academic Year 2024-2025
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 font-roboto text-left">Time</th>
                  {days.map((day) => (
                    <th key={day} className="p-4 font-roboto text-left">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((timeSlot, timeIndex) => (
                  <tr key={timeSlot} className="border-t">
                    <td className="p-4 font-roboto text-gray-600">
                      {timeSlot}
                    </td>
                    {days.map((day) => {
                      const subject = mockSchedule.subjects.find(
                        (s) => s.timeSlot === timeIndex && s.days.includes(day)
                      );
                      return (
                        <td key={day} className="p-4">
                          {subject && (
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="font-roboto font-semibold">
                                {subject.name}
                              </div>
                              <div className="text-sm text-gray-600 font-roboto">
                                {subject.teacher}
                              </div>
                              <div className="text-sm text-gray-600 font-roboto">
                                {subject.room}
                              </div>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;