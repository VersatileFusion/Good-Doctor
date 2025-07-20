import axios from "axios";

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  startTime: string;
  endTime: string;
  status: string;
  notes?: string;
}

export async function fetchAppointments(token: string) {
  const res = await axios.get<Appointment[]>(
    "http://localhost:3000/appointments",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}

export async function createAppointment(
  token: string,
  data: Partial<Appointment>
) {
  const res = await axios.post<Appointment>(
    "http://localhost:3000/appointments",
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}

export async function fetchAppointmentById(token: string, id: string) {
  const res = await axios.get<Appointment>(
    `http://localhost:3000/appointments/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}
