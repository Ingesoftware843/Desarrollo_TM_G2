import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://api-tm-57df.onrender.com"}/api/roles`;

export const obtenerRoles = async () => {
  const res = await axios.get(baseUrl, { withCredentials: true });
  return res.data;
};

export const crearRol = async (rol: any) => {
  const res = await axios.post(baseUrl, rol, { withCredentials: true });
  return res.data;
};

export const actualizarRol = async (id: number, rol: any) => {
  const res = await axios.put(`${baseUrl}/${id}`, rol, { withCredentials: true });
  return res.data;
};

export const eliminarRol = async (id: number) => {
  const res = await axios.delete(`${baseUrl}/${id}`, { withCredentials: true });
  return res.data;
};
