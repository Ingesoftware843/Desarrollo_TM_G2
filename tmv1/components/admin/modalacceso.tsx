"use client";

import { useEffect, useState } from "react";

interface AccesoEditable {
  id?: number;
  descripcion: string;
  estado: string;
  estacionID: number;
}

interface Props {
  abierto: boolean;
  acceso?: AccesoEditable | null;
  onCerrar: () => void;
  onGuardar: (nuevo: AccesoEditable) => void;
}

const estados = ["Activo", "Inactivo"];

export default function ModalAcceso({
  abierto,
  acceso,
  onCerrar,
  onGuardar,
}: Props) {
  const [form, setForm] = useState<AccesoEditable>({
    descripcion: "",
    estado: "Activo",
    estacionID: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (acceso) {
      const { id, ...rest } = acceso;
      setForm(rest);
    } else {
      setForm({ descripcion: "", estado: "Activo", estacionID: 0 });
    }
  }, [acceso]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "estacionID" ? parseInt(value) : value,
    });
  };

  const handleSubmit = () => {
    if (!form.descripcion.trim() || form.estacionID === 0) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const nuevo: AccesoEditable = { ...form };
    if (acceso?.id) nuevo.id = acceso.id;
    onGuardar(nuevo);
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-md dark:bg-dark">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {acceso ? "Editar Acceso" : "Nuevo Acceso"}
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black dark:bg-dark dark:text-white"
          />
          <input
            type="number"
            name="estacionID"
            placeholder="ID de Estación"
            value={form.estacionID}
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
            {acceso ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
