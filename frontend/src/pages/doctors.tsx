import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const sampleDoctors = [
  {
    name: "Dr. Sara Ahmadi",
    specialty: "Psychiatrist",
    email: "sara@clinic.com",
  },
  { name: "Dr. Reza Moradi", specialty: "Therapist", email: "reza@clinic.com" },
  {
    name: "Dr. Emily Stone",
    specialty: "Counselor",
    email: "emily@clinic.com",
  },
];

export default function DoctorsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-green-50 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
            Doctors
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleDoctors.map((d, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow p-6 flex flex-col items-start hover:shadow-lg transition"
              >
                <span className="text-xl font-semibold text-green-700 mb-2">
                  {d.name}
                </span>
                <span className="text-gray-600 mb-1">
                  Specialty: {d.specialty}
                </span>
                <span className="text-gray-500">Email: {d.email}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
