/* crear o editar un usuario desde
// admin-usuario-form.html. Reutiliza las mismas funciones de
// validaciones.js que usa registro.js (RUN, correo), para no
// duplicar las reglas de negocio.
*/

const formUsuario = document.getElementById("form-usuario");
const tituloFormUsuario = document.getElementById("titulo-form-usuario");

const inputRunUsuario = document.getElementById("run-usuario");
const inputNombreUsuario = document.getElementById("nombre-usuario");
const inputApellidosUsuario = document.getElementById("apellidos-usuario");
const inputCorreoUsuario = document.getElementById("correo-usuario");
const selectTipoUsuario = document.getElementById("tipo-usuario");
const selectRegionUsuario = document.getElementById("region-usuario");
const selectComunaUsuario = document.getElementById("comuna-usuario");

REGIONES.forEach((r) => {
  const opcion = document.createElement("option");
  opcion.value = r.region;
  opcion.textContent = r.region;
  selectRegionUsuario.appendChild(opcion);
});

function actualizarComunasUsuario(comunaPreseleccionada = "") {
  selectComunaUsuario.innerHTML = '<option value="">Selecciona comuna</option>';
  obtenerComunas(selectRegionUsuario.value).forEach((nombreComuna) => {
    const opcion = document.createElement("option");
    opcion.value = nombreComuna;
    opcion.textContent = nombreComuna;
    if (nombreComuna === comunaPreseleccionada) opcion.selected = true;
    selectComunaUsuario.appendChild(opcion);
  });
}

selectRegionUsuario.addEventListener("change", () => actualizarComunasUsuario());

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
    selectRegionUsuario.value = usuarioExistente.region;
    actualizarComunasUsuario(usuarioExistente.comuna);
  }
}

formUsuario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const errorRun = inputRunUsuario.disabled ? "" : validarRun(inputRunUsuario.value);
  const errorNombre = validarTexto(inputNombreUsuario.value, "El nombre", 2, 50);
  const errorApellidos = validarTexto(inputApellidosUsuario.value, "Los apellidos", 2, 100);
  const errorCorreo = validarCorreo(inputCorreoUsuario.value);
  const errorTipo = selectTipoUsuario.value === "" ? "Selecciona un tipo de usuario." : "";
  const errorRegion = selectRegionUsuario.value === "" ? "Selecciona una región." : "";
  const errorComuna = selectComunaUsuario.value === "" ? "Selecciona una comuna." : "";

  mostrarErrorCampo("error-run-usuario", errorRun);
  mostrarErrorCampo("error-nombre-usuario", errorNombre);
  mostrarErrorCampo("error-apellidos-usuario", errorApellidos);
  mostrarErrorCampo("error-correo-usuario", errorCorreo);
  mostrarErrorCampo("error-tipo-usuario", errorTipo);
  mostrarErrorCampo("error-region-usuario", errorRegion);
  mostrarErrorCampo("error-comuna-usuario", errorComuna);

  const hayErrores =
    errorRun || errorNombre || errorApellidos || errorCorreo ||
    errorTipo || errorRegion || errorComuna;

  if (hayErrores) {
    mostrarMensajeFormulario("mensaje-usuario", "Revisa los campos marcados antes de guardar.", "error");
    return;
  }

  const usuarios = obtenerUsuarios();

  const datosUsuario = {
    nombre: inputNombreUsuario.value.trim(),
    apellidos: inputApellidosUsuario.value.trim(),
    correo: inputCorreoUsuario.value.trim(),
    tipo: selectTipoUsuario.value,
    region: selectRegionUsuario.value,
    comuna: selectComunaUsuario.value
  };

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