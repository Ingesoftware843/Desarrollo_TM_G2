export interface Alerta {
  id: number
  tipo: 'Estación sobrecargada' | 'Bus con baja ocupación' | 'Sin asignación'
  descripcion: string
  entidad: string
  nivel: 'Crítico' | 'Medio' | 'Informativo'
  fecha: string
}

export const mockAlertas: Alerta[] = [
  {
    id: 1,
    tipo: 'Estación sobrecargada',
    descripcion: 'Capacidad al 167%',
    entidad: 'Estación Central',
    nivel: 'Crítico',
    fecha: '2025-05-12 08:35'
  },
  {
    id: 2,
    tipo: 'Bus con baja ocupación',
    descripcion: 'Ocupación del 21%',
    entidad: 'TM-045',
    nivel: 'Medio',
    fecha: '2025-05-12 08:50'
  },
  {
    id: 3,
    tipo: 'Sin asignación',
    descripcion: 'Guardia sin acceso asignado',
    entidad: 'José Ramírez',
    nivel: 'Informativo',
    fecha: '2025-05-11 14:20'
  }
]
