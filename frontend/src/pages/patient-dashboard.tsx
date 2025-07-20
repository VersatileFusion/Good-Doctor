import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

export default function PatientDashboardPage() {
  return (
    <ProtectedRoute roles={["PATIENT"]}>
      <div className="min-h-screen bg-green-50 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
            Patient Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <span className="text-2xl font-semibold text-blue-600">3</span>
              <span className="text-gray-500 mt-2">Upcoming Appointments</span>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <span className="text-2xl font-semibold text-yellow-600">2</span>
              <span className="text-gray-500 mt-2">Documents</span>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <span className="text-2xl font-semibold text-purple-600">1</span>
              <span className="text-gray-500 mt-2">Self-Assessment</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="/appointments"
              className="block bg-blue-100 hover:bg-blue-200 rounded-lg shadow p-6 text-center transition"
            >
              <span className="text-lg font-medium text-blue-700">
                My Appointments
              </span>
            </a>
            <a
              href="/resources"
              className="block bg-pink-100 hover:bg-pink-200 rounded-lg shadow p-6 text-center transition"
            >
              <span className="text-lg font-medium text-pink-700">
                Resources
              </span>
            </a>
            <a
              href="/payments"
              className="block bg-yellow-100 hover:bg-yellow-200 rounded-lg shadow p-6 text-center transition"
            >
              <span className="text-lg font-medium text-yellow-700">
                Payments
              </span>
            </a>
            <a
              href="/notifications"
              className="block bg-indigo-100 hover:bg-indigo-200 rounded-lg shadow p-6 text-center transition"
            >
              <span className="text-lg font-medium text-indigo-700">
                Notifications
              </span>
            </a>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
