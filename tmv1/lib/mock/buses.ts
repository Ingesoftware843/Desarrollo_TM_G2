export interface Bus {
  id: number
  numeroBus: string
  capacidad: number
  lineaAsignada: string
  parqueoAsignado: string
  estado: 'Activo' | 'En espera' | 'Mantenimiento'
}

export const mockBuses: Bus[] = [
  {
    id: 1,
    numeroBus: 'TM-001',
    capacidad: 60,
    lineaAsignada: 'Línea 1',
    parqueoAsignado: 'Parqueo Norte',
    estado: 'Activo'
  },
  {
    id: 2,
    numeroBus: 'TM-017',
    capacidad: 50,
    lineaAsignada: 'Línea Sur',
    parqueoAsignado: 'Parqueo Central',
    estado: 'Mantenimiento'
  },
  {
    id: 3,
    numeroBus: 'TM-045',
    capacidad: 80,
    lineaAsignada: 'Línea Express Norte',
    parqueoAsignado: 'Parqueo Sur',
    estado: 'En espera'
  }
]
