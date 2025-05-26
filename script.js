
document.getElementById('brandFilter').addEventListener('change', function() {
    const selected = this.value;
    document.querySelectorAll('.car').forEach(car => {
        car.style.display = (selected === 'all' || car.dataset.brand === selected) ? 'block' : 'none';
    });
});

const map = L.map('map').setView([55.751244, 37.618423], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
L.marker([55.751244, 37.618423]).addTo(map).bindPopup("Наш автосалон").openPopup();

// Счетчики чисел
document.querySelectorAll('.counter').forEach(counter => {
  const update = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const inc = target / 100;
    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(update, 20);
    } else {
      counter.innerText = target;
    }
  };
  update();
});

// Переключение темы
const switcher = document.getElementById('themeSwitcher');
switcher.addEventListener('change', () => {
  document.body.classList.toggle('light');
});

let reviewIndex = 0;
const reviews = document.querySelectorAll('.review');
function cycleReviews() {
  reviews.forEach((r, i) => r.classList.toggle('active', i === reviewIndex));
  reviewIndex = (reviewIndex + 1) % reviews.length;
}
setInterval(cycleReviews, 5000);

// Canvas-анимация "лазеры"
const canvas = document.getElementById('laser-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let lines = Array(60).fill().map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  dx: (Math.random() - 0.5) * 2,
  dy: Math.random() * 2 + 1
}));
function animateLaser() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'lime';
  lines.forEach(l => {
    ctx.beginPath();
    ctx.moveTo(l.x, l.y);
    ctx.lineTo(l.x + l.dx * 10, l.y + l.dy * 10);
    ctx.stroke();
    l.x += l.dx;
    l.y += l.dy;
    if (l.y > canvas.height) {
      l.y = 0;
      l.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(animateLaser);
}
animateLaser();

// Фильтр по цене
const priceRange = document.getElementById('priceRange');
const priceLabel = document.getElementById('priceLabel');
priceRange.addEventListener('input', () => {
  priceLabel.textContent = 'до ' + (+priceRange.value).toLocaleString() + ' ₽';
});
