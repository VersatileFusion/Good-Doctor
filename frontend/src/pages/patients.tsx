import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const samplePatients = [
  { name: "John Doe", age: 32, email: "john@example.com" },
  { name: "Jane Smith", age: 28, email: "jane@example.com" },
  { name: "Ali Reza", age: 40, email: "ali@example.com" },
];

export default function PatientsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-blue-50 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
            Patients
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {samplePatients.map((p, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow p-6 flex flex-col items-start hover:shadow-lg transition"
              >
                <span className="text-xl font-semibold text-blue-700 mb-2">
                  {p.name}
                </span>
                <span className="text-gray-600 mb-1">Age: {p.age}</span>
                <span className="text-gray-500">Email: {p.email}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
