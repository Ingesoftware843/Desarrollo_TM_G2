"use client";

import { useEffect, useState } from "react";

interface AlertaEditable {
  AlertaID: number;
  TipoAlerta: string;
  EstacionID?: number;
  BusID?: number;
  FechaHora: string;
  Descripcion: string;
  Estado: string;
}

interface Props {
  abierto: boolean;
  alerta: AlertaEditable | null;
  onCerrar: () => void;
  onGuardar: (actualizada: AlertaEditable) => void;
}

const opcionesEstado = ["Activa", "Pendiente", "Resuelta", "Ignorada"];

export default function ModalAlerta({
  abierto,
  alerta,
  onCerrar,
  onGuardar,
}: Props) {
  const [form, setForm] = useState<AlertaEditable | null>(null);

  useEffect(() => {
    if (alerta) {
      setForm({ ...alerta });
    } else {
      setForm(null);
    }
  }, [alerta]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (form) {
      setForm({ ...form, Estado: e.target.value });
    }
  };

  const handleSubmit = () => {
    if (form) {
      onGuardar(form);
    }
  };

  if (!abierto || !form) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Cambiar estado de la alerta
        </h2>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
            Estado
          </label>
          <select
            className="w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-white"
            value={form.Estado}
            onChange={handleChange}
          >
            {opcionesEstado.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-3">
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
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
