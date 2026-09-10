// =====================================================
// FUNCIONES REUTILIZABLES DE VALIDACIÓN
// =====================================================
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const dominiosPermitidos = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];

function correoTieneDominioPermitido(correo) {
  const dominio = correo.split("@")[1];
  return dominio && dominiosPermitidos.includes(dominio.toLowerCase());
}

// Valida el dígito verificador de un RUN chileno (sin puntos ni guión, ej: 19011022K)
function validarRun(runSucio) {
  const run = runSucio.replace(/[^0-9kK]/g, "").toUpperCase();
  if (run.length < 7 || run.length > 9) return false;

  const cuerpo = run.slice(0, -1);
  const dv = run.slice(-1);

  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const resto = 11 - (suma % 11);
  let dvEsperado;
  if (resto === 11) dvEsperado = "0";
  else if (resto === 10) dvEsperado = "K";
  else dvEsperado = String(resto);

  return dv === dvEsperado;
}

function mostrarError(elementoError, mensaje) {
  elementoError.textContent = mensaje;
  elementoError.style.display = "block";
}

function ocultarError(elementoError) {
  elementoError.style.display = "none";
}


// =====================================================
// VALIDACIÓN FORMULARIO DE LOGIN
// =====================================================
const formularioLogin = document.getElementById("formulario-login");

if (formularioLogin) {
  formularioLogin.addEventListener("submit", (e) => {
    // ESTO EVITA QUE EL BOTÓN REDIRIJA INMEDIATAMENTE
    e.preventDefault();

    let formularioValido = true;

    // 1. Validar Correo (requerido, máx 100, dominios permitidos)
    const inputEmail = document.getElementById("email");
    const errorEmail = document.getElementById("error-email");

    if (!inputEmail.value.trim()) {
      mostrarError(errorEmail, "El correo es obligatorio.");
      formularioValido = false;
    } else if (inputEmail.value.length > 100) {
      mostrarError(errorEmail, "El correo no puede superar los 100 caracteres.");
      formularioValido = false;
    } else if (!regexEmail.test(inputEmail.value)) {
      mostrarError(errorEmail, "Ingresa un correo válido (ejemplo@correo.com).");
      formularioValido = false;
    } else if (!correoTieneDominioPermitido(inputEmail.value)) {
      mostrarError(errorEmail, "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
      formularioValido = false;
    } else {
      ocultarError(errorEmail);
    }

    // 2. Validar Contraseña (requerida, entre 4 y 10 caracteres)
    const inputPassword = document.getElementById("password");
    const errorPassword = document.getElementById("error-password");

    if (!inputPassword.value.trim()) {
      mostrarError(errorPassword, "La contraseña es obligatoria.");
      formularioValido = false;
    } else if (inputPassword.value.length < 4 || inputPassword.value.length > 10) {
      mostrarError(errorPassword, "La contraseña debe tener entre 4 y 10 caracteres.");
      formularioValido = false;
    } else {
      ocultarError(errorPassword);
    }

    // 3. Redirección dependiendo si es ADMIN u otro usuario
    if (formularioValido) {
      // Credenciales quemadas para el administrador (cumpliendo la pauta de formato)
      if (inputEmail.value === "admin@duoc.cl" && inputPassword.value === "admin") {
        alert("¡Bienvenido Administrador!");
        window.location.href = "admin-home.html"; // Te mete a la vista de admin
      } else {
        // Redirección para clientes normales
        alert("¡Sesión iniciada con éxito como Cliente!");
        window.location.href = "index.html"; // Te mete al index de la tienda
      }
    }
  });
}

// =====================================================
// VALIDACIÓN FORMULARIO DE CONTACTO
// =====================================================
const formularioContacto = document.getElementById("formulario-contacto");

if (formularioContacto) {
  formularioContacto.addEventListener("submit", (e) => {
    e.preventDefault();

    let formularioValido = true;

    // 1. Validar Nombre (requerido, máx 100)
    const inputNombre = document.getElementById("nombre-contacto");
    const errorNombre = document.getElementById("error-nombre-contacto");
    if (!inputNombre.value.trim()) {
      mostrarError(errorNombre, "El nombre es obligatorio.");
      formularioValido = false;
    } else if (inputNombre.value.length > 100) {
      mostrarError(errorNombre, "El nombre no puede superar los 100 caracteres.");
      formularioValido = false;
    } else {
      ocultarError(errorNombre);
    }

    // 2. Validar Correo (requerido, máx 100, dominios permitidos)
    const inputEmail = document.getElementById("email-contacto");
    const errorEmail = document.getElementById("error-email-contacto");

    if (!inputEmail.value.trim()) {
      mostrarError(errorEmail, "El correo es obligatorio.");
      formularioValido = false;
    } else if (inputEmail.value.length > 100) {
      mostrarError(errorEmail, "El correo no puede superar los 100 caracteres.");
      formularioValido = false;
    } else if (!regexEmail.test(inputEmail.value)) {
      mostrarError(errorEmail, "Ingresa un correo válido (ejemplo@correo.com).");
      formularioValido = false;
    } else if (!correoTieneDominioPermitido(inputEmail.value)) {
      mostrarError(errorEmail, "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
      formularioValido = false;
    } else {
      ocultarError(errorEmail);
    }

    // 3. Validar Mensaje (requerido, máx 500)
    const inputMensaje = document.getElementById("mensaje-contacto");
    const errorMensaje = document.getElementById("error-mensaje-contacto");

    if (!inputMensaje.value.trim()) {
      mostrarError(errorMensaje, "El mensaje no puede estar vacío.");
      formularioValido = false;
    } else if (inputMensaje.value.length > 500) {
      mostrarError(errorMensaje, "El mensaje no puede superar los 500 caracteres.");
      formularioValido = false;
    } else {
      ocultarError(errorMensaje);
    }

    if (formularioValido) {
      alert("¡Gracias por escribirnos! Tu mensaje ha sido enviado correctamente.");
      formularioContacto.reset();
    }
  });
}

// =====================================================
// VALIDACIÓN FORMULARIO DE REGISTRO (registro.html)
// =====================================================
const formularioRegistro = document.getElementById("formulario-registro");

if (formularioRegistro) {
  formularioRegistro.addEventListener("submit", (e) => {
    e.preventDefault();
    let formularioValido = true;

    // RUN
    const inputRun = document.getElementById("run");
    const errorRun = document.getElementById("error-run");
    if (!inputRun.value.trim()) {
      mostrarError(errorRun, "El RUN es obligatorio.");
      formularioValido = false;
    } else if (inputRun.value.length < 7 || inputRun.value.length > 9) {
      mostrarError(errorRun, "El RUN debe tener entre 7 y 9 caracteres (sin puntos ni guión).");
      formularioValido = false;
    } else if (!validarRun(inputRun.value)) {
      mostrarError(errorRun, "El RUN ingresado no es válido.");
      formularioValido = false;
    } else {
      ocultarError(errorRun);
    }

    // Nombre
    const inputNombre = document.getElementById("nombre-registro");
    const errorNombre = document.getElementById("error-nombre-registro");
    if (!inputNombre.value.trim()) {
      mostrarError(errorNombre, "El nombre es obligatorio.");
      formularioValido = false;
    } else if (inputNombre.value.length > 50) {
      mostrarError(errorNombre, "El nombre no puede superar los 50 caracteres.");
      formularioValido = false;
    } else {
      ocultarError(errorNombre);
    }

    // Apellidos
    const inputApellidos = document.getElementById("apellidos-registro");
    const errorApellidos = document.getElementById("error-apellidos-registro");
    if (!inputApellidos.value.trim()) {
      mostrarError(errorApellidos, "Los apellidos son obligatorios.");
      formularioValido = false;
    } else if (inputApellidos.value.length > 100) {
      mostrarError(errorApellidos, "Los apellidos no pueden superar los 100 caracteres.");
      formularioValido = false;
    } else {
      ocultarError(errorApellidos);
    }

    // Correo
    const inputEmail = document.getElementById("email-registro");
    const errorEmail = document.getElementById("error-email-registro");
    if (!inputEmail.value.trim()) {
      mostrarError(errorEmail, "El correo es obligatorio.");
      formularioValido = false;
    } else if (inputEmail.value.length > 100) {
      mostrarError(errorEmail, "El correo no puede superar los 100 caracteres.");
      formularioValido = false;
    } else if (!regexEmail.test(inputEmail.value)) {
      mostrarError(errorEmail, "Ingresa un correo válido.");
      formularioValido = false;
    } else if (!correoTieneDominioPermitido(inputEmail.value)) {
      mostrarError(errorEmail, "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
      formularioValido = false;
    } else {
      ocultarError(errorEmail);
    }

    // Contraseña
    const inputPassword = document.getElementById("password-registro");
    const errorPassword = document.getElementById("error-password-registro");
    if (!inputPassword.value.trim()) {
      mostrarError(errorPassword, "La contraseña es obligatoria.");
      formularioValido = false;
    } else if (inputPassword.value.length < 4 || inputPassword.value.length > 10) {
      mostrarError(errorPassword, "La contraseña debe tener entre 4 y 10 caracteres.");
      formularioValido = false;
    } else {
      ocultarError(errorPassword);
    }

    // Confirmar contraseña
    const inputConfirmar = document.getElementById("confirmar-password-registro");
    const errorConfirmar = document.getElementById("error-confirmar-password-registro");
    if (inputConfirmar.value !== inputPassword.value || !inputConfirmar.value) {
      mostrarError(errorConfirmar, "Las contraseñas no coinciden.");
      formularioValido = false;
    } else {
      ocultarError(errorConfirmar);
    }

    // Región
    const inputRegion = document.getElementById("region");
    const errorRegion = document.getElementById("error-region");
    if (!inputRegion.value) {
      mostrarError(errorRegion, "Selecciona una región.");
      formularioValido = false;
    } else {
      ocultarError(errorRegion);
    }

    // Comuna
    const inputComuna = document.getElementById("comuna");
    const errorComuna = document.getElementById("error-comuna");
    if (!inputComuna.value) {
      mostrarError(errorComuna, "Selecciona una comuna.");
      formularioValido = false;
    } else {
      ocultarError(errorComuna);
    }

    // Dirección
    const inputDireccion = document.getElementById("direccion");
    const errorDireccion = document.getElementById("error-direccion");
    if (!inputDireccion.value.trim()) {
      mostrarError(errorDireccion, "La dirección es obligatoria.");
      formularioValido = false;
    } else if (inputDireccion.value.length > 300) {
      mostrarError(errorDireccion, "La dirección no puede superar los 300 caracteres.");
      formularioValido = false;
    } else {
      ocultarError(errorDireccion);
    }

    if (formularioValido) {
      // Guardamos el usuario registrado igual que en el admin
      const usuarios = JSON.parse(localStorage.getItem("usuariosAdmin")) || [];
      const nuevoId = usuarios.length ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
      usuarios.push({
        id: nuevoId,
        run: inputRun.value.trim().toUpperCase(),
        nombre: inputNombre.value.trim(),
        apellidos: inputApellidos.value.trim(),
        email: inputEmail.value.trim(),
        tipoUsuario: "Cliente",
        region: inputRegion.value,
        comuna: inputComuna.value,
        direccion: inputDireccion.value.trim()
      });
      localStorage.setItem("usuariosAdmin", JSON.stringify(usuarios));

      alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
      window.location.href = "login.html";
    }
  });
}

// =====================================================
// VALIDACIÓN FORMULARIO DE PRODUCTO (admin-producto-form.html)
// =====================================================
const formularioProductoValidacion = document.getElementById("formulario-producto");

if (formularioProductoValidacion) {
  formularioProductoValidacion.addEventListener("submit", (e) => {
    e.preventDefault();
    let formularioValido = true;

    const inputCodigo = document.getElementById("codigo-producto");
    const errorCodigo = document.getElementById("error-codigo-producto");
    if (!inputCodigo.value.trim()) {
      mostrarError(errorCodigo, "El código es obligatorio.");
      formularioValido = false;
    } else if (inputCodigo.value.trim().length < 3) {
      mostrarError(errorCodigo, "El código debe tener al menos 3 caracteres.");
      formularioValido = false;
    } else {
      ocultarError(errorCodigo);
    }

    const inputNombre = document.getElementById("nombre-producto");
    const errorNombre = document.getElementById("error-nombre-producto");
    if (!inputNombre.value.trim()) {
      mostrarError(errorNombre, "El nombre es obligatorio.");
      formularioValido = false;
    } else if (inputNombre.value.length > 100) {
      mostrarError(errorNombre, "El nombre no puede superar los 100 caracteres.");
      formularioValido = false;
    } else {
      ocultarError(errorNombre);
    }

    const inputDescripcion = document.getElementById("descripcion-producto");
    const errorDescripcion = document.getElementById("error-descripcion-producto");
    if (inputDescripcion.value.length > 500) {
      mostrarError(errorDescripcion, "La descripción no puede superar los 500 caracteres.");
      formularioValido = false;
    } else {
      ocultarError(errorDescripcion);
    }

    const inputPrecio = document.getElementById("precio-producto");
    const errorPrecio = document.getElementById("error-precio-producto");
    if (inputPrecio.value === "" || Number(inputPrecio.value) < 0) {
      mostrarError(errorPrecio, "El precio es obligatorio y no puede ser negativo.");
      formularioValido = false;
    } else {
      ocultarError(errorPrecio);
    }

    const inputStock = document.getElementById("stock-producto");
    const errorStock = document.getElementById("error-stock-producto");
    if (inputStock.value === "" || Number(inputStock.value) < 0 || !Number.isInteger(Number(inputStock.value))) {
      mostrarError(errorStock, "El stock es obligatorio, entero y no puede ser negativo.");
      formularioValido = false;
    } else {
      ocultarError(errorStock);
    }

    const inputStockCritico = document.getElementById("stock-critico-producto");
    const errorStockCritico = document.getElementById("error-stock-critico-producto");
    if (inputStockCritico.value !== "" && (Number(inputStockCritico.value) < 0 || !Number.isInteger(Number(inputStockCritico.value)))) {
      mostrarError(errorStockCritico, "El stock crítico debe ser un número entero mayor o igual a 0.");
      formularioValido = false;
    } else {
      ocultarError(errorStockCritico);
    }

    const inputCategoria = document.getElementById("categoria-producto");
    const errorCategoria = document.getElementById("error-categoria-producto");
    if (!inputCategoria.value) {
      mostrarError(errorCategoria, "Selecciona una categoría.");
      formularioValido = false;
    } else {
      ocultarError(errorCategoria);
    }

    if (formularioValido) {
      guardarProductoDesdeForm();
    }
  });
}

// =====================================================
// VALIDACIÓN FORMULARIO DE USUARIO (admin-usuario-form.html)
// =====================================================
const formularioUsuarioAdminValidacion = document.getElementById("formulario-usuario-admin");

if (formularioUsuarioAdminValidacion) {
  formularioUsuarioAdminValidacion.addEventListener("submit", (e) => {
    e.preventDefault();
    let formularioValido = true;

    const inputRun = document.getElementById("run-admin");
    const errorRun = document.getElementById("error-run-admin");
    if (!inputRun.value.trim()) {
      mostrarError(errorRun, "El RUN es obligatorio.");
      formularioValido = false;
    } else if (inputRun.value.length < 7 || inputRun.value.length > 9) {
      mostrarError(errorRun, "El RUN debe tener entre 7 y 9 caracteres.");
      formularioValido = false;
    } else if (!validarRun(inputRun.value)) {
      mostrarError(errorRun, "El RUN ingresado no es válido.");
      formularioValido = false;
    } else {
      ocultarError(errorRun);
    }

    const inputNombre = document.getElementById("nombre-admin");
    const errorNombre = document.getElementById("error-nombre-admin");
    if (!inputNombre.value.trim()) {
      mostrarError(errorNombre, "El nombre es obligatorio.");
      formularioValido = false;
    } else if (inputNombre.value.length > 50) {
      mostrarError(errorNombre, "El nombre no puede superar los 50 caracteres.");
      formularioValido = false;
    } else {
      ocultarError(errorNombre);
    }

    const inputApellidos = document.getElementById("apellidos-admin");
    const errorApellidos = document.getElementById("error-apellidos-admin");
    if (!inputApellidos.value.trim()) {
      mostrarError(errorApellidos, "Los apellidos son obligatorios.");
      formularioValido = false;
    } else if (inputApellidos.value.length > 100) {
      mostrarError(errorApellidos, "Los apellidos no pueden superar los 100 caracteres.");
      formularioValido = false;
    } else {
      ocultarError(errorApellidos);
    }

    const inputEmail = document.getElementById("email-admin");
    const errorEmail = document.getElementById("error-email-admin");
    if (!inputEmail.value.trim()) {
      mostrarError(errorEmail, "El correo es obligatorio.");
      formularioValido = false;
    } else if (inputEmail.value.length > 100) {
      mostrarError(errorEmail, "El correo no puede superar los 100 caracteres.");
      formularioValido = false;
    } else if (!regexEmail.test(inputEmail.value)) {
      mostrarError(errorEmail, "Ingresa un correo válido.");
      formularioValido = false;
    } else if (!correoTieneDominioPermitido(inputEmail.value)) {
      mostrarError(errorEmail, "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
      formularioValido = false;
    } else {
      ocultarError(errorEmail);
    }

    const selectTipoUsuario = document.getElementById("tipo-usuario");
    const errorTipoUsuario = document.getElementById("error-tipo-usuario");
    if (!selectTipoUsuario.value) {
      mostrarError(errorTipoUsuario, "Selecciona un tipo de usuario.");
      formularioValido = false;
    } else {
      ocultarError(errorTipoUsuario);
    }

    const inputRegion = document.getElementById("region-admin");
    const errorRegion = document.getElementById("error-region-admin");
    if (!inputRegion.value) {
      mostrarError(errorRegion, "Selecciona una región.");
      formularioValido = false;
    } else {
      ocultarError(errorRegion);
    }

    const inputComuna = document.getElementById("comuna-admin");
    const errorComuna = document.getElementById("error-comuna-admin");
    if (!inputComuna.value) {
      mostrarError(errorComuna, "Selecciona una comuna.");
      formularioValido = false;
    } else {
      ocultarError(errorComuna);
    }

    const inputDireccion = document.getElementById("direccion-admin");
    const errorDireccion = document.getElementById("error-direccion-admin");
    if (!inputDireccion.value.trim()) {
      mostrarError(errorDireccion, "La dirección es obligatoria.");
      formularioValido = false;
    } else if (inputDireccion.value.length > 300) {
      mostrarError(errorDireccion, "La dirección no puede superar los 300 caracteres.");
      formularioValido = false;
    } else {
      ocultarError(errorDireccion);
    }

    if (formularioValido) {
      guardarUsuarioDesdeFormAdmin();
    }
  });
}
