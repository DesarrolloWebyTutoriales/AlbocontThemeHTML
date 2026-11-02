/* ====== CONFIGURACIÓN RÁPIDA ====== */
const WA_NUMBER = '51960678603'; // Cambiar aquí si cambia el número
const waLink = msg => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

/* Enlaces de WhatsApp con mensaje pre-cargado */
document.querySelectorAll('[data-wa]').forEach(a => {
  a.href = waLink(a.dataset.wa);
  a.target = '_blank'; a.rel = 'noopener';
});

/* Navbar sombra al hacer scroll */
const nav = document.getElementById('navbar');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 10), {passive:true});

/* Menú móvil */
const burger = document.getElementById('burger'), links = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open'); burger.classList.remove('open');
  burger.setAttribute('aria-expanded','false');
}));

/* Animaciones al hacer scroll */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
}), {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* Acordeón FAQ */
document.querySelectorAll('.faq-q').forEach(btn => btn.addEventListener('click', () => {
  const item = btn.parentElement, answer = item.querySelector('.faq-a'), isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(o => {
    o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null;
    o.querySelector('.faq-q').setAttribute('aria-expanded','false');
  });
  if (!isOpen) {
    item.classList.add('open'); answer.style.maxHeight = answer.scrollHeight + 'px';
    btn.setAttribute('aria-expanded','true');
  }
}));

/* Tarjetas de servicio que se voltean también con teclado y en móvil */
document.querySelectorAll('.flip-card').forEach(card => {
  const toggle = () => card.classList.toggle('is-flipped');
  const isTouch = () => window.matchMedia('(hover: none)').matches;
  card.addEventListener('click', e => { if (!e.target.closest('a') && isTouch()) toggle(); });
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
});

/* Formulario → WhatsApp */
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  if (!f.reportValidity()) return;
  const d = Object.fromEntries(new FormData(f));
  const msg = `¡Hola ALBICONT! 👋\n*Nombre:* ${d.nombre}\n*Servicio de interés:* ${d.servicio}\n*Correo:* ${d.correo}\n*Teléfono:* ${d.telefono || '—'}\n*Consulta:* ${d.mensaje}`;
  const win = window.open(waLink(msg), '_blank');
  if (!win) location.href = waLink(msg);
  document.getElementById('formStatus').textContent = '✅ Abriendo WhatsApp para enviar tu consulta…';
  f.reset();
});

/* Año dinámico */
document.getElementById('year').textContent = new Date().getFullYear();