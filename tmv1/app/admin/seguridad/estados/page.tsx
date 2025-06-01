"use client";

import { useEffect, useState } from "react";
import TablaEstados from "@/components/admin/tablaestados";
import ModalEstado from "@/components/admin/modalestado";
import {
  obtenerEstados,
  crearEstado,
  actualizarEstado,
  eliminarEstado,
} from "@/services/estadosservice";

interface Estado {
  EstadoID: number;
  NombreEstado: string;
}

export default function GestionEstadosPage() {
  const [estados, setEstados] = useState<Estado[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [estadoEditar, setEstadoEditar] = useState<Estado | null>(null);

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerEstados();
      setEstados(data);
    };
    cargar();
  }, []);

  const handleGuardar = async (estado: Omit<Estado, "EstadoID">) => {
    if (estadoEditar) {
      await actualizarEstado(estadoEditar.EstadoID, estado);
      setEstados((prev) =>
        prev.map((e) =>
          e.EstadoID === estadoEditar.EstadoID ? { ...e, ...estado } : e,
        ),
      );
    } else {
      const nuevo = await crearEstado(estado);
      setEstados((prev) => [...prev, { EstadoID: nuevo.EstadoID, ...estado }]);
    }
    setModalAbierto(false);
    setEstadoEditar(null);
  };

  const handleEliminar = async (id: number) => {
    await eliminarEstado(id);
    setEstados((prev) => prev.filter((e) => e.EstadoID !== id));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white sm:mb-0">
          Gestión de Estados
        </h1>
        <button
          className="rounded bg-blue-600 px-5 py-2 text-white shadow transition hover:bg-blue-700"
          onClick={() => {
            setEstadoEditar(null);
            setModalAbierto(true);
          }}
        >
          + Nuevo estado
        </button>
      </div>

      <TablaEstados
        estados={estados}
        onEditar={(estado) => {
          setEstadoEditar(estado);
          setModalAbierto(true);
        }}
        onEliminar={handleEliminar}
      />

      <ModalEstado
        abierto={modalAbierto}
        estado={estadoEditar}
        onCerrar={() => {
          setModalAbierto(false);
          setEstadoEditar(null);
        }}
        onGuardar={handleGuardar}
      />
    </div>
  );
}
