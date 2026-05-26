/* ===== TAB NAVIGATION — bulletproof single-section display ===== */
const navLinks = document.querySelectorAll('.nav-link');
const allSections = document.querySelectorAll('.section');

function navigateTo(sectionId) {
  // 1. Force-hide every section with inline style (overrides everything)
  allSections.forEach(s => {
    s.style.display = 'none';
    s.classList.remove('active');
  });

  // 2. Remove active from all nav links
  navLinks.forEach(l => l.classList.remove('active'));

  // 3. Show only the target section
  const target = document.getElementById(sectionId);
  if (target) {
    // Use flex for hero (needs centering), block for others
    target.style.display = (sectionId === 'hero') ? 'flex' : 'block';
    target.classList.add('active');

    // 4. Scroll the page back to very top
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 5. Animate reveals
    target.querySelectorAll('.reveal').forEach(el => el.classList.remove('visible'));
    setTimeout(() => triggerReveal(target), 100);
  }

  // 6. Highlight correct nav link
  const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
  if (activeLink) activeLink.classList.add('active');
}

// Wire up nav links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigateTo(link.getAttribute('data-section'));
  });
});

/* ===== HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinksContainer.classList.toggle('open'));
navLinks.forEach(link => link.addEventListener('click', () => navLinksContainer.classList.remove('open')));

/* ===== NAVBAR SCROLL EFFECT ===== */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ===== REVEAL ANIMATION ===== */
function triggerReveal(container) {
  container.querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 80);
  });
}

/* ===== ROLE TYPEWRITER ===== */
const roles = ['Biomedical Engineer', 'Software Engineer', 'Front-End Developer', 'AI Enthusiast', 'Data Analytics Learner'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const roleEl = document.getElementById('roleText');

function typeRole() {
  if (!roleEl) return;
  const current = roles[roleIndex];
  roleEl.textContent = isDeleting
    ? current.substring(0, charIndex - 1)
    : current.substring(0, charIndex + 1);
  isDeleting ? charIndex-- : charIndex++;

  let delay = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === current.length) { delay = 2000; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 400; }
  setTimeout(typeRole, delay);
}

/* ===== CONTACT FORM ===== */
function handleFormSubmit(e) {
  e.preventDefault();
  const note = document.getElementById('formNote');
  const name = document.getElementById('name').value;
  note.textContent = `Thanks ${name}! I'll get back to you soon.`;
  note.style.color = '#10b981';
  e.target.reset();
  setTimeout(() => { note.textContent = ''; }, 5000);
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  navigateTo('hero');
  setTimeout(typeRole, 800);
});
