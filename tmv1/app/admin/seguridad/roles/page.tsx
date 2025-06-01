"use client";

import { useEffect, useState } from "react";
import TablaRoles from "@/components/admin/tablaroles";
import ModalRol from "@/components/admin/modalroles";
import {
  obtenerRoles,
  crearRol,
  actualizarRol,
  eliminarRol,
} from "@/services/rolesService";

interface Rol {
  id?: number;
  nombreRol: string;
}

export default function GestionRolesPage() {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [rolEditar, setRolEditar] = useState<Rol | null>(null);

  useEffect(() => {
    cargarRoles();
  }, []);

  const cargarRoles = async () => {
    try {
      const data = await obtenerRoles();
      setRoles(
        data.map((r: any) => ({
          id: r.RolID,
          nombreRol: r.NombreRol,
        })),
      );
    } catch (error) {
      console.error("Error cargando roles", error);
    }
  };

  const eliminarRolHandler = async (id: number) => {
    try {
      await eliminarRol(id);
      setRoles((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Error eliminando rol", error);
    }
  };

  const editarRolHandler = (rol: Rol) => {
    setRolEditar(rol);
    setModalAbierto(true);
  };

  const guardarRolHandler = async (nuevo: Rol) => {
    try {
      if (nuevo.id) {
        await actualizarRol(nuevo.id, nuevo);
        setRoles((prev) =>
          prev.map((r) => (r.id === nuevo.id ? { ...r, ...nuevo } : r)),
        );
      } else {
        await crearRol(nuevo);
        await cargarRoles();
      }
      setModalAbierto(false);
    } catch (error) {
      console.error("Error guardando rol", error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white sm:mb-0">
          Gestión de Roles
        </h1>
        <button
          className="rounded bg-blue-600 px-5 py-2 text-white shadow transition hover:bg-blue-700"
          onClick={() => {
            setRolEditar(null);
            setModalAbierto(true);
          }}
        >
          + Nuevo rol
        </button>
      </div>

      <TablaRoles
        roles={roles}
        onEditar={editarRolHandler}
        onEliminar={eliminarRolHandler}
      />

      <ModalRol
        abierto={modalAbierto}
        rol={rolEditar}
        onCerrar={() => setModalAbierto(false)}
        onGuardar={guardarRolHandler}
      />
    </div>
  );
}
