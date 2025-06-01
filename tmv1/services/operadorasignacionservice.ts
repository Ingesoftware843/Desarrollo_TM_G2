import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL ||  "https://api-tm-57df.onrender.com";

export const obtenerAsignacionesPiloto = async () => {
  const res = await axios.get(`${baseUrl}/asignacion-pilotos`, { withCredentials: true });
  return res.data;
};

export const obtenerAsignacionesGuardia = async () => {
  const res = await axios.get(`${baseUrl}/asignacion-guardias`, { withCredentials: true });
  return res.data;
};

export const obtenerAsignacionesOperador = async () => {
  const res = await axios.get(`${baseUrl}/asignacion-operadores`, { withCredentials: true });
  return res.data;
};

export const crearAsignacionPiloto = async (data: any) => {
  const res = await axios.post(`${baseUrl}/asignacion-pilotos`, data, { withCredentials: true });
  return res.data;
};

export const crearAsignacionGuardia = async (data: any) => {
  const res = await axios.post(`${baseUrl}/asignacion-guardias`, data, { withCredentials: true });
  return res.data;
};

export const crearAsignacionOperador = async (data: any) => {
  const res = await axios.post(`${baseUrl}/asignacion-operadores`, data, { withCredentials: true });
  return res.data;
};

export const actualizarAsignacion = async (tipo: string, id: number, data: any) => {
  const res = await axios.put(`${baseUrl}/asignacion-${tipo}s/${id}`, data, { withCredentials: true });
  return res.data;
};

export const eliminarAsignacion = async (tipo: string, id: number) => {
  const res = await axios.delete(`${baseUrl}/asignacion-${tipo}s/${id}`, { withCredentials: true });
  return res.data;
};
