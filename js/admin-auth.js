/* proteger las páginas admin-*.html.
// Como el proyecto es solo HTML/CSS/JS (sin servidor), la
// "protección" es una simulación en el navegador: si no hay
// sesión guardada en localStorage, se redirige de inmediato
// a login.html. Este script debe cargarse ANTES que cualquier
// otro script propio de cada página de administración.
*/

if (localStorage.getItem("sesionActiva") !== "true") {
  window.location.href = "login.html";
}

const btnCerrarSesionAdmin = document.getElementById("cerrar-sesion-admin");
if (btnCerrarSesionAdmin) {
  btnCerrarSesionAdmin.addEventListener("click", () => {
    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("correoSesion");
    window.location.href = "login.html";
  });
}