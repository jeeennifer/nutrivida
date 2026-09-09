// =====================================================
// -----------------------------------------------------
// Responsabilidad única de este archivo: guardar los datos
// del negocio (planes y usuarios) y las funciones para
// leerlos/guardarlos desde localStorage. Ningún otro
// archivo JS del proyecto debe tocar localStorage
// directamente para estos datos: siempre pasan por aquí,
// para que si un día cambia la forma de guardar los datos
// (por ejemplo, a una API real) solo haya que tocar este
// archivo y no los demás.
// =====================================================

// ---------- PLANES QUE OFRECE LA CLÍNICA ----------
// Estos son los datos "de fábrica". Si el administrador
// agrega/edita/elimina planes desde el panel, esos cambios
// se guardan aparte en localStorage y tienen prioridad
// sobre esta lista (ver obtenerPlanes más abajo).
const PLANES_INICIALES = [
  {
    id: 1,
    etiqueta: "Nutrición Deportiva",
    nombre: "Consulta Deportiva con Ana Soto",
    descripcion: "Evaluación completa enfocada en rendimiento físico y masa muscular.",
    descripcionLarga: "Primera evaluación completa enfocada en rendimiento físico y masa muscular, diseñada para alcanzar tus metas deportivas.",
    incluye: ["Evaluación antropométrica", "Plan de alimentación deportivo", "Informe con recomendaciones", "1 control de seguimiento"],
    precio: 25000,
    stock: 10,
    imagen: "assets/img/plan-consulta.jpg"
  },
  {
    id: 2,
    etiqueta: "Pérdida de Peso",
    nombre: "Seguimiento con Matías Reyes",
    descripcion: "Controles mensuales con mediciones y ajuste de tu plan calórico.",
    descripcionLarga: "Seguimiento mensual con mediciones antropométricas y ajuste progresivo de tu plan calórico para una baja de peso sostenible.",
    incluye: ["Control mensual", "Ajuste de plan calórico", "Medición de composición corporal", "Soporte por WhatsApp"],
    precio: 18000,
    stock: 15,
    imagen: "assets/img/plan-seguimiento.jpg"
  },
  {
    id: 3,
    etiqueta: "Vegetariana / Vegana",
    nombre: "Plan Integral con Valentina García",
    descripcion: "Programa de 3 meses para transición a alimentación basada en plantas.",
    descripcionLarga: "Programa de 3 meses pensado para transicionar de forma segura y balanceada hacia una alimentación basada en plantas.",
    incluye: ["3 controles mensuales", "Plan de suplementación si corresponde", "Recetario personalizado", "Educación nutricional"],
    precio: 75000,
    stock: 8,
    imagen: "assets/img/plan-integral.jpg"
  },
  {
    id: 4,
    etiqueta: "Enf. Metabólicas",
    nombre: "Asesoría Clínica con Luis Pérez",
    descripcion: "Tratamiento nutricional especializado para resistencia a la insulina, diabetes y colesterol.",
    descripcionLarga: "Tratamiento nutricional especializado, en conjunto con tu médico tratante, para resistencia a la insulina, diabetes y colesterol.",
    incluye: ["Evaluación clínica inicial", "Plan de alimentación terapéutico", "Coordinación con médico tratante", "2 controles de seguimiento"],
    precio: 35000,
    stock: 12,
    imagen: "assets/img/plan-clinico.jpg"
  }
];

// ---------- USUARIOS DE EJEMPLO PARA EL PANEL ADMIN ----------
const USUARIOS_INICIALES = [
  {
    run: "191182728",
    nombre: "Rocío",
    apellidos: "Contreras Muñoz",
    correo: "rocio.contreras@gmail.com",
    tipo: "Paciente",
    region: "La Araucanía",
    comuna: "Temuco"
  },
  {
    run: "112223334",
    nombre: "Ana",
    apellidos: "Soto Reyes",
    correo: "ana.soto@nutrivida.cl",
    tipo: "Nutricionista",
    region: "La Araucanía",
    comuna: "Temuco"
  }
];

// ---------- REGIONES Y COMUNAS (para los <select> dependientes) ----------
const REGIONES = [
  { region: "La Araucanía", comunas: ["Temuco", "Padre Las Casas", "Villarrica"] },
  { region: "Metropolitana", comunas: ["Santiago", "Providencia", "Ñuñoa"] },
  { region: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué"] }
];

function obtenerComunas(nombreRegion) {
  const region = REGIONES.find((r) => r.region === nombreRegion);
  return region ? region.comunas : [];
}

// ---------- LECTURA/ESCRITURA DE PLANES ----------
function obtenerPlanes() {
  const guardados = localStorage.getItem("planes");
  if (!guardados) {
    localStorage.setItem("planes", JSON.stringify(PLANES_INICIALES));
    return PLANES_INICIALES;
  }
  return JSON.parse(guardados);
}

function guardarPlanes(listaPlanes) {
  localStorage.setItem("planes", JSON.stringify(listaPlanes));
}

// ---------- LECTURA/ESCRITURA DE USUARIOS ----------
function obtenerUsuarios() {
  const guardados = localStorage.getItem("usuarios");
  if (!guardados) {
    localStorage.setItem("usuarios", JSON.stringify(USUARIOS_INICIALES));
    return USUARIOS_INICIALES;
  }
  return JSON.parse(guardados);
}

function guardarUsuarios(listaUsuarios) {
  localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
}