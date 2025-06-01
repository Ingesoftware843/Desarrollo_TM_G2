import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://api-tm-57df.onrender.com"}/api/historial-educativo`;

export const obtenerHistorial = async () => {
  const res = await axios.get(baseUrl, { withCredentials: true });
  return res.data;
};


export const crearHistorial = async (data: any) => {
  const res = await axios.post(baseUrl, data, { withCredentials: true });
  return res.data;
};

export const actualizarHistorial = async (id: number, historial: any) => {
  const res = await axios.put(`${baseUrl}/${id}`, {
    NivelEducativo: historial.nivelEducativo,
    Institucion: historial.institucion,
    FechaInicio: historial.fechaInicio,
    FechaFin: historial.fechaFin,
    Certificacion: historial.certificacion,
  }, { withCredentials: true });
  return res.data;
};


export const eliminarHistorial = async (id: number) => {
  const res = await axios.delete(`${baseUrl}/${id}`, { withCredentials: true });
  return res.data;
};
