import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://api-tm-57df.onrender.com"}/api/accesos`;

export const obtenerAccesos = async () => {
  const res = await axios.get(baseUrl, { withCredentials: true });
  return res.data;
};

export const crearAcceso = async (acceso: any) => {
  const res = await axios.post(baseUrl, acceso, { withCredentials: true });
  return res.data;
};

export const actualizarAcceso = async (id: number, acceso: any) => {
  const res = await axios.put(`${baseUrl}/${id}`, acceso, { withCredentials: true });
  return res.data;
};

export const eliminarAcceso = async (id: number) => {
  const res = await axios.delete(`${baseUrl}/${id}`, { withCredentials: true });
  return res.data;
};
