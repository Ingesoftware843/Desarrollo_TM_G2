"use client";

import { useEffect, useState } from "react";
import TablaGuardias from "@/components/admin/tablaguardias";
import ModalGuardia from "@/components/admin/modalguardia";
import {
  obtenerGuardias,
  crearGuardia,
  actualizarGuardia,
  eliminarGuardia,
} from "@/services/guardiasservice";

interface GuardiaCompleto {
  id?: number;
  nombre: string;
  dpi: string;
  telefono: string;
  direccion: string;
  email: string;
  fechaContratacion: string;
  rolId: number;
  accesoAsignado?: string;
  estadoAcceso?: string;
  estado: string;
}

interface GuardiaEditable {
  id?: number;
  nombre: string;
  dpi: string;
  telefono: string;
  direccion: string;
  email: string;
  fechaContratacion: string;
  rolId: number;
  estado: string;
}

export default function GestionGuardiasPage() {
  const [guardias, setGuardias] = useState<GuardiaCompleto[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [guardiaEditar, setGuardiaEditar] = useState<GuardiaEditable | null>(
    null,
  );

  useEffect(() => {
    cargarGuardias();
  }, []);

  const cargarGuardias = async () => {
    try {
      const data = await obtenerGuardias();
      setGuardias(
        data.map((g: any) => ({
          id: g.GuardiaID,
          nombre: g.Nombre,
          dpi: g.DPI,
          telefono: g.Telefono,
          direccion: g.Direccion,
          email: g.Email,
          fechaContratacion: g.FechaContratacion?.slice(0, 10),
          rolId: g.RolID || 1,
          accesoAsignado: g.AccesoAsignado || "",
          estadoAcceso: g.EstadoAcceso || "",
          estado: g.Estado,
        })),
      );
    } catch (error) {
      console.error("Error cargando guardias", error);
    }
  };

  const eliminarGuardiaHandler = async (id: number) => {
    try {
      await eliminarGuardia(id);
      setGuardias((prev) => prev.filter((g) => g.id !== id));
    } catch (error) {
      console.error("Error eliminando guardia", error);
    }
  };

  const editarGuardiaHandler = (guardia: GuardiaCompleto) => {
    const editable: GuardiaEditable = {
      id: guardia.id,
      nombre: guardia.nombre,
      dpi: guardia.dpi,
      telefono: guardia.telefono,
      direccion: guardia.direccion,
      email: guardia.email,
      fechaContratacion: guardia.fechaContratacion,
      rolId: guardia.rolId,
      estado: guardia.estado,
    };
    setGuardiaEditar(editable);
    setModalAbierto(true);
  };

  const guardarGuardiaHandler = async (nuevo: GuardiaEditable) => {
    try {
      if (nuevo.id) {
        await actualizarGuardia(nuevo.id, nuevo);
        await cargarGuardias();
      } else {
        await crearGuardia(nuevo);
        await cargarGuardias();
      }
      setModalAbierto(false);
    } catch (error) {
      console.error("Error guardando guardia", error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white sm:mb-0">
          Gestión de Guardias
        </h1>
        <button
          className="rounded bg-blue-600 px-5 py-2 text-white shadow transition hover:bg-blue-700"
          onClick={() => {
            setGuardiaEditar(null);
            setModalAbierto(true);
          }}
        >
          + Nuevo guardia
        </button>
      </div>

      <TablaGuardias
        guardias={guardias}
        onEditar={editarGuardiaHandler}
        onEliminar={eliminarGuardiaHandler}
      />

      <ModalGuardia
        abierto={modalAbierto}
        guardia={guardiaEditar}
        onCerrar={() => setModalAbierto(false)}
        onGuardar={guardarGuardiaHandler}
      />
    </div>
  );
}
