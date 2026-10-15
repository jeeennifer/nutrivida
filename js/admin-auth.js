const sesionActivaAdmin = localStorage.getItem("sesionActiva") === "true";
const correoSesionActual =(localStorage.getItem("correoSesion") || "").trim().toLowerCase();
const usuarioSesionAdmin = obtenerUsuarios().find((usuario) => {
  return usuario.correo.trim().toLowerCase() === correoSesionActual;
});

if (!sesionActivaAdmin || !usuarioSesionAdmin) {
  window.location.href = "login.html";
} else if (usuarioSesionAdmin.tipo !== "Administrador") {
  window.location.href = "index.html";
}

const btnCerrarSesionAdmin = document.getElementById("cerrar-sesion-admin");
if (btnCerrarSesionAdmin) {
  btnCerrarSesionAdmin.addEventListener("click", () => {
    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("correoSesion");
    localStorage.removeItem("nombreSesion");
    localStorage.removeItem("destinoTrasLogin");
    localStorage.removeItem("carrito");

    window.location.href = "login.html";
  });
}