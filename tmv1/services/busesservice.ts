import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://api-tm-57df.onrender.com"}/api/buses`;

export const obtenerBuses = async () => {
  const res = await axios.get(baseUrl, { withCredentials: true });
  return res.data;
};

export const crearBus = async (bus: any) => {
  const res = await axios.post(baseUrl, bus, { withCredentials: true });
  return res.data;
};

export const actualizarBus = async (id: number, bus: any) => {
  const res = await axios.put(`${baseUrl}/${id}`, bus, { withCredentials: true });
  return res.data;
};

export const eliminarBus = async (id: number) => {
  const res = await axios.delete(`${baseUrl}/${id}`, { withCredentials: true });
  return res.data;
};
