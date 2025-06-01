export interface Parqueo {
  id: number
  nombre: string
  capacidad: number
  direccion: string
  estado: 'Disponible' | 'Mantenimiento'
}

export const mockParqueos: Parqueo[] = [
  {
    id: 1,
    nombre: 'Parqueo Norte',
    capacidad: 30,
    direccion: 'Zona 17, Guatemala',
    estado: 'Disponible'
  },
  {
    id: 2,
    nombre: 'Parqueo Central',
    capacidad: 40,
    direccion: 'Zona 1, Guatemala',
    estado: 'Mantenimiento'
  }
]
