/* proteger las páginas admin-*.html.
Como el proyecto es solo HTML/CSS/JS (sin servidor), la
"protección" es una simulación en el navegador: si no hay
sesión guardada en localStorage, se redirige de inmediato
a login.html. Este script debe cargarse ANTES que cualquier
otro script propio de cada página de administración.
*/


const sesionActivaAdmin = localStorage.getItem("sesionActiva") === "true";
const correoSesionActual = (localStorage.getItem("correoSesion") || "").toLowerCase();

if (!sesionActivaAdmin) {
  window.location.href = "login.html";
} else if (correoSesionActual !== "admin@gmail.com") {
  window.location.href = "index.html";
}

const btnCerrarSesionAdmin = document.getElementById("cerrar-sesion-admin");
if (btnCerrarSesionAdmin) {
  btnCerrarSesionAdmin.addEventListener("click", () => {
    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("correoSesion");
    window.location.href = "login.html";
  });
}