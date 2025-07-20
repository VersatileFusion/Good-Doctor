import axios from "axios";

export interface Doctor {
  id: string;
  userId: string;
  bio?: string;
  specialties: string[];
  photoUrl?: string;
}

export async function fetchDoctors(token: string) {
  const res = await axios.get<Doctor[]>("http://localhost:3000/doctors", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function fetchDoctorById(token: string, id: string) {
  const res = await axios.get<Doctor>(`http://localhost:3000/doctors/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
