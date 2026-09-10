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

     // ---------- Redirección según el correo ----------
    // Regla del negocio: existe un único administrador, identificado
    // por este correo exacto. Si es él quien inició sesión, lo mandamos
    // directo al panel de administración y listo (no sigue el flujo
    // normal de "volver al carrito").
    const esAdministrador = inputEmail.value.trim().toLowerCase() === "admin@gmail.com";

    if (esAdministrador) {
      setTimeout(() => {
        window.location.href = "admin-home.html";
      }, 600);
      return;
    }

    // Cualquier otro correo (paciente/nutricionista) sigue el flujo
    // normal: si venía del carrito a confirmar una cita, vuelve a
    // terminar ese proceso; si no, va al inicio de la tienda.
    const destinoGuardado = localStorage.getItem("destinoTrasLogin");
    localStorage.removeItem("destinoTrasLogin");

    setTimeout(() => {
      window.location.href = destinoGuardado || "index.html";
    }, 600);
  });
}