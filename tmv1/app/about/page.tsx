import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acerca del Transmetro | Sistema de Transporte Público",
  description:
    "Conoce más sobre el sistema Transmetro, sus beneficios, estructura y compromiso con la movilidad urbana sostenible.",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Acerca del Transmetro"
        description="Transmetro es un sistema de transporte público masivo que busca transformar la movilidad urbana a través de un servicio eficiente, seguro y accesible para todos los ciudadanos."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
