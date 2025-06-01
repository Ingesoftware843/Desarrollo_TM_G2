import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Dashboard",
    path: "/admin/dashboard",
    visiblePara: ["admin"],
    newTab: false,
  },

  {
    id: 2,
    title: "Gestiones",
    newTab: false,
    visiblePara: ["admin"],
    submenu: [
      {
        id: 26,
        title: "Adignacion de Roles",
        path: "/admin/gestion/asignacionroles",
        visiblePara: ["admin"],
        newTab: false,
      },
      {
        id: 27,
        title: "Adignaciones",
        path: "/admin/gestion/asignaciones",
        visiblePara: ["admin"],
        newTab: false,
      },
    ],
  },
  {
    id: 5,
    title: "Transporte",
    newTab: false,
    visiblePara: ["admin"],
    submenu: [
      {
        id: 51,
        title: "Municipalidades",
        path: "/admin/transporte/municipalidades",
        visiblePara: ["admin"],
        newTab: false,
      },
      {
        id: 53,
        title: "Estaciones",
        path: "/admin/transporte/estaciones",
        visiblePara: ["admin"],
        newTab: false,
      },
      {
        id: 54,
        title: "Lineas",
        path: "/admin/transporte/lineas",
        visiblePara: ["admin"],
        newTab: false,
      },
      {
        id: 55,
        title: "Buses",
        path: "/admin/transporte/buses",
        visiblePara: ["admin"],
        newTab: false,
      },
      {
        id: 56,
        title: "Parqueos",
        path: "/admin/transporte/parqueos",
        visiblePara: ["admin"],
        newTab: false,
      },
      {
        id: 57,
        title: "Viajes",
        path: "/admin/transporte/registroviajes",
        visiblePara: ["admin"],
        newTab: false,
      },
    ],
  },
  {
    id: 6,
    title: "Personal",
    newTab: false,
    visiblePara: ["admin"],
    submenu: [
      {
        id: 61,
        title: "Usuarios",
        path: "/admin/gestion/usuarios",
        visiblePara: ["admin"],
        newTab: false,
      },
      {
        id: 62,
        title: "Pilotos",
        path: "/admin/gestion/personal/pilotos",
        visiblePara: ["admin"],
        newTab: false,
      },
      {
        id: 63,
        title: "Guardias",
        path: "/admin/gestion/personal/guardias",
        visiblePara: ["admin"],
        newTab: false,
      },
      {
        id: 64,
        title: "Operadores",
        path: "/admin/gestion/personal/operadores",
        visiblePara: ["admin"],
        newTab: false,
      },
      {
        id: 65,
        title: "Historial educativo",
        path: "/admin/gestion/personal/educativo",
        visiblePara: ["admin"],
        newTab: false,
      },
    ],
  },
  {
    id: 7,
    title: "Seguridad",
    newTab: false,
    visiblePara: ["admin"],
    submenu: [
      {
        id: 71,
        title: "Estados",
        path: "/admin/seguridad/estados",
        visiblePara: ["admin"],
        newTab: false,
      },
      {
        id: 72,
        title: "Roles",
        path: "/admin/seguridad/roles",
        visiblePara: ["admin"],
        newTab: false,
      },
      {
        id: 73,
        title: "Accesos",
        path: "/admin/gestion/accesos",
        visiblePara: ["admin"],
        newTab: false,
      },

      {
        id: 74,
        title: "Reportes",
        path: "/admin/reportes",
        visiblePara: ["admin"],
        newTab: false,
      },
      {
        id: 75,
        title: "Alertas",
        path: "/admin/alertas",
        visiblePara: ["admin"],
        newTab: false,
      },
    ],
  },
];

export default menuData;
