import axios from "axios";

export interface Resource {
  id: string;
  title: string;
  type: string;
  content?: string;
  url?: string;
  tags: string[];
  createdBy: string;
  createdAt: string;
}



export async function fetchResourceById(token: string, id: string) {
  const res = await axios.get<Resource>(`http://localhost:3000/resources/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}