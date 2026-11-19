(function () {
  'use strict';

  function parametroURL(nombre) {
    return new URLSearchParams(window.location.search).get(nombre);
  }

  function abrirModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.classList.add('visible');
    modal.setAttribute('aria-hidden', 'false');
    const primerBoton = modal.querySelector('button');
    if (primerBoton) primerBoton.focus();
  }

  function cerrarModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.classList.remove('visible');
    modal.setAttribute('aria-hidden', 'true');
  }

  function mostrarMensaje(id, variante, mensaje) {
    const banner = document.getElementById(id);
    if (!banner) return;

    banner.className = `banner banner--${variante}`;
    const texto = banner.querySelector('[data-banner-texto]');
    if (texto) texto.textContent = mensaje;
    banner.hidden = false;
  }

  function ocultarMensaje(id) {
    const banner = document.getElementById(id);
    if (banner) banner.hidden = true;
  }

  function alternarMenu(forzar) {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const abrir = typeof forzar === 'boolean' ? forzar : !document.body.classList.contains('menu-abierto');
    document.body.classList.toggle('menu-abierto', abrir);
    sidebar.classList.toggle('abierta', abrir);
    const toggle = document.querySelector('[data-menu-toggle]');
    if (toggle) toggle.setAttribute('aria-expanded', String(abrir));
  }

  function marcarNavegacion() {
    const pagina = document.body.dataset.pagina;
    if (!pagina) return;

    document.querySelectorAll(`[data-nav="${pagina}"]`).forEach((enlace) => {
      enlace.classList.add('activo');
      enlace.setAttribute('aria-current', 'page');
    });
  }

  function iniciarEventos() {
    document.addEventListener('click', (evento) => {
      const abrir = evento.target.closest('[data-abrir-modal]');
      if (abrir) {
        evento.preventDefault();
        abrirModal(abrir.dataset.abrirModal);
        return;
      }

      const cerrar = evento.target.closest('[data-cerrar-modal]');
      if (cerrar) {
        evento.preventDefault();
        cerrarModal(cerrar.closest('.modal-overlay').id);
        return;
      }

      const menu = evento.target.closest('[data-menu-toggle]');
      if (menu) {
        alternarMenu();
        return;
      }

      if (evento.target.closest('.sidebar-backdrop')) {
        alternarMenu(false);
      }
    });

    document.addEventListener('keydown', (evento) => {
      if (evento.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.visible').forEach((modal) => cerrarModal(modal.id));
        alternarMenu(false);
      }
    });
  }

  function iniciar() {
    marcarNavegacion();
    iniciarEventos();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }

  window.SIGAV_UI = {
    parametroURL,
    abrirModal,
    cerrarModal,
    mostrarMensaje,
    ocultarMensaje,
    alternarMenu
  };
})();
