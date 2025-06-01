"use client";

import { useEffect, useState } from "react";
import TablaParqueos from "@/components/admin/tablaparqueos";
import ModalParqueo from "@/components/admin/modalparqueo";
import {
  obtenerParqueos,
  crearParqueo,
  actualizarParqueo,
  eliminarParqueo,
} from "@/services/parqueosService";

interface ParqueoCompleto {
  id: number;
  estacion: string;
  capacidad: number;
  estado: string;
  estacionID?: number;
}

export default function GestionParqueosPage() {
  const [parqueos, setParqueos] = useState<ParqueoCompleto[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [parqueoEditar, setParqueoEditar] = useState<ParqueoCompleto | null>(
    null,
  );

  const cargarParqueos = async () => {
    const data = await obtenerParqueos();
    setParqueos(
      data.map((p: any) => ({
        id: p.ParqueoID,
        estacion: p.NombreEstacion,
        capacidad: p.Capacidad,
        estado: p.Estado,
        estacionID: p.EstacionID,
      })),
    );
  };

  useEffect(() => {
    cargarParqueos();
  }, []);

  const guardarParqueo = async (nuevo: any) => {
    if (nuevo.id) {
      const { id, ...body } = nuevo;
      await actualizarParqueo(id, {
        EstacionID: body.estacionID,
        Capacidad: body.capacidad,
        Estado: body.estado,
      });
    } else {
      await crearParqueo({
        EstacionID: nuevo.estacionID,
        Capacidad: nuevo.capacidad,
        Estado: nuevo.estado,
      });
    }
    await cargarParqueos();
    setModalAbierto(false);
  };

  const eliminarParqueoHandler = async (id: number) => {
    await eliminarParqueo(id);
    await cargarParqueos();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white sm:mb-0">
          Gestión de Parqueos
        </h1>
        <button
          className="rounded bg-blue-600 px-5 py-2 text-white shadow transition hover:bg-blue-700"
          onClick={() => {
            setParqueoEditar(null);
            setModalAbierto(true);
          }}
        >
          + Nuevo parqueo
        </button>
      </div>

      <TablaParqueos
        parqueos={parqueos}
        onEditar={(p) => {
          setParqueoEditar(p);
          setModalAbierto(true);
        }}
        onEliminar={eliminarParqueoHandler}
      />

      <ModalParqueo
        abierto={modalAbierto}
        parqueo={
          parqueoEditar
            ? {
                id: parqueoEditar.id,
                estacionID: parqueoEditar.estacionID || 0,
                capacidad: parqueoEditar.capacidad,
                estado: parqueoEditar.estado,
              }
            : null
        }
        onCerrar={() => setModalAbierto(false)}
        onGuardar={guardarParqueo}
      />
    </div>
  );
}
