export interface Estacion {
  id: number;
  nombre: string;
  direccion: string;
  tieneParqueo: boolean;
  cantidadAccesos: number;
  lineaAsignada: string;
}

export const mockEstaciones: Estacion[] = [
  {
    id: 1,
    nombre: "Estación Central",
    direccion: "Avenida Reforma 4-72 Zona 9",
    tieneParqueo: true,
    cantidadAccesos: 3,
    lineaAsignada: "Línea 1",
  },
  {
    id: 2,
    nombre: "Estación Roosevelt",
    direccion: "Calzada Roosevelt, Zona 7",
    tieneParqueo: false,
    cantidadAccesos: 2,
    lineaAsignada: "Línea Express Norte",
  },
  {
    id: 3,
    nombre: "Estación La Paz",
    direccion: "Carretera a El Salvador, Zona 15",
    tieneParqueo: true,
    cantidadAccesos: 4,
    lineaAsignada: "Línea Sur",
  },
];
