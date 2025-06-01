"use client";

import { useState } from "react";

interface Props {
  abierto: boolean;
  onCerrar: () => void;
  onGuardar: (viaje: {
    EstacionOrigenID: number;
    EstacionDestinoID: number;
  }) => void;
  estaciones: any[];
}

export default function ModalViajeUsuario({
  abierto,
  onCerrar,
  onGuardar,
  estaciones,
}: Props) {
  const [origen, setOrigen] = useState(0);
  const [destino, setDestino] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!origen || !destino || origen === destino) {
      setError("Seleccione estaciones válidas y diferentes.");
      return;
    }
    setError("");
    onGuardar({ EstacionOrigenID: origen, EstacionDestinoID: destino });
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Nuevo viaje
        </h2>

        <div className="space-y-3">
          <select
            value={origen}
            onChange={(e) => setOrigen(parseInt(e.target.value))}
            className="w-full rounded border bg-white px-3 py-2 text-black dark:bg-dark dark:text-white"
          >
            <option value={0}>Seleccionar estación origen</option>
            {estaciones.map((e) => (
              <option key={e.EstacionID} value={e.EstacionID}>
                {e.Nombre}
              </option>
            ))}
          </select>

          <select
            value={destino}
            onChange={(e) => setDestino(parseInt(e.target.value))}
            className="w-full rounded border bg-white px-3 py-2 text-black dark:bg-dark dark:text-white"
          >
            <option value={0}>Seleccionar estación destino</option>
            {estaciones.map((e) => (
              <option key={e.EstacionID} value={e.EstacionID}>
                {e.Nombre}
              </option>
            ))}
          </select>

          {error && <div className="text-sm text-red-600">{error}</div>}
        </div>

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
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
}
