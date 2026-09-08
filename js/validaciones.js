// =====================================================
// VALIDACIÓN FORMULARIO DE LOGIN
// =====================================================
const formularioLogin = document.getElementById("formulario-login");

if (formularioLogin) {
  formularioLogin.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que la página recargue

    let formularioValido = true;

    // 1. Validar Correo
    const inputEmail = document.getElementById("email");
    const errorEmail = document.getElementById("error-email");
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!inputEmail.value.trim()) {
      errorEmail.textContent = "El correo es obligatorio.";
      errorEmail.style.display = "block";
      formularioValido = false;
    } else if (!regexEmail.test(inputEmail.value)) {
      errorEmail.textContent = "Ingresa un correo válido (ejemplo@correo.com).";
      errorEmail.style.display = "block";
      formularioValido = false;
    } else {
      errorEmail.style.display = "none";
    }

    // 2. Validar Contraseña
    const inputPassword = document.getElementById("password");
    const errorPassword = document.getElementById("error-password");

    if (!inputPassword.value.trim()) {
      errorPassword.textContent = "La contraseña es obligatoria.";
      errorPassword.style.display = "block";
      formularioValido = false;
    } else if (inputPassword.value.length < 6) {
      errorPassword.textContent = "La contraseña debe tener al menos 6 caracteres.";
      errorPassword.style.display = "block";
      formularioValido = false;
    } else {
      errorPassword.style.display = "none";
    }

    // 3. Procesar si está todo correcto
    if (formularioValido) {
      alert("¡Sesión iniciada con éxito! Tus horas han sido confirmadas.");
      
      // Vaciamos el carrito tras comprar y volvemos al inicio
      localStorage.removeItem("carrito");
      window.location.href = "index.html";
    }
  });
}

// =====================================================
// VALIDACIÓN FORMULARIO DE CONTACTO
// =====================================================
const formularioContacto = document.getElementById("formulario-contacto");

if (formularioContacto) {
  formularioContacto.addEventListener("submit", (e) => {
    e.preventDefault(); // Detenemos el envío por defecto

    let formularioValido = true;

    // 1. Validar Nombre
    const inputNombre = document.getElementById("nombre-contacto");
    const errorNombre = document.getElementById("error-nombre-contacto");
    if (!inputNombre.value.trim()) {
      errorNombre.textContent = "El nombre es obligatorio.";
      errorNombre.style.display = "block";
      formularioValido = false;
    } else {
      errorNombre.style.display = "none";
    }

    // 2. Validar Correo
    const inputEmail = document.getElementById("email-contacto");
    const errorEmail = document.getElementById("error-email-contacto");
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!inputEmail.value.trim()) {
      errorEmail.textContent = "El correo es obligatorio.";
      errorEmail.style.display = "block";
      formularioValido = false;
    } else if (!regexEmail.test(inputEmail.value)) {
      errorEmail.textContent = "Ingresa un correo válido (ejemplo@correo.com).";
      errorEmail.style.display = "block";
      formularioValido = false;
    } else {
      errorEmail.style.display = "none";
    }

    // 3. Validar Mensaje
    const inputMensaje = document.getElementById("mensaje-contacto");
    const errorMensaje = document.getElementById("error-mensaje-contacto");
    
    if (!inputMensaje.value.trim()) {
      errorMensaje.textContent = "El mensaje no puede estar vacío.";
      errorMensaje.style.display = "block";
      formularioValido = false;
    } else if (inputMensaje.value.trim().length < 10) {
      errorMensaje.textContent = "El mensaje debe tener al menos 10 caracteres.";
      errorMensaje.style.display = "block";
      formularioValido = false;
    } else {
      errorMensaje.style.display = "none";
    }

    // 4. Procesar envío si todo está correcto
    if (formularioValido) {
      alert("¡Gracias por escribirnos! Tu mensaje ha sido enviado correctamente.");
      formularioContacto.reset(); // Limpia los campos del formulario
    }
  });
}