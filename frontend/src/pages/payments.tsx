import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const samplePayments = [
  { amount: "$120", date: "2025-07-15", status: "Paid" },
  { amount: "$80", date: "2025-07-10", status: "Pending" },
  { amount: "$200", date: "2025-07-01", status: "Paid" },
];

export default function PaymentsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-yellow-50 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-yellow-800">
            Payments
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {samplePayments.map((p, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow p-6 flex flex-col items-start hover:shadow-lg transition"
              >
                <span className="text-xl font-semibold text-yellow-700 mb-2">
                  {p.amount}
                </span>
                <span className="text-gray-600 mb-1">Date: {p.date}</span>
                <span
                  className={
                    p.status === "Paid" ? "text-green-600" : "text-red-600"
                  }
                >
                  Status: {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
