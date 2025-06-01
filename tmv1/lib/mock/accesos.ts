export interface Acceso {
  id: number
  nombre: string
  ubicacion: string
  estacion: string
  estado: 'Activo' | 'Inactivo'
}

export const mockAccesos: Acceso[] = [
  {
    id: 1,
    nombre: 'Acceso Norte',
    ubicacion: 'Ingreso por Avenida Reforma',
    estacion: 'Estación Central',
    estado: 'Activo'
  },
  {
    id: 2,
    nombre: 'Acceso Sur',
    ubicacion: 'Ingreso por Calzada Aguilar Batres',
    estacion: 'Estación Roosevelt',
    estado: 'Inactivo'
  }
]
