"use client";

import { useEffect, useState } from "react";
import {
  obtenerViajes,
  crearViaje,
  actualizarViaje,
  eliminarViaje,
} from "@/services/registroviajesservice";
import { obtenerBuses } from "@/services/busesservice";
import { obtenerEstaciones } from "@/services/estacionesService";
import TablaRegistroViajes from "@/components/admin/tablaregistroviajes";
import ModalRegistroViaje from "@/components/admin/modalregistroviaje";

interface ViajeCompleto {
  id?: number;
  busID: number;
  placa: string;
  estacionOrigenID: number;
  nombreOrigen: string;
  estacionDestinoID: number;
  nombreDestino: string;
  fechaHoraSalida: string;
  fechaHoraLlegada: string;
  cantidadPasajeros: number;
  estado: string;
}

interface ViajeEditable {
  id?: number;
  busID: number;
  estacionOrigenID: number;
  estacionDestinoID: number;
  fechaHoraSalida: string;
  fechaHoraLlegada: string;
  cantidadPasajeros: number;
  estado: string;
}

export default function GestionViajesPage() {
  const [viajes, setViajes] = useState<ViajeCompleto[]>([]);
  const [todosViajes, setTodosViajes] = useState<any[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [viajeEditar, setViajeEditar] = useState<ViajeEditable | null>(null);
  const [buses, setBuses] = useState<any[]>([]);
  const [estaciones, setEstaciones] = useState<any[]>([]);

  useEffect(() => {
    const cargarTodo = async () => {
      try {
        const [busData, estData, viajesData] = await Promise.all([
          obtenerBuses(),
          obtenerEstaciones(),
          obtenerViajes(),
        ]);
        setBuses(busData);
        setEstaciones(estData);
        setTodosViajes(viajesData);
      } catch (error) {
        console.error("Error cargando datos iniciales", error);
      }
    };
    cargarTodo();
  }, []);

  useEffect(() => {
    const viajesFormateados = todosViajes.map((v: any) => ({
      id: v.ViajeID,
      busID: v.BusID,
      estacionOrigenID: v.EstacionOrigenID,
      estacionDestinoID: v.EstacionDestinoID,
      placa: v.Bus,
      nombreOrigen: v.EstacionOrigen,
      nombreDestino: v.EstacionDestino,
      fechaHoraSalida: v.FechaHoraSalida?.slice(0, 16),
      fechaHoraLlegada: v.FechaHoraLlegada?.slice(0, 16) || "",
      cantidadPasajeros: v.CantidadPasajeros,
      estado: v.Estado,
    }));

    setViajes(viajesFormateados);
  }, [todosViajes, buses, estaciones]);

  const eliminarHandler = async (id: number) => {
    try {
      await eliminarViaje(id);
      const nuevos = await obtenerViajes();
      setTodosViajes(nuevos);
    } catch (err) {
      console.error("Error eliminando viaje", err);
    }
  };

  const editarHandler = (viaje: ViajeCompleto) => {
    const editable: ViajeEditable = {
      id: viaje.id,
      busID: viaje.busID,
      estacionOrigenID: viaje.estacionOrigenID,
      estacionDestinoID: viaje.estacionDestinoID,
      fechaHoraSalida: viaje.fechaHoraSalida,
      fechaHoraLlegada: viaje.fechaHoraLlegada,
      cantidadPasajeros: viaje.cantidadPasajeros,
      estado: viaje.estado,
    };
    setViajeEditar(editable);
    setModalAbierto(true);
  };

  const guardarHandler = async (nuevo: ViajeEditable) => {
    try {
      if (nuevo.id) {
        await actualizarViaje(nuevo.id, nuevo);
      } else {
        await crearViaje(nuevo);
      }
      const actualizados = await obtenerViajes();
      setTodosViajes(actualizados);
      setModalAbierto(false);
    } catch (err) {
      console.error("Error guardando viaje", err);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Registro de Viajes
        </h1>
        <button
          className="rounded bg-blue-600 px-5 py-2 text-white shadow transition hover:bg-blue-700"
          onClick={() => {
            setViajeEditar(null);
            setModalAbierto(true);
          }}
        >
          + Nuevo viaje
        </button>
      </div>

      <TablaRegistroViajes
        viajes={viajes}
        onEditar={editarHandler}
        onEliminar={eliminarHandler}
      />

      <ModalRegistroViaje
        abierto={modalAbierto}
        viaje={viajeEditar}
        onCerrar={() => setModalAbierto(false)}
        onGuardar={guardarHandler}
        buses={buses}
        estaciones={estaciones}
      />
    </div>
  );
}
