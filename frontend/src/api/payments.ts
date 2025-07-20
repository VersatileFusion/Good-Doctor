import axios from "axios";

export interface Payment {
  id: string;
  appointmentId: string;
  amount: number;
  status: string;
  authority?: string;
  refId?: string;
  paidAt?: string;
}

export async function fetchPayments(token: string) {
  const res = await axios.get<Payment[]>("http://localhost:3000/payments");
  return res.data;
}
