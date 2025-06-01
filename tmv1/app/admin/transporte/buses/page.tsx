"use client";

import { useEffect, useState } from "react";
import TablaBuses from "@/components/admin/tablabuses";
import ModalBus from "@/components/admin/modalbus";
import {
  obtenerBuses,
  crearBus,
  actualizarBus,
  eliminarBus,
} from "@/services/busesservice";

interface BusCompleto {
  id: number;
  placa: string;
  capacidadMaxima: number;
  estado: string;
  linea: string;
  lineaID?: number;
  parqueoID?: number;
  parqueoTexto: string;
}

export default function GestionBusesPage() {
  const [buses, setBuses] = useState<BusCompleto[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [busEditar, setBusEditar] = useState<BusCompleto | null>(null);

  const cargarBuses = async () => {
    const data = await obtenerBuses();
    setBuses(
      data.map((b: any) => ({
        id: b.BusID,
        placa: b.Placa,
        capacidadMaxima: b.CapacidadMaxima,
        estado: b.Estado,
        linea: b.Linea,
        lineaID: b.LineaID,
        parqueoID: b.ParqueoID,
        parqueoTexto: `Parqueo #${b.ParqueoID}`,
      })),
    );
  };

  useEffect(() => {
    cargarBuses();
  }, []);

  const guardarBus = async (nuevo: any) => {
    if (nuevo.id) {
      const { id, ...body } = nuevo;
      await actualizarBus(id, {
        Placa: body.placa,
        CapacidadMaxima: body.capacidadMaxima,
        Estado: body.estado,
        LineaID: body.lineaID,
        ParqueoID: body.parqueoID,
      });
    } else {
      await crearBus({
        Placa: nuevo.placa,
        CapacidadMaxima: nuevo.capacidadMaxima,
        Estado: nuevo.estado,
        LineaID: nuevo.lineaID,
        ParqueoID: nuevo.parqueoID,
      });
    }
    await cargarBuses();
    setModalAbierto(false);
  };

  const eliminarHandler = async (id: number) => {
    await eliminarBus(id);
    await cargarBuses();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white sm:mb-0">
          Gestión de Buses
        </h1>
        <button
          className="rounded bg-blue-600 px-5 py-2 text-white shadow transition hover:bg-blue-700"
          onClick={() => {
            setBusEditar(null);
            setModalAbierto(true);
          }}
        >
          + Nuevo bus
        </button>
      </div>

      <TablaBuses
        buses={buses}
        onEliminar={eliminarHandler}
        onEditar={(b) => {
          setBusEditar(b);
          setModalAbierto(true);
        }}
      />

      <ModalBus
        abierto={modalAbierto}
        bus={
          busEditar
            ? {
                id: busEditar.id,
                placa: busEditar.placa,
                capacidadMaxima: busEditar.capacidadMaxima,
                estado: busEditar.estado,
                lineaID: busEditar.lineaID ?? 0,
                parqueoID: busEditar.parqueoID ?? 0,
              }
            : null
        }
        onCerrar={() => setModalAbierto(false)}
        onGuardar={guardarBus}
      />
    </div>
  );
}
