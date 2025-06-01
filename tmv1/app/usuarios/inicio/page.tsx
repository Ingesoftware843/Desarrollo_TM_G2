"use client";

import { useEffect, useState } from "react";
import {
  obtenerMisViajes,
  crearMiViaje,
} from "@/services/viajesusuarioservice";
import { obtenerEstaciones } from "@/services/estacionesService";
import ModalViajeUsuario from "@/components/admin/modalviajeusuario";
import TablaViajesUsuario from "@/components/admin/tablaviajesusuario";

export default function MisViajesPage() {
  const [viajes, setViajes] = useState<any[]>([]);
  const [estaciones, setEstaciones] = useState<any[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      const [v, e] = await Promise.all([
        obtenerMisViajes(),
        obtenerEstaciones(),
      ]);
      setViajes(
        v.map((x: any) => ({
          viajeID: x.ViajeID,
          origen: x.Origen,
          destino: x.Destino,
          fechaRegistro: x.FechaRegistro?.slice(0, 10) || "",
        })),
      );
      setEstaciones(e);
    };
    cargarDatos();
  }, []);

  const guardar = async (data: any) => {
    await crearMiViaje(data);
    const nuevos = await obtenerMisViajes();
    setViajes(
      nuevos.map((x: any) => ({
        viajeID: x.ViajeID,
        origen: x.Origen,
        destino: x.Destino,
        fechaRegistro: x.FechaRegistro?.slice(0, 10) || "",
      })),
    );
    setModalAbierto(false);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Mis Viajes
        </h2>
        <button
          onClick={() => setModalAbierto(true)}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          + Nuevo
        </button>
      </div>

      <TablaViajesUsuario viajes={viajes} />

      <ModalViajeUsuario
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
        onGuardar={guardar}
        estaciones={estaciones}
      />
    </div>
  );
}
