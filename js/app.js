// =====================================================
// 1. DATOS DEL NEGOCIO
// =====================================================

const planes = [
  {
    id: 1,
    etiqueta: "Evaluación",
    nombre: "Consulta nutricional",
    descripcion: "Primera evaluación completa con plan de alimentación personalizado.",
    precio: 25000,
    imagen: "assets/img/plan-consulta.jpg" 
  },
  {
    id: 2,
    etiqueta: "Seguimiento",
    nombre: "Plan de seguimiento",
    descripcion: "Controles mensuales con mediciones y ajuste de tu plan.",
    precio: 18000,
    imagen: "assets/img/plan-seguimiento.jpg"
  },
  {
    id: 3,
    etiqueta: "Programa",
    nombre: "Plan integral",
    descripcion: "Programa completo de 3 meses: evaluación, plan y 4 controles.",
    precio: 75000,
    imagen: "assets/img/plan-integral.jpg"
  }
];

const profesionales = [
  { id: "nutri1", nombre: "Ana Soto", especialidad: "Nutrición Deportiva" },
  { id: "nutri2", nombre: "Matias Reyes", especialidad: "Pérdida de Peso" },
  { id: "nutri3", nombre: "Valentina Garcia", especialidad: "Vegetariana / Vegana" },
  { id: "nutri4", nombre: "Luis Pérez", especialidad: "Enf. Metabólicas" }
];

const grillaProductos = document.getElementById("grilla-productos");

// =====================================================
// 2. RENDERIZADO DE LA INTERFAZ
// =====================================================

function mostrarPlanes() {
  grillaProductos.innerHTML = "";

  // Generamos las opciones del <select> una sola vez
  const opcionesProfesionales = profesionales.map(p => 
    `<option value="${p.nombre}">${p.nombre} - ${p.especialidad}</option>`
  ).join('');

  planes.forEach((plan) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("producto");

    tarjeta.innerHTML = `
      <img src="${plan.imagen}" alt="${plan.nombre}">
      <div class="producto-contenido">
        <p class="subtitulo" style="font-size: 0.8rem; margin-bottom: 5px;">${plan.etiqueta}</p>
        <h3>${plan.nombre}</h3>
        <p style="margin-bottom: 15px;">${plan.descripcion}</p>
        
        <label for="select-${plan.id}" style="font-size: 0.9rem; color: #555;">Profesional:</label>
        <select id="select-${plan.id}" style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 4px; border: 1px solid #ccc;">
          <option value="">Seleccione un especialista...</option>
          ${opcionesProfesionales}
        </select>

        <p class="precio">$${plan.precio.toLocaleString("es-CL")}</p>
        <button class="boton" data-id="${plan.id}">
          Agendar
        </button>
      </div>
    `;

    grillaProductos.appendChild(tarjeta);
  });
}

// Inicializar la vista
mostrarPlanes();