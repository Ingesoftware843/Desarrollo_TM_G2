"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const SigninPage = () => {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("TokenAuth="));

    if (token) {
      try {
        const tokenValue = token.split("=")[1];
        const decoded: any = jwtDecode(tokenValue);

        const rol = decoded?.RolID;

        // Redirigir según el rol
        if (rol === 4) router.replace("/admin/dashboard");
        else if (rol === 5) router.replace("/usuarios/inicio");
        else if (rol === 3) router.replace("/operador/inicio");
        else if (rol === 2) router.replace("/guardia/inicio");
        else if (rol === 1) router.replace("/piloto/inicio");
        else router.replace("/denied");
      } catch (e) {
        console.error("Token inválido", e);
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${
          process.env.NEXT_PUBLIC_API_URL || "https://api-tm-57df.onrender.com"
        }/api/login`,
        {
          Usuario: usuario,
          Contrasena: contrasena,
        },
        { withCredentials: true },
      );

      if (response.status === 200) {
        if (response.status === 200) {
          const token = document.cookie
            .split("; ")
            .find((cookie) => cookie.startsWith("TokenAuth="));

          if (token) {
            const tokenValue = token.split("=")[1];
            const decoded: any = jwtDecode(tokenValue);
            const rol = decoded?.RolID;

            // Redirigir según el rol
            if (rol === 4) router.replace("/admin/dashboard");
            else if (rol === 5) router.replace("/usuarios/inicio");
            else if (rol === 3) router.replace("/operador/inicio");
            else if (rol === 2) router.replace("/guardia/inicio");
            else if (rol === 1) router.replace("/piloto/inicio");
            else router.replace("/denied");
          } else {
            router.replace("/signin");
          }
        }
      }
    } catch (err: any) {
      setError(err?.response?.data?.mensaje || "Credenciales incorrectas");
    }
  };

  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Inicia sesión en tu cuenta
              </h3>
              <p className="mb-11 text-center text-base font-medium text-body-color">
                Inicie sesión en su cuenta para viajes con mayor información.
              </p>

              <form onSubmit={handleLogin}>
                <div className="mb-8">
                  <label
                    htmlFor="usuario"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Usuario
                  </label>
                  <input
                    type="text"
                    name="usuario"
                    placeholder="Ingresa tu usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="contrasena"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="contrasena"
                    placeholder="Ingresa tu contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                {error && (
                  <div className="mb-4 text-sm text-red-600">{error}</div>
                )}
                <div className="mb-6">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </form>
              <p className="text-center text-base font-medium text-body-color">
                ¿No tienes una cuenta?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Regístrate
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 z-[-1]">
        <svg
          width="1440"
          height="969"
          viewBox="0 0 1440 969"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_95:1005"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1440"
            height="969"
          >
            <rect width="1440" height="969" fill="#090E34" />
          </mask>
          <g mask="url(#mask0_95:1005)">
            <path
              opacity="0.1"
              d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
              fill="url(#paint0_linear_95:1005)"
            />
            <path
              opacity="0.1"
              d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
              fill="url(#paint1_linear_95:1005)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_95:1005"
              x1="1178.4"
              y1="151.853"
              x2="780.959"
              y2="453.581"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_95:1005"
              x1="160.5"
              y1="220"
              x2="1099.45"
              y2="1192.04"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default SigninPage;
