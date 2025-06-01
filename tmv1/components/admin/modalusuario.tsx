"use client";

import { useEffect, useState } from "react";
import { Usuario } from "@/lib/mock/usuarios";

const roles: { id: number; nombre: string }[] = [
  { id: 1, nombre: "Pilotos" },
  { id: 2, nombre: "Guardia" },
  { id: 3, nombre: "Operador" },
  { id: 4, nombre: "Administrador" },
  { id: 5, nombre: "Usuario" },
];

const estados: { id: number; nombre: string }[] = [
  { id: 1, nombre: "Activo" },
  { id: 2, nombre: "Inactivo" },
];

interface Props {
  abierto: boolean;
  usuario?: Usuario | null;
  onCerrar: () => void;
  onGuardar: (usuario: Usuario & { contrasena?: string }) => void;
}

export default function ModalUsuario({
  abierto,
  usuario,
  onCerrar,
  onGuardar,
}: Props) {
  const [form, setForm] = useState<{
    nombre: string;
    usuario: string;
    contrasena: string;
    rol: number;
    estado: number;
  }>({
    nombre: "",
    usuario: "",
    contrasena: "",
    rol: 2,
    estado: 1,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (usuario) {
      setForm({
        nombre: usuario.nombre,
        usuario: usuario.usuario,
        contrasena: "",
        rol: usuario.rol,
        estado: usuario.estado,
      });
    } else {
      setForm({
        nombre: "",
        usuario: "",
        contrasena: "",
        rol: 2,
        estado: 1,
      });
    }
  }, [usuario]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "rol" || name === "estado" ? parseInt(value) : value,
    });
  };

  const handleSubmit = () => {
    if (
      form.nombre.trim() === "" ||
      form.usuario.trim() === "" ||
      (!usuario && form.contrasena.trim() === "")
    ) {
      setError("Por favor, complete todos los campos requeridos.");
      return;
    }

    setError("");

    const nuevoUsuario: Usuario & { contrasena?: string } = {
      id: usuario?.id ?? Math.floor(Math.random() * 10000),
      nombre: form.nombre,
      usuario: form.usuario,
      rol: form.rol,
      estado: form.estado,
    };

    if (form.contrasena.trim()) {
      nuevoUsuario.contrasena = form.contrasena;
    }

    onGuardar(nuevoUsuario);
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-md dark:bg-dark">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {usuario ? "Editar Usuario" : "Nuevo Usuario"}
        </h2>

        <div className="space-y-3">
          <input
            name="nombre"
            type="text"
            placeholder="Nombre"
            className="w-full rounded border bg-white px-3 py-2 text-black dark:bg-dark dark:text-white"
            value={form.nombre}
            onChange={handleChange}
          />
          <input
            name="usuario"
            type="email"
            placeholder="Correo"
            className="w-full rounded border bg-white px-3 py-2 text-black dark:bg-dark dark:text-white"
            value={form.usuario}
            onChange={handleChange}
          />
          {!usuario && (
            <input
              name="contrasena"
              type="password"
              placeholder="Contraseña"
              className="w-full rounded border bg-white px-3 py-2 text-black dark:bg-dark dark:text-white"
              value={form.contrasena}
              onChange={handleChange}
            />
          )}
          {usuario && (
            <input
              name="contrasena"
              type="password"
              placeholder="Nueva Contraseña (opcional)"
              className="w-full rounded border bg-white px-3 py-2 text-black dark:bg-dark dark:text-white"
              value={form.contrasena}
              onChange={handleChange}
            />
          )}
          <select
            name="rol"
            className="w-full rounded border bg-white px-3 py-2 text-black dark:bg-dark dark:text-white"
            value={form.rol}
            onChange={handleChange}
          >
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nombre}
              </option>
            ))}
          </select>
          <select
            name="estado"
            className="w-full rounded border bg-white px-3 py-2 text-black dark:bg-dark dark:text-white"
            value={form.estado}
            onChange={handleChange}
          >
            {estados.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nombre}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
            onClick={onCerrar}
          >
            Cancelar
          </button>
          <button
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={handleSubmit}
          >
            {usuario ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
