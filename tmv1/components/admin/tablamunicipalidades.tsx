"use client";

interface Municipalidad {
  id: number;
  nombre: string;
  region: string;
  telefono?: string;
  email?: string;
}

interface Props {
  municipalidades: Municipalidad[];
  onEliminar: (id: number) => void;
  onEditar: (municipalidad: Municipalidad) => void;
}

export default function TablaMunicipalidades({
  municipalidades,
  onEliminar,
  onEditar,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded bg-white shadow-md dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            <th className="px-3 py-1.5">Nombre</th>
            <th className="px-3 py-1.5">Región</th>
            <th className="px-3 py-1.5">Teléfono</th>
            <th className="px-3 py-1.5">Email</th>
            <th className="px-3 py-1.5 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {municipalidades.map((m) => (
            <tr
              key={m.id}
              className="border-t text-sm text-gray-800 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              <td className="px-3 py-1.5">{m.nombre}</td>
              <td className="px-3 py-1.5">{m.region}</td>
              <td className="px-3 py-1.5">{m.telefono}</td>
              <td className="px-3 py-1.5">{m.email}</td>
              <td className="space-x-2 px-3 py-1.5 text-center">
                <button
                  onClick={() => onEditar(m)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(m.id)}
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
