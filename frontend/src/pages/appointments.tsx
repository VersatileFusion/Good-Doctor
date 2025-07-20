import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const sampleAppointments = [
  { doctor: "Dr. Sara Ahmadi", patient: "John Doe", time: "2025-07-21 10:00" },
  {
    doctor: "Dr. Reza Moradi",
    patient: "Jane Smith",
    time: "2025-07-22 14:30",
  },
  { doctor: "Dr. Emily Stone", patient: "Ali Reza", time: "2025-07-23 09:00" },
];

export default function AppointmentsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-yellow-50 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-yellow-800">
            Appointments
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleAppointments.map((a, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow p-6 flex flex-col items-start hover:shadow-lg transition"
              >
                <span className="text-lg font-semibold text-yellow-700 mb-2">
                  {a.doctor} &rarr; {a.patient}
                </span>
                <span className="text-gray-600">Time: {a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
