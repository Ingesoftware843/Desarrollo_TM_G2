export interface ReporteBus {
  id: number
  numero: string
  linea: string
  capacidad: number
  parqueo: string
}

export const mockReporteBuses: ReporteBus[] = [
  {
    id: 1,
    numero: 'TM-001',
    linea: 'Línea 1',
    capacidad: 60,
    parqueo: 'Parqueo Norte'
  },
  {
    id: 2,
    numero: 'TM-002',
    linea: 'Línea Sur',
    capacidad: 70,
    parqueo: ''
  },
  {
    id: 3,
    numero: 'TM-003',
    linea: 'Línea Express Norte',
    capacidad: 80,
    parqueo: 'Parqueo Sur'
  },
  {
    id: 4,
    numero: 'TM-004',
    linea: 'Línea 1',
    capacidad: 50,
    parqueo: ''
  }
]
