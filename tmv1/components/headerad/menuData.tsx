import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Inicio",
    path: "/admin",
    newTab: false,
  },
  {
    id: 2,
    title: "Acerca de",
    path: "/admin/about",
    newTab: false,
  },
  {
    id: 33,
    title: "Blog",
    path: "/admin/blog",
    newTab: false,
  },
  {
    id: 3,
    title: "Soporte",
    path: "/admin/contact",
    newTab: false,
  },
  {
    id: 4,
    title: "Paginas",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "About Page",
        path: "/admin/",
        newTab: false,
      },
      {
        id: 42,
        title: "Contact Page",
        path: "/admin/",
        newTab: false,
      },
    ],
  },
];

export default menuData;
