

const formPlan = document.getElementById("form-plan");
const tituloFormPlan = document.getElementById("titulo-form-plan");

const inputNombrePlan = document.getElementById("nombre-plan");
const inputEtiquetaPlan = document.getElementById("etiqueta-plan");
const inputDescripcionPlan = document.getElementById("descripcion-plan");
const inputPrecioPlan = document.getElementById("precio-plan");
const inputStockPlan = document.getElementById("stock-plan");

const parametros = new URLSearchParams(window.location.search);
const idAEditar = parametros.get("id") ? Number(parametros.get("id")) : null;

if (idAEditar) {
  const planExistente = obtenerPlanes().find((p) => p.id === idAEditar);
  if (planExistente) {
    tituloFormPlan.textContent = "Editar plan";
    inputNombrePlan.value = planExistente.nombre;
    inputEtiquetaPlan.value = planExistente.etiqueta;
    inputDescripcionPlan.value = planExistente.descripcion;
    inputPrecioPlan.value = planExistente.precio;
    inputStockPlan.value = planExistente.stock;
  }
}

formPlan.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const errorNombre = validarTexto(inputNombrePlan.value, "El nombre", 3, 100);
  const errorEtiqueta = validarTexto(inputEtiquetaPlan.value, "La categoría", 2, 50);
  const errorPrecio = inputPrecioPlan.value === "" || Number(inputPrecioPlan.value) < 0
    ? "El precio es obligatorio y no puede ser negativo."
    : "";
  const errorStock = inputStockPlan.value === "" || Number(inputStockPlan.value) < 0
    ? "El stock es obligatorio y no puede ser negativo."
    : "";

  mostrarErrorCampo("error-nombre-plan", errorNombre);
  mostrarErrorCampo("error-etiqueta-plan", errorEtiqueta);
  mostrarErrorCampo("error-precio-plan", errorPrecio);
  mostrarErrorCampo("error-stock-plan", errorStock);

  if (errorNombre || errorEtiqueta || errorPrecio || errorStock) {
    mostrarMensajeFormulario("mensaje-plan", "Revisa los campos marcados antes de guardar.", "error");
    return;
  }

  const planes = obtenerPlanes();

  const datosPlan = {
    nombre: inputNombrePlan.value.trim(),
    etiqueta: inputEtiquetaPlan.value.trim(),
    descripcion: inputDescripcionPlan.value.trim(),
    descripcionLarga: inputDescripcionPlan.value.trim(),
    precio: Number(inputPrecioPlan.value),
    stock: Number(inputStockPlan.value)
  };

  if (idAEditar) {
    const indice = planes.findIndex((p) => p.id === idAEditar);
    planes[indice] = { ...planes[indice], ...datosPlan };
  } else {
    const nuevoId = planes.length > 0 ? Math.max(...planes.map((p) => p.id)) + 1 : 1;
    planes.push({
      id: nuevoId,
      ...datosPlan,
      incluye: [],
      imagen: "assets/img/plan-consulta.jpg" // imagen genérica por defecto para planes nuevos
    });
  }

  guardarPlanes(planes);
  mostrarMensajeFormulario("mensaje-plan", "Plan guardado correctamente.", "exito");

  setTimeout(() => {
    window.location.href = "admin-planes.html";
  }, 700);
});