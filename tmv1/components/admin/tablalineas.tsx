"use client";

interface Linea {
  LineaID: number;
  Nombre: string;
  Municipalidad: string;
  MapaURL: string;
  DistanciaTotal: number;
  Estado: string;
}

interface Props {
  lineas: Linea[];
  onEditar: (linea: Linea) => void;
  onEliminar: (id: number) => void;
}

export default function TablaLineas({ lineas, onEditar, onEliminar }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded bg-white shadow-md dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            <th className="px-3 py-1.5">ID</th>
            <th className="px-3 py-1.5">Nombre</th>
            <th className="px-3 py-1.5">Municipalidad</th>
            <th className="px-3 py-1.5">Mapa</th>
            <th className="px-3 py-1.5">Distancia (km)</th>
            <th className="px-3 py-1.5">Estado</th>
            <th className="px-3 py-1.5 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lineas.map((linea) => (
            <tr
              key={linea.LineaID}
              className="border-t text-sm text-gray-800 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              <td className="px-3 py-1.5">{linea.LineaID}</td>
              <td className="px-3 py-1.5">{linea.Nombre}</td>
              <td className="px-3 py-1.5">{linea.Municipalidad}</td>
              <td className="px-3 py-1.5">
                <a
                  href={linea.MapaURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Ver mapa
                </a>
              </td>
              <td className="px-3 py-1.5">{linea.DistanciaTotal} Km</td>
              <td className="px-3 py-1.5">{linea.Estado}</td>
              <td className="space-x-2 px-3 py-1.5 text-center">
                <button
                  onClick={() => onEditar(linea)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(linea.LineaID)}
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
