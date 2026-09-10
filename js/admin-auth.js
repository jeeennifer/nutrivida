

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