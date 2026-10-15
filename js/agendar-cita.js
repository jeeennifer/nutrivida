

const listaResumenCita = document.getElementById("lista-resumen-cita");
const formAgendar = document.getElementById("form-agendar-cita");
const inputFecha = document.getElementById("fecha-cita");
const inputHora = document.getElementById("hora-cita");

// Primero comprueba la sesión. Si falta, lleva al login y guarda dónde debe regresar
// Si hay sesión pero el carrito está vacío, vuelve al catálogo.
if (
  localStorage.getItem("sesionActiva") !== "true" ||
  !localStorage.getItem("correoSesion")
) {
  localStorage.setItem("destinoTrasLogin", "agendar-cita.html");
  window.location.href = "login.html";
} else if (carrito.length === 0) {
  window.location.href = "planes.html";
}

// Mostrar el resumen de lo que se va a agendar
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

// Calendario: no se pueden elegir fechas pasadas 
if (inputFecha) {
  const hoy = new Date().toISOString().split("T")[0]; // formato AAAA-MM-DD que pide <input type="date">
  inputFecha.min = hoy;
}

// Validación y confirmación 
if (formAgendar) {
  formAgendar.addEventListener("submit", (evento) => {
    evento.preventDefault();

    // segunda comprobación revisa la sesión nuevamente al pulsar «Confirmar». 
    // El return detiene el proceso si ya se cerró.
    if (
      localStorage.getItem("sesionActiva") !== "true" ||
      !localStorage.getItem("correoSesion")
    ) {
      localStorage.setItem("destinoTrasLogin", "agendar-cita.html");
      window.location.href = "login.html";
      return;
    }

    const errorFecha = inputFecha.value === "" ? "Selecciona un día para tu cita." : "";
    const errorHora = inputHora.value === "" ? "Selecciona un horario." : "";

    mostrarErrorCampo("error-fecha-cita", errorFecha);
    mostrarErrorCampo("error-hora-cita", errorHora);

    if (errorFecha || errorHora) {
      mostrarMensajeFormulario("mensaje-agendar", "Revisa los campos marcados antes de continuar.", "error");
      return;
    }

    if (carrito.length === 0) {
      mostrarMensajeFormulario(
        "mensaje-agendar",
        "Tu carrito está vacío.",
        "error"
      );
      return;
    }

    const planes = obtenerPlanes();

    // Comprobar todos los planes antes de descontar cupos.
    for (const item of carrito) {
      const plan = planes.find((p) => p.id === item.id);

      if (!plan || item.cantidad > plan.stock) {
        mostrarMensajeFormulario(
          "mensaje-agendar",
          "Un plan ya no está disponible o no tiene cupos suficientes. Revisa Mis Horas.",
          "error"
        );
        return;
      }
    }

    // Todos los planes tienen cupos: descontar las cantidades.
    for (const item of carrito) {
      const plan = planes.find((p) => p.id === item.id);
      plan.stock = plan.stock - item.cantidad;
    }

    guardarPlanes(planes);



    // Guardamos la cita confirmada para poder mostrarla en la
    // siguiente página (cita-confirmada.html) sin volver a preguntar nada.
    const citaConfirmada = {
      planes: carrito,
      total: carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
      fecha: inputFecha.value,
      hora: inputHora.value,
      correoPaciente: localStorage.getItem("correoSesion")
    };
    localStorage.setItem("ultimaCita", JSON.stringify(citaConfirmada));

    // Se vacía el carrito porque la cita ya quedó agendada.
    carrito = [];
    guardarCarrito();

    window.location.href = "cita-confirmada.html";
  });
}