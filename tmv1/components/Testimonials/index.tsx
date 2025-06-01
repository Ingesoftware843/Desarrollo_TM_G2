import SectionTitle from "../Common/SectionTitle";

const lineas = [
  {
    id: 1,
    nombre: "Línea 1",
    url: "https://www.google.com/maps/d/edit?mid=1onOZckUmNyfQrAZUPec8MC0hhUTKexY&usp=sharing",
  },
  {
    id: 2,
    nombre: "Línea 2",
    url: "https://www.google.com/maps/d/edit?mid=1KGpgJ29pu1LJp3KhwYXB0THgvM65Tuw&usp=sharing",
  },
  {
    id: 3,
    nombre: "Línea 5 - Tubus",
    url: "https://www.google.com/maps/d/edit?mid=1jhl7VZcpiTF6ldMQ-N2sIIdMdwsMuwc&usp=sharing",
  },
  {
    id: 4,
    nombre: "Línea 6",
    url: "https://www.google.com/maps/d/edit?mid=1qCWMNxlLJJhArTvhBpNM93ZhQG-uAyU&usp=sharing",
  },
  {
    id: 5,
    nombre: "Línea 7",
    url: "https://www.google.com/maps/d/edit?mid=1jqFtjTIrqJN6xgiT3HbG-uEYmLUOv-Y&usp=sharing",
  },
  {
    id: 6,
    nombre: "Línea 12",
    url: "https://www.google.com/maps/d/edit?mid=1Yk3iJhiY4QRnhQ89aFfeW5qpKx6MISc&usp=sharing",
  },
  {
    id: 7,
    nombre: "Línea 13",
    url: "https://www.google.com/maps/d/edit?mid=1z-YpDr-1RGYyp30NVRwluDeQSJqIB4g&usp=sharing",
  },
  {
    id: 8,
    nombre: "Línea 18",
    url: "https://www.google.com/maps/d/edit?mid=1fHKPFxIGg6L7qYrUbXRwJgzzMeUGjE8&usp=sharing",
  },
];

const Testimonials = () => {
  return (
    <section className="relative z-10 bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Líneas del Transmetro"
          paragraph="Consulta las rutas activas del sistema Transmetro. Haz clic en cada línea para ver el mapa interactivo en Google Maps."
          center
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lineas.map((linea) => (
            <div
              key={linea.id}
              className="rounded-md bg-white p-6 shadow-lg dark:bg-gray-dark"
            >
              <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">
                {linea.nombre}
              </h3>
              <a
                href={linea.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded bg-primary px-5 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
              >
                Ver en mapa
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Se conservan los SVG decorativos */}
      <div className="absolute right-0 top-5 z-[-1]">
        {/* SVG original aquí */}
      </div>
      <div className="absolute bottom-5 left-0 z-[-1]">
        {/* SVG original aquí */}
      </div>
    </section>
  );
};

export default Testimonials;
