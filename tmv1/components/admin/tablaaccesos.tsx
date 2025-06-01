"use client";

interface Acceso {
  id: number;
  descripcion: string;
  estado: string;
  estacion: string; // NombreEstacion
}

interface Props {
  accesos: Acceso[];
  onEliminar: (id: number) => void;
  onEditar: (acceso: Acceso) => void;
}

export default function TablaAccesos({ accesos, onEliminar, onEditar }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded bg-white shadow-md dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            <th className="px-3 py-1.5">Descripción</th>
            <th className="px-3 py-1.5">Estación</th>
            <th className="px-3 py-1.5">Estado</th>
            <th className="px-3 py-1.5 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {accesos.map((a) => (
            <tr
              key={a.id}
              className="border-t text-sm text-gray-800 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              <td className="px-3 py-1.5">{a.descripcion}</td>
              <td className="px-3 py-1.5">{a.estacion}</td>
              <td className="px-3 py-1.5">{a.estado}</td>
              <td className="space-x-2 px-3 py-1.5 text-center">
                <button
                  onClick={() => onEditar(a)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(a.id)}
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
