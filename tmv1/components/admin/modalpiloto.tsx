"use client";

import { useEffect, useState } from "react";

interface PilotoForm {
  nombre: string;
  dpi: string;
  telefono: string;
  direccion: string;
  email: string;
  estado: string;
  fechaContratacion: string;
  licenciaTipo: string;
  fechaVencimientoLicencia: string;
}

interface Props {
  abierto: boolean;
  piloto?: (PilotoForm & { id?: number }) | null;
  onCerrar: () => void;
  onGuardar: (nuevo: PilotoForm & { id?: number }) => void;
}

const estados = ["Activo", "Inactivo"];

export default function ModalPiloto({
  abierto,
  piloto,
  onCerrar,
  onGuardar,
}: Props) {
  const [form, setForm] = useState<PilotoForm>({
    nombre: "",
    dpi: "",
    telefono: "",
    direccion: "",
    email: "",
    estado: "Activo",
    fechaContratacion: "",
    licenciaTipo: "",
    fechaVencimientoLicencia: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (piloto) {
      setForm({
        nombre: piloto.nombre || "",
        dpi: piloto.dpi || "",
        telefono: piloto.telefono || "",
        direccion: piloto.direccion || "",
        email: piloto.email || "",
        estado: piloto.estado || "Activo",
        fechaContratacion: piloto.fechaContratacion || "",
        licenciaTipo: piloto.licenciaTipo || "",
        fechaVencimientoLicencia: piloto.fechaVencimientoLicencia || "",
      });
    } else {
      setForm({
        nombre: "",
        dpi: "",
        telefono: "",
        direccion: "",
        email: "",
        estado: "Activo",
        fechaContratacion: "",
        licenciaTipo: "",
        fechaVencimientoLicencia: "",
      });
    }
  }, [piloto]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    // Validar campos obligatorios
    if (
      !form.nombre.trim() ||
      !form.dpi.trim() ||
      !form.telefono.trim() ||
      !form.direccion.trim() ||
      !form.email.trim() ||
      !form.estado.trim() ||
      !form.fechaContratacion.trim() ||
      !form.licenciaTipo.trim() ||
      !form.fechaVencimientoLicencia.trim()
    ) {
      setError("Por favor, complete todos los campos obligatorios.");
      return;
    }
    setError("");
    onGuardar({ ...form, id: piloto?.id });
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-md dark:bg-dark">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {piloto ? "Editar Piloto" : "Nuevo Piloto"}
        </h2>

        <div className="space-y-3">
          {[
            { name: "nombre", label: "Nombre", type: "text" },
            { name: "dpi", label: "DPI", type: "text" },
            { name: "telefono", label: "Teléfono", type: "text" },
            { name: "direccion", label: "Dirección", type: "text" },
            { name: "email", label: "Email", type: "email" },
            {
              name: "fechaContratacion",
              label: "Fecha Contratación",
              type: "date",
            },
            { name: "licenciaTipo", label: "Tipo de Licencia", type: "text" },
            {
              name: "fechaVencimientoLicencia",
              label: "Fecha Vencimiento Licencia",
              type: "date",
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
                {field.label}
              </label>
              <input
                type={field.type}
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
              {estados.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
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
            {piloto ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
