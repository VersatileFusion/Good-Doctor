import axios from "axios";

export async function fetchTotalAppointments(token: string) {
  const res = await axios.get(
    "http://localhost:3000/analytics/total-appointments",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}

export async function fetchTotalRevenue(token: string) {
  const res = await axios.get("http://localhost:3000/analytics/total-revenue", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function fetchAppointmentsPerDoctor(token: string) {
  const res = await axios.get(
    "http://localhost:3000/analytics/appointments-per-doctor",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}

export async function fetchNewPatientsPerMonth(token: string) {
  const res = await axios.get(
    "http://localhost:3000/analytics/new-patients-per-month",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}
