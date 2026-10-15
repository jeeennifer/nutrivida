
/* Usa las mismas reglas de validación que login.js y que el
mantenedor de usuarios del panel admin (RUN con dígito
 verificador, correo, largo de contraseña)
*/

const formularioRegistro = document.getElementById("formulario-registro");

if (formularioRegistro) {
  const inputRun = document.getElementById("run-registro");
  const inputNombre = document.getElementById("nombre-registro");
  const inputApellidos = document.getElementById("apellidos-registro");
  const inputEmail = document.getElementById("email-registro");
  const inputPassword = document.getElementById("password-registro");


  formularioRegistro.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const errorRun = validarRun(inputRun.value);
    const errorNombre = validarTexto(inputNombre.value, "El nombre", 2, 50);
    const errorApellidos = validarTexto(inputApellidos.value, "Los apellidos", 2, 100);
    const errorEmail = validarCorreo(inputEmail.value);
    const errorPassword = validarPassword(inputPassword.value);
    

    mostrarErrorCampo("error-run-registro", errorRun);
    mostrarErrorCampo("error-nombre-registro", errorNombre);
    mostrarErrorCampo("error-apellidos-registro", errorApellidos);
    mostrarErrorCampo("error-email-registro", errorEmail);
    mostrarErrorCampo("error-password-registro", errorPassword);


    const hayErrores =
      errorRun || errorNombre || errorApellidos || errorEmail ||
      errorPassword;

    if (hayErrores) {
      mostrarMensajeFormulario("mensaje-registro", "Revisa los campos marcados antes de continuar.", "error");
      return;
    }

    // Se guarda el nuevo paciente junto a los demás usuarios.
    const usuarios = obtenerUsuarios();
    const run = inputRun.value.trim().toUpperCase();
    const correo = inputEmail.value.trim().toLowerCase();

    const usuarioExistente = usuarios.find((usuario) => {
      return usuario.correo.trim().toLowerCase() === correo ||
            usuario.run === run;
    });

    if (usuarioExistente) {
      mostrarMensajeFormulario(
        "mensaje-registro",
        "Ya existe una cuenta con ese correo o RUN.",
        "error"
      );
      return;
    }

    // Guardar el nuevo paciente.
    usuarios.push({
      run: run,
      nombre: inputNombre.value.trim(),
      apellidos: inputApellidos.value.trim(),
      correo: correo,
      password: inputPassword.value,
      tipo: "Paciente"
    });

    guardarUsuarios(usuarios);

    mostrarMensajeFormulario("mensaje-registro", "¡Cuenta creada con éxito! Ahora puedes iniciar sesión.", "exito");
    formularioRegistro.reset();

    setTimeout(() => {
      window.location.href = "login.html";
    }, 900);
  });
}