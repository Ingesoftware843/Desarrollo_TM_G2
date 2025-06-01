import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const obtenerAlertas = async () => {
  const res = await axios.get(`${API}/api/alertas`, { withCredentials: true });
  return res.data;
};

export const crearAlerta = async (data: any) => {
  const res = await axios.post(`${API}/api/alertas`, data, { withCredentials: true });
  return res.data;
};

export const actualizarAlerta = async (id: number, data: any) => {
  const res = await axios.put(`${API}/api/alertas/${id}`, data, { withCredentials: true });
  return res.data;
};

export const eliminarAlerta = async (id: number) => {
  const res = await axios.delete(`${API}/api/alertas/${id}`, { withCredentials: true });
  return res.data;
};

export const verificarTodasAlertas = async () => {
  const res = await axios.get(`${API}/api/alertas/verificar-todo`, { withCredentials: true });
  return res.data;
};
