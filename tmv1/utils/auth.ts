import { jwtDecode } from "jwt-decode";

export const obtenerRolDesdeToken = (): number | null => {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("TokenAuth="));
  if (!tokenCookie) return null;

  const token = tokenCookie.split("=")[1];
  try {
    const decoded: any = jwtDecode(token);
    return decoded.RolID;
  } catch (e) {
    return null;
  }
};
