import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://api-tm-57df.onrender.com"}/api/viajesusuario`;

export const obtenerMisViajes = async () => {
  const res = await axios.get(baseUrl, { withCredentials: true });
  return res.data;
};

export const crearMiViaje = async (data: {
  EstacionOrigenID: number;
  EstacionDestinoID: number;
}) => {
  const res = await axios.post(baseUrl, data, { withCredentials: true });
  return res.data;
};
