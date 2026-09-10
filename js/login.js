const formularioLogin = document.getElementById("formulario-login");

if (formularioLogin) {
  const inputEmail = document.getElementById("email");
  const inputPassword = document.getElementById("password");

  formularioLogin.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const errorEmail = validarCorreo(inputEmail.value);
    const errorPassword = validarPassword(inputPassword.value);

    mostrarErrorCampo("error-email", errorEmail);
    mostrarErrorCampo("error-password", errorPassword);

    if (errorEmail || errorPassword) {
      mostrarMensajeFormulario("mensaje-login", "Revisa los campos marcados antes de continuar.", "error");
      return;
    }

    // simulación de sesión solo en el navegador (localStorage)
    localStorage.setItem("sesionActiva", "true");
    localStorage.setItem("correoSesion", inputEmail.value.trim());

    mostrarMensajeFormulario("mensaje-login", "¡Sesión iniciada correctamente!", "exito");

    // Si el paciente venía del carrito a confirmar una cita, lo
    // llevamos de vuelta a terminar ese proceso; si no, al inicio.
    const destinoGuardado = localStorage.getItem("destinoTrasLogin");
    localStorage.removeItem("destinoTrasLogin");

    setTimeout(() => {
      window.location.href = destinoGuardado || "index.html";
    }, 600);
  });
}