"use client";

import Footer from "@/components/Footer";
import Header from "@/components/admenu";
import ScrollToTop from "@/components/ScrollToTop";
import { Providers } from "../providers";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "node_modules/react-modal-video/css/modal-video.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Header />
      <main className="mt-20 ">{children}</main>
      <Footer />
      <ScrollToTop />
    </Providers>
  );
}
