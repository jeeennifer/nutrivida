// =====================================================
// Responsabilidad única: la página "agendar-cita.html", a la
// que se llega al presionar "Confirmar y agendar" en el
// carrito. Aquí el paciente elige fecha y hora con el
// calendario nativo del navegador (<input type="date">,
// no requiere ninguna librería) y confirma su cita.
// Al enviar el formulario, se guarda la cita, se vacía el
// carrito y se navega a cita-confirmada.html: ningún alert()
// ni confirm() en todo el flujo.
// =====================================================

const listaResumenCita = document.getElementById("lista-resumen-cita");
const formAgendar = document.getElementById("form-agendar-cita");
const inputFecha = document.getElementById("fecha-cita");
const inputHora = document.getElementById("hora-cita");

// Si no hay nada en el carrito, no tiene sentido agendar: se
// redirige de vuelta al catálogo de planes.
if (carrito.length === 0) {
  window.location.href = "planes.html";
}

// ---------- Mostrar el resumen de lo que se va a agendar ----------
if (listaResumenCita) {
  listaResumenCita.innerHTML = carrito
    .map(
      (item) => `
      <div class="fila-resumen">
        <span>${item.nombre} (x${item.cantidad})</span>
        <span>$${(item.precio * item.cantidad).toLocaleString("es-CL")}</span>
      </div>`
    )
    .join("");

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  listaResumenCita.innerHTML += `
    <div class="fila-resumen">
      <span>Total</span>
      <span>$${total.toLocaleString("es-CL")}</span>
    </div>`;
}

// ---------- Calendario: no se pueden elegir fechas pasadas ----------
if (inputFecha) {
  const hoy = new Date().toISOString().split("T")[0]; // formato AAAA-MM-DD que pide <input type="date">
  inputFecha.min = hoy;
}

// ---------- Validación y confirmación (sin popups) ----------
if (formAgendar) {
  formAgendar.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const errorFecha = inputFecha.value === "" ? "Selecciona un día para tu cita." : "";
    const errorHora = inputHora.value === "" ? "Selecciona un horario." : "";

    mostrarErrorCampo("error-fecha-cita", errorFecha);
    mostrarErrorCampo("error-hora-cita", errorHora);

    if (errorFecha || errorHora) {
      mostrarMensajeFormulario("mensaje-agendar", "Revisa los campos marcados antes de continuar.", "error");
      return;
    }

    // Guardamos la cita confirmada para poder mostrarla en la
    // siguiente página (cita-confirmada.html) sin volver a preguntar nada.
    const citaConfirmada = {
      planes: carrito,
      total: carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
      fecha: inputFecha.value,
      hora: inputHora.value
    };
    localStorage.setItem("ultimaCita", JSON.stringify(citaConfirmada));

    // Se vacía el carrito porque la cita ya quedó agendada.
    carrito = [];
    guardarCarrito();

    window.location.href = "cita-confirmada.html";
  });
}