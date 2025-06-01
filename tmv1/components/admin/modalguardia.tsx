"use client";

import { useEffect, useState } from "react";

interface GuardiaEditable {
  id?: number;
  nombre: string;
  dpi: string;
  telefono: string;
  direccion: string;
  estado: string;
  email: string;
  fechaContratacion: string;
  rolId: number;
}

interface Props {
  abierto: boolean;
  guardia?: GuardiaEditable | null;
  onCerrar: () => void;
  onGuardar: (nuevo: GuardiaEditable) => void;
}

const estados = ["Activo", "Inactivo"];

export default function ModalGuardia({
  abierto,
  guardia,
  onCerrar,
  onGuardar,
}: Props) {
  const [form, setForm] = useState<GuardiaEditable>({
    nombre: "",
    dpi: "",
    telefono: "",
    direccion: "",
    estado: "Activo",
    email: "",
    fechaContratacion: new Date().toISOString().slice(0, 10),
    rolId: 1,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (guardia) {
      const { id, ...resto } = guardia;
      setForm({
        ...resto,
        fechaContratacion:
          guardia.fechaContratacion || new Date().toISOString().slice(0, 10),
        rolId: guardia.rolId || 1,
      });
    } else {
      setForm({
        nombre: "",
        dpi: "",
        telefono: "",
        direccion: "",
        estado: "Activo",
        email: "",
        fechaContratacion: new Date().toISOString().slice(0, 10),
        rolId: 1,
      });
    }
  }, [guardia]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "rolId" ? parseInt(value) : value });
  };

  const handleSubmit = () => {
    if (
      !form.nombre.trim() ||
      !form.dpi.trim() ||
      !form.telefono.trim() ||
      !form.direccion.trim() ||
      !form.email.trim() ||
      !form.fechaContratacion ||
      !form.rolId
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setError("");
    const nuevo = { ...form };
    if (guardia?.id) {
      nuevo.id = guardia.id;
    }
    onGuardar(nuevo);
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-md dark:bg-dark">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {guardia ? "Editar Guardia" : "Nuevo Guardia"}
        </h2>

        <div className="space-y-3">
          {[
            { name: "nombre", label: "Nombre" },
            { name: "dpi", label: "DPI" },
            { name: "telefono", label: "Teléfono" },
            { name: "direccion", label: "Dirección" },
            { name: "email", label: "Email" },
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
              Fecha Contratación
            </label>
            <input
              type="date"
              name="fechaContratacion"
              value={form.fechaContratacion}
              onChange={handleChange}
              className="w-full rounded border bg-white px-3 py-2 text-black dark:bg-dark dark:text-white"
            />
          </div>

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

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
              Rol
            </label>
            <select
              name="rolId"
              value={form.rolId}
              onChange={handleChange}
              className="w-full rounded border bg-white px-3 py-2 text-black dark:bg-dark dark:text-white"
            >
              <option value={1}>Guardia</option>
              <option value={2}>Administrador</option>
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
            {guardia ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
