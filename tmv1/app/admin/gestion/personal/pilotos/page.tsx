"use client";

import { useEffect, useState } from "react";
import TablaPilotos from "@/components/admin/tablapilotos";
import ModalPiloto from "@/components/admin/modalpiloto";
import {
  obtenerPilotos,
  crearPiloto,
  actualizarPiloto,
  eliminarPiloto,
} from "@/services/pilotosservice";

export default function GestionPilotosPage() {
  const [pilotos, setPilotos] = useState<any[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [pilotoEditar, setPilotoEditar] = useState<any | null>(null);

  useEffect(() => {
    cargarPilotos();
  }, []);

  const cargarPilotos = async () => {
    try {
      const data = await obtenerPilotos();
      setPilotos(
        data.map((p: any) => ({
          id: p.PilotoID,
          nombre: p.Nombre,
          dpi: p.DPI,
          telefono: p.Telefono,
          direccion: p.Direccion,
          email: p.Email,
          estado: p.Estado,
          fechaContratacion: p.FechaContratacion,
          licenciaTipo: p.LicenciaTipo,
          fechaVencimientoLicencia: p.FechaVencimientoLicencia,
        })),
      );
    } catch (error) {
      console.error("Error cargando pilotos", error);
    }
  };

  const eliminarPilotoHandler = async (id: number) => {
    try {
      await eliminarPiloto(id);
      setPilotos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error eliminando piloto", error);
    }
  };

  const editarPilotoHandler = (piloto: any) => {
    setPilotoEditar(piloto);
    setModalAbierto(true);
  };

  const guardarPilotoHandler = async (nuevo: any) => {
    try {
      if (pilotoEditar) {
        await actualizarPiloto(pilotoEditar.id, nuevo);
        setPilotos((prev) => prev.map((p) => (p.id === nuevo.id ? nuevo : p)));
      } else {
        await crearPiloto(nuevo);
        await cargarPilotos();
      }
      setModalAbierto(false);
    } catch (error) {
      console.error("Error guardando piloto", error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white sm:mb-0">
          Gestión de Pilotos
        </h1>
        <button
          className="rounded bg-blue-600 px-5 py-2 text-white shadow transition hover:bg-blue-700"
          onClick={() => {
            setPilotoEditar(null);
            setModalAbierto(true);
          }}
        >
          + Nuevo piloto
        </button>
      </div>

      <TablaPilotos
        pilotos={pilotos}
        onEditar={editarPilotoHandler}
        onEliminar={eliminarPilotoHandler}
      />

      <ModalPiloto
        abierto={modalAbierto}
        piloto={pilotoEditar}
        onCerrar={() => setModalAbierto(false)}
        onGuardar={guardarPilotoHandler}
      />
    </div>
  );
}
