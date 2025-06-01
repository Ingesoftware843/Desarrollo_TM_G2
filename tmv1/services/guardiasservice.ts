import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://api-tm-57df.onrender.com"}/api/guardias`;

export const obtenerGuardias = async () => {
  const res = await axios.get(baseUrl, { withCredentials: true });
  return res.data;
};

export const crearGuardia = async (guardia: any) => {
  const res = await axios.post(baseUrl, {
    Nombre: guardia.nombre,
    DPI: guardia.dpi,
    Direccion: guardia.direccion,
    Telefono: guardia.telefono,
    Email: guardia.email,
    Estado: guardia.estado,
    FechaContratacion: guardia.fechaContratacion,
    RolID: guardia.rolId,
  }, { withCredentials: true });
  return res.data;
};

export const actualizarGuardia = async (id: number, guardia: any) => {
  const res = await axios.put(`${baseUrl}/${id}`, {
    Nombre: guardia.nombre,
    DPI: guardia.dpi,
    Direccion: guardia.direccion,
    Telefono: guardia.telefono,
    Email: guardia.email,
    Estado: guardia.estado,
    FechaContratacion: guardia.fechaContratacion,
    RolID: guardia.rolId,
  }, { withCredentials: true });
  return res.data;
};

export const eliminarGuardia = async (id: number) => {
  const res = await axios.delete(`${baseUrl}/${id}`, { withCredentials: true });
  return res.data;
};
