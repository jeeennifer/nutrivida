

const PATRON_CORREO = /^[^\s@]+@(duoc\.cl|gmail\.com)$/i;

function validarCorreo(valor) {
  const correo = valor.trim();

  if (correo === "") {
    return "El correo es obligatorio.";
  }
  if (correo.length > 100) {
    return "El correo no puede superar los 100 caracteres.";
  }
  if (!PATRON_CORREO.test(correo)) {
    return "Ingresa un correo válido (ejemplo@duoc.cl o ejemplo@gmail.com).";
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


// VALIDACIÓN DE RUN CHILENO 

function validarRun(valor) {
  const run = valor.trim().toUpperCase();

  if (run === "") {
    return "El RUN es obligatorio.";
  }
  
  // Verifica que tenga 7 u 8 números al inicio y termine en un número o K
  if (!/^\d{7,8}[0-9K]$/.test(run)) {
    return "El RUN debe tener entre 8 y 9 caracteres en total, sin puntos ni guion, y terminar en número o K.";
  }

  // Como ya no exigimos el cálculo matemático real, si pasa la prueba de arriba, es válido.
  return "";
}



function mostrarErrorCampo(idSpanError, mensaje) {
  const span = document.getElementById(idSpanError);
  if (!span) return;
  span.textContent = mensaje;
  span.style.display = mensaje ? "block" : "none";
}



function mostrarMensajeFormulario(idParrafo, texto, tipo) {
  const parrafo = document.getElementById(idParrafo);
  if (!parrafo) return;
  parrafo.textContent = texto;
  parrafo.className = "mensaje-formulario " + tipo; // tipo: "exito" o "error"
}