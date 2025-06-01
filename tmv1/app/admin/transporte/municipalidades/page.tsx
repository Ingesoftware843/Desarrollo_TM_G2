"use client";

import { useEffect, useState } from "react";
import TablaMunicipalidades from "@/components/admin/tablamunicipalidades";
import ModalMunicipalidad from "@/components/admin/modalmunicipalidades";
import {
  obtenerMunicipalidades,
  crearMunicipalidad,
  actualizarMunicipalidad,
  eliminarMunicipalidad,
} from "@/services/municipalidadservice";

interface MunicipalidadCompleta {
  id: number;
  nombre: string;
  region: string;
  telefono?: string;
  email?: string;
}

export default function GestionMunicipalidadesPage() {
  const [municipalidades, setMunicipalidades] = useState<
    MunicipalidadCompleta[]
  >([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [municipalidadEditar, setMunicipalidadEditar] =
    useState<MunicipalidadCompleta | null>(null);

  const cargarMunicipalidades = async () => {
    const data = await obtenerMunicipalidades();
    setMunicipalidades(
      data.map((m: any) => ({
        id: m.MunicipalidadID,
        nombre: m.Nombre,
        region: m.Region,
        telefono: m.Telefono,
        email: m.Email,
      })),
    );
  };

  useEffect(() => {
    cargarMunicipalidades();
  }, []);
  const guardarMunicipalidad = async (nuevo: any) => {
    if (nuevo.id) {
      const { id, nombre, region, telefono, email } = nuevo;
      await actualizarMunicipalidad(id, {
        Nombre: nombre,
        Region: region,
        Telefono: telefono,
        Email: email,
      });
    } else {
      const { nombre, region, telefono, email } = nuevo;
      await crearMunicipalidad({
        Nombre: nombre,
        Region: region,
        Telefono: telefono,
        Email: email,
      });
    }
    await cargarMunicipalidades();
    setModalAbierto(false);
  };

  const eliminarMunicipalidadHandler = async (id: number) => {
    await eliminarMunicipalidad(id);
    await cargarMunicipalidades();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white sm:mb-0">
          Gestión de Municipalidades
        </h1>
        <button
          className="rounded bg-blue-600 px-5 py-2 text-white shadow transition hover:bg-blue-700"
          onClick={() => {
            setMunicipalidadEditar(null);
            setModalAbierto(true);
          }}
        >
          + Nueva municipalidad
        </button>
      </div>

      <TablaMunicipalidades
        municipalidades={municipalidades}
        onEditar={(m) => {
          setMunicipalidadEditar(m);
          setModalAbierto(true);
        }}
        onEliminar={eliminarMunicipalidadHandler}
      />

      <ModalMunicipalidad
        abierto={modalAbierto}
        municipalidad={municipalidadEditar}
        onCerrar={() => setModalAbierto(false)}
        onGuardar={guardarMunicipalidad}
      />
    </div>
  );
}
