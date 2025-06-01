"use client";

import { useEffect, useState } from "react";

interface ViajeEditable {
  id?: number;
  busID: number;
  estacionOrigenID: number;
  estacionDestinoID: number;
  fechaHoraSalida: string;
  fechaHoraLlegada: string | null;
  cantidadPasajeros: number;
  estado: string;
}

interface Props {
  abierto: boolean;
  viaje?: ViajeEditable | null;
  onCerrar: () => void;
  onGuardar: (nuevo: ViajeEditable) => void;
  buses: any[];
  estaciones: any[];
}

export default function ModalRegistroViaje({
  abierto,
  viaje,
  onCerrar,
  onGuardar,
  buses,
  estaciones,
}: Props) {
  const [form, setForm] = useState<ViajeEditable>({
    busID: 0,
    estacionOrigenID: 0,
    estacionDestinoID: 0,
    fechaHoraSalida: "",
    fechaHoraLlegada: null,
    cantidadPasajeros: 0,
    estado: "En Progreso",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (viaje) {
      const { id, ...resto } = viaje;
      setForm({
        ...resto,
        id,
        fechaHoraLlegada: viaje.fechaHoraLlegada || null,
      });
    } else {
      setForm({
        busID: 0,
        estacionOrigenID: 0,
        estacionDestinoID: 0,
        fechaHoraSalida: "",
        fechaHoraLlegada: null,
        cantidadPasajeros: 0,
        estado: "En Progreso",
      });
    }
  }, [viaje]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: [
        "busID",
        "estacionOrigenID",
        "estacionDestinoID",
        "cantidadPasajeros",
      ].includes(name)
        ? parseInt(value)
        : value || null,
    });
  };

  const handleSubmit = () => {
    if (
      !form.busID ||
      !form.estacionOrigenID ||
      !form.estacionDestinoID ||
      !form.fechaHoraSalida
    ) {
      setError("Todos los campos obligatorios deben ser completados.");
      return;
    }

    setError("");
    onGuardar(form);
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-md dark:bg-dark">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {viaje ? "Editar Viaje" : "Nuevo Viaje"}
        </h2>

        <div className="space-y-3">
          <select
            name="busID"
            value={form.busID}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          >
            <option value={0}>Seleccione un bus</option>
            {buses.map((b) => (
              <option key={b.BusID} value={b.BusID}>
                {b.Placa}
              </option>
            ))}
          </select>

          <select
            name="estacionOrigenID"
            value={form.estacionOrigenID}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          >
            <option value={0}>Seleccione estación origen</option>
            {estaciones.map((e) => (
              <option key={e.EstacionID} value={e.EstacionID}>
                {e.Nombre}
              </option>
            ))}
          </select>

          <select
            name="estacionDestinoID"
            value={form.estacionDestinoID}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          >
            <option value={0}>Seleccione estación destino</option>
            {estaciones.map((e) => (
              <option key={e.EstacionID} value={e.EstacionID}>
                {e.Nombre}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            name="fechaHoraSalida"
            value={form.fechaHoraSalida}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
            placeholder="Fecha salida"
          />

          <input
            type="datetime-local"
            name="fechaHoraLlegada"
            value={form.fechaHoraLlegada || ""}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
            placeholder="Fecha llegada"
          />

          <input
            type="number"
            name="cantidadPasajeros"
            value={form.cantidadPasajeros}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
            placeholder="Cantidad pasajeros"
          />

          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          >
            <option value="En Progreso">En Progreso</option>
            <option value="Finalizado">Finalizado</option>
          </select>
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
            {viaje ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
