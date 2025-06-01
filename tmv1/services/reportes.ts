import axios from "axios";
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const obtenerTodosBuses = async () => {
  const res = await axios.get(`${API}/api/buses/detalle`, { withCredentials: true });
  return res.data;
};

export const obtenerHistorialEducativo = async () => {
  const res = await axios.get(`${API}/api/historial`, { withCredentials: true });
  return res.data;
};

export const obtenerAsignacionesPilotos = async () => {
  const res = await axios.get(`${API}/api/asignaciones/pilotos`, { withCredentials: true });
  return res.data;
};

export const obtenerAlertas = async () => {
  const res = await axios.get(`${API}/api/alertas`, { withCredentials: true });
  return res.data;
};
