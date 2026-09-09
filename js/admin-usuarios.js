// =====================================================
// Responsabilidad única: la tabla de admin-usuarios.html.
// =====================================================

const cuerpoTablaUsuarios = document.getElementById("cuerpo-tabla-usuarios");

function dibujarTablaUsuarios() {
  const usuarios = obtenerUsuarios();
  cuerpoTablaUsuarios.innerHTML = "";

  usuarios.forEach((usuario) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${usuario.run}</td>
      <td>${usuario.nombre} ${usuario.apellidos}</td>
      <td>${usuario.correo}</td>
      <td>${usuario.tipo}</td>
      <td>
        <div class="fila-acciones">
          <a class="boton" href="admin-usuario-form.html?run=${usuario.run}">Editar</a>
          <button class="boton boton-secundario" data-run="${usuario.run}">Eliminar</button>
        </div>
      </td>
    `;
    cuerpoTablaUsuarios.appendChild(fila);
  });

  document.querySelectorAll("#cuerpo-tabla-usuarios button[data-run]").forEach((boton) => {
    boton.addEventListener("click", () => {
      const listaActualizada = obtenerUsuarios().filter((u) => u.run !== boton.dataset.run);
      guardarUsuarios(listaActualizada);
      dibujarTablaUsuarios();
    });
  });
}

if (cuerpoTablaUsuarios) {
  dibujarTablaUsuarios();
}