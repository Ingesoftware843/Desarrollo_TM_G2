// lib/mock/lineas.ts

export interface Linea {
    id: number
    nombre: string
    estaciones: number
    busesAsignados: number
    municipalidad: string
  }
  
  export const mockLineas: Linea[] = [
    {
      id: 1,
      nombre: 'Línea 1',
      estaciones: 8,
      busesAsignados: 12,
      municipalidad: 'Guatemala Centro'
    },
    {
      id: 2,
      nombre: 'Línea Express Norte',
      estaciones: 5,
      busesAsignados: 10,
      municipalidad: 'Mixco'
    },
    {
      id: 3,
      nombre: 'Línea Sur',
      estaciones: 6,
      busesAsignados: 6,
      municipalidad: 'Villa Nueva'
    }
  ]
  