import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const sampleResources = [
  { title: "Coping with Stress", type: "Article", url: "#" },
  { title: "Mindfulness Meditation", type: "Video", url: "#" },
  { title: "Healthy Sleep Habits", type: "Article", url: "#" },
];

export default function ResourcesPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-pink-50 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-pink-800">
            Resources
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleResources.map((r, i) => (
              <a
                key={i}
                href={r.url}
                className="bg-white rounded-lg shadow p-6 flex flex-col items-start hover:shadow-lg transition"
              >
                <span className="text-xl font-semibold text-pink-700 mb-2">
                  {r.title}
                </span>
                <span className="text-gray-600 mb-1">Type: {r.type}</span>
                <span className="text-blue-500 underline">View Resource</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
