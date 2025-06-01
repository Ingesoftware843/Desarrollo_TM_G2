"use client";

import { useEffect, useState } from "react";

interface HistorialEditable {
  id?: number;
  pilotoId: number;
  nivelEducativo: string;
  institucion: string;
  fechaInicio: string;
  fechaFin: string;
  certificacion: string;
}

interface Props {
  abierto: boolean;
  historial?: HistorialEditable | null;
  onCerrar: () => void;
  onGuardar: (nuevo: HistorialEditable) => void;
}

export default function ModalHistorial({
  abierto,
  historial,
  onCerrar,
  onGuardar,
}: Props) {
  const [form, setForm] = useState<HistorialEditable>({
    pilotoId: 1,
    nivelEducativo: "",
    institucion: "",
    fechaInicio: new Date().toISOString().slice(0, 10),
    fechaFin: "",
    certificacion: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (historial) {
      const { id, ...resto } = historial;
      setForm({
        ...resto,
        fechaInicio:
          historial.fechaInicio || new Date().toISOString().slice(0, 10),
        fechaFin: historial.fechaFin || "",
        certificacion: historial.certificacion || "",
      });
    } else {
      setForm({
        pilotoId: 1,
        nivelEducativo: "",
        institucion: "",
        fechaInicio: new Date().toISOString().slice(0, 10),
        fechaFin: "",
        certificacion: "",
      });
    }
  }, [historial]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (
      !form.nivelEducativo.trim() ||
      !form.institucion.trim() ||
      !form.fechaInicio
    ) {
      setError("Todos los campos obligatorios deben ser completados.");
      return;
    }

    setError("");
    const nuevo = { ...form };
    if (historial?.id) {
      nuevo.id = historial.id;
    }
    onGuardar(nuevo);
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-md dark:bg-dark">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {historial ? "Editar Historial" : "Nuevo Historial"}
        </h2>

        <div className="space-y-3">
          {[
            { name: "nivelEducativo", label: "Nivel Educativo" },
            { name: "institucion", label: "Institución" },
            { name: "certificacion", label: "Certificación" },
          ].map((field) => (
            <div key={field.name}>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={(form as any)[field.name]}
                onChange={handleChange}
                className="w-full rounded border bg-white px-3 py-2 text-black dark:bg-dark dark:text-white"
              />
            </div>
          ))}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
              Fecha Inicio
            </label>
            <input
              type="date"
              name="fechaInicio"
              value={form.fechaInicio}
              onChange={handleChange}
              className="w-full rounded border bg-white px-3 py-2 text-black dark:bg-dark dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
              Fecha Fin
            </label>
            <input
              type="date"
              name="fechaFin"
              value={form.fechaFin}
              onChange={handleChange}
              className="w-full rounded border bg-white px-3 py-2 text-black dark:bg-dark dark:text-white"
            />
          </div>
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
            {historial ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
