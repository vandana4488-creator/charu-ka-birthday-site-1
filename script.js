const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

const secretButton = document.getElementById('secretButton');
const secretMessage = document.getElementById('secretMessage');
secretButton.addEventListener('click', () => {
  const opening = secretMessage.hidden;
  secretMessage.hidden = !opening;
  secretButton.textContent = opening ? 'Hide secret message ♡' : 'Reveal my secret 💖';
  if (opening) secretMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

const wishButton = document.getElementById('wishButton');
const wishResult = document.getElementById('wishResult');
wishButton.addEventListener('click', () => {
  wishResult.textContent = '✨ Your wish has been sent to the universe. May it come true, Charu! 💗';
  for (let i = 0; i < 24; i++) setTimeout(() => makeHeart(true), i * 75);
});

function makeHeart(fromWish = false) {
  const heart = document.createElement('span');
  heart.className = 'float-heart';
  heart.textContent = ['♡', '💗', '✧', '💕', '🌸'][Math.floor(Math.random() * 5)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (fromWish ? 16 + Math.random() * 24 : 14 + Math.random() * 18) + 'px';
  heart.style.setProperty('--duration', (4 + Math.random() * 4) + 's');
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 8500);
}
setInterval(() => { if (Math.random() > 0.3) makeHeart(); }, 850);

// Countdown to the start of Charu's birthday in the visitor's local time.
const countdown = document.getElementById('countdown');
const countdownTarget = new Date(2026, 9, 25, 0, 0, 0, 0);
let heartStormStarted = false;

function launchHeartStorm() {
  if (heartStormStarted) return;
  heartStormStarted = true;
  const storm = document.createElement('div');
  storm.className = 'heart-storm';
  storm.setAttribute('aria-hidden', 'true');
  const hearts = ['💗', '💖', '💕', '💘', '❤️', '♡', '💞', '💓'];
  for (let i = 0; i < 145; i++) {
    const heart = document.createElement('span');
    heart.className = 'storm-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDelay = (Math.random() * 0.65) + 's';
    heart.style.animationDuration = (3.7 + Math.random() * 1.3) + 's';
    heart.style.fontSize = (18 + Math.random() * 34) + 'px';
    heart.style.setProperty('--drift', ((Math.random() - 0.5) * 190) + 'px');
    heart.style.setProperty('--spin', ((Math.random() - 0.5) * 300) + 'deg');
    heart.style.setProperty('--scale', (0.65 + Math.random() * 1.25));
    storm.appendChild(heart);
  }
  document.body.appendChild(storm);
  setTimeout(() => storm.remove(), 5100);
}

function updateCountdown() {
  const remaining = countdownTarget.getTime() - Date.now();
  if (remaining <= 0) {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    countdown.classList.add('is-birthday');
    countdown.querySelector('.countdown-label').textContent = 'Happy Birthday, Charu! The magic is here! 💗';
    launchHeartStorm();
    return;
  }
  const totalSeconds = Math.floor(remaining / 1000);
  document.getElementById('days').textContent = String(Math.floor(totalSeconds / 86400)).padStart(2, '0');
  document.getElementById('hours').textContent = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, '0');
  document.getElementById('minutes').textContent = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  document.getElementById('seconds').textContent = String(totalSeconds % 60).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Attempt to start music automatically. Browsers may block audible autoplay;
// the visible music button remains available as a fallback.
const audio = document.getElementById('birthdayAudio');
const musicToggle = document.getElementById('musicToggle');
let musicAttempted = false;
async function tryAutoplayMusic() {
  if (musicAttempted) return;
  musicAttempted = true;
  try {
    await audio.play();
    musicToggle.textContent = '♫ Music on';
  } catch (e) {
    musicToggle.textContent = '♫ Tap for music';
  }
}
window.addEventListener('load', tryAutoplayMusic);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && audio.paused && musicAttempted) {
    // Do not repeatedly fight browser autoplay policy; user can tap the button.
  }
});
musicToggle.addEventListener('click', async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicToggle.textContent = '♫ Music on';
    } catch (e) {
      musicToggle.textContent = '♫ Tap for music';
    }
  } else {
    audio.pause();
    musicToggle.textContent = '♫ Music off';
  }
});
