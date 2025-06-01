"use client";

import { Usuario } from "@/lib/mock/usuarios";

interface Props {
  usuarios: Usuario[];
  onEliminar: (id: number) => void;
  onEditar: (usuario: Usuario) => void;
}

const roles: Record<number, string> = {
  1: "Piloto",
  2: "Guardia",
  3: "Operador",
  4: "Administrador",
  5: "Usuario",
};

const estados: Record<number, string> = {
  1: "Activo",
  2: "Inactivo",
};

export default function TablaUsuarios({
  usuarios,
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
            <th className="px-3 py-1.5">Usuario</th>
            <th className="px-3 py-1.5">Rol</th>
            <th className="px-3 py-1.5">Estado</th>
            <th className="px-3 py-1.5 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr
              key={usuario.id}
              className="border-t text-sm text-gray-800 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              <td className="px-3 py-1.5">{usuario.id}</td>
              <td className="px-3 py-1.5">{usuario.nombre}</td>
              <td className="px-3 py-1.5">{usuario.usuario}</td>
              <td className="px-3 py-1.5">{roles[usuario.rol]}</td>
              <td className="px-3 py-1.5">{estados[usuario.estado]}</td>
              <td className="space-x-2 px-3 py-1.5 text-center">
                <button
                  onClick={() => onEditar(usuario)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(usuario.id)}
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
