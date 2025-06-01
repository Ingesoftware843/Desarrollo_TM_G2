interface Props {
  datos: any[];
  tipo: string;
}

export default function TablaReporte({ datos, tipo }: Props) {
  if (!datos.length)
    return <p className="text-gray-500">No hay datos para mostrar.</p>;

  const columnas = Object.keys(datos[0]);

  return (
    <div className="overflow-x-auto rounded border">
      <table className="min-w-full bg-white text-sm text-gray-800 dark:bg-gray-800 dark:text-white">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            {columnas.map((col) => (
              <th key={col} className="px-3 py-2 text-left">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((fila, idx) => (
            <tr
              key={idx}
              className="border-t hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {columnas.map((col) => (
                <td key={col} className="px-3 py-2">
                  {String(fila[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
