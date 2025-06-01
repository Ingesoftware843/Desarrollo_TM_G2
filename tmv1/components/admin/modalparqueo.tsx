"use client";

import { useEffect, useState } from "react";
import { obtenerEstaciones } from "@/services/estacionesService";
interface ParqueoEditable {
  id?: number;
  estacionID: number;
  capacidad: number;
  estado: string;
}

interface Props {
  abierto: boolean;
  parqueo?: ParqueoEditable | null;
  onCerrar: () => void;
  onGuardar: (nuevo: ParqueoEditable) => void;
}

const estados = ["Activo", "Inactivo"];

export default function ModalParqueo({
  abierto,
  parqueo,
  onCerrar,
  onGuardar,
}: Props) {
  const [form, setForm] = useState<ParqueoEditable>({
    estacionID: 0,
    capacidad: 0,
    estado: "Activo",
  });
  const [error, setError] = useState("");
  const [estaciones, setEstaciones] = useState<
    { EstacionID: number; Nombre: string }[]
  >([]);
  useEffect(() => {
    if (parqueo) {
      const { id, ...rest } = parqueo;
      setForm(rest);
    } else {
      setForm({ estacionID: 0, capacidad: 0, estado: "Activo" });
    }
  }, [parqueo]);

  useEffect(() => {
    const cargarEstaciones = async () => {
      try {
        const data = await obtenerEstaciones();
        setEstaciones(data);
      } catch {
        setEstaciones([]);
      }
    };
    cargarEstaciones();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "estacionID" || name === "capacidad" ? parseInt(value) : value,
    });
  };

  const handleSubmit = () => {
    if (form.estacionID === 0 || form.capacidad <= 0) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const nuevo: ParqueoEditable = { ...form };
    if (parqueo?.id) nuevo.id = parqueo.id;
    onGuardar(nuevo);
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-md dark:bg-dark">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {parqueo ? "Editar Parqueo" : "Nuevo Parqueo"}
        </h2>

        <div className="space-y-3">
          <select
            name="estacionID"
            value={form.estacionID}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black dark:bg-dark dark:text-white"
          >
            <option value={0}>Seleccione una estación</option>
            {estaciones.map((e) => (
              <option key={e.EstacionID} value={e.EstacionID}>
                {e.Nombre}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="capacidad"
            placeholder="Capacidad"
            value={form.capacidad}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black dark:bg-dark dark:text-white"
          />
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
            {parqueo ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
