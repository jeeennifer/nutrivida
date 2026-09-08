// =====================================================
// 1. DATOS DEL NEGOCIO 
// =====================================================
const planes = [
  {
    id: 1,
    etiqueta: "Nutrición Deportiva",
    nombre: "Consulta Deportiva con Ana Soto",
    descripcion: "Evaluación completa enfocada en rendimiento físico y masa muscular.",
    precio: 25000,
    imagen: "assets/img/plan-consulta.jpg" 
  },
  {
    id: 2,
    etiqueta: "Pérdida de Peso",
    nombre: "Seguimiento con Matías Reyes",
    descripcion: "Controles mensuales con mediciones y ajuste de tu plan calórico.",
    precio: 18000,
    imagen: "assets/img/plan-seguimiento.jpg"
  },
  {
    id: 3,
    etiqueta: "Vegetariana / Vegana",
    nombre: "Plan Integral con Valentina García",
    descripcion: "Programa de 3 meses para transición a alimentación basada en plantas.",
    precio: 75000,
    imagen: "assets/img/plan-integral.jpg"
  },
  {
    id: 4,
    etiqueta: "Enf. Metabólicas",
    nombre: "Asesoría Clínica con Luis Pérez",
    descripcion: "Tratamiento nutricional especializado para resistencia a la insulina, diabetes y colesterol.",
    precio: 35000,
    imagen: "assets/img/plan-consulta.jpg" 
  }
];

// =====================================================
// 2. RENDERIZADO DEL CATÁLOGO DE PLANES
// =====================================================
const grillaProductos = document.getElementById("grilla-productos");

function mostrarPlanes() {
  grillaProductos.innerHTML = "";

  planes.forEach((plan) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("producto");

    tarjeta.innerHTML = `
      <a href="detalle-plan.html">
        <img src="${plan.imagen}" alt="${plan.nombre}">
      </a>
      <div class="producto-contenido">
        <p class="subtitulo etiqueta-plan">${plan.etiqueta}</p>
        <h3>${plan.nombre}</h3>
        <p class="descripcion-plan">${plan.descripcion}</p>
        <p class="precio">$${plan.precio.toLocaleString("es-CL")}</p>
        <button class="boton" data-id="${plan.id}">Agendar</button>
      </div>
    `;
    grillaProductos.appendChild(tarjeta);
  });

  document.querySelectorAll(".producto button").forEach((boton) => {
    boton.addEventListener("click", () => {
      const id = Number(boton.dataset.id);
      agregarAlCarrito(id);
      alert(`¡Éxito! Has agendado el plan. Revisa 'Mis Horas'.`);
    });
  });
}

if (grillaProductos) {
  mostrarPlanes();
}

// =====================================================
// 3. LÓGICA EXCLUSIVA PARA DETALLE-PLAN.HTML
// =====================================================
const btnDetalle = document.querySelector(".btn-agendar-detalle");

if (btnDetalle) {
  btnDetalle.addEventListener("click", () => {
    const id = Number(btnDetalle.dataset.id);
    agregarAlCarrito(id);
    alert(`¡Éxito! Cita agendada. Revisa 'Mis Horas'.`);
  });
}

// =====================================================
// 4. LÓGICA DEL CARRITO (MIS HORAS) CON LOCALSTORAGE
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
// 5. ACTUALIZACIÓN VISUAL DEL CARRITO Y CONTADORES
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
      <div>
        <strong>${item.nombre}</strong>
        <div class="control-cantidad">
          <button data-id="${item.id}" class="btn-cantidad btn-restar">-</button>
          <span>${item.cantidad}</span>
          <button data-id="${item.id}" class="btn-cantidad btn-sumar">+</button>
        </div>
      </div>
      <div style="text-align: right;">
        <p style="margin-bottom: 10px; font-weight: bold;">Subtotal: $${(item.precio * item.cantidad).toLocaleString("es-CL")}</p>
        <button data-index="${index}" class="btn-eliminar">Eliminar</button>
      </div>
    `;
    listaCarrito.appendChild(elemento);
  });

  // Evento para sumar cantidad
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

  // Evento para restar cantidad (mínimo 1)
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

  // Evento para eliminar ítem completo
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
// 6. VALIDACIÓN DE CONTRATACIÓN EN EL CARRITO
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
      alert("¡Contratación confirmada! Redirigiendo al inicio de sesión...");
      window.location.href = "login.html";
    }
  });
}

actualizarCarrito();