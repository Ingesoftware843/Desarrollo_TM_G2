import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://api-tm-57df.onrender.com"}/api/estaciones`;

export const obtenerEstaciones = async () => {
  const res = await axios.get(baseUrl, { withCredentials: true });
  return res.data;
};

export const obtenerEstacionesConDetalle = async () => {
  const res = await axios.get(`${baseUrl}/detalle`, { withCredentials: true });
  return res.data;
};

export const crearEstacion = async (estacion: any) => {
  const res = await axios.post(baseUrl, estacion, { withCredentials: true });
  return res.data;
};

export const actualizarEstacion = async (id: number, estacion: any) => {
  const res = await axios.put(`${baseUrl}/${id}`, estacion, { withCredentials: true });
  return res.data;
};

export const eliminarEstacion = async (id: number) => {
  const res = await axios.delete(`${baseUrl}/${id}`, { withCredentials: true });
  return res.data;
};
