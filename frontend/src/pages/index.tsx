import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
            Welcome to Therapy Clinic
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <span className="text-2xl font-semibold text-blue-600">
                Patients
              </span>
              <span className="text-gray-500 mt-2">
                Manage and view all patients
              </span>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <span className="text-2xl font-semibold text-green-600">
                Doctors
              </span>
              <span className="text-gray-500 mt-2">Meet our specialists</span>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <span className="text-2xl font-semibold text-yellow-600">
                Appointments
              </span>
              <span className="text-gray-500 mt-2">
                Book and track sessions
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="/patients"
              className="block bg-blue-100 hover:bg-blue-200 rounded-lg shadow p-6 text-center transition"
            >
              <span className="text-lg font-medium text-blue-700">
                Go to Patients
              </span>
            </a>
            <a
              href="/doctors"
              className="block bg-green-100 hover:bg-green-200 rounded-lg shadow p-6 text-center transition"
            >
              <span className="text-lg font-medium text-green-700">
                Go to Doctors
              </span>
            </a>
            <a
              href="/appointments"
              className="block bg-yellow-100 hover:bg-yellow-200 rounded-lg shadow p-6 text-center transition"
            >
              <span className="text-lg font-medium text-yellow-700">
                Go to Appointments
              </span>
            </a>
            <a
              href="/resources"
              className="block bg-pink-100 hover:bg-pink-200 rounded-lg shadow p-6 text-center transition"
            >
              <span className="text-lg font-medium text-pink-700">
                Go to Resources
              </span>
            </a>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
