import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://api-tm-57df.onrender.com"}/api/municipalidades`;

export const obtenerMunicipalidades = async () => {
  const res = await axios.get(baseUrl, { withCredentials: true });
  return res.data;
};

export const crearMunicipalidad = async (municipalidad: Omit<any, "id">) => {
  const res = await axios.post(baseUrl, municipalidad, { withCredentials: true });
  return res.data;
};

export const actualizarMunicipalidad = async (id: number, municipalidad: Omit<any, "id">) => {
  const res = await axios.put(`${baseUrl}/${id}`, municipalidad, { withCredentials: true });
  return res.data;
};

export const eliminarMunicipalidad = async (id: number) => {
  const res = await axios.delete(`${baseUrl}/${id}`, { withCredentials: true });
  return res.data;
};
