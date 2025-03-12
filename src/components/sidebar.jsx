"use client";
import React, { useState } from "react";

export default function Index() {
  return <StoryComponent />;
}

function MainComponent({ activePath = "/" }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "fa-solid fa-gauge" },
    { path: "/calendar", label: "Calendar", icon: "fa-solid fa-calendar" },
    { path: "/grades", label: "Grades", icon: "fa-solid fa-graduation-cap" },
    { path: "/schedule", label: "Schedule", icon: "fa-solid fa-clock" },
    {
      path: "/attendance",
      label: "Attendance",
      icon: "fa-solid fa-clipboard-user",
    },
    { path: "/enrollment", label: "Enrollment", icon: "fa-solid fa-user-plus" },
    {
      path: "/announcements",
      label: "Announcements",
      icon: "fa-solid fa-bullhorn",
    },
  ];

  return (
    <div
      className={`bg-gray-100 h-screen transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        <span className={`font-roboto font-bold ${isCollapsed ? "hidden" : "block"}`}>
          Menu
        </span>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <i className={`fa-solid ${isCollapsed ? "fa-chevron-right" : "fa-chevron-left"}`}></i>
        </button>
      </div>

      <nav className="p-2">
        {menuItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className={`
              flex items-center gap-3 p-3 rounded-lg mb-1
              ${activePath === item.path ? "bg-blue-500 text-white" : "hover:bg-gray-200 text-gray-700"}
              transition-colors
            `}
          >
            <i className={`${item.icon} w-5 text-center`}></i>
            <span className={`font-roboto ${isCollapsed ? "hidden" : "block"}`}>
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
}

function StoryComponent() {
  return (
    <div className="grid gap-8">
      <div>
        <h2 className="text-lg font-bold mb-4 font-roboto">Default State:</h2>
        <div className="border rounded-lg overflow-hidden h-[600px]">
          <MainComponent activePath="/dashboard" />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4 font-roboto">Different Active Page:</h2>
        <div className="border rounded-lg overflow-hidden h-[600px]">
          <MainComponent activePath="/grades" />
        </div>
      </div>

      <div className="md:hidden">
        <h2 className="text-lg font-bold mb-4 font-roboto">Mobile View:</h2>
        <div className="border rounded-lg overflow-hidden h-[600px]">
          <MainComponent />
        </div>
      </div>
    </div>
  );
}
