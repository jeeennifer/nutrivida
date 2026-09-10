/* leer la última cita guardada en
localStorage (por agendar-cita.js) y mostrarla como
mensaje de éxito en pantalla. 
// */

const contenedorCitaConfirmada = document.getElementById("detalle-cita-confirmada");

if (contenedorCitaConfirmada) {
  const cita = JSON.parse(localStorage.getItem("ultimaCita"));

  if (!cita) {
    // Si alguien entra directo a esta URL sin haber agendado nada.
    contenedorCitaConfirmada.innerHTML = `
      <p>No encontramos una cita reciente.</p>
      <a href="planes.html" class="boton">Ver planes</a>
    `;
  } else {
    const filas = cita.planes
      .map((item) => `<div class="fila-resumen"><span>${item.nombre} (x${item.cantidad})</span></div>`)
      .join("");

    // Formateamos la fecha (AAAA-MM-DD) a un formato más amigable en español.
    const fechaLegible = new Date(cita.fecha + "T00:00:00").toLocaleDateString("es-CL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    contenedorCitaConfirmada.innerHTML = `
      <p class="icono-exito">✅</p>
      <h2>¡Tu cita fue agendada con éxito!</h2>
      <p>Te esperamos el <strong>${fechaLegible}</strong> a las <strong>${cita.hora}</strong> hrs.</p>

      <div class="resumen-cita" style="text-align: left; margin-top: 25px;">
        <strong>Planes agendados:</strong>
        ${filas}
        <div class="fila-resumen">
          <span>Total</span>
          <span>$${cita.total.toLocaleString("es-CL")}</span>
        </div>
      </div>

      <a href="index.html" class="boton" style="margin-top: 25px;">Volver al inicio</a>
    `;
  }
}