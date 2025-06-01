// src/services/usuariosService.ts
import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://api-tm-57df.onrender.com"}/api/usuarios`;

export const obtenerUsuarios = async () => {
  const res = await axios.get(baseUrl, { withCredentials: true });
  return res.data;
};

export const crearUsuario = async (usuario: any) => {
  const res = await axios.post(baseUrl, usuario, { withCredentials: true });
  return res.data;
};

export const actualizarUsuario = async (id: number, usuario: any) => {
  const res = await axios.put(`${baseUrl}/${id}`, usuario, { withCredentials: true });
  return res.data;
};

export const eliminarUsuario = async (id: number) => {
  const res = await axios.delete(`${baseUrl}/${id}`, { withCredentials: true });
  return res.data;
};
