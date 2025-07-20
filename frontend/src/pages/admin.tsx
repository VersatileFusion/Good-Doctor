import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute roles={["ADMIN"]}>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
            Admin Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <span className="text-2xl font-semibold text-blue-600">42</span>
              <span className="text-gray-500 mt-2">Users</span>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <span className="text-2xl font-semibold text-green-600">15</span>
              <span className="text-gray-500 mt-2">Appointments</span>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <span className="text-2xl font-semibold text-purple-600">
                $2,300
              </span>
              <span className="text-gray-500 mt-2">Revenue</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="/patients"
              className="block bg-blue-100 hover:bg-blue-200 rounded-lg shadow p-6 text-center transition"
            >
              <span className="text-xl font-medium text-blue-700">
                Manage Patients
              </span>
            </a>
            <a
              href="/doctors"
              className="block bg-green-100 hover:bg-green-200 rounded-lg shadow p-6 text-center transition"
            >
              <span className="text-xl font-medium text-green-700">
                Manage Doctors
              </span>
            </a>
            <a
              href="/appointments"
              className="block bg-yellow-100 hover:bg-yellow-200 rounded-lg shadow p-6 text-center transition"
            >
              <span className="text-xl font-medium text-yellow-700">
                View Appointments
              </span>
            </a>
            <a
              href="/analytics"
              className="block bg-purple-100 hover:bg-purple-200 rounded-lg shadow p-6 text-center transition"
            >
              <span className="text-xl font-medium text-purple-700">
                Analytics
              </span>
            </a>
            <a
              href="/resources"
              className="block bg-pink-100 hover:bg-pink-200 rounded-lg shadow p-6 text-center transition"
            >
              <span className="text-xl font-medium text-pink-700">
                Resources
              </span>
            </a>
            <a
              href="/notifications"
              className="block bg-indigo-100 hover:bg-indigo-200 rounded-lg shadow p-6 text-center transition"
            >
              <span className="text-xl font-medium text-indigo-700">
                Notifications
              </span>
            </a>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
