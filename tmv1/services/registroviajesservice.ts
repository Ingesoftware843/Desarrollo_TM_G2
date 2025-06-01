import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://api-tm-57df.onrender.com"}/api/registro-viajes`;

export const obtenerViajes = async () => {
  const res = await axios.get(baseUrl, { withCredentials: true });
  return res.data;
};

export const crearViaje = async (viaje: any) => {
  const res = await axios.post(baseUrl, {
    BusID: viaje.busID,
    EstacionOrigenID: viaje.estacionOrigenID,
    EstacionDestinoID: viaje.estacionDestinoID,
    FechaHoraSalida: new Date(viaje.fechaHoraSalida).toISOString(),
    FechaHoraLlegada: viaje.fechaHoraLlegada ? new Date(viaje.fechaHoraLlegada).toISOString() : null,
    CantidadPasajeros: viaje.cantidadPasajeros,
    Estado: viaje.estado,
  }, { withCredentials: true });

  return res.data;
};

export const actualizarViaje = async (id: number, viaje: any) => {
  const res = await axios.put(`${baseUrl}/${id}`, {
    BusID: viaje.busID,
    EstacionOrigenID: viaje.estacionOrigenID,
    EstacionDestinoID: viaje.estacionDestinoID,
   FechaHoraSalida: new Date(viaje.fechaHoraSalida).toISOString(),
    FechaHoraLlegada: viaje.fechaHoraLlegada ? new Date(viaje.fechaHoraLlegada).toISOString() : null,
    CantidadPasajeros: viaje.cantidadPasajeros,
    Estado: viaje.estado,
  }, { withCredentials: true });

  return res.data;
};

export const eliminarViaje = async (id: number) => {
  const res = await axios.delete(`${baseUrl}/${id}`, { withCredentials: true });
  return res.data;
};
