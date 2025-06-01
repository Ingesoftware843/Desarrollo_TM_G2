"use client";

interface ViajeCompleto {
  id?: number;
  placa: string;
  nombreOrigen: string;
  nombreDestino: string;
  fechaHoraSalida: string;
  fechaHoraLlegada: string;
  cantidadPasajeros: number;
  estado: string;
}

interface Props {
  viajes: ViajeCompleto[];
  onEliminar: (id: number) => void;
  onEditar: (viaje: ViajeCompleto) => void;
}

export default function TablaRegistroViajes({
  viajes,
  onEliminar,
  onEditar,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded bg-white shadow-md dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            <th className="px-3 py-1.5">Bus</th>
            <th className="px-3 py-1.5">Origen</th>
            <th className="px-3 py-1.5">Destino</th>
            <th className="px-3 py-1.5">Salida</th>
            <th className="px-3 py-1.5">Llegada</th>
            <th className="px-3 py-1.5">Pasajeros</th>
            <th className="px-3 py-1.5">Estado</th>
            <th className="px-3 py-1.5 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {viajes.map((v) => (
            <tr
              key={v.id}
              className="border-t text-sm text-gray-800 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              <td className="px-3 py-1.5">{v.placa}</td>
              <td className="px-3 py-1.5">{v.nombreOrigen}</td>
              <td className="px-3 py-1.5">{v.nombreDestino}</td>
              <td className="px-3 py-1.5">{v.fechaHoraSalida}</td>
              <td className="px-3 py-1.5">{v.fechaHoraLlegada || "—"}</td>
              <td className="px-3 py-1.5">{v.cantidadPasajeros}</td>
              <td className="px-3 py-1.5">{v.estado}</td>
              <td className="space-x-2 px-3 py-1.5 text-center">
                <button
                  onClick={() => onEditar(v)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(v.id!)}
                  className="text-sm font-medium text-red-600 hover:text-red-800"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
