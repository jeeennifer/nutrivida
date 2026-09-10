/*  dibujar los planes en pantalla.
 Se usa en 3 vistas distintas:
   - index.html      -> "grilla-destacados" (3 planes)
   - planes.html      -> "grilla-productos" (todos los planes)
  - detalle-plan.html -> "detalle-plan-contenido" (1 plan, según ?id=)
 La lógica del carrito vive aparte, en carrito.js.
*/

function crearTarjetaPlan(plan) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("producto");

  /* El clic en la imagen/nombre lleva al detalle del plan (?id=X);
 el botón "Agendar" agrega directo al carrito sin cambiar de página. */
  tarjeta.innerHTML = `
    <a href="detalle-plan.html?id=${plan.id}">
      <img src="${plan.imagen}" alt="${plan.nombre}">
    </a>
    <div class="producto-contenido">
      <p class="subtitulo etiqueta-plan">${plan.etiqueta}</p>
      <h3>${plan.nombre}</h3>
      <p class="descripcion-plan">${plan.descripcion}</p>
      <p class="precio">$${plan.precio.toLocaleString("es-CL")}</p>
      <button class="boton" data-id="${plan.id}" style="width: 100%; margin-top: 10px;">Agendar</button>
    </div>
  `;
  return tarjeta;
}

function activarBotonesAgendar() {
  document.querySelectorAll(".producto button[data-id]").forEach((boton) => {
    boton.addEventListener("click", (evento) => {
      evento.preventDefault(); 
      agregarAlCarrito(Number(boton.dataset.id));
      
      // Magia del panel lateral
      const panel = document.getElementById("carrito-lateral");
      const overlay = document.getElementById("overlay-carrito");
      if(panel && overlay) {
        panel.classList.add("activo");
        overlay.classList.add("activo");
      }
    });
  });
}

// Lógica para cerrar el panel
document.addEventListener("click", (e) => {
  if (e.target.id === "cerrar-carrito-lateral" || e.target.id === "overlay-carrito") {
    document.getElementById("carrito-lateral").classList.remove("activo");
    document.getElementById("overlay-carrito").classList.remove("activo");
  }
});
// ---------- HOME: 3 planes destacados ----------
const grillaDestacados = document.getElementById("grilla-destacados");
if (grillaDestacados) {
  obtenerPlanes()
    .slice(0, 3)
    .forEach((plan) => grillaDestacados.appendChild(crearTarjetaPlan(plan)));
  activarBotonesAgendar();
}

// ---------- PLANES: listado completo ----------
const grillaProductos = document.getElementById("grilla-productos");
if (grillaProductos) {
  obtenerPlanes().forEach((plan) => grillaProductos.appendChild(crearTarjetaPlan(plan)));
  activarBotonesAgendar();
}

// ---------- DETALLE-PLAN: ficha dinámica según ?id= ----------
const contenedorDetalle = document.getElementById("detalle-plan-contenido");
if (contenedorDetalle) {
  const parametros = new URLSearchParams(window.location.search);
  const idBuscado = Number(parametros.get("id"));
  const plan = obtenerPlanes().find((p) => p.id === idBuscado);

  if (!plan) {
    // Si entran sin id o con uno inexistente, se redirige al catálogo
    // en vez de mostrar una página vacía o rota.
    window.location.href = "planes.html";
  } else {
    document.title = `${plan.nombre} - NutriVida`;
    const listaIncluye = plan.incluye.map((item) => `<li>${item}</li>`).join("");

    contenedorDetalle.innerHTML = `
      <div class="detalle-imagen">
        <img src="${plan.imagen}" alt="${plan.nombre}">
      </div>
      <div class="detalle-info">
        <p class="subtitulo">${plan.etiqueta}</p>
        <h2>${plan.nombre}</h2>
        <p class="precio-detalle">$${plan.precio.toLocaleString("es-CL")} c/u</p>
        <p>${plan.descripcionLarga}</p>
        <div class="detalle-incluye">
          <strong>Incluye</strong>
          <ul>${listaIncluye}</ul>
        </div>
        <button class="boton" id="btn-agendar-detalle" data-id="${plan.id}">Agendar cita</button>
      </div>
    `;

    document.getElementById("btn-agendar-detalle").addEventListener("click", () => {
      agregarAlCarrito(plan.id);
      window.location.href = "carrito.html";
    });
  }
}