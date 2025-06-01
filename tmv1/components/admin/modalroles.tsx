"use client";

import { useEffect, useState } from "react";

interface Rol {
  id?: number;
  nombreRol: string;
}

interface Props {
  abierto: boolean;
  rol?: Rol | null;
  onCerrar: () => void;
  onGuardar: (nuevo: Rol) => void;
}

export default function ModalRol({ abierto, rol, onCerrar, onGuardar }: Props) {
  const [form, setForm] = useState<Omit<Rol, "id">>({ nombreRol: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (rol) {
      setForm({ nombreRol: rol.nombreRol });
    } else {
      setForm({ nombreRol: "" });
    }
  }, [rol]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ nombreRol: e.target.value });
  };

  const handleSubmit = () => {
    if (form.nombreRol.trim() === "") {
      setError("El nombre del rol es obligatorio.");
      return;
    }
    setError("");
    const nuevoRol: Rol = { ...form };
    if (rol?.id) {
      nuevoRol.id = rol.id;
    }
    onGuardar(nuevoRol);
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-md dark:bg-dark">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {rol ? "Editar Rol" : "Nuevo Rol"}
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            name="nombreRol"
            placeholder="Nombre del rol"
            value={form.nombreRol}
            onChange={handleChange}
            className="w-full rounded border bg-white px-3 py-2 text-black dark:bg-dark dark:text-white"
          />
        </div>

        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
            onClick={onCerrar}
          >
            Cancelar
          </button>
          <button
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={handleSubmit}
          >
            {rol ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
