export interface Guardia {
  id: number
  nombre: string
  dpi: string
  telefono: string
  direccion: string
  accesoAsignado: string
  estadoAcceso: string
  estado: string
}

export const mockGuardias: Guardia[] = [
  {
    id: 1,
    nombre: 'José Ramírez',
    dpi: '1234567890123',
    telefono: '5555-0011',
    direccion: 'Zona 2, Guatemala',
    accesoAsignado: 'Estación Central',
    estadoAcceso: 'activo',
    estado: 'Activo'
  },
  {
    id: 2,
    nombre: 'Elena Hernández',
    dpi: '9876543210456',
    telefono: '5555-7788',
    direccion: 'Zona 5, Mixco',
    accesoAsignado: 'Estación La Paz',
    estadoAcceso: 'vencido',
    estado: 'Inactivo'
  }
]
