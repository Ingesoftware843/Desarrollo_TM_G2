"use client";

import { useEffect, useState } from "react";

interface MunicipalidadEditable {
  id?: number;
  nombre: string;
  region: string;
  telefono?: string;
  email?: string;
}

interface Props {
  abierto: boolean;
  municipalidad?: MunicipalidadEditable | null;
  onCerrar: () => void;
  onGuardar: (nueva: MunicipalidadEditable) => void;
}

export default function ModalMunicipalidad({
  abierto,
  municipalidad,
  onCerrar,
  onGuardar,
}: Props) {
  const [form, setForm] = useState<MunicipalidadEditable>({
    nombre: "",
    region: "",
    telefono: "",
    email: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (municipalidad) {
      const { id, ...rest } = municipalidad;
      setForm(rest);
    } else {
      setForm({ nombre: "", region: "", telefono: "", email: "" });
    }
  }, [municipalidad]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!form.nombre.trim() || !form.region.trim()) {
      setError("Nombre y Región son obligatorios.");
      return;
    }

    setError("");
    const nueva: MunicipalidadEditable = { ...form };
    if (municipalidad?.id) nueva.id = municipalidad.id;
    onGuardar(nueva);
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-md dark:bg-dark">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {municipalidad ? "Editar Municipalidad" : "Nueva Municipalidad"}
        </h2>

        <div className="space-y-3">
          {["nombre", "region", "telefono", "email"].map((campo) => (
            <input
              key={campo}
              name={campo}
              placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
              value={(form as any)[campo]}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2 text-black dark:bg-dark dark:text-white"
            />
          ))}
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
            {municipalidad ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
