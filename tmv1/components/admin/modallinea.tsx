"use client";

import { useEffect, useState } from "react";

interface LineaEditable {
  LineaID?: number;
  Nombre: string;
  MunicipalidadID: number;
  MapaURL: string;
  DistanciaTotal: number;
  Estado: string;
}

interface Props {
  abierto: boolean;
  linea?: LineaEditable | null;
  municipalidades: { MunicipalidadID: number; Nombre: string }[];
  onCerrar: () => void;
  onGuardar: (linea: LineaEditable) => void;
}

const estados = ["Activo", "Inactivo"];

export default function ModalLinea({
  abierto,
  linea,
  municipalidades,
  onCerrar,
  onGuardar,
}: Props) {
  const [form, setForm] = useState<LineaEditable>({
    Nombre: "",
    MunicipalidadID: 0,
    MapaURL: "",
    DistanciaTotal: 0,
    Estado: "Activo",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (linea) {
      setForm({ ...linea });
    } else {
      setForm({
        Nombre: "",
        MunicipalidadID: 0,
        MapaURL: "",
        DistanciaTotal: 0,
        Estado: "Activo",
      });
    }
  }, [linea]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "MunicipalidadID" || name === "DistanciaTotal"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = () => {
    if (
      !form.Nombre ||
      form.MunicipalidadID === 0 ||
      !form.MapaURL ||
      form.DistanciaTotal <= 0 ||
      !form.Estado
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    setError("");
    onGuardar({ ...form });
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-md dark:bg-dark">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {linea ? "Editar Línea" : "Nueva Línea"}
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            name="Nombre"
            placeholder="Nombre"
            value={form.Nombre}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black dark:bg-dark dark:text-white"
          />

          <select
            name="MunicipalidadID"
            value={form.MunicipalidadID}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black dark:bg-dark dark:text-white"
          >
            <option value={0}>Seleccione una municipalidad</option>
            {municipalidades.map((m) => (
              <option key={m.MunicipalidadID} value={m.MunicipalidadID}>
                {m.Nombre}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="MapaURL"
            placeholder="URL del mapa"
            value={form.MapaURL}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black dark:bg-dark dark:text-white"
          />

          <input
            type="number"
            name="DistanciaTotal"
            placeholder="Distancia total"
            value={form.DistanciaTotal}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black dark:bg-dark dark:text-white"
          />

          <select
            name="Estado"
            value={form.Estado}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black dark:bg-dark dark:text-white"
          >
            {estados.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onCerrar}
            className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {linea ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
