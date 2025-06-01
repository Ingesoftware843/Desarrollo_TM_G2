"use client";

import { useEffect, useState } from "react";
import TablaEstaciones from "@/components/admin/tablaestaciones";
import ModalEstacion from "@/components/admin/modalestaciones";
import {
  obtenerEstacionesConDetalle,
  crearEstacion,
  actualizarEstacion,
  eliminarEstacion,
} from "@/services/estacionesService";

interface EstacionCompleta {
  id: number;
  nombre: string;
  direccion: string;
  municipalidad: string;
  tieneParqueo: boolean;
  cantidadAccesos: number;
  lineaAsignada: string;
  municipalidadID?: number;
  capacidadEstimada: number;
  estado?: string;
}

export default function GestionEstacionesPage() {
  const [estaciones, setEstaciones] = useState<EstacionCompleta[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [estacionEditar, setEstacionEditar] = useState<EstacionCompleta | null>(
    null,
  );

  const cargarEstaciones = async () => {
    const data = await obtenerEstacionesConDetalle();
    setEstaciones(
      data.map((e: any) => ({
        id: e.EstacionID,
        nombre: e.Nombre,
        direccion: e.Ubicacion,
        capacidadEstimada: e.CapacidadEstimada ?? 0,
        municipalidad: e.Municipalidad,
        tieneParqueo: e.TieneParqueo === 1,
        cantidadAccesos: e.CantidadAccesos,
        lineaAsignada: e.LineaAsignada,
        municipalidadID: e.MunicipalidadID,
        estado: e.Estado,
      })),
    );
  };

  useEffect(() => {
    cargarEstaciones();
  }, []);

  const guardarEstacion = async (nuevo: any) => {
    if (nuevo.id) {
      const { id, ...body } = nuevo;
      await actualizarEstacion(id, {
        Nombre: body.nombre,
        MunicipalidadID: body.municipalidadID,
        Ubicacion: body.ubicacion,
        CapacidadEstimada: body.capacidadEstimada || 0,
        Estado: body.estado,
      });
    } else {
      await crearEstacion({
        Nombre: nuevo.nombre,
        MunicipalidadID: nuevo.municipalidadID,
        Ubicacion: nuevo.ubicacion,
        CapacidadEstimada: nuevo.capacidadEstimada || 0,
        Estado: nuevo.estado,
      });
    }
    await cargarEstaciones();
    setModalAbierto(false);
  };

  const eliminarHandler = async (id: number) => {
    await eliminarEstacion(id);
    await cargarEstaciones();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white sm:mb-0">
          Gestión de Estaciones
        </h1>
        <button
          className="rounded bg-blue-600 px-5 py-2 text-white shadow transition hover:bg-blue-700"
          onClick={() => {
            setEstacionEditar(null);
            setModalAbierto(true);
          }}
        >
          + Nueva estación
        </button>
      </div>

      <TablaEstaciones
        estaciones={estaciones}
        onEditar={(e) => {
          setEstacionEditar(e);
          setModalAbierto(true);
        }}
        onEliminar={eliminarHandler}
      />

      <ModalEstacion
        abierto={modalAbierto}
        estacion={
          estacionEditar
            ? {
                id: estacionEditar.id,
                nombre: estacionEditar.nombre,
                municipalidadID: estacionEditar.municipalidadID || 0,
                ubicacion: estacionEditar.direccion,
                capacidadEstimada: estacionEditar.capacidadEstimada,
                estado: estacionEditar.estado || "Activo",
              }
            : null
        }
        onCerrar={() => setModalAbierto(false)}
        onGuardar={guardarEstacion}
      />
    </div>
  );
}
