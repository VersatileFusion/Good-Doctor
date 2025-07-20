import axios from "axios";

export interface Patient {
  id: string;
  userId: string;
  medicalHistory?: string;
}

export async function fetchPatients(token: string) {
  const res = await axios.get<Patient[]>("http://localhost:3000/patients", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
