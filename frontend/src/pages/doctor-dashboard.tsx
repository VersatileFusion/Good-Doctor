import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

export default function DoctorDashboardPage() {
  return (
    <ProtectedRoute roles={["DOCTOR"]}>
      <div className="min-h-screen bg-blue-50 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
            Doctor Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <span className="text-2xl font-semibold text-blue-600">8</span>
              <span className="text-gray-500 mt-2">Today's Appointments</span>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <span className="text-2xl font-semibold text-green-600">24</span>
              <span className="text-gray-500 mt-2">Patients</span>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <span className="text-2xl font-semibold text-purple-600">
                4.9
              </span>
              <span className="text-gray-500 mt-2">Avg. Rating</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="/appointments"
              className="block bg-blue-100 hover:bg-blue-200 rounded-lg shadow p-6 text-center transition"
            >
              <span className="text-lg font-medium text-blue-700">
                View Appointments
              </span>
            </a>
            <a
              href="/patients"
              className="block bg-green-100 hover:bg-green-200 rounded-lg shadow p-6 text-center transition"
            >
              <span className="text-lg font-medium text-green-700">
                My Patients
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
              href="/analytics"
              className="block bg-purple-100 hover:bg-purple-200 rounded-lg shadow p-6 text-center transition"
            >
              <span className="text-lg font-medium text-purple-700">
                Analytics
              </span>
            </a>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
