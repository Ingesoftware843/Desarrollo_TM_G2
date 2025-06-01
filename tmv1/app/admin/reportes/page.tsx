"use client";

import { useState, useEffect } from "react";
import TablaReporte from "@/components/admin/tablareporte";
import {
  obtenerTodosBuses,
  obtenerHistorialEducativo,
  obtenerAsignacionesPilotos,
  obtenerAlertas,
} from "@/services/reportes"; // Agrupación de servicios

type TipoReporte = "buses" | "historial" | "asignaciones" | "alertas";

export default function ReportesPage() {
  const [tipo, setTipo] = useState<TipoReporte>("buses");
  const [datos, setDatos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      let resultado: any[] = [];
      switch (tipo) {
        case "buses":
          resultado = await obtenerTodosBuses();
          break;
        case "historial":
          resultado = await obtenerHistorialEducativo();
          break;
        case "asignaciones":
          resultado = await obtenerAsignacionesPilotos();
          break;
        case "alertas":
          resultado = await obtenerAlertas();
          break;
      }
      setDatos(resultado);
    } catch (error) {
      console.error("Error al cargar reporte", error);
    } finally {
      setLoading(false);
    }
  };

  const exportarCSV = () => {
    if (!datos.length) {
      alert("No hay datos para exportar.");
      return;
    }

    const encabezados = Object.keys(datos[0]);
    const filas = datos.map((fila) =>
      encabezados.map((key) => `${fila[key] ?? ""}`),
    );

    const contenido = [encabezados, ...filas]
      .map((fila) => fila.map((celda) => `"${celda}"`).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + contenido], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = `reporte_${tipo}_${Date.now()}.csv`;
    enlace.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    cargarDatos();
  }, [tipo]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Reportes del sistema
      </h1>

      <div className="mb-4 space-x-2">
        {["buses", "historial", "asignaciones", "alertas"].map((r) => (
          <button
            key={r}
            onClick={() => setTipo(r as TipoReporte)}
            className={`rounded px-4 py-2 capitalize ${
              tipo === r
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {r}
          </button>
        ))}
        <button
          onClick={exportarCSV}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Descargar CSV
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Cargando datos...</p>
      ) : (
        <TablaReporte tipo={tipo} datos={datos} />
      )}
    </div>
  );
}
