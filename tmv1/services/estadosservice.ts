import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://api-tm-57df.onrender.com"}/api/estados`;

export const obtenerEstados = async () => {
  const res = await axios.get(baseUrl, { withCredentials: true });
  return res.data;
};

export const crearEstado = async (estado: { NombreEstado: string }) => {
  const res = await axios.post(baseUrl, estado, { withCredentials: true });
  return res.data;
};

export const actualizarEstado = async (id: number, estado: { NombreEstado: string }) => {
  const res = await axios.put(`${baseUrl}/${id}`, estado, { withCredentials: true });
  return res.data;
};

export const eliminarEstado = async (id: number) => {
  const res = await axios.delete(`${baseUrl}/${id}`, { withCredentials: true });
  return res.data;
};