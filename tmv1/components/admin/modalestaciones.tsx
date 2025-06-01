"use client";

import { useEffect, useState } from "react";
import { obtenerMunicipalidades } from "@/services/municipalidadservice";
interface EstacionEditable {
  id?: number;
  nombre: string;
  municipalidadID: number;
  ubicacion: string;
  capacidadEstimada: number;
  estado: string;
}

interface Props {
  abierto: boolean;
  estacion?: EstacionEditable | null;
  onCerrar: () => void;
  onGuardar: (nuevo: EstacionEditable) => void;
}

const estados = ["Activo", "Inactivo"];

export default function ModalEstacion({
  abierto,
  estacion,
  onCerrar,
  onGuardar,
}: Props) {
  const [form, setForm] = useState<EstacionEditable>({
    nombre: "",
    municipalidadID: 0,
    ubicacion: "",
    capacidadEstimada: 0,
    estado: "Activo",
  });
  const [error, setError] = useState("");
  const [municipalidades, setMunicipalidades] = useState<
    { MunicipalidadID: number; Nombre: string }[]
  >([]);

  useEffect(() => {
    if (estacion) {
      const { id, ...rest } = estacion;
      setForm({
        ...rest,
        capacidadEstimada: rest.capacidadEstimada ?? 0,
      });
    } else {
      setForm({
        nombre: "",
        municipalidadID: 0,
        ubicacion: "",
        capacidadEstimada: 0,
        estado: "Activo",
      });
    }
  }, [estacion]);
  useEffect(() => {
    const cargarMunicipalidades = async () => {
      const data = await obtenerMunicipalidades();
      setMunicipalidades(data);
    };
    cargarMunicipalidades();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "municipalidadID" ? parseInt(value) : value,
    });
  };

  const handleSubmit = () => {
    if (
      !form.nombre.trim() ||
      form.municipalidadID === 0 ||
      !form.ubicacion.trim()
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const nuevo: EstacionEditable = { ...form };
    if (estacion?.id) nuevo.id = estacion.id;
    onGuardar(nuevo);
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-md dark:bg-dark">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {estacion ? "Editar Estación" : "Nueva Estación"}
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black dark:bg-dark dark:text-white"
          />
          <select
            name="municipalidadID"
            value={form.municipalidadID}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black dark:bg-dark dark:text-white"
          >
            <option value={0}>Seleccione una municipalidad</option>
            {municipalidades.map((m) => (
              <option key={m.MunicipalidadID} value={m.MunicipalidadID}>
                {m.Nombre}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="ubicacion"
            placeholder="Ubicación"
            value={form.ubicacion}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black dark:bg-dark dark:text-white"
          />
          <input
            type="number"
            name="capacidadEstimada"
            placeholder="Capacidad estimada"
            value={form.capacidadEstimada ?? 0}
            onChange={handleChange}
          />

          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 text-black dark:bg-dark dark:text-white"
          >
            {estados.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

        <div className="mt-6 flex justify-end space-x-3">
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
            {estacion ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
