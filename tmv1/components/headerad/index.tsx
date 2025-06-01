"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const AdminHeader = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);
  const pathname = usePathname();

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  const handleSubmenu = (index: number) => {
    if (openIndex === index) setOpenIndex(-1);
    else setOpenIndex(index);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  return (
    <header
      className={`left-0 top-0 z-40 flex w-full items-center justify-between px-4 py-4 ${
        sticky
          ? "fixed z-[9999] bg-white shadow backdrop-blur-sm transition dark:bg-gray-800 dark:shadow-lg"
          : "absolute bg-transparent"
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center space-x-2">
          <Image
            src="/images/logo/logotm.png"
            alt="logo claro"
            width={120}
            height={30}
            className="dark:hidden"
          />
          <Image
            src="/images/logo/logotm2.png"
            alt="logo oscuro"
            width={120}
            height={30}
            className="hidden dark:block"
          />
        </Link>

        <div className="hidden items-center space-x-6 lg:flex">
          {menuData.map((item, index) => (
            <div key={index} className="group relative">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => handleSubmenu(index)}
                    className={`text-sm font-medium ${
                      pathname === item.path
                        ? "text-primary dark:text-white"
                        : "text-gray-800 hover:text-primary dark:text-white/70 dark:hover:text-white"
                    }`}
                  >
                    {item.title} ▾
                  </button>
                  {openIndex === index && (
                    <div className="absolute left-0 top-full z-50 mt-2 w-48 rounded-md bg-white shadow-lg dark:bg-gray-800">
                      <ul className="py-2">
                        {item.submenu.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              href={sub.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                              onClick={() => setNavbarOpen(false)}
                            >
                              {sub.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.path}
                  className={`text-sm font-medium ${
                    pathname === item.path
                      ? "text-primary dark:text-white"
                      : "text-gray-800 hover:text-primary dark:text-white/70 dark:hover:text-white"
                  }`}
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}

          <Link
            href="/admin/perfil"
            className="text-sm font-medium text-gray-800 hover:text-primary dark:text-white/70 dark:hover:text-white"
          >
            Mi Perfil
          </Link>
          <Link
            href="/admin/configuracion"
            className="text-sm font-medium text-gray-800 hover:text-primary dark:text-white/70 dark:hover:text-white"
          >
            Configuración
          </Link>
          <button className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700">
            Cerrar Sesión
          </button>
        </div>

        <div className="flex items-center space-x-4 lg:hidden">
          <ThemeToggler />
          <button onClick={navbarToggleHandler} aria-label="Mobile Menu">
            {navbarOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`absolute left-0 top-full z-50 w-full bg-white transition-all dark:bg-gray-800 lg:hidden ${
          navbarOpen ? "block" : "hidden"
        }`}
      >
        <ul className="space-y-4 p-4">
          {menuData.map((item, index) => (
            <li key={item.id}>
              {item.path ? (
                <Link
                  href={item.path}
                  className="block text-sm font-medium text-gray-800 dark:text-white"
                  onClick={() => setNavbarOpen(false)}
                >
                  {item.title}
                </Link>
              ) : (
                item.submenu && (
                  <details>
                    <summary className="cursor-pointer text-sm font-medium text-gray-800 dark:text-white">
                      {item.title}
                    </summary>
                    <ul className="ml-4 mt-2 space-y-2">
                      {item.submenu.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            href={sub.path}
                            className="block text-sm text-gray-700 dark:text-white"
                            onClick={() => setNavbarOpen(false)}
                          >
                            {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                )
              )}
            </li>
          ))}
          <li>
            <Link
              href="/admin/perfil"
              className="block text-sm font-medium text-gray-800 dark:text-white"
              onClick={() => setNavbarOpen(false)}
            >
              Mi Perfil
            </Link>
          </li>
          <li>
            <Link
              href="/admin/configuracion"
              className="block text-sm font-medium text-gray-800 dark:text-white"
              onClick={() => setNavbarOpen(false)}
            >
              Configuración
            </Link>
          </li>
          <li>
            <button className="w-full rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700">
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;
