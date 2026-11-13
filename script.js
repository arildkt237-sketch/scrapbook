// ===============================
// EDIT BAGIAN INI UNTUK PERSONALISASI
// ===============================
const pesanSurat = `Aku mungkin tidak selalu pandai menyampaikan apa yang kurasakan.
Tapi ada satu hal yang ingin kamu tahu: kehadiranmu berarti.
Terima kasih untuk setiap tawa, cerita, dan hal sederhana yang pernah kita bagi. Kalau suatu hari kamu membaca ini lagi, semoga kamu ingat bahwa ada seseorang yang pernah membuat halaman kecil ini khusus untukmu.
Jaga dirimu baik-baik, ya. Kamu pantas mendapatkan banyak hal baik. ♡`;

const music = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');

musicToggle.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicLabel.textContent = 'Jeda musik';
      musicToggle.setAttribute('aria-label', 'Jeda musik');
    } catch {
      musicLabel.textContent = 'Cek file musik';
      alert('Tambahkan file musik.mp3 ke folder assets terlebih dahulu.');
    }
  } else {
    music.pause();
    musicLabel.textContent = 'Putar musik';
    musicToggle.setAttribute('aria-label', 'Putar musik');
  }
});

// Efek mengetik pada surat
const letter = document.getElementById('typedLetter');
let typingStarted = false;
function typeLetter() {
  if (typingStarted) return;
  typingStarted = true;
  let index = 0;
  const timer = setInterval(() => {
    letter.textContent += pesanSurat.charAt(index);
    index++;
    if (index >= pesanSurat.length) clearInterval(timer);
  }, 24);
}

// Animasi saat elemen masuk layar
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('letter-card')) typeLetter();
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .letter-card').forEach(el => observer.observe(el));

// Foto bisa diperbesar
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
document.querySelectorAll('.polaroid').forEach(photo => {
  photo.addEventListener('click', () => {
    const img = photo.querySelector('img');
    lightboxImage.src = img.src;
    lightbox.classList.add('open');
  });
});
function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImage.src = '';
}
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// Hati kecil yang melayang
const heartLayer = document.querySelector('.floating-hearts');
function createHeart() {
  const heart = document.createElement('span');
  heart.className = 'float-heart';
  heart.textContent = ['♡', '♥', 'ღ'][Math.floor(Math.random() * 3)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (12 + Math.random() * 19) + 'px';
  heart.style.animationDuration = (7 + Math.random() * 7) + 's';
  heartLayer.appendChild(heart);
  setTimeout(() => heart.remove(), 14500);
}
setInterval(createHeart, 900);
