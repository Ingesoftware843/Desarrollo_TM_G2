"use client";

import { useEffect, useState } from "react";
import { obtenerLineas } from "@/services/lineasservice";
import { obtenerParqueos } from "@/services/parqueosService";

interface BusEditable {
  id?: number;
  placa: string;
  capacidadMaxima: number;
  estado: string;
  lineaID: number;
  parqueoID: number;
}

interface Props {
  abierto: boolean;
  bus?: BusEditable | null;
  onCerrar: () => void;
  onGuardar: (nuevo: BusEditable) => void;
}

const estados = ["Activo", "En espera", "Mantenimiento"];

export default function ModalBus({ abierto, bus, onCerrar, onGuardar }: Props) {
  const [form, setForm] = useState<BusEditable>({
    placa: "",
    capacidadMaxima: 0,
    estado: "Activo",
    lineaID: 0,
    parqueoID: 0,
  });

  const [lineas, setLineas] = useState<{ LineaID: number; Nombre: string }[]>(
    [],
  );
  const [parqueos, setParqueos] = useState<{ ParqueoID: number }[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (bus) {
      const { id, ...rest } = bus;
      setForm(rest);
    } else {
      setForm({
        placa: "",
        capacidadMaxima: 0,
        estado: "Activo",
        lineaID: 0,
        parqueoID: 0,
      });
    }
  }, [bus]);

  useEffect(() => {
    obtenerLineas().then(setLineas);
    obtenerParqueos().then(setParqueos);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "capacidadMaxima" || name === "lineaID" || name === "parqueoID"
          ? parseInt(value)
          : value,
    });
  };

  const handleSubmit = () => {
    if (
      !form.placa.trim() ||
      form.capacidadMaxima <= 0 ||
      form.lineaID === 0 ||
      form.parqueoID === 0 ||
      !form.estado
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const nuevo: BusEditable = { ...form };
    if (bus?.id) nuevo.id = bus.id;
    onGuardar(nuevo);
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-md dark:bg-dark">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {bus ? "Editar Bus" : "Nuevo Bus"}
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            name="placa"
            placeholder="Placa"
            value={form.placa}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black dark:bg-dark dark:text-white"
          />
          <input
            type="number"
            name="capacidadMaxima"
            placeholder="Capacidad máxima"
            value={form.capacidadMaxima}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black dark:bg-dark dark:text-white"
          />
          <select
            name="lineaID"
            value={form.lineaID}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black dark:bg-dark dark:text-white"
          >
            <option value={0}>Seleccione una línea</option>
            {lineas.map((l) => (
              <option key={l.LineaID} value={l.LineaID}>
                {l.Nombre}
              </option>
            ))}
          </select>
          <select
            name="parqueoID"
            value={form.parqueoID}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black dark:bg-dark dark:text-white"
          >
            <option value={0}>Seleccione un parqueo</option>
            {parqueos.map((p) => (
              <option key={p.ParqueoID} value={p.ParqueoID}>
                Parqueo #{p.ParqueoID}
              </option>
            ))}
          </select>
          <select
            name="estado"
            value={form.estado}
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
            {bus ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
