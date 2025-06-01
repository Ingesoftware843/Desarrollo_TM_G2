import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://api-tm-57df.onrender.com"}/api/parqueos`;

export const obtenerParqueos = async () => {
  const res = await axios.get(baseUrl, { withCredentials: true });
  return res.data;
};

export const crearParqueo = async (parqueo: any) => {
  const res = await axios.post(baseUrl, parqueo, { withCredentials: true });
  return res.data;
};

export const actualizarParqueo = async (id: number, parqueo: any) => {
  const res = await axios.put(`${baseUrl}/${id}`, parqueo, { withCredentials: true });
  return res.data;
};

export const eliminarParqueo = async (id: number) => {
  const res = await axios.delete(`${baseUrl}/${id}`, { withCredentials: true });
  return res.data;
};
