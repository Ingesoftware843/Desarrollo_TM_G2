"use client";

interface Props {
  viajes: {
    ViajeID: number;
    EstacionOrigen: string;
    EstacionDestino: string;
    FechaRegistro: string;
  }[];
}

export default function TablaViajesUsuario({ viajes }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded bg-white shadow-md dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            <th className="px-3 py-1.5">ID</th>
            <th className="px-3 py-1.5">Estación Origen</th>
            <th className="px-3 py-1.5">Estación Destino</th>
            <th className="px-3 py-1.5">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {viajes.map((v) => (
            <tr
              key={v.ViajeID}
              className="border-t text-sm text-gray-800 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              <td className="px-3 py-1.5">{v.ViajeID}</td>
              <td className="px-3 py-1.5">{v.EstacionOrigen}</td>
              <td className="px-3 py-1.5">{v.EstacionDestino}</td>
              <td className="px-3 py-1.5">
                {new Date(v.FechaRegistro).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
