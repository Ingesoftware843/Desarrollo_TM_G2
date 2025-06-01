"use client";

import { useEffect, useState } from "react";

interface Estado {
  EstadoID?: number;
  NombreEstado: string;
}

interface Props {
  abierto: boolean;
  estado?: Estado | null;
  onCerrar: () => void;
  onGuardar: (estado: Omit<Estado, "EstadoID">) => void;
}

export default function ModalEstado({
  abierto,
  estado,
  onCerrar,
  onGuardar,
}: Props) {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (estado) setNombre(estado.NombreEstado);
    else setNombre("");
  }, [estado]);

  const handleSubmit = () => {
    if (nombre.trim() === "") {
      setError("El nombre del estado es obligatorio.");
      return;
    }
    setError("");
    onGuardar({ NombreEstado: nombre });
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-md dark:bg-dark">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {estado ? "Editar Estado" : "Nuevo Estado"}
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            name="NombreEstado"
            placeholder="Nombre del estado"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
            {estado ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
