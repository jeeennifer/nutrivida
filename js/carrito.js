

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function sincronizarCarrito() {
  // Busca cada plan por su ID y toma sus datos actuales, conservando la cantidad elegida.
  const planes = obtenerPlanes();
  const carritoActualizado = [];

  for (const item of carrito) {
    const planActual = planes.find((p) => p.id === item.id);

    if (planActual) {
      carritoActualizado.push({
        ...planActual,
        cantidad: item.cantidad
      });
    }
  }

  carrito = carritoActualizado;
  guardarCarrito();
}

function agregarAlCarrito(idProducto) {
  const planElegido = obtenerPlanes().find((p) => p.id === idProducto);
  
  if (!planElegido) {
    alert("Este plan ya no está disponible.");
    return false;
  }
  
  const citaExistente = carrito.find((item) => item.id === idProducto);
  const cantidadActual = citaExistente ? citaExistente.cantidad : 0;

  if (cantidadActual >= planElegido.stock) {
    alert("No quedan más cupos disponibles para este plan.");
    return false;
  }


  if (citaExistente) {
    citaExistente.cantidad++;
  } else {
    carrito.push({ ...planElegido, cantidad: 1 });
  }

  guardarCarrito();
  actualizarCarrito();

  return true;
}




function actualizarCarrito() {
  const contadorCarrito = document.getElementById("contador-carrito");
  if (contadorCarrito) {
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contadorCarrito.textContent = cantidadTotal;
  }

  const listaCarrito = document.getElementById("lista-carrito");
  if (!listaCarrito) return; // en páginas que no son carrito.html, no hay nada más que hacer

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
      <div class="item-carrito-acciones">
        <p>Subtotal: $${(item.precio * item.cantidad).toLocaleString("es-CL")}</p>
        <button data-index="${index}" class="btn-eliminar">Eliminar</button>
      </div>
    `;
    listaCarrito.appendChild(elemento);
  });

  document.querySelectorAll(".btn-sumar").forEach((boton) => {
    boton.addEventListener("click", () => {
      agregarAlCarrito(Number(boton.dataset.id));
    });
  });

  document.querySelectorAll(".btn-restar").forEach((boton) => {
    boton.addEventListener("click", () => {
      const item = carrito.find((p) => p.id === Number(boton.dataset.id));
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
  const montoTotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

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


const btnContratar = document.getElementById("btn-contratar");
if (btnContratar) {
  btnContratar.addEventListener("click", (evento) => {
    if (carrito.length === 0) {
      evento.preventDefault();
      mostrarMensajeFormulario(
        "mensaje-carrito",
        "Tu carrito está vacío. Agrega al menos un plan antes de continuar.",
        "error"
      );
      return;
    }

    
    if (localStorage.getItem("sesionActiva") !== "true") {
      evento.preventDefault();
      localStorage.setItem("destinoTrasLogin", "agendar-cita.html");
      window.location.href = "login.html";
    }
    
  });
}

// primero actualizamos los datos guardados y después dibujamos el carrito y calculamos su total.
sincronizarCarrito();
actualizarCarrito();