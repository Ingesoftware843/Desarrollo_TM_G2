"use client";

import { useEffect, useState } from "react";
import {
  obtenerHistorial,
  crearHistorial,
  actualizarHistorial,
  eliminarHistorial,
} from "@/services/historialservice";
import { obtenerPilotos } from "@/services/pilotosservice";
import TablaHistorial from "@/components/admin/tablahistorial";
import ModalHistorial from "@/components/admin/modalhistorial";

interface HistorialCompleto {
  id?: number;
  pilotoId: number;
  nombrePiloto: string;
  nivelEducativo: string;
  institucion: string;
  fechaInicio: string;
  fechaFin: string;
  certificacion: string;
}

interface HistorialEditable {
  id?: number;
  pilotoId: number;
  nivelEducativo: string;
  institucion: string;
  fechaInicio: string;
  fechaFin: string;
  certificacion: string;
}

export default function GestionHistorialPage() {
  const [historiales, setHistoriales] = useState<HistorialCompleto[]>([]);
  const [todosHistoriales, setTodosHistoriales] = useState<any[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [historialEditar, setHistorialEditar] =
    useState<HistorialEditable | null>(null);
  const [pilotoId, setPilotoId] = useState(0);
  const [pilotos, setPilotos] = useState<any[]>([]);

  useEffect(() => {
    const cargarTodo = async () => {
      try {
        const pilotosData = await obtenerPilotos();
        setPilotos(pilotosData);

        const data = await obtenerHistorial();
        setTodosHistoriales(data);
      } catch (error) {
        console.error("Error al cargar historial y pilotos", error);
      }
    };
    cargarTodo();
  }, []);

  useEffect(() => {
    if (todosHistoriales.length === 0 || pilotos.length === 0) return;

    const filtrado =
      pilotoId === 0
        ? todosHistoriales
        : todosHistoriales.filter((h: any) => h.PilotoID === pilotoId);

    const historialConNombres = filtrado.map((h: any) => ({
      id: h.HistorialID,
      pilotoId: h.PilotoID,
      nombrePiloto:
        pilotos.find((p) => p.PilotoID === h.PilotoID)?.Nombre || "",
      nivelEducativo: h.NivelEducativo,
      institucion: h.Institucion,
      fechaInicio: h.FechaInicio?.slice(0, 10),
      fechaFin: h.FechaFin?.slice(0, 10) || "",
      certificacion: h.Certificacion || "",
    }));

    setHistoriales(historialConNombres);
  }, [pilotoId, todosHistoriales, pilotos]);

  const eliminarHistorialHandler = async (id: number) => {
    try {
      await eliminarHistorial(id);
      setTodosHistoriales((prev) => prev.filter((h) => h.HistorialID !== id));
    } catch (error) {
      console.error("Error eliminando historial", error);
    }
  };

  const editarHistorialHandler = (historial: HistorialCompleto) => {
    const editable: HistorialEditable = {
      id: historial.id,
      pilotoId: historial.pilotoId,
      nivelEducativo: historial.nivelEducativo,
      institucion: historial.institucion,
      fechaInicio: historial.fechaInicio,
      fechaFin: historial.fechaFin,
      certificacion: historial.certificacion,
    };
    setHistorialEditar(editable);
    setModalAbierto(true);
  };

  const guardarHistorialHandler = async (nuevo: HistorialEditable) => {
    try {
      if (nuevo.id) {
        await actualizarHistorial(nuevo.id, nuevo);
      } else {
        await crearHistorial(nuevo);
      }

      const data = await obtenerHistorial();
      setTodosHistoriales(data);
      setModalAbierto(false);
    } catch (error) {
      console.error("Error guardando historial", error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-white">
            Filtrar por piloto:
          </label>
          <select
            className="mt-1 w-full rounded border px-3 py-2 text-sm text-black dark:bg-dark dark:text-white"
            value={pilotoId}
            onChange={(e) => setPilotoId(parseInt(e.target.value))}
          >
            <option value={0}>Todos los pilotos</option>
            {pilotos.map((p) => (
              <option key={p.PilotoID} value={p.PilotoID}>
                {p.Nombre}
              </option>
            ))}
          </select>
        </div>

        <button
          className="rounded bg-blue-600 px-5 py-2 text-white shadow transition hover:bg-blue-700"
          onClick={() => {
            setHistorialEditar(null);
            setModalAbierto(true);
          }}
        >
          + Nuevo registro
        </button>
      </div>

      <TablaHistorial
        historiales={historiales}
        onEditar={editarHistorialHandler}
        onEliminar={eliminarHistorialHandler}
      />

      <ModalHistorial
        abierto={modalAbierto}
        historial={historialEditar}
        onCerrar={() => setModalAbierto(false)}
        onGuardar={guardarHistorialHandler}
      />
    </div>
  );
}
