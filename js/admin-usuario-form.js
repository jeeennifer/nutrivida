
const formUsuario = document.getElementById("form-usuario");
const tituloFormUsuario = document.getElementById("titulo-form-usuario");

const inputRunUsuario = document.getElementById("run-usuario");
const inputNombreUsuario = document.getElementById("nombre-usuario");
const inputApellidosUsuario = document.getElementById("apellidos-usuario");
const inputCorreoUsuario = document.getElementById("correo-usuario");
const selectTipoUsuario = document.getElementById("tipo-usuario");
const inputPasswordUsuario = document.getElementById("password-usuario");

// ---------- Modo edición: precargar datos si viene ?run= ----------
const parametros = new URLSearchParams(window.location.search);
const runAEditar = parametros.get("run");

if (runAEditar) {
  const usuarioExistente = obtenerUsuarios().find((u) => u.run === runAEditar);
  if (usuarioExistente) {
    tituloFormUsuario.textContent = "Editar usuario";
    inputRunUsuario.value = usuarioExistente.run;
    inputRunUsuario.disabled = true; // el RUN no se modifica una vez creado el usuario
    inputNombreUsuario.value = usuarioExistente.nombre;
    inputApellidosUsuario.value = usuarioExistente.apellidos;
    inputCorreoUsuario.value = usuarioExistente.correo;
    selectTipoUsuario.value = usuarioExistente.tipo;
  }
}

formUsuario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const errorRun = inputRunUsuario.disabled ? "" : validarRun(inputRunUsuario.value);
  const errorNombre = validarTexto(inputNombreUsuario.value, "El nombre", 2, 50);
  const errorApellidos = validarTexto(inputApellidosUsuario.value, "Los apellidos", 2, 100);
  const errorCorreo = validarCorreo(inputCorreoUsuario.value);
  let errorPassword = "";
  if (!runAEditar || inputPasswordUsuario.value !== "") {
    errorPassword = validarPassword(inputPasswordUsuario.value);
  }
  const errorTipo = selectTipoUsuario.value === "" ? "Selecciona un tipo de usuario." : "";
  
  mostrarErrorCampo("error-run-usuario", errorRun);
  mostrarErrorCampo("error-nombre-usuario", errorNombre);
  mostrarErrorCampo("error-apellidos-usuario", errorApellidos);
  mostrarErrorCampo("error-correo-usuario", errorCorreo);
  mostrarErrorCampo("error-tipo-usuario", errorTipo);
  mostrarErrorCampo("error-password-usuario", errorPassword);


  const hayErrores =
    errorRun || errorNombre || errorApellidos || errorCorreo || errorPassword ||
    errorTipo;

  if (hayErrores) {
    mostrarMensajeFormulario("mensaje-usuario", "Revisa los campos marcados antes de guardar.", "error");
    return;
  }

  const usuarios = obtenerUsuarios();

  const run = inputRunUsuario.value.trim().toUpperCase();
  const correo = inputCorreoUsuario.value.trim().toLowerCase();

  const usuarioDuplicado = usuarios.find((usuario) => {
    return usuario.run !== runAEditar &&
      (
        usuario.correo.trim().toLowerCase() === correo ||
        usuario.run === run
      );
  });

  if (usuarioDuplicado) {
    mostrarMensajeFormulario(
      "mensaje-usuario",
      "Ya existe otra cuenta con ese correo o RUN.",
      "error"
    );
    return;
  }

  const datosUsuario = {
    nombre: inputNombreUsuario.value.trim(),
    apellidos: inputApellidosUsuario.value.trim(),
    correo: inputCorreoUsuario.value.trim().toLowerCase(),
    tipo: selectTipoUsuario.value
  };


  if (inputPasswordUsuario.value !== "") {
    datosUsuario.password = inputPasswordUsuario.value;
  }

  if (runAEditar) {
    const indice = usuarios.findIndex((u) => u.run === runAEditar);
    usuarios[indice] = { ...usuarios[indice], ...datosUsuario };
  } else {
    usuarios.push({ run: inputRunUsuario.value.trim().toUpperCase(), ...datosUsuario });
  }

  guardarUsuarios(usuarios);
  mostrarMensajeFormulario("mensaje-usuario", "Usuario guardado correctamente.", "exito");

  setTimeout(() => {
    window.location.href = "admin-usuarios.html";
  }, 700);
});