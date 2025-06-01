"use client";

interface Alerta {
  AlertaID: number;
  TipoAlerta: string;
  EstacionID?: number;
  BusID?: number;
  FechaHora: string;
  Descripcion: string;
  Estado: string;
}

interface Props {
  alertas: Alerta[];
  onEditar?: (alerta: Alerta) => void;
}

export default function TablaAlertas({ alertas, onEditar }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded bg-white shadow-md dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            <th className="px-3 py-1.5">Tipo</th>
            <th className="px-3 py-1.5">Descripción</th>
            <th className="px-3 py-1.5">Estación</th>
            <th className="px-3 py-1.5">Bus</th>
            <th className="px-3 py-1.5">Fecha</th>
            <th className="px-3 py-1.5">Estado</th>
            <th className="px-3 py-1.5 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alertas.map((alerta) => (
            <tr
              key={alerta.AlertaID}
              className={`border-t text-sm hover:bg-gray-50 dark:hover:bg-gray-600 ${
                alerta.Estado === "Activa"
                  ? "text-red-400"
                  : alerta.Estado === "Pendiente"
                  ? "text-yellow-500"
                  : alerta.Estado === "Resuelta"
                  ? "text-blue-400 dark:text-lime-400"
                  : "dark:text-lime-200"
              }`}
            >
              <td className="px-3 py-1.5">{alerta.TipoAlerta}</td>
              <td className="px-3 py-1.5">{alerta.Descripcion}</td>
              <td className="px-3 py-1.5">{alerta.EstacionID ?? "—"}</td>
              <td className="px-3 py-1.5">{alerta.BusID ?? "—"}</td>
              <td className="px-3 py-1.5">
                {new Date(alerta.FechaHora).toLocaleString()}
              </td>
              <td className="px-3 py-1.5">{alerta.Estado}</td>
              <td className="px-3 py-1.5 text-center">
                <button
                  onClick={() => onEditar?.(alerta)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
