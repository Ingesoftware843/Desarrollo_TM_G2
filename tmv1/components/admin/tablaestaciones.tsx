"use client";

interface Estacion {
  id: number;
  nombre: string;
  direccion: string;
  capacidadEstimada: number;
  municipalidad: string;
  tieneParqueo: boolean;
  cantidadAccesos: number;
  lineaAsignada: string;
}

interface Props {
  estaciones: Estacion[];
  onEliminar: (id: number) => void;
  onEditar: (estacion: Estacion) => void;
}

export default function TablaEstaciones({
  estaciones,
  onEliminar,
  onEditar,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded bg-white shadow-md dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            <th className="px-3 py-1.5">ID</th>
            <th className="px-3 py-1.5">Nombre</th>
            <th className="px-3 py-1.5">Dirección</th>
            <th className="px-3 py-1.5">Municipalidad</th>
            <th className="px-3 py-1.5">Parqueo</th>
            <th className="px-3 py-1.5">Capacidad Estimada</th>
            <th className="px-3 py-1.5">Accesos</th>
            <th className="px-3 py-1.5">Línea</th>
            <th className="px-3 py-1.5 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estaciones.map((e) => (
            <tr
              key={e.id}
              className="border-t text-sm text-gray-800 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              <td className="px-3 py-1.5">{e.id}</td>
              <td className="px-3 py-1.5">{e.nombre}</td>
              <td className="px-3 py-1.5">{e.direccion}</td>
              <td className="px-3 py-1.5">{e.municipalidad}</td>
              <td className="px-3 py-1.5">{e.tieneParqueo ? "Sí" : "No"}</td>
              <td className="px-3 py-1.5">{e.capacidadEstimada}</td>
              <td className="px-3 py-1.5">{e.cantidadAccesos}</td>
              <td className="px-3 py-1.5">{e.lineaAsignada}</td>
              <td className="space-x-2 px-3 py-1.5 text-center">
                <button
                  onClick={() => onEditar(e)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(e.id)}
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
