"use client";
import React from "react";
import Sidebar from "../../components/sidebar";
import Calendar1 from "../../components/calendar-1";
import Header from "../../components/header";

function MainComponent() {
  const { data: user, loading } = useUser();
  const [announcements] = useState([
    {
      id: 1,
      title: "School Festival Next Week",
      date: "2025-01-20",
      content: "Join us for our annual school festival",
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      date: "2025-01-25",
      content: "Schedule for Q1 consultations",
    },
    {
      id: 3,
      title: "Sports Day",
      date: "2025-02-01",
      content: "Annual sports competition",
    },
  ]);

  const [events] = useState([
    { title: "School Festival", date: "2025-01-20" },
    { title: "Parent-Teacher Meeting", date: "2025-01-25" },
    { title: "Sports Day", date: "2025-02-01" },
  ]);

  const quickStats = [
    {
      label: "Current GPA",
      value: "3.8",
      color: "bg-green-500",
      icon: "fa-graduation-cap",
    },
    {
      label: "Attendance Rate",
      value: "95%",
      color: "bg-blue-500",
      icon: "fa-clipboard-user",
    },
    {
      label: "Next Exam",
      value: "Jan 25",
      color: "bg-purple-500",
      icon: "fa-clock",
    },
    { label: "Due Tasks", value: "3", color: "bg-red-500", icon: "fa-tasks" },
  ];

  const actionButtons = [
    {
      label: "View Schedule",
      path: "/schedule",
      icon: "fa-calendar",
      color: "bg-indigo-500",
    },
    {
      label: "Check Grades",
      path: "/grades",
      icon: "fa-star",
      color: "bg-yellow-500",
    },
    {
      label: "View Attendance",
      path: "/attendance",
      icon: "fa-user-check",
      color: "bg-green-500",
    },
    {
      label: "Enrollment",
      path: "/enrollment",
      icon: "fa-user-plus",
      color: "bg-blue-500",
    },
  ];

  if (loading) {
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
        <Sidebar activePath="/dashboard" />
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickStats.map((stat, index) => (
                  <div
                    key={index}
                    className={`${stat.color} rounded-lg p-4 text-white`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">
                        <i className={`fa-solid ${stat.icon}`}></i>
                      </span>
                      <span className="text-2xl font-bold font-roboto">
                        {stat.value}
                      </span>
                    </div>
                    <div className="mt-2 text-sm font-roboto">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {actionButtons.map((button, index) => (
                  <a
                    key={index}
                    href={button.path}
                    className={`${button.color} hover:opacity-90 rounded-lg p-6 text-white transition-opacity`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">
                        <i className={`fa-solid ${button.icon}`}></i>
                      </span>
                      <span className="text-xl font-roboto">
                        {button.label}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 font-roboto">
                  Recent Announcements
                </h2>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="border-b pb-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold font-roboto">
                          {announcement.title}
                        </h3>
                        <span className="text-sm text-gray-500 font-roboto">
                          {new Date(announcement.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1 font-roboto">
                        {announcement.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Calendar1 events={events} onDayClick={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;