"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const rutasAdmin = ["/admin", "/usuarios", "/empleados"];
  const isAdmin = rutasAdmin.some((ruta) => pathname?.startsWith(ruta));

  return (
    <html suppressHydrationWarning lang="es">
      <head />
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          {!isAdmin && <Header />}
          {children}
          {!isAdmin && <Footer />}
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
