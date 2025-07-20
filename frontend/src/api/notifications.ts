import axios from "axios";

export interface Notification {
  id: string;
  message: string;
  createdAt: string;
}

export async function fetchNotifications(token: string) {
  // Placeholder: Replace with real endpoint
  const res = await axios.get<Notification[]>(
    "http://localhost:3000/notifications"
  );
  return res.data;
}
