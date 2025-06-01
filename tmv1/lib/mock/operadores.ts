export interface Operador {
  id: number
  nombre: string
  dpi: string
  telefono: string
  direccion: string
  estacionAsignada: string
  estado: 'Activo' | 'Inactivo'
}

export const mockOperadores: Operador[] = [
  {
    id: 1,
    nombre: 'Laura Castillo',
    dpi: '1234567899999',
    telefono: '5555-3210',
    direccion: 'Zona 3, Guatemala',
    estacionAsignada: 'Estación Roosevelt',
    estado: 'Activo'
  },
  {
    id: 2,
    nombre: 'Mario López',
    dpi: '9876543210011',
    telefono: '5555-1100',
    direccion: 'Zona 11, Villa Nueva',
    estacionAsignada: 'Estación Central',
    estado: 'Inactivo'
  }
]
