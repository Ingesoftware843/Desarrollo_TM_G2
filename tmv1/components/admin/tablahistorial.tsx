"use client";

interface HistorialCompleto {
  id?: number;
  pilotoId: number;
  nombrePiloto: string;
  nivelEducativo: string;
  institucion: string;
  fechaInicio: string;
  fechaFin: string;
  certificacion: string;
}

interface Props {
  historiales: HistorialCompleto[];
  onEliminar: (id: number) => void;
  onEditar: (historial: HistorialCompleto) => void;
}

export default function TablaHistorial({
  historiales,
  onEliminar,
  onEditar,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded bg-white shadow-md dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            <th className="px-3 py-1.5">Piloto</th>
            <th className="px-3 py-1.5">Nivel Educativo</th>
            <th className="px-3 py-1.5">Institución</th>
            <th className="px-3 py-1.5">Fecha Inicio</th>
            <th className="px-3 py-1.5">Fecha Fin</th>
            <th className="px-3 py-1.5">Certificación</th>
            <th className="px-3 py-1.5 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {historiales.map((h) => (
            <tr
              key={h.id}
              className="border-t text-sm text-gray-800 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              <td className="px-3 py-1.5">
                {h.nombrePiloto} (ID: {h.pilotoId})
              </td>
              <td className="px-3 py-1.5">{h.nivelEducativo}</td>
              <td className="px-3 py-1.5">{h.institucion}</td>
              <td className="px-3 py-1.5">{h.fechaInicio}</td>
              <td className="px-3 py-1.5">{h.fechaFin}</td>
              <td className="px-3 py-1.5">{h.certificacion}</td>
              <td className="space-x-2 px-3 py-1.5 text-center">
                <button
                  onClick={() => onEditar(h)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(h.id!)}
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
