document.addEventListener('DOMContentLoaded', () => {
  const cover = document.getElementById('cover-screen');
  const openButton = document.getElementById('openInvitation');
  const invitation = document.getElementById('invitation-screen');
  const musicButton = document.getElementById('musicButton');

  openButton.addEventListener('click', () => {
    cover.classList.add('fade-out');
    window.setTimeout(() => {
      invitation.classList.add('visible');
      invitation.setAttribute('aria-hidden', 'false');
      invitation.scrollTop = 0;
    }, 650);
  });

  // El botón queda como elemento visual hasta que se agregue un archivo de música.
  musicButton.addEventListener('click', () => {
    musicButton.textContent = musicButton.textContent === '▶' ? '♪' : '▶';
    musicButton.title = 'Todavía no se ha agregado una canción';
  });

  // Fecha provisional del ejemplo. Cambiarla cuando se confirme el evento.
  const fechaEvento = new Date('2026-12-27T16:00:00');
  const elementos = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
  };

  function actualizarContador() {
    const diferencia = fechaEvento.getTime() - Date.now();
    if (diferencia <= 0) {
      Object.values(elementos).forEach(el => el.textContent = '00');
      return;
    }
    const dias = Math.floor(diferencia / 86400000);
    const horas = Math.floor((diferencia % 86400000) / 3600000);
    const minutos = Math.floor((diferencia % 3600000) / 60000);
    const segundos = Math.floor((diferencia % 60000) / 1000);
    elementos.days.textContent = String(dias).padStart(2, '0');
    elementos.hours.textContent = String(horas).padStart(2, '0');
    elementos.minutes.textContent = String(minutos).padStart(2, '0');
    elementos.seconds.textContent = String(segundos).padStart(2, '0');
  }

  actualizarContador();
  window.setInterval(actualizarContador, 1000);
});
