import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://api-tm-57df.onrender.com"}/api/pilotos`;

export const obtenerPilotos = async () => {
  const res = await axios.get(baseUrl, { withCredentials: true });
  return res.data;
};


export const crearPiloto = async (piloto: any) => {
  const res = await axios.post(baseUrl, piloto, { withCredentials: true });
  return res.data;
};

export const actualizarPiloto = async (id: number, piloto: any) => {
  const data = {
    Nombre: piloto.nombre,
    DPI: piloto.dpi,
    Direccion: piloto.direccion,
    Telefono: piloto.telefono,
    Email: piloto.email,
    Estado: piloto.estado,
    FechaContratacion: piloto.fechaContratacion,
    LicenciaTipo: piloto.licenciaTipo,
    FechaVencimientoLicencia: piloto.fechaVencimientoLicencia,
  };

  const res = await axios.put(`${baseUrl}/${id}`, data, { withCredentials: true });
  return res.data;
};

export const eliminarPiloto = async (id: number) => {
  const res = await axios.delete(`${baseUrl}/${id}`, { withCredentials: true });
  return res.data;
};
