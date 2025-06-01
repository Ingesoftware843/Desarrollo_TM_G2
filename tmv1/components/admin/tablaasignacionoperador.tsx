"use client";

interface Props {
  tipo: "piloto" | "guardia" | "operador";
  asignaciones: any[];
  onEditar: (a: any) => void;
  onEliminar: (id: number) => void;
}

export default function TablaAsignacion({
  tipo,
  asignaciones,
  onEditar,
  onEliminar,
}: Props) {
  const entidad =
    tipo === "piloto"
      ? "NombrePiloto"
      : tipo === "guardia"
      ? "NombreGuardia"
      : "NombreOperador";

  return (
    <div className="mb-10 overflow-x-auto">
      <h3 className="mb-3 text-lg font-bold capitalize">
        Asignaciones de {tipo}
      </h3>
      <table className="min-w-full rounded bg-white shadow-md dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            <th className="px-3 py-1.5">{entidad.replace("Nombre", "")}</th>
            <th className="px-3 py-1.5">Estación</th>
            <th className="px-3 py-1.5">Inicio</th>
            <th className="px-3 py-1.5">Fin</th>
            <th className="px-3 py-1.5">Turno</th>
            <th className="px-3 py-1.5">Estado</th>
            <th className="px-3 py-1.5 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {asignaciones.map((a) => (
            <tr
              key={a.AsignacionID}
              className="border-t text-sm text-gray-800 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              <td className="px-3 py-1.5">{a[entidad]}</td>
              <td className="px-3 py-1.5">{a.NombreEstacion}</td>
              <td className="px-3 py-1.5">{a.FechaInicio?.substring(0, 10)}</td>
              <td className="px-3 py-1.5">
                {a.FechaFin?.substring(0, 10) || "-"}
              </td>
              <td className="px-3 py-1.5">{a.Turno}</td>
              <td className="px-3 py-1.5">{a.NombreEstado}</td>
              <td className="space-x-2 px-3 py-1.5 text-center">
                <button
                  onClick={() => onEditar(a)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(a.AsignacionID)}
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
