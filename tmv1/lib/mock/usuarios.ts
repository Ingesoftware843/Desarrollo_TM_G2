export interface Usuario {
  id: number
  nombre: string
  usuario: string
  rol: number
  estado: number
}

export const mockUsuarios: Usuario[] = [
  {
    id: 1,
    nombre: 'María Pérez',
    usuario: 'maria@transmetro.gt',
    rol:1,
    estado: 1
  },
  {
    id: 2,
    nombre: 'Luis Gómez',
    usuario: 'luis@transmetro.gt',
    rol: 1,
    estado: 2
  },
  {
    id: 3,
    nombre: 'Carlos López',
    usuario: 'carlos@transmetro.gt',
    rol: 4,
    estado: 1
  }
]
