"use client";

interface Bus {
  id: number;
  placa: string;
  capacidadMaxima: number;
  estado: string;
  linea: string;
  parqueoTexto: string;
}

interface Props {
  buses: Bus[];
  onEliminar: (id: number) => void;
  onEditar: (bus: Bus) => void;
}

export default function TablaBuses({ buses, onEliminar, onEditar }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded bg-white shadow-md dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            <th className="px-3 py-1.5">ID</th>
            <th className="px-3 py-1.5">Placa</th>
            <th className="px-3 py-1.5">Capacidad</th>
            <th className="px-3 py-1.5">Línea</th>
            <th className="px-3 py-1.5">Parqueo</th>
            <th className="px-3 py-1.5">Estado</th>
            <th className="px-3 py-1.5 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr
              key={bus.id}
              className="border-t text-sm text-gray-800 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              <td className="px-3 py-1.5">{bus.id}</td>
              <td className="px-3 py-1.5">{bus.placa}</td>
              <td className="px-3 py-1.5">{bus.capacidadMaxima}</td>
              <td className="px-3 py-1.5">{bus.linea}</td>
              <td className="px-3 py-1.5">{bus.parqueoTexto}</td>
              <td className="px-3 py-1.5">{bus.estado}</td>
              <td className="space-x-2 px-3 py-1.5 text-center">
                <button
                  onClick={() => onEditar(bus)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(bus.id)}
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
