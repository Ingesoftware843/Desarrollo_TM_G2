"use client";

import { useEffect, useState } from "react";

interface Props {
  abierto: boolean;
  tipo: "piloto" | "guardia" | "operador";
  asignacion?: any;
  entidades: any[];
  estaciones: any[];
  estados: any[];
  onCerrar: () => void;
  onGuardar: (data: any) => void;
}

export default function ModalAsignacion({
  abierto,
  tipo,
  asignacion,
  entidades,
  estaciones,
  estados,
  onCerrar,
  onGuardar,
}: Props) {
  const [form, setForm] = useState({
    entidadID: 0,
    EstacionID: 0,
    FechaInicio: "",
    FechaFin: "",
    Turno: "Mañana",
    EstadoID: 1,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (asignacion) {
      const idKey =
        tipo === "piloto"
          ? "PilotoID"
          : tipo === "guardia"
          ? "GuardiaID"
          : "OperadorID";
      setForm({
        entidadID: asignacion[idKey],
        EstacionID: asignacion.EstacionID,
        FechaInicio: asignacion.FechaInicio,
        FechaFin: asignacion.FechaFin || "",
        Turno: asignacion.Turno,
        EstadoID: asignacion.EstadoID,
      });
    } else {
      setForm({
        entidadID: 0,
        EstacionID: 0,
        FechaInicio: "",
        FechaFin: "",
        Turno: "Mañana",
        EstadoID: 1,
      });
    }
  }, [asignacion]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: ["entidadID", "EstacionID", "EstadoID"].includes(name)
        ? parseInt(value)
        : value,
    });
  };

  const handleSubmit = () => {
    if (
      !form.entidadID ||
      !form.EstacionID ||
      !form.FechaInicio ||
      !form.Turno
    ) {
      setError("Todos los campos obligatorios deben ser completados");
      return;
    }

    const payload = {
      [`${tipo.charAt(0).toUpperCase() + tipo.slice(1)}ID`]: form.entidadID,
      EstacionID: form.EstacionID,
      FechaInicio: form.FechaInicio,
      FechaFin: form.FechaFin,
      Turno: form.Turno,
      EstadoID: form.EstadoID,
    };

    onGuardar(payload);
  };

  if (!abierto) return null;

  const labelEntidad =
    tipo === "piloto" ? "Piloto" : tipo === "guardia" ? "Guardia" : "Operador";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900">
        <h2 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">
          {asignacion
            ? `Editar Asignación de ${labelEntidad}`
            : `Nueva Asignación de ${labelEntidad}`}
        </h2>

        <div className="space-y-4">
          {/* Selector entidad */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
              {labelEntidad}
            </label>
            <select
              name="entidadID"
              value={form.entidadID}
              onChange={handleChange}
              className="w-full rounded border bg-white px-3 py-2 dark:bg-gray-800 dark:text-white"
            >
              <option value={0}>Seleccione {labelEntidad}</option>
              {entidades.map((e) => (
                <option key={e.ID} value={e.ID}>
                  {e.Nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Selector estación */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
              Estación
            </label>
            <select
              name="EstacionID"
              value={form.EstacionID}
              onChange={handleChange}
              className="w-full rounded border bg-white px-3 py-2 dark:bg-gray-800 dark:text-white"
            >
              <option value={0}>Seleccione estación</option>
              {estaciones.map((e) => (
                <option key={e.EstacionID} value={e.EstacionID}>
                  {e.Nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha Inicio */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
              Fecha de Inicio
            </label>
            <input
              name="FechaInicio"
              type="date"
              value={form.FechaInicio}
              onChange={handleChange}
              className="w-full rounded border bg-white px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Fecha Fin */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
              Fecha de Fin
            </label>
            <input
              name="FechaFin"
              type="date"
              value={form.FechaFin}
              onChange={handleChange}
              className="w-full rounded border bg-white px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Turno */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
              Turno
            </label>
            <input
              name="Turno"
              type="text"
              value={form.Turno}
              onChange={handleChange}
              placeholder="Ej: Mañana / Tarde"
              className="w-full rounded border bg-white px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Estado */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
              Estado
            </label>
            <select
              name="EstadoID"
              value={form.EstadoID}
              onChange={handleChange}
              className="w-full rounded border bg-white px-3 py-2 dark:bg-gray-800 dark:text-white"
            >
              {estados.map((e) => (
                <option key={e.EstadoID} value={e.EstadoID}>
                  {e.NombreEstado}
                </option>
              ))}
            </select>
          </div>

          {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
        </div>

        {/* Botones */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onCerrar}
            className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {asignacion ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
