"use client";

import { useEffect, useState } from "react";
import ModalAsignacion from "@/components/admin/modalasignacionoperador";
import TablaAsignacion from "@/components/admin/tablaasignacionoperador";
import {
  obtenerAsignacionesPiloto,
  obtenerAsignacionesGuardia,
  obtenerAsignacionesOperador,
  crearAsignacionPiloto,
  crearAsignacionGuardia,
  crearAsignacionOperador,
  actualizarAsignacion,
  eliminarAsignacion,
} from "@/services/operadorasignacionservice";
import { obtenerPilotos } from "@/services/pilotosservice";
import { obtenerGuardias } from "@/services/guardiasservice";
import { obtenerOperadores } from "@/services/operadoresService";
import { obtenerEstaciones } from "@/services/estacionesService";
import { obtenerEstados } from "@/services/estadosservice";

export default function GestionAsignacionesPage() {
  const [asignaciones, setAsignaciones] = useState({
    piloto: [] as any[],
    guardia: [] as any[],
    operador: [] as any[],
  });

  const [modalAbierto, setModalAbierto] = useState(false);
  const [tipoActual, setTipoActual] = useState<
    "piloto" | "guardia" | "operador"
  >("piloto");
  const [asignacionSeleccionada, setAsignacionSeleccionada] = useState<
    any | null
  >(null);

  const [pilotos, setPilotos] = useState([]);
  const [guardias, setGuardias] = useState([]);
  const [operadores, setOperadores] = useState([]);
  const [estaciones, setEstaciones] = useState([]);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const [ap, ag, ao, ps, gs, os, est, estd] = await Promise.all([
      obtenerAsignacionesPiloto(),
      obtenerAsignacionesGuardia(),
      obtenerAsignacionesOperador(),
      obtenerPilotos(),
      obtenerGuardias(),
      obtenerOperadores(),
      obtenerEstaciones(),
      obtenerEstados(),
    ]);
    setAsignaciones({ piloto: ap, guardia: ag, operador: ao });
    setPilotos(ps);
    setGuardias(gs);
    setOperadores(os);
    setEstaciones(est);
    setEstados(estd);
  };

  const abrirModal = (
    tipo: "piloto" | "guardia" | "operador",
    asignacion?: any,
  ) => {
    setTipoActual(tipo);
    setAsignacionSeleccionada(asignacion || null);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setAsignacionSeleccionada(null);
  };

  const guardarAsignacion = async (data: any) => {
    try {
      if (asignacionSeleccionada) {
        await actualizarAsignacion(
          tipoActual,
          asignacionSeleccionada.AsignacionID,
          data,
        );
      } else {
        if (tipoActual === "piloto") await crearAsignacionPiloto(data);
        if (tipoActual === "guardia") await crearAsignacionGuardia(data);
        if (tipoActual === "operador") await crearAsignacionOperador(data);
      }
      await cargarDatos();
      cerrarModal();
    } catch (error) {
      console.error("Error al guardar", error);
    }
  };

  const eliminarAsignacionActual = async (
    tipo: "piloto" | "guardia" | "operador",
    id: number,
  ) => {
    try {
      await eliminarAsignacion(tipo, id);
      await cargarDatos();
    } catch (error) {
      console.error("Error al eliminar", error);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-2xl font-bold">Gestión de Asignaciones</h1>

      {/* Pilotos */}
      <div className="mb-6">
        <button
          onClick={() => abrirModal("piloto")}
          className="mb-3 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Nueva Asignación de Piloto
        </button>
        <TablaAsignacion
          tipo="piloto"
          asignaciones={asignaciones.piloto}
          onEditar={(a) => abrirModal("piloto", a)}
          onEliminar={(id) => eliminarAsignacionActual("piloto", id)}
        />
      </div>

      {/* Guardias */}
      <div className="mb-6">
        <button
          onClick={() => abrirModal("guardia")}
          className="mb-3 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Nueva Asignación de Guardia
        </button>
        <TablaAsignacion
          tipo="guardia"
          asignaciones={asignaciones.guardia}
          onEditar={(a) => abrirModal("guardia", a)}
          onEliminar={(id) => eliminarAsignacionActual("guardia", id)}
        />
      </div>

      {/* Operadores */}
      <div className="mb-6">
        <button
          onClick={() => abrirModal("operador")}
          className="mb-3 rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
        >
          Nueva Asignación de Operador
        </button>
        <TablaAsignacion
          tipo="operador"
          asignaciones={asignaciones.operador}
          onEditar={(a) => abrirModal("operador", a)}
          onEliminar={(id) => eliminarAsignacionActual("operador", id)}
        />
      </div>

      <ModalAsignacion
        abierto={modalAbierto}
        tipo={tipoActual}
        asignacion={asignacionSeleccionada}
        entidades={
          tipoActual === "piloto"
            ? pilotos
            : tipoActual === "guardia"
            ? guardias
            : operadores
        }
        estaciones={estaciones}
        estados={estados}
        onCerrar={cerrarModal}
        onGuardar={guardarAsignacion}
      />
    </div>
  );
}
