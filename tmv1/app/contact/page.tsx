import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página de Contacto | Información sobre el Transmetro",
  description:
    "Esta es la página de contacto para consultas sobre el servicio de Transmetro en Ciudad de Guatemala.",
  // otros metadatos
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Página de Contacto"
        description="El Transmetro es el sistema de transporte público rápido y eficiente de la Ciudad de Guatemala. Aquí puedes encontrar información sobre rutas, horarios y tarifas."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
