"use client";

import { useEffect, useState } from "react";
import { Usuario } from "@/lib/mock/usuarios";
import TablaUsuarios from "@/components/admin/tablausuarios";
import ModalUsuario from "@/components/admin/modalusuario";
import {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario as eliminarUsuarioApi,
} from "@/services/usuariosservice";

export default function GestionUsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario | null>(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const datos = await obtenerUsuarios();
      const mapeados = datos.map((u: any) => ({
        id: u.UsuarioID,
        nombre: u.NombreA,
        usuario: u.Usuario,
        rol: u.RolID,
        estado: u.EstadoID,
      }));
      setUsuarios(mapeados);
    } catch (error) {
      console.error("Error al cargar usuarios", error);
    }
  };

  const eliminarUsuario = async (id: number) => {
    try {
      await eliminarUsuarioApi(id);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Error eliminando usuario", error);
    }
  };

  const editarUsuario = (usuario: Usuario) => {
    setUsuarioEditar(usuario);
    setModalAbierto(true);
  };

  const guardarUsuario = async (nuevo: Usuario & { contrasena?: string }) => {
    try {
      if (usuarioEditar) {
        const datosActualizar: any = {
          NombreA: nuevo.nombre,
          Usuario: nuevo.usuario,
          RolID: nuevo.rol,
          EstadoID: nuevo.estado,
        };

        if (nuevo.contrasena?.trim()) {
          datosActualizar.Contrasena = nuevo.contrasena;
        }

        await actualizarUsuario(nuevo.id, datosActualizar);
        setUsuarios((prev) => prev.map((u) => (u.id === nuevo.id ? nuevo : u)));
      } else {
        await crearUsuario({
          NombreA: nuevo.nombre,
          Usuario: nuevo.usuario,
          Contrasena: nuevo.contrasena?.trim() || "123456", // fallback por seguridad
          RolID: nuevo.rol,
          EstadoID: nuevo.estado,
        });
        await cargarUsuarios();
      }
      setModalAbierto(false);
    } catch (error) {
      console.error("Error guardando usuario", error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white sm:mb-0">
          Gestión de Cuenta
        </h1>
      </div>

      <TablaUsuarios
        usuarios={usuarios}
        onEliminar={eliminarUsuario}
        onEditar={editarUsuario}
      />

      <ModalUsuario
        abierto={modalAbierto}
        usuario={usuarioEditar}
        onCerrar={() => setModalAbierto(false)}
        onGuardar={guardarUsuario}
      />
    </div>
  );
}
