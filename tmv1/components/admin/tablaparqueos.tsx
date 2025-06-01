"use client";

interface Parqueo {
  id: number;
  estacion: string;
  capacidad: number;
  estado: string;
}

interface Props {
  parqueos: Parqueo[];
  onEliminar: (id: number) => void;
  onEditar: (parqueo: Parqueo) => void;
}

export default function TablaParqueos({
  parqueos,
  onEliminar,
  onEditar,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded bg-white shadow-md dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            <th className="px-3 py-1.5">Estación</th>
            <th className="px-3 py-1.5">Capacidad</th>
            <th className="px-3 py-1.5">Estado</th>
            <th className="px-3 py-1.5 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {parqueos.map((p) => (
            <tr
              key={p.id}
              className="border-t text-sm text-gray-800 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              <td className="px-3 py-1.5">{p.estacion}</td>
              <td className="px-3 py-1.5">{p.capacidad}</td>
              <td className="px-3 py-1.5">{p.estado}</td>
              <td className="space-x-2 px-3 py-1.5 text-center">
                <button
                  onClick={() => onEditar(p)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(p.id)}
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
