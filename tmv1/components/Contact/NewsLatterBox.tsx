"use client";

import { useTheme } from "next-themes";

const NewsLatterBox = () => {
  const { theme } = useTheme();

  return (
    <div
      className="wow fadeInUp relative z-10 rounded-sm bg-white p-8 shadow-three dark:bg-gray-dark sm:p-11 lg:p-8 xl:p-11"
      data-wow-delay=".2s"
    >
      <h3 className="mb-4 text-2xl font-bold leading-tight text-black dark:text-white">
        Suscríbete para recibir actualizaciones
      </h3>
      <p className="mb-11 border-b border-body-color border-opacity-25 pb-11 text-base leading-relaxed text-body-color dark:border-white dark:border-opacity-25">
        Recibe en tu correo noticias sobre rutas, horarios, alertas de servicio
        y novedades del sistema Transmetro. Mantente siempre informado.
      </p>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Ingresa tu nombre"
          className="mb-4 w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Ingresa tu correo electrónico"
          className="mb-4 w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
        />
        <input
          type="submit"
          value="Suscribirme"
          className="mb-5 flex w-full cursor-pointer items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
        />
        <p className="text-center text-base leading-relaxed text-body-color dark:text-body-color-dark">
          Prometemos no enviarte correos no deseados.
        </p>
      </div>

      {/* SVG decorativos conservados sin cambios */}
      <div>
        {/* Todos los <span> con SVG decorativos se mantienen tal cual como los tienes */}
        {/* ... */}
      </div>
    </div>
  );
};

export default NewsLatterBox;
