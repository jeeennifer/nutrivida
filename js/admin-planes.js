// =====================================================
// Responsabilidad única: la tabla de admin-planes.html
// (listado de todos los planes, con acciones editar/eliminar).
// =====================================================

const cuerpoTablaPlanes = document.getElementById("cuerpo-tabla-planes");

function dibujarTablaPlanes() {
  const planes = obtenerPlanes();
  cuerpoTablaPlanes.innerHTML = "";

  planes.forEach((plan) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${plan.nombre}</td>
      <td>${plan.etiqueta}</td>
      <td>$${plan.precio.toLocaleString("es-CL")}</td>
      <td>${plan.stock}</td>
      <td>
        <div class="fila-acciones">
          <a class="boton" href="admin-plan-form.html?id=${plan.id}">Editar</a>
          <button class="boton boton-secundario" data-id="${plan.id}">Eliminar</button>
        </div>
      </td>
    `;
    cuerpoTablaPlanes.appendChild(fila);
  });

  document.querySelectorAll("#cuerpo-tabla-planes button[data-id]").forEach((boton) => {
    boton.addEventListener("click", () => {
      const listaActualizada = obtenerPlanes().filter((p) => p.id !== Number(boton.dataset.id));
      guardarPlanes(listaActualizada);
      dibujarTablaPlanes();
    });
  });
}

if (cuerpoTablaPlanes) {
  dibujarTablaPlanes();
}