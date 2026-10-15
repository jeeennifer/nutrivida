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
    const correo = inputEmail.value.trim().toLowerCase();
    const usuarios = obtenerUsuarios();

    // Buscar la cuenta por su correo.
    const usuario = usuarios.find((usuario) => {
      return usuario.correo.trim().toLowerCase() === correo;
    });

    if (!usuario) {
      mostrarMensajeFormulario(
        "mensaje-login",
        "No existe una cuenta con ese correo. Regístrate para continuar.",
        "error"
      );
      return;
    }

    // Comprobar la contraseña guardada durante el registro.
    if (usuario.password !== inputPassword.value) {
      mostrarMensajeFormulario(
        "mensaje-login",
        "La contraseña es incorrecta.",
        "error"
      );
      return;
    }

    // Iniciar la sesión después de comprobar los datos.
    localStorage.setItem("sesionActiva", "true");
    localStorage.setItem("correoSesion", usuario.correo);
    localStorage.setItem("nombreSesion", usuario.nombre);

    mostrarMensajeFormulario(
      "mensaje-login",
      "¡Sesión iniciada correctamente!",
      "exito"
    );

    const esAdministrador = usuario.tipo === "Administrador";

    if (esAdministrador) {
      setTimeout(() => {
        window.location.href = "admin-home.html";
      }, 600);
      return;
    }

    
    const destinoGuardado = localStorage.getItem("destinoTrasLogin");
    localStorage.removeItem("destinoTrasLogin");

    setTimeout(() => {
      window.location.href = destinoGuardado || "index.html";
    }, 600);
  });
  
}