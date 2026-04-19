// =========================
// Script principal de interacción
// =========================

// 1. Mostrar año actual en el footer
const fecha = document.getElementById('fecha');
if (fecha) fecha.textContent = new Date().getFullYear();

// 2. Menú móvil (abrir/cerrar)
const toggle = document.querySelector('.menu__toggle');
const nav = document.getElementById('nav-menu');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const abierto = nav.classList.toggle('menu--abierto');
    toggle.setAttribute('aria-expanded', abierto);
    toggle.textContent = abierto ? 'X' : 'MENÚ';
  });
  nav.querySelectorAll('a').forEach(enlace => {
    enlace.addEventListener('click', () => {
      nav.classList.remove('menu--abierto');
      toggle.setAttribute('aria-expanded', false);
      toggle.textContent = 'MENÚ';
    });
  });
}

// 3. Cargar misión y visión desde JSON
fetch('api/mision_vision.json')
  .then(response => response.json())
  .then(data => {
    document.getElementById('mision-texto').textContent = data.mision;
    document.getElementById('vision-texto').textContent = data.vision;
  })
  .catch(() => {
    document.getElementById('mision-texto').textContent = 'No disponible.';
    document.getElementById('vision-texto').textContent = 'No disponible.';
  });

// 4. Cargar descripciones de servicios desde JSON y mostrar/ocultar API
fetch('api/servicios.json')
  .then(response => response.json())
  .then(servicios => {
    const cards = document.querySelectorAll('.blog__card');
    cards.forEach((card, i) => {
      const pApi = card.querySelector('.blog__api-texto');
      if (pApi && servicios[i]) {
        pApi.innerHTML = servicios[i].descripcion;
        pApi.style.display = 'none'; // Oculto al inicio
      }
      const btnVerMas = card.querySelector('.blog__vermas');
      if (btnVerMas && pApi) {
        btnVerMas.style.display = 'inline-block';
        btnVerMas.textContent = 'Ver más';
        btnVerMas.onclick = function(e) {
          e.preventDefault();
          if (pApi.style.display === 'none' || pApi.style.display === '') {
            pApi.style.display = 'block';
            btnVerMas.textContent = 'Ocultar';
          } else {
            pApi.style.display = 'none';
            btnVerMas.textContent = 'Ver más';
          }
        };
      }
    });
  });

// Validación del formulario de contacto
const formContacto = document.getElementById('form-contacto');
if (formContacto) {
  formContacto.addEventListener('submit', function(e) {
    let valido = true;
    // Nombre
    const nombre = formContacto.nombre;
    const errorNombre = document.getElementById('error-nombre');
    if (!nombre.value.trim() || nombre.value.length < 2) {
      errorNombre.textContent = 'Ingresa tu nombre (mínimo 2 letras).';
      valido = false;
    } else {
      errorNombre.textContent = '';
    }
    // Email
    const email = formContacto.email;
    const errorEmail = document.getElementById('error-email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
      errorEmail.textContent = 'Ingresa un email válido.';
      valido = false;
    } else {
      errorEmail.textContent = '';
    }
    // Teléfono
    const telefono = formContacto.telefono;
    const errorTelefono = document.getElementById('error-telefono');
    const telRegex = /^[0-9]{8,15}$/;
    if (!telefono.value.trim() || !telRegex.test(telefono.value)) {
      errorTelefono.textContent = 'Ingresa un teléfono válido (solo números, 8-15 dígitos).';
      valido = false;
    } else {
      errorTelefono.textContent = '';
    }
    // Servicio
    const servicio = formContacto.servicio;
    const errorServicio = document.getElementById('error-servicio');
    if (!servicio.value) {
      errorServicio.textContent = 'Selecciona un servicio.';
      valido = false;
    } else {
      errorServicio.textContent = '';
    }
    if (!valido) {
      e.preventDefault();
    }
  });
}
