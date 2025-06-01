"use client";

import { useEffect, useState } from "react";
import {
  obtenerLineas,
  crearLinea,
  actualizarLinea,
  eliminarLinea,
} from "@/services/lineasservice";
import { obtenerMunicipalidades } from "@/services/municipalidadservice";
import TablaLineas from "@/components/admin/tablalineas";
import ModalLinea from "@/components/admin/modallinea";

export default function Page() {
  const [lineas, setLineas] = useState<any[]>([]);
  const [municipalidades, setMunicipalidades] = useState<any[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [lineaSeleccionada, setLineaSeleccionada] = useState<any | null>(null);

  const cargarDatos = async () => {
    try {
      const [resLineas, resMunicipalidades] = await Promise.all([
        obtenerLineas(),
        obtenerMunicipalidades(),
      ]);
      setLineas(resLineas);
      setMunicipalidades(resMunicipalidades);
    } catch (error) {
      console.error("Error cargando líneas o municipalidades:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleGuardar = async (linea: any) => {
    try {
      if (linea.LineaID) {
        await actualizarLinea(linea.LineaID, linea);
      } else {
        await crearLinea(linea);
      }
      setModalAbierto(false);
      setLineaSeleccionada(null);
      cargarDatos();
    } catch (error) {
      console.error("Error guardando línea:", error);
    }
  };

  const handleEditar = (linea: any) => {
    setLineaSeleccionada(linea);
    setModalAbierto(true);
  };

  const handleEliminar = async (id: number) => {
    try {
      await eliminarLinea(id);
      cargarDatos();
    } catch (error) {
      console.error("Error eliminando línea:", error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white sm:mb-0">
          Gestión de Líneas
        </h1>
        <button
          className="rounded bg-blue-600 px-5 py-2 text-white shadow transition hover:bg-blue-700"
          onClick={() => {
            setLineaSeleccionada(null);
            setModalAbierto(true);
          }}
        >
          + Nueva línea
        </button>
      </div>

      <TablaLineas
        lineas={lineas}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />

      <ModalLinea
        abierto={modalAbierto}
        linea={lineaSeleccionada}
        municipalidades={municipalidades}
        onCerrar={() => {
          setModalAbierto(false);
          setLineaSeleccionada(null);
        }}
        onGuardar={handleGuardar}
      />
    </div>
  );
}
