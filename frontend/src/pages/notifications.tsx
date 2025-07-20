import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const sampleNotifications = [
  {
    title: "Appointment Reminder",
    message: "You have an appointment tomorrow at 10:00 AM.",
  },
  {
    title: "New Resource Added",
    message: "A new article on stress management is available.",
  },
  {
    title: "Payment Received",
    message: "Your payment for last session is confirmed.",
  },
];

export default function NotificationsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-indigo-50 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-indigo-800">
            Notifications
          </h1>
          <div className="grid grid-cols-1 gap-6">
            {sampleNotifications.map((n, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow p-6 flex flex-col items-start hover:shadow-lg transition"
              >
                <span className="text-lg font-semibold text-indigo-700 mb-2">
                  {n.title}
                </span>
                <span className="text-gray-600">{n.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
