// =====================================================
// Responsabilidad única: la página contacto.html.
// Antes mostraba alert("¡Gracias por escribirnos!..."). Ahora
// el mensaje de éxito se muestra en la misma página, dentro
// de #mensaje-contacto, sin ninguna ventana emergente.
// =====================================================

const formularioContacto = document.getElementById("formulario-contacto");

if (formularioContacto) {
  const inputNombre = document.getElementById("nombre-contacto");
  const inputEmail = document.getElementById("email-contacto");
  const inputMensaje = document.getElementById("mensaje-contacto");

  formularioContacto.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const errorNombre = validarTexto(inputNombre.value, "El nombre", 2, 100);
    const errorEmail = validarCorreo(inputEmail.value);
    const errorMensaje = validarTexto(inputMensaje.value, "El mensaje", 10, 500);

    mostrarErrorCampo("error-nombre-contacto", errorNombre);
    mostrarErrorCampo("error-email-contacto", errorEmail);
    mostrarErrorCampo("error-mensaje-contacto", errorMensaje);

    if (errorNombre || errorEmail || errorMensaje) {
      mostrarMensajeFormulario("mensaje-contacto-resultado", "Revisa los campos marcados antes de enviar.", "error");
      return;
    }

    mostrarMensajeFormulario(
      "mensaje-contacto-resultado",
      "¡Gracias por escribirnos! Tu mensaje fue enviado correctamente.",
      "exito"
    );
    formularioContacto.reset();
  });
}