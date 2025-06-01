"use client";

import { useEffect, useState } from "react";
import TablaAccesos from "@/components/admin/tablaaccesos";
import ModalAcceso from "@/components/admin/modalacceso";
import {
  obtenerAccesos,
  crearAcceso,
  actualizarAcceso,
  eliminarAcceso,
} from "@/services/accesosservice";

interface AccesoCompleto {
  id: number;
  descripcion: string;
  estado: string;
  estacion: string; // NombreEstacion
  estacionID?: number;
}

export default function GestionAccesosPage() {
  const [accesos, setAccesos] = useState<AccesoCompleto[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [accesoEditar, setAccesoEditar] = useState<AccesoCompleto | null>(null);

  const cargarAccesos = async () => {
    const data = await obtenerAccesos();
    setAccesos(
      data.map((a: any) => ({
        id: a.AccesoID,
        descripcion: a.Descripcion,
        estado: a.Estado,
        estacion: a.NombreEstacion,
        estacionID: a.EstacionID,
      })),
    );
  };

  useEffect(() => {
    cargarAccesos();
  }, []);

  const guardarAcceso = async (nuevo: any) => {
    if (nuevo.id) {
      const { id, ...body } = nuevo;
      await actualizarAcceso(id, {
        Descripcion: body.descripcion,
        Estado: body.estado,
        EstacionID: body.estacionID,
      });
    } else {
      await crearAcceso({
        Descripcion: nuevo.descripcion,
        Estado: nuevo.estado,
        EstacionID: nuevo.estacionID,
      });
    }
    await cargarAccesos();
    setModalAbierto(false);
  };

  const eliminarAccesoHandler = async (id: number) => {
    await eliminarAcceso(id);
    await cargarAccesos();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white sm:mb-0">
          Gestión de Accesos
        </h1>
        <button
          className="rounded bg-blue-600 px-5 py-2 text-white shadow transition hover:bg-blue-700"
          onClick={() => {
            setAccesoEditar(null);
            setModalAbierto(true);
          }}
        >
          + Nuevo acceso
        </button>
      </div>

      <TablaAccesos
        accesos={accesos}
        onEditar={(a) => {
          setAccesoEditar(a);
          setModalAbierto(true);
        }}
        onEliminar={eliminarAccesoHandler}
      />

      <ModalAcceso
        abierto={modalAbierto}
        acceso={
          accesoEditar
            ? {
                id: accesoEditar.id,
                descripcion: accesoEditar.descripcion,
                estado: accesoEditar.estado,
                estacionID: accesoEditar.estacionID || 0, // aseguras que nunca sea undefined
              }
            : null
        }
        onCerrar={() => setModalAbierto(false)}
        onGuardar={guardarAcceso}
      />
    </div>
  );
}
