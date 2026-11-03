document.addEventListener('DOMContentLoaded', () => {
  const cover = document.getElementById('cover-screen');
  const openButton = document.getElementById('openInvitation');
  const invitation = document.getElementById('invitation-screen');

  // Referencias para el control de música
  const audio = document.getElementById('bgAudio');
  const musicBtn = document.getElementById('musicToggleBtn');
  const musicIcon = document.getElementById('musicIcon');
  let isPlaying = false;

  openButton.addEventListener('click', () => {
    openButton.disabled = true;
    cover.classList.add('fade-out');

    // Reproducir la canción "Sparks" desde el inicio al abrir la invitación
    if (audio) {
      audio.currentTime = 0; // 👈 Esto asegura que empiece desde el principio
      audio.play().then(() => {
        isPlaying = true;
        if (musicIcon) musicIcon.textContent = '⏸';
      }).catch(error => {
        console.log("Reproducción automática bloqueada por el navegador:", error);
      });
    }

    window.setTimeout(() => {
      cover.hidden = true;
      invitation.classList.add('visible');
      invitation.setAttribute('aria-hidden', 'false');
      invitation.scrollTop = 0;
    }, 750);
  });

  // Control manual del botón flotante de música (reproducir / pausar)
  if (musicBtn && audio) {
    musicBtn.addEventListener('click', () => {
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
        if (musicIcon) musicIcon.textContent = '🎵';
      } else {
        audio.play().then(() => {
          isPlaying = true;
          if (musicIcon) musicIcon.textContent = '⏸';
        }).catch(error => {
          console.log("No se pudo reproducir el audio:", error);
        });
      }
    });
  }

  // Evento: 6 de diciembre de 2026 a las 10:00 a. m.
  const fechaEvento = new Date(2026, 11, 6, 10, 0, 0);
  const countdown = document.getElementById('countdown');
  const pendingDate = document.getElementById('pending-date');
  
  if (countdown) countdown.hidden = false;
  if (pendingDate) pendingDate.hidden = true;

  const fields = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
  };

  function updateCountdown() {
    const diff = fechaEvento.getTime() - Date.now();
    if (diff <= 0) {
      Object.values(fields).forEach(field => {
        if (field) field.textContent = '00';
      });
      return;
    }
    if (fields.days) fields.days.textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
    if (fields.hours) fields.hours.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
    if (fields.minutes) fields.minutes.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    if (fields.seconds) fields.seconds.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
});