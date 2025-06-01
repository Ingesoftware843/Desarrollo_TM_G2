"use client";

interface GuardiaCompleto {
  id?: number;
  nombre: string;
  dpi: string;
  telefono: string;
  direccion: string;
  email: string;
  fechaContratacion: string;
  rolId: number;
  accesoAsignado?: string;
  estadoAcceso?: string;
  estado: string;
}

interface Props {
  guardias: GuardiaCompleto[];
  onEliminar: (id: number) => void;
  onEditar: (guardia: GuardiaCompleto) => void;
}

export default function TablaGuardias({
  guardias,
  onEliminar,
  onEditar,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded bg-white shadow-md dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            <th className="px-3 py-1.5">Nombre</th>
            <th className="px-3 py-1.5">DPI</th>
            <th className="px-3 py-1.5">Teléfono</th>
            <th className="px-3 py-1.5">Dirección</th>
            <th className="px-3 py-1.5">Email</th>
            <th className="px-3 py-1.5">Fecha Contratación</th>
            <th className="px-3 py-1.5">Rol</th>
            <th className="px-3 py-1.5">Acceso Asignado</th>
            <th className="px-3 py-1.5">Estado Acceso</th>
            <th className="px-3 py-1.5">Estado</th>
            <th className="px-3 py-1.5 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {guardias.map((g) => (
            <tr
              key={g.id}
              className="border-t text-sm text-gray-800 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              <td className="px-3 py-1.5">{g.nombre}</td>
              <td className="px-3 py-1.5">{g.dpi}</td>
              <td className="px-3 py-1.5">{g.telefono}</td>
              <td className="px-3 py-1.5">{g.direccion}</td>
              <td className="px-3 py-1.5">{g.email}</td>
              <td className="px-3 py-1.5">{g.fechaContratacion}</td>
              <td className="px-3 py-1.5">{g.rolId}</td>
              <td className="px-3 py-1.5">{g.accesoAsignado}</td>
              <td className="px-3 py-1.5">{g.estadoAcceso}</td>
              <td className="px-3 py-1.5">{g.estado}</td>
              <td className="space-x-2 px-3 py-1.5 text-center">
                <button
                  onClick={() => onEditar(g)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(g.id!)}
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
