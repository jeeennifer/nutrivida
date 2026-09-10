// =====================================================
// 1. DATOS DEL NEGOCIO (planes base)
// =====================================================
const planesBase = [
  {
    id: 1,
    codigo: "PLN-001",
    etiqueta: "Nutrición Deportiva",
    nombre: "Consulta Deportiva con Ana Soto",
    descripcion: "Evaluación completa enfocada en rendimiento físico y masa muscular.",
    precio: 25000,
    stock: 20,
    stockCritico: 3,
    imagen: "assets/img/plan-consulta.jpg"
  },
  {
    id: 2,
    codigo: "PLN-002",
    etiqueta: "Pérdida de Peso",
    nombre: "Seguimiento con Matías Reyes",
    descripcion: "Controles mensuales con mediciones y ajuste de tu plan calórico.",
    precio: 18000,
    stock: 15,
    stockCritico: 2,
    imagen: "assets/img/plan-seguimiento.jpg"
  },
  {
    id: 3,
    codigo: "PLN-003",
    etiqueta: "Vegetariana / Vegana",
    nombre: "Plan Integral con Valentina García",
    descripcion: "Programa de 3 meses para transición a alimentación basada en plantas.",
    precio: 75000,
    stock: 10,
    stockCritico: 2,
    imagen: "assets/img/plan-integral.jpg"
  },
  {
    id: 4,
    codigo: "PLN-004",
    etiqueta: "Enf. Metabólicas",
    nombre: "Asesoría Clínica con Luis Pérez",
    descripcion: "Tratamiento nutricional especializado para resistencia a la insulina, diabetes y colesterol.",
    precio: 35000,
    stock: 12,
    stockCritico: 2,
    imagen: "assets/img/plan-consulta.jpg"
  }
];

// =====================================================
// 2. FUENTE DE VERDAD DE PRODUCTOS (localStorage + base)
//    Esto permite que lo que se cree/edite en el Admin
//    se refleje también en la tienda pública.
// =====================================================
function obtenerProductos() {
  const guardados = localStorage.getItem("productosAdmin");
  if (guardados) {
    return JSON.parse(guardados);
  }
  // Primera vez: se inicializa con los planes base
  localStorage.setItem("productosAdmin", JSON.stringify(planesBase));
  return planesBase;
}

function guardarProductos(listaProductos) {
  localStorage.setItem("productosAdmin", JSON.stringify(listaProductos));
}

const planes = obtenerProductos();

// =====================================================
// 3. RENDERIZADO DEL CATÁLOGO DE PLANES (planes.html)
// =====================================================
const grillaProductos = document.getElementById("grilla-productos");

function mostrarPlanes(contenedor, listaPlanes) {
  contenedor.innerHTML = "";

  listaPlanes.forEach((plan) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("producto");

    tarjeta.innerHTML = `
      <a href="detalle-producto.html?id=${plan.id}" style="text-decoration:none; color:inherit;">
        <img src="${plan.imagen}" alt="${plan.nombre}">
        <div class="producto-contenido">
          <p class="subtitulo etiqueta-plan">${plan.etiqueta}</p>
          <h3>${plan.nombre}</h3>
          <p class="descripcion-plan">${plan.descripcion}</p>
          <p class="precio">$${plan.precio.toLocaleString("es-CL")}</p>
        </div>
      </a>
      <div class="producto-contenido" style="padding-top:0;">
        <button class="boton" data-id="${plan.id}" style="width: 100%;">Agendar</button>
      </div>
    `;
    contenedor.appendChild(tarjeta);
  });

  // Evento directo: Guarda en LocalStorage y redirige al carrito
  contenedor.querySelectorAll(".producto button").forEach((boton) => {
    boton.addEventListener("click", () => {
      const id = Number(boton.dataset.id);
      agregarAlCarrito(id);
      window.location.href = "carrito.html";
    });
  });
}

if (grillaProductos) {
  mostrarPlanes(grillaProductos, planes);
}

// =====================================================
// 4. DETALLE DE PRODUCTO (detalle-producto.html)
// =====================================================
const contenedorDetallePlan = document.getElementById("detalle-plan-contenido");

function mostrarDetallePlan() {
  const parametros = new URLSearchParams(window.location.search);
  const id = Number(parametros.get("id"));
  const plan = planes.find((p) => p.id === id) || planes[0];

  if (!plan) return;

  contenedorDetallePlan.innerHTML = `
    <div class="detalle-imagen">
      <img src="${plan.imagen}" alt="${plan.nombre}">
    </div>
    <div class="detalle-info">
      <p class="subtitulo">${plan.etiqueta}</p>
      <h2>${plan.nombre}</h2>
      <p class="precio-detalle">$${plan.precio.toLocaleString("es-CL")}</p>
      <p>${plan.descripcion}</p>

      <div class="detalle-incluye">
        <strong>Este plan incluye:</strong>
        <ul>
          <li>Evaluación nutricional personalizada</li>
          <li>Seguimiento con especialista</li>
          <li>Plan de alimentación a la medida</li>
        </ul>
      </div>

      <div class="grupo-form" style="max-width: 150px;">
        <label for="cantidad-detalle">Cantidad:</label>
        <input type="number" id="cantidad-detalle" value="1" min="1">
      </div>

      <button id="btn-agregar-detalle" class="boton" style="width: 100%;">Añadir al carrito</button>
    </div>
  `;

  document.getElementById("btn-agregar-detalle").addEventListener("click", () => {
    const cantidad = Number(document.getElementById("cantidad-detalle").value) || 1;
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito(plan.id);
    }
    window.location.href = "carrito.html";
  });

  const grillaRelacionados = document.getElementById("grilla-relacionados");
  if (grillaRelacionados) {
    const relacionados = planes.filter((p) => p.id !== plan.id).slice(0, 3);
    mostrarPlanes(grillaRelacionados, relacionados);
  }
}

if (contenedorDetallePlan) {
  mostrarDetallePlan();
}

// =====================================================
// 5. LÓGICA DEL CARRITO (MIS HORAS) CON LOCALSTORAGE
// =====================================================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(idProducto) {
  const planElegido = planes.find((p) => p.id === idProducto);
  const citaExistente = carrito.find((item) => item.id === idProducto);

  if (citaExistente) {
    citaExistente.cantidad++;
  } else {
    carrito.push({
      ...planElegido,
      cantidad: 1
    });
  }
  guardarCarrito();
  actualizarCarrito();
}

// =====================================================
// 6. ACTUALIZACIÓN VISUAL DEL CARRITO Y CONTADORES
// =====================================================
function actualizarCarrito() {
  const contadorCarrito = document.getElementById("contador-carrito");
  if (contadorCarrito) {
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contadorCarrito.textContent = cantidadTotal;
  }

  const listaCarrito = document.getElementById("lista-carrito");
  if (!listaCarrito) return;

  listaCarrito.innerHTML = "";

  if (carrito.length === 0) {
    listaCarrito.innerHTML = "<p>No tienes citas agendadas.</p>";
  }

  carrito.forEach((item, index) => {
    const elemento = document.createElement("div");
    elemento.classList.add("item-carrito");

    elemento.innerHTML = `
      <div style="display: flex; gap: 20px; align-items: center;">
        <img src="${item.imagen}" alt="${item.nombre}" class="img-carrito">
        <div>
          <strong>${item.nombre}</strong>
          <div class="control-cantidad">
            <button data-id="${item.id}" class="btn-cantidad btn-restar">-</button>
            <span>${item.cantidad}</span>
            <button data-id="${item.id}" class="btn-cantidad btn-sumar">+</button>
          </div>
        </div>
      </div>
      <div style="text-align: right;">
        <p style="margin-bottom: 10px; font-weight: bold;">Subtotal: $${(item.precio * item.cantidad).toLocaleString("es-CL")}</p>
        <button data-index="${index}" class="btn-eliminar">Eliminar</button>
      </div>
    `;
    listaCarrito.appendChild(elemento);
  });

  document.querySelectorAll(".btn-sumar").forEach((boton) => {
    boton.addEventListener("click", () => {
      const id = Number(boton.dataset.id);
      const item = carrito.find(p => p.id === id);
      if (item) {
        item.cantidad++;
        guardarCarrito();
        actualizarCarrito();
      }
    });
  });

  document.querySelectorAll(".btn-restar").forEach((boton) => {
    boton.addEventListener("click", () => {
      const id = Number(boton.dataset.id);
      const item = carrito.find(p => p.id === id);
      if (item && item.cantidad > 1) {
        item.cantidad--;
        guardarCarrito();
        actualizarCarrito();
      }
    });
  });

  document.querySelectorAll(".btn-eliminar").forEach((boton) => {
    boton.addEventListener("click", () => {
      const index = Number(boton.dataset.index);
      carrito.splice(index, 1);
      guardarCarrito();
      actualizarCarrito();
    });
  });

  const subtotalCarrito = document.getElementById("subtotal-carrito");
  const totalCarrito = document.getElementById("total-carrito");
  const montoTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  if (subtotalCarrito) subtotalCarrito.textContent = montoTotal.toLocaleString("es-CL");
  if (totalCarrito) totalCarrito.textContent = montoTotal.toLocaleString("es-CL");
}

const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
if (vaciarCarritoBtn) {
  vaciarCarritoBtn.addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
  });
}

// =====================================================
// 7. VALIDACIÓN DE CONTRATACIÓN EN EL CARRITO
// =====================================================
const btnContratar = document.getElementById("btn-contratar");
if (btnContratar) {
  btnContratar.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Error: Tu carrito está vacío. Agrega al menos un plan antes de continuar.");
      return;
    }
    const confirmar = confirm("¿Estás seguro de que deseas agendar estas horas?");
    if (confirmar) {
      window.location.href = "login.html";
    }
  });
}

// =====================================================
// 8. REGIONES Y COMUNAS (registro.html / admin-usuario-form.html)
// =====================================================
const regionesComunas = {
  "Región Metropolitana de Santiago": ["Santiago", "Providencia", "Las Condes", "Maipú", "Puente Alto"],
  "Región de la Araucanía": ["Temuco", "Padre Las Casas", "Villarrica", "Angol"],
  "Región de Ñuble": ["Chillán", "San Carlos", "Bulnes"]
};

function poblarRegiones(selectRegionId, selectComunaId) {
  const selectRegion = document.getElementById(selectRegionId);
  const selectComuna = document.getElementById(selectComunaId);
  if (!selectRegion || !selectComuna) return;

  Object.keys(regionesComunas).forEach((region) => {
    const opcion = document.createElement("option");
    opcion.value = region;
    opcion.textContent = region;
    selectRegion.appendChild(opcion);
  });

  selectRegion.addEventListener("change", () => {
    selectComuna.innerHTML = "";
    const region = selectRegion.value;

    if (!region) {
      selectComuna.innerHTML = '<option value="">-- Seleccione primero una región --</option>';
      return;
    }

    const opcionInicial = document.createElement("option");
    opcionInicial.value = "";
    opcionInicial.textContent = "-- Seleccione la comuna --";
    selectComuna.appendChild(opcionInicial);

    regionesComunas[region].forEach((comuna) => {
      const opcion = document.createElement("option");
      opcion.value = comuna;
      opcion.textContent = comuna;
      selectComuna.appendChild(opcion);
    });
  });
}

if (document.getElementById("region")) {
  poblarRegiones("region", "comuna");
}
if (document.getElementById("region-admin")) {
  poblarRegiones("region-admin", "comuna-admin");
}

// =====================================================
// 9. BLOG (blog.html y blog-detalle-*.html)
// =====================================================
const blogs = [
  {
    id: 1,
    titulo: "Caso Curioso #1: Mito del ayuno intermitente",
    resumen: "¿Realmente el ayuno intermitente acelera el metabolismo? Revisamos qué dice la evidencia.",
    contenido: "El ayuno intermitente se ha vuelto muy popular, pero no todos los cuerpos responden igual. En este artículo revisamos los distintos protocolos (16/8, 5:2, entre otros), qué dice la evidencia científica sobre sus beneficios reales y en qué casos NO se recomienda, como en personas con antecedentes de trastornos alimenticios o mujeres embarazadas. La clave, como siempre, es la personalización: lo que funciona para una persona puede no ser adecuado para otra, por lo que recomendamos siempre una evaluación con un profesional antes de iniciar cualquier protocolo.",
    imagen: "assets/img/blog-1.jpg"
  },
  {
    id: 2,
    titulo: "Caso Curioso #2: Las grasas no son el enemigo",
    resumen: "Durante años se demonizó a las grasas. Te contamos por qué son esenciales para tu salud.",
    contenido: "Durante décadas se recomendó reducir al máximo el consumo de grasas para bajar de peso o cuidar el corazón. Hoy sabemos que no todas las grasas son iguales: las grasas insaturadas presentes en la palta, el aceite de oliva, los frutos secos y el pescado azul son fundamentales para la salud cardiovascular y hormonal. El verdadero foco debería estar en reducir las grasas trans y el exceso de grasas saturadas de origen industrial, no en eliminar las grasas de la dieta por completo. En NutriVida trabajamos contigo para encontrar el equilibrio correcto según tus objetivos.",
    imagen: "assets/img/blog-2.jpg"
  }
];

const listaBlog = document.getElementById("lista-blog");
if (listaBlog) {
  blogs.forEach((entrada) => {
    const item = document.createElement("article");
    item.classList.add("blog-item");
    item.innerHTML = `
      <img src="${entrada.imagen}" alt="${entrada.titulo}">
      <div class="blog-item-contenido">
        <h3>${entrada.titulo}</h3>
        <p>${entrada.resumen}</p>
        <a href="blog-detalle-${entrada.id}.html" class="boton">Ver caso</a>
      </div>
    `;
    listaBlog.appendChild(item);
  });
}

const contenedorBlogDetalle = document.getElementById("contenido-blog-detalle");
if (contenedorBlogDetalle) {
  const idBlog = Number(document.body.dataset.blogId);
  const entrada = blogs.find((b) => b.id === idBlog);
  if (entrada) {
    contenedorBlogDetalle.innerHTML = `
      <h2>${entrada.titulo}</h2>
      <img src="${entrada.imagen}" alt="${entrada.titulo}" class="blog-detalle-imagen">
      <p>${entrada.contenido}</p>
    `;
  }
}

// =====================================================
// 10. USUARIOS (registro.html / admin)
// =====================================================
function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuariosAdmin")) || [];
}

function guardarUsuarios(listaUsuarios) {
  localStorage.setItem("usuariosAdmin", JSON.stringify(listaUsuarios));
}

// =====================================================
// 11. PANEL ADMINISTRADOR: HOME (resumen)
// =====================================================
const resumenTotalPlanes = document.getElementById("resumen-total-planes");
const resumenTotalUsuarios = document.getElementById("resumen-total-usuarios");
if (resumenTotalPlanes && resumenTotalUsuarios) {
  resumenTotalPlanes.textContent = planes.length;
  resumenTotalUsuarios.textContent = obtenerUsuarios().length;
}

// =====================================================
// 12. PANEL ADMINISTRADOR: LISTADO DE PRODUCTOS
// =====================================================
const tablaAdminProductos = document.getElementById("tabla-admin-productos");

function renderTablaProductos() {
  const listaActual = obtenerProductos();
  tablaAdminProductos.innerHTML = "";

  listaActual.forEach((producto) => {
    const fila = document.createElement("tr");
    const alertaStock = producto.stockCritico != null && producto.stock <= producto.stockCritico;

    fila.innerHTML = `
      <td>${producto.codigo || "-"}</td>
      <td>${producto.nombre}</td>
      <td>$${producto.precio.toLocaleString("es-CL")}</td>
      <td>${producto.stock} ${alertaStock ? '<span class="badge-stock-critico">¡Stock crítico!</span>' : ""}</td>
      <td>${producto.etiqueta || "-"}</td>
      <td>
        <a href="admin-producto-form.html?id=${producto.id}" class="btn-tabla btn-editar">Editar</a>
        <button class="btn-tabla btn-eliminar-fila" data-id="${producto.id}">Eliminar</button>
      </td>
    `;
    tablaAdminProductos.appendChild(fila);
  });

  tablaAdminProductos.querySelectorAll(".btn-eliminar-fila").forEach((boton) => {
    boton.addEventListener("click", () => {
      if (!confirm("¿Eliminar este plan?")) return;
      const id = Number(boton.dataset.id);
      const nuevaLista = obtenerProductos().filter((p) => p.id !== id);
      guardarProductos(nuevaLista);
      renderTablaProductos();
    });
  });
}

if (tablaAdminProductos) {
  renderTablaProductos();
}

// =====================================================
// 13. PANEL ADMINISTRADOR: FORMULARIO NUEVO/EDITAR PRODUCTO
// =====================================================
const formularioProducto = document.getElementById("formulario-producto");

if (formularioProducto) {
  const parametros = new URLSearchParams(window.location.search);
  const idEditar = Number(parametros.get("id"));

  if (idEditar) {
    const productoExistente = obtenerProductos().find((p) => p.id === idEditar);
    if (productoExistente) {
      document.getElementById("titulo-form-producto").textContent = "Editar Plan";
      document.getElementById("titulo-pagina-producto").textContent = "Editar Plan - NutriVida";
      document.getElementById("producto-id").value = productoExistente.id;
      document.getElementById("codigo-producto").value = productoExistente.codigo || "";
      document.getElementById("nombre-producto").value = productoExistente.nombre;
      document.getElementById("descripcion-producto").value = productoExistente.descripcion || "";
      document.getElementById("precio-producto").value = productoExistente.precio;
      document.getElementById("stock-producto").value = productoExistente.stock;
      document.getElementById("stock-critico-producto").value = productoExistente.stockCritico ?? "";
      document.getElementById("categoria-producto").value = productoExistente.etiqueta || "";
      document.getElementById("imagen-producto").value = productoExistente.imagen || "";
    }
  }
}

// Esta función se llama desde validaciones.js SOLO si el formulario es válido
function guardarProductoDesdeForm() {
  const id = Number(document.getElementById("producto-id").value);
  const listaActual = obtenerProductos();

  const productoData = {
    codigo: document.getElementById("codigo-producto").value.trim(),
    nombre: document.getElementById("nombre-producto").value.trim(),
    descripcion: document.getElementById("descripcion-producto").value.trim(),
    precio: Number(document.getElementById("precio-producto").value),
    stock: Number(document.getElementById("stock-producto").value),
    stockCritico: document.getElementById("stock-critico-producto").value === ""
      ? null
      : Number(document.getElementById("stock-critico-producto").value),
    etiqueta: document.getElementById("categoria-producto").value,
    imagen: document.getElementById("imagen-producto").value.trim() || "assets/img/plan-consulta.jpg"
  };

  if (id) {
    const index = listaActual.findIndex((p) => p.id === id);
    listaActual[index] = { ...listaActual[index], ...productoData };
  } else {
    const nuevoId = listaActual.length ? Math.max(...listaActual.map(p => p.id)) + 1 : 1;
    listaActual.push({ id: nuevoId, ...productoData });
  }

  guardarProductos(listaActual);
  alert("¡Plan guardado con éxito!");
  window.location.href = "admin-productos.html";
}

// =====================================================
// 14. PANEL ADMINISTRADOR: LISTADO DE USUARIOS
// =====================================================
const tablaAdminUsuarios = document.getElementById("tabla-admin-usuarios");

function renderTablaUsuarios() {
  const listaActual = obtenerUsuarios();
  tablaAdminUsuarios.innerHTML = "";

  if (listaActual.length === 0) {
    tablaAdminUsuarios.innerHTML = '<tr><td colspan="6">Aún no hay usuarios registrados.</td></tr>';
    return;
  }

  listaActual.forEach((usuario) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${usuario.run}</td>
      <td>${usuario.nombre} ${usuario.apellidos}</td>
      <td>${usuario.email}</td>
      <td>${usuario.tipoUsuario || "Cliente"}</td>
      <td>${usuario.region || "-"}</td>
      <td>
        <a href="admin-usuario-form.html?id=${usuario.id}" class="btn-tabla btn-editar">Editar</a>
        <button class="btn-tabla btn-eliminar-fila" data-id="${usuario.id}">Eliminar</button>
      </td>
    `;
    tablaAdminUsuarios.appendChild(fila);
  });

  tablaAdminUsuarios.querySelectorAll(".btn-eliminar-fila").forEach((boton) => {
    boton.addEventListener("click", () => {
      if (!confirm("¿Eliminar este usuario?")) return;
      const id = Number(boton.dataset.id);
      const nuevaLista = obtenerUsuarios().filter((u) => u.id !== id);
      guardarUsuarios(nuevaLista);
      renderTablaUsuarios();
    });
  });
}

if (tablaAdminUsuarios) {
  renderTablaUsuarios();
}

// =====================================================
// 15. PANEL ADMINISTRADOR: FORMULARIO NUEVO/EDITAR USUARIO
// =====================================================
const formularioUsuarioAdmin = document.getElementById("formulario-usuario-admin");

if (formularioUsuarioAdmin) {
  const parametros = new URLSearchParams(window.location.search);
  const idEditar = Number(parametros.get("id"));

  if (idEditar) {
    const usuarioExistente = obtenerUsuarios().find((u) => u.id === idEditar);
    if (usuarioExistente) {
      document.getElementById("titulo-form-usuario").textContent = "Editar Usuario";
      document.getElementById("usuario-id").value = usuarioExistente.id;
      document.getElementById("run-admin").value = usuarioExistente.run;
      document.getElementById("nombre-admin").value = usuarioExistente.nombre;
      document.getElementById("apellidos-admin").value = usuarioExistente.apellidos;
      document.getElementById("email-admin").value = usuarioExistente.email;
      document.getElementById("fecha-nacimiento-admin").value = usuarioExistente.fechaNacimiento || "";
      document.getElementById("tipo-usuario").value = usuarioExistente.tipoUsuario || "";
      document.getElementById("direccion-admin").value = usuarioExistente.direccion || "";
      // Región/Comuna se deben setear luego de poblar los select
      setTimeout(() => {
        document.getElementById("region-admin").value = usuarioExistente.region || "";
        document.getElementById("region-admin").dispatchEvent(new Event("change"));
        setTimeout(() => {
          document.getElementById("comuna-admin").value = usuarioExistente.comuna || "";
        }, 50);
      }, 50);
    }
  }
}

// Esta función se llama desde validaciones.js SOLO si el formulario es válido
function guardarUsuarioDesdeFormAdmin() {
  const id = Number(document.getElementById("usuario-id").value);
  const listaActual = obtenerUsuarios();

  const usuarioData = {
    run: document.getElementById("run-admin").value.trim().toUpperCase(),
    nombre: document.getElementById("nombre-admin").value.trim(),
    apellidos: document.getElementById("apellidos-admin").value.trim(),
    email: document.getElementById("email-admin").value.trim(),
    fechaNacimiento: document.getElementById("fecha-nacimiento-admin").value,
    tipoUsuario: document.getElementById("tipo-usuario").value,
    region: document.getElementById("region-admin").value,
    comuna: document.getElementById("comuna-admin").value,
    direccion: document.getElementById("direccion-admin").value.trim()
  };

  if (id) {
    const index = listaActual.findIndex((u) => u.id === id);
    listaActual[index] = { ...listaActual[index], ...usuarioData };
  } else {
    const nuevoId = listaActual.length ? Math.max(...listaActual.map(u => u.id)) + 1 : 1;
    listaActual.push({ id: nuevoId, ...usuarioData });
  }

  guardarUsuarios(listaActual);
  alert("¡Usuario guardado con éxito!");
  window.location.href = "admin-usuarios.html";
}

// Ejecución inicial (carrito visible en todas las páginas)
actualizarCarrito();

