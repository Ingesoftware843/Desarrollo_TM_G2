"use client";

import { useEffect, useState } from "react";
import TablaOperadores from "@/components/admin/tablaoperadores";
import ModalOperador from "@/components/admin/modaloperador";
import {
  obtenerOperadores,
  crearOperador,
  actualizarOperador,
  eliminarOperador,
} from "@/services/operadoresService";

interface OperadorCompleto {
  id?: number;
  nombre: string;
  dpi: string;
  telefono: string;
  direccion: string;
  email?: string;
  estado: string;
  fechaContratacion: string;
  rolID?: number;
  nombreRol?: string;
}

interface OperadorEditable {
  id?: number;
  nombre: string;
  dpi: string;
  telefono: string;
  direccion: string;
  email?: string;
  estado: string;
  fechaContratacion: string;
  rolID?: number;
}

export default function GestionOperadoresPage() {
  const [operadores, setOperadores] = useState<OperadorCompleto[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [operadorEditar, setOperadorEditar] = useState<OperadorEditable | null>(
    null,
  );

  useEffect(() => {
    cargarOperadores();
  }, []);

  const cargarOperadores = async () => {
    try {
      const data = await obtenerOperadores();
      setOperadores(
        data.map((o: any) => ({
          id: o.OperadorID,
          nombre: o.Nombre,
          dpi: o.DPI,
          telefono: o.Telefono,
          direccion: o.Direccion,
          email: o.Email,
          estado: o.Estado,
          fechaContratacion: o.FechaContratacion,
          rolID: o.RolID,
          nombreRol: o.NombreRol,
        })),
      );
    } catch (error) {
      console.error("Error cargando operadores", error);
    }
  };

  const eliminarOperadorHandler = async (id: number) => {
    try {
      await eliminarOperador(id);
      setOperadores((prev) => prev.filter((o) => o.id !== id));
    } catch (error) {
      console.error("Error eliminando operador", error);
    }
  };

  const editarOperadorHandler = (operador: OperadorCompleto) => {
    const editable: OperadorEditable = {
      id: operador.id,
      nombre: operador.nombre,
      dpi: operador.dpi,
      telefono: operador.telefono,
      direccion: operador.direccion,
      email: operador.email,
      estado: operador.estado,
      fechaContratacion: operador.fechaContratacion,
      rolID: operador.rolID,
    };
    setOperadorEditar(editable);
    setModalAbierto(true);
  };

  const guardarOperadorHandler = async (nuevo: OperadorEditable) => {
    try {
      if (nuevo.id) {
        await actualizarOperador(nuevo.id, nuevo);
        setOperadores((prev) =>
          prev.map((o) => (o.id === nuevo.id ? { ...o, ...nuevo } : o)),
        );
      } else {
        await crearOperador(nuevo);
        await cargarOperadores();
      }
      setModalAbierto(false);
    } catch (error) {
      console.error("Error guardando operador", error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white sm:mb-0">
          Gestión de Operadores
        </h1>
        <button
          className="rounded bg-blue-600 px-5 py-2 text-white shadow transition hover:bg-blue-700"
          onClick={() => {
            setOperadorEditar(null);
            setModalAbierto(true);
          }}
        >
          + Nuevo operador
        </button>
      </div>

      <TablaOperadores
        operadores={operadores}
        onEditar={editarOperadorHandler}
        onEliminar={eliminarOperadorHandler}
      />

      <ModalOperador
        abierto={modalAbierto}
        operador={operadorEditar}
        onCerrar={() => setModalAbierto(false)}
        onGuardar={guardarOperadorHandler}
      />
    </div>
  );
}
