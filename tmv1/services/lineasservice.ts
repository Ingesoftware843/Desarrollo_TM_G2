import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://api-tm-57df.onrender.com"}/api/lineas`;

export const obtenerLineas = async () => {
  const res = await axios.get(baseUrl, { withCredentials: true });
  return res.data;
};

export const crearLinea = async (linea: any) => {
  const res = await axios.post(baseUrl, linea, { withCredentials: true });
  return res.data;
};

export const actualizarLinea = async (id: number, linea: any) => {
  const res = await axios.put(`${baseUrl}/${id}`, linea, { withCredentials: true });
  return res.data;
};

export const eliminarLinea = async (id: number) => {
  const res = await axios.delete(`${baseUrl}/${id}`, { withCredentials: true });
  return res.data;
};
