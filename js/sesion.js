const botonSesion = document.querySelector(".boton-ingresar");
const saludoUsuario = document.getElementById("saludo-usuario");

const sesionActiva = localStorage.getItem("sesionActiva") === "true";

if (botonSesion && sesionActiva) {
  const nombre = localStorage.getItem("nombreSesion") || "Paciente";

  if (saludoUsuario) {
    saludoUsuario.textContent = "Hola, " + nombre;
  }

  botonSesion.textContent = "Cerrar sesión";

  botonSesion.addEventListener("click", (evento) => {
    evento.preventDefault();

    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("correoSesion");
    localStorage.removeItem("nombreSesion");
    localStorage.removeItem("destinoTrasLogin");
    localStorage.removeItem("carrito");

    window.location.href = "index.html";
  });
}