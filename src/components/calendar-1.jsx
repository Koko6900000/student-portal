"use client";
import React from "react";



export default function Index() {
  return (function MainComponent({ events = [], onDayClick = () => {} }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);

  const hasEventOnDay = (day) => {
    return events.some((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const getEventsForDay = (day) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
    const dayEvents = getEventsForDay(day);
    onDayClick(dayEvents);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    setSelectedDate(null);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    setSelectedDate(null);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="w-full md:w-2/3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold font-roboto">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center p-2 font-roboto font-semibold text-gray-600"
              >
                {day}
              </div>
            ))}

            {[...Array(startingDay)].map((_, index) => (
              <div key={`empty-${index}`} className="p-2"></div>
            ))}

            {[...Array(daysInMonth)].map((_, index) => {
              const day = index + 1;
              const hasEvent = hasEventOnDay(day);
              return (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`
                    p-2 h-12 flex items-center justify-center relative
                    hover:bg-gray-100 rounded-lg transition-colors
                    ${selectedDate === day ? "bg-blue-100" : ""}
                    ${hasEvent ? "font-bold text-blue-600" : ""}
                  `}
                >
                  {day}
                  {hasEvent && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full md:w-1/3 mt-6 md:mt-0">
          <h3 className="text-lg font-bold mb-4 font-roboto">
            Upcoming Events
          </h3>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold font-roboto">{event.title}</div>
                  <div className="text-sm text-gray-600">
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 font-roboto">No upcoming events</div>
          )}
        </div>
      </div>
    </div>
  );
}

function StoryComponent() {
  const mockEvents = [
    {
      title: "Team Meeting",
      date: "2025-01-15",
      description: "Monthly team sync",
    },
    {
      title: "Project Deadline",
      date: "2025-01-20",
      description: "Final submission due",
    },
    {
      title: "Training Session",
      date: "2025-01-25",
      description: "New system training",
    },
    {
      title: "Client Presentation",
      date: "2025-02-05",
      description: "Quarterly review",
    },
    {
      title: "Conference",
      date: "2025-02-10",
      description: "Annual industry conference",
    },
  ];

  const handleDayClick = (events) => {
    console.log("Selected day events:", events);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4 font-roboto">
          Default Calendar:
        </h2>
        <MainComponent events={mockEvents} onDayClick={handleDayClick} />
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4 font-roboto">Empty Calendar:</h2>
        <MainComponent events={[]} onDayClick={handleDayClick} />
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4 font-roboto">Mobile View:</h2>
        <div className="w-full md:w-[375px]">
          <MainComponent events={mockEvents} onDayClick={handleDayClick} />
        </div>
      </div>
    </div>
  );
});
}