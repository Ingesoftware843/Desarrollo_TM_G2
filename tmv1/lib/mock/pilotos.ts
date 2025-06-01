export interface Piloto {
  id: number
  nombre: string
  dpi: string
  telefono: string
  direccion: string
  nivelAcademico: string
  lineaAsignada: string
  estado: 'Activo' | 'Inactivo'
}

export const mockPilotos: Piloto[] = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    dpi: '1234567890101',
    telefono: '5555-1234',
    direccion: 'Zona 1, Guatemala',
    nivelAcademico: 'Diversificado',
    lineaAsignada: 'Línea 1',
    estado: 'Activo'
  },
  {
    id: 2,
    nombre: 'Ana Gómez',
    dpi: '9876543210101',
    telefono: '5555-5678',
    direccion: 'Zona 6, Mixco',
    nivelAcademico: 'Universitario',
    lineaAsignada: 'Línea Sur',
    estado: 'Inactivo'
  }
]
