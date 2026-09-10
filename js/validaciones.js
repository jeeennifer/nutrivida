// =====================================================
// Responsabilidad única: reglas de validación reutilizables.
// Cada función recibe un valor y devuelve un mensaje de
// error (string) o "" si el valor es válido. Así, cada
// formulario (login.js, registro.js, contacto.js, etc.)
// solo llama a estas funciones y muestra el resultado,
// sin repetir expresiones regulares ni reglas por todos
// lados (evita el código duplicado que había antes en
// login y contacto).
// =====================================================

const PATRON_CORREO = /^[^\s@]+@(duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

function validarCorreo(valor) {
  const correo = valor.trim();

  if (correo === "") {
    return "El correo es obligatorio.";
  }
  if (correo.length > 100) {
    return "El correo no puede superar los 100 caracteres.";
  }
  if (!PATRON_CORREO.test(correo)) {
    return "Ingresa un correo válido (ejemplo@duocuc.cl, ejemplo@profesor.duoc.cl o ejemplo@gmail.com).";
  }
  return "";
}

function validarTexto(valor, nombreCampo, largoMinimo, largoMaximo) {
  const texto = valor.trim();

  if (texto === "") {
    return `${nombreCampo} es obligatorio.`;
  }
  if (largoMinimo && texto.length < largoMinimo) {
    return `${nombreCampo} debe tener al menos ${largoMinimo} caracteres.`;
  }
  if (largoMaximo && texto.length > largoMaximo) {
    return `${nombreCampo} no puede superar los ${largoMaximo} caracteres.`;
  }
  return "";
}

function validarPassword(valor, minimo = 6) {
  if (valor === "") {
    return "La contraseña es obligatoria.";
  }
  if (valor.length < minimo) {
    return `La contraseña debe tener al menos ${minimo} caracteres.`;
  }
  return "";
}

// -----------------------------------------------------
// VALIDACIÓN DE RUN CHILENO (sin puntos ni guion)
// Se usa en Registro y en el mantenedor de usuarios del
// panel administrador. Ejemplo válido: 19011022K
// -----------------------------------------------------
function calcularDigitoVerificador(numeroRun) {
  let suma = 0;
  let multiplicador = 2;

  for (let i = numeroRun.length - 1; i >= 0; i--) {
    suma += Number(numeroRun[i]) * multiplicador;
    multiplicador = multiplicador < 7 ? multiplicador + 1 : 2;
  }

  const resto = 11 - (suma % 11);
  if (resto === 11) return "0";
  if (resto === 10) return "K";
  return String(resto);
}

function validarRun(valor) {
  const run = valor.trim().toUpperCase();

  if (run === "") {
    return "El RUN es obligatorio.";
  }
  if (run.length < 7 || run.length > 9) {
    return "El RUN debe tener entre 7 y 9 caracteres, sin puntos ni guion.";
  }
  if (!/^[0-9]+[0-9K]$/.test(run)) {
    return "El RUN solo puede tener números y, al final, un dígito verificador (0-9 o K).";
  }

  const numero = run.slice(0, -1);
  const digitoIngresado = run.slice(-1);

  if (digitoIngresado !== calcularDigitoVerificador(numero)) {
    return "El dígito verificador del RUN no es válido.";
  }
  return "";
}

// -----------------------------------------------------
// Helper genérico para mostrar/ocultar un mensaje de error
// junto a un campo, reutilizado por todos los formularios.
// -----------------------------------------------------
function mostrarErrorCampo(idSpanError, mensaje) {
  const span = document.getElementById(idSpanError);
  if (!span) return;
  span.textContent = mensaje;
  span.style.display = mensaje ? "block" : "none";
}

// -----------------------------------------------------
// Helper para mostrar el mensaje final del formulario
// (reemplaza a alert(): es un <p> dentro de la misma página).
// -----------------------------------------------------
function mostrarMensajeFormulario(idParrafo, texto, tipo) {
  const parrafo = document.getElementById(idParrafo);
  if (!parrafo) return;
  parrafo.textContent = texto;
  parrafo.className = "mensaje-formulario " + tipo; // tipo: "exito" o "error"
}