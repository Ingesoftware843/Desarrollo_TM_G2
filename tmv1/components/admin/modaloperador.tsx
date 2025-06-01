"use client";

import { useEffect, useState } from "react";

interface OperadorEditable {
  id?: number;
  nombre: string;
  dpi: string;
  telefono: string;
  direccion: string;
  email?: string;
  estado: string;
  fechaContratacion: string;
  rolID?: number;
}

interface Props {
  abierto: boolean;
  operador?: OperadorEditable | null;
  onCerrar: () => void;
  onGuardar: (nuevo: OperadorEditable) => void;
}

const estados = ["Activo", "Inactivo"];

export default function ModalOperador({
  abierto,
  operador,
  onCerrar,
  onGuardar,
}: Props) {
  const [form, setForm] = useState<OperadorEditable>({
    nombre: "",
    dpi: "",
    telefono: "",
    direccion: "",
    email: "",
    estado: "Activo",
    fechaContratacion: "",
    rolID: undefined,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (operador) {
      const { id, ...resto } = operador;
      setForm(resto);
    } else {
      setForm({
        nombre: "",
        dpi: "",
        telefono: "",
        direccion: "",
        email: "",
        estado: "Activo",
        fechaContratacion: "",
        rolID: undefined,
      });
    }
  }, [operador]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (
      !form.nombre.trim() ||
      !form.dpi.trim() ||
      !form.telefono.trim() ||
      !form.direccion.trim() ||
      !form.fechaContratacion.trim()
    ) {
      setError("Por favor completa los campos obligatorios.");
      return;
    }

    setError("");
    const nuevo: OperadorEditable = { ...form };
    if (operador?.id) {
      nuevo.id = operador.id;
    }
    onGuardar(nuevo);
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-md dark:bg-dark">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {operador ? "Editar Operador" : "Nuevo Operador"}
        </h2>

        <div className="space-y-3">
          {[
            { name: "nombre", label: "Nombre" },
            { name: "dpi", label: "DPI" },
            { name: "telefono", label: "Teléfono" },
            { name: "direccion", label: "Dirección" },
            { name: "email", label: "Email" },
            {
              name: "fechaContratacion",
              label: "Fecha Contratación",
              type: "date",
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={(form as any)[field.name]}
                onChange={handleChange}
                className="w-full rounded border bg-white px-3 py-2 text-black dark:bg-dark dark:text-white"
              />
            </div>
          ))}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
              Estado
            </label>
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="w-full rounded border bg-white px-3 py-2 text-black dark:bg-dark dark:text-white"
            >
              {estados.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
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
            {operador ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
