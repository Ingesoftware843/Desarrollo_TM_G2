import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://api-tm-57df.onrender.com"}/api/operadores`;

export const obtenerOperadores = async () => {
  const res = await axios.get(baseUrl, { withCredentials: true });
  return res.data;
};

export const crearOperador = async (operador: any) => {
  const res = await axios.post(baseUrl, operador, { withCredentials: true });
  return res.data;
};

export const actualizarOperador = async (id: number, operador: any) => {
  const body = {
    Nombre: operador.nombre,
    DPI: operador.dpi,
    Direccion: operador.direccion,
    Telefono: operador.telefono,
    Email: operador.email,
    Estado: operador.estado,
    FechaContratacion: operador.fechaContratacion,
    RolID: operador.rolID,
  };

  const res = await axios.put(`${baseUrl}/${id}`, body, { withCredentials: true });
  return res.data;
};

export const eliminarOperador = async (id: number) => {
  const res = await axios.delete(`${baseUrl}/${id}`, { withCredentials: true });
  return res.data;
};
