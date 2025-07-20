import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-purple-50 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-purple-800">
            Analytics
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <span className="text-2xl font-semibold text-blue-600">120</span>
              <span className="text-gray-500 mt-2">Total Appointments</span>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <span className="text-2xl font-semibold text-green-600">
                $5,400
              </span>
              <span className="text-gray-500 mt-2">Total Revenue</span>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <span className="text-2xl font-semibold text-yellow-600">32</span>
              <span className="text-gray-500 mt-2">New Patients</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center">
            <span className="text-lg font-medium text-purple-700 mb-2">
              Appointments per Month
            </span>
            <div className="w-full h-32 bg-purple-100 rounded flex items-center justify-center text-purple-400">
              [Chart Placeholder]
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
