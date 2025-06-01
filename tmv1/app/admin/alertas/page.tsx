"use client";

import { useEffect, useState } from "react";
import TablaAlertas from "@/components/admin/tablaalertas";
import { obtenerAlertas, verificarTodasAlertas } from "@/services/alertas";
import ModalAlerta from "@/components/admin/modalalerta";
import { actualizarAlerta } from "@/services/alertas";

interface Alerta {
  AlertaID: number;
  TipoAlerta: string;
  EstacionID?: number;
  BusID?: number;
  FechaHora: string;
  Descripcion: string;
  Estado: string;
}

export default function AlertasPage() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarAlertas = async () => {
    try {
      const data = await obtenerAlertas();
      setAlertas(data);
    } catch (error) {
      console.error("Error al obtener alertas", error);
    } finally {
      setLoading(false);
    }
  };
  const [alertaSeleccionada, setAlertaSeleccionada] = useState<Alerta | null>(
    null,
  );
  const [modalAbierto, setModalAbierto] = useState(false);
  const abrirModal = (alerta: Alerta) => {
    setAlertaSeleccionada(alerta);
    setModalAbierto(true);
  };

  const guardarAlerta = async (actualizada: Alerta) => {
    try {
      await actualizarAlerta(actualizada.AlertaID, actualizada);
      await cargarAlertas();
      setModalAbierto(false);
    } catch (error) {
      console.error("Error al actualizar alerta", error);
    }
  };

  const manejarVerificar = async () => {
    try {
      await verificarTodasAlertas();
      await cargarAlertas();
    } catch (error) {
      console.error("Error al verificar alertas", error);
    }
  };

  useEffect(() => {
    cargarAlertas();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Alertas del sistema
        </h1>
        <button
          onClick={manejarVerificar}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Verificar alertas
        </button>
      </div>
      <ModalAlerta
        abierto={modalAbierto}
        alerta={alertaSeleccionada}
        onCerrar={() => setModalAbierto(false)}
        onGuardar={guardarAlerta}
      />

      {loading ? (
        <p className="text-gray-500">Cargando alertas...</p>
      ) : (
        <TablaAlertas alertas={alertas} onEditar={abrirModal} />
      )}
    </div>
  );
}
