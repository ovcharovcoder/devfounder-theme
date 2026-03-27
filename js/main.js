// Animated Code Background
const canvas = document.getElementById('codeCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  const hero = document.querySelector('.hero');
  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
}

// Code snippets for animation
const codeSnippets = [
  { text: 'const [count, setCount] = useState(0);', color: '#7FB4CA' },
  { text: 'function useCustomHook() {', color: '#C88A3A' },
  { text: 'interface UserProfile {', color: '#D7BA7D' },
  { text: 'return <Component />;', color: '#66CCFF' },
  { text: "const result = await fetch('/api');", color: '#8FBF7A' },
  { text: "type Status = 'active' | 'pending';", color: '#B48EAD' },
  { text: 'useEffect(() => {}, [deps]);', color: '#9ECD7A' },
  { text: 'class Service {', color: '#D7BA7D' },
  { text: 'fn process<T>(data: T) -> Result<()>', color: '#C88A3A' },
  { text: 'func (r *Repo) Get(ctx context.Context)', color: '#66CCFF' },
  { text: 'const memoized = useMemo(() => value, []);', color: '#7FB4CA' },
  { text: 'export default function App() {', color: '#C88A3A' },
];

let particles = [];

function initParticles() {
  const numParticles = 60;
  for (let i = 0; i < numParticles; i++) {
    const snippet =
      codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      text: snippet.text,
      color: snippet.color,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.2 + 0.1,
      opacity: Math.random() * 0.4 + 0.1,
      fontSize: Math.random() * 14 + 12,
    });
  }
}

function animateCodeBackground() {
  if (!ctx || !canvas.width) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw floating code particles
  particles.forEach(p => {
    ctx.font = `${p.fontSize}px 'JetBrains Mono', 'Fira Code', monospace`;
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.opacity;
    ctx.fillText(p.text, p.x, p.y);

    // Update position
    p.x += p.speedX;
    p.y += p.speedY;

    // Wrap around
    if (p.x > canvas.width) p.x = -ctx.measureText(p.text).width;
    if (p.x < -ctx.measureText(p.text).width) p.x = canvas.width;
    if (p.y > canvas.height) p.y = 0;
    if (p.y < 0) p.y = canvas.height;
  });

  // Draw additional random syntax elements (brackets, braces, etc)
  ctx.globalAlpha = 0.15;
  const syntaxElements = [
    '{',
    '}',
    '(',
    ')',
    '=>',
    ';',
    '[]',
    '::',
    '->',
    '===',
    '...',
  ];
  for (let i = 0; i < 80; i++) {
    const element =
      syntaxElements[Math.floor(Math.random() * syntaxElements.length)];
    const x = (Date.now() * 0.01 + i * 137) % canvas.width;
    const y = (Date.now() * 0.005 + i * 73) % canvas.height;
    ctx.font = `${Math.random() * 16 + 10}px monospace`;
    ctx.fillStyle = `rgba(200, 138, 58, ${Math.random() * 0.2})`;
    ctx.fillText(element, x, y);
  }

  ctx.globalAlpha = 0.08;
  // Draw random lines of "code"
  for (let i = 0; i < 30; i++) {
    const lineLength = Math.random() * 150 + 50;
    const x = (Date.now() * 0.02 + i * 97) % canvas.width;
    const y = (Date.now() * 0.008 + i * 43) % canvas.height;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + lineLength, y);
    ctx.strokeStyle = `rgba(200, 138, 58, ${Math.random() * 0.15})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  requestAnimationFrame(animateCodeBackground);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  particles = [];
  initParticles();
});

resizeCanvas();
initParticles();
animateCodeBackground();

// Tech stack data
const techStack = [
  { icon: '⚛️', name: 'React', desc: 'Hooks, JSX', img: 'images/1.png' },
  { icon: '🟢', name: 'Node.js', desc: 'Async', img: 'images/2.png' },
  { icon: '🦀', name: 'Rust', desc: 'Lifetimes', img: 'images/3.png' },
  { icon: '🐹', name: 'Go', desc: 'Receivers', img: 'images/4.png' },
  { icon: '🐍', name: 'Python', desc: 'Type hints', img: 'images/5.png' },
  { icon: '💚', name: 'Vue.js', desc: 'Composables', img: 'images/6.png' },
  { icon: '📘', name: 'TypeScript', desc: 'Interfaces', img: 'images/7.png' },
  { icon: '🎨', name: 'CSS', desc: 'Styled', img: 'images/8.png' },
  { icon: '🐘', name: 'PHP', desc: 'Backend, Laravel', img: 'images/9.png' },
  { icon: '🌐', name: 'HTML', desc: 'Semantic Markup', img: 'images/10.png' },
];

const techGrid = document.getElementById('techGrid');
const modal = document.getElementById('imageModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const closeModalBtn = document.getElementById('closeModalBtn');

function openModal(techName, imagePath) {
  modalTitle.textContent = `${techName} - Code Example`;
  modalImage.src = imagePath;
  modalImage.alt = `${techName} code preview`;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  modalImage.src = '';
}

techStack.forEach(tech => {
  const card = document.createElement('div');
  card.className = 'tech-card';
  card.innerHTML = `<div class="tech-icon">${tech.icon}</div><h4>${tech.name}</h4><p>${tech.desc}</p>`;
  card.addEventListener('click', () => openModal(tech.name, tech.img));
  techGrid.appendChild(card);
});

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
});

// Features
const features = [
  {
    icon: '🔥',
    title: 'Warm amber focus',
    desc: 'Accent color #C88A3A reduces eye strain during long coding sessions.',
  },
  {
    icon: '⚛️',
    title: 'Framework tokens',
    desc: 'Supports React Hooks, Vue Composables, Rust Macros.',
  },
  {
    icon: '🎨',
    title: 'Semantic colors',
    desc: 'Variables, parameters, and classes each with distinct hues.',
  },
  {
    icon: '🖥️',
    title: 'Complete UI theming',
    desc: 'Activity bar, terminal, and minimap — every corner polished to perfection.',
  },
];
const featuresGrid = document.getElementById('featuresGrid');
features.forEach(f => {
  const card = document.createElement('div');
  card.className = 'feature-card';
  card.innerHTML = `<div class="feature-icon">${f.icon}</div><h3>${f.title}</h3><p>${f.desc}</p>`;
  featuresGrid.appendChild(card);
});

// Testimonials with Intersection Observer for animation
const testimonials = [
  {
    name: 'Alex Morgan',
    role: 'Senior Frontend Engineer',
    stars: 5,
    text: 'DevFoundry Ember is by far the most comfortable dark theme I’ve ever used. The amber accents are just perfect for long coding sessions.',
    nameColor: '#C88A3A',
    roleColor: '#92897D',
  },
  {
    name: 'Sofia Chen',
    role: 'Full Stack Developer',
    stars: 5,
    text: 'At last, a theme built for modern frameworks! The Rust lifetime highlighting alone makes development feel effortless.',
    nameColor: '#C88A3A',
    roleColor: '#92897D',
  },
  {
    name: 'Marcus Wright',
    role: 'Open Source Contributor',
    stars: 5,
    text: 'Stunning contrast and gentle on the eyes, even after 10+ hours of coding. Absolutely recommend it!',
    nameColor: '#C88A3A',
    roleColor: '#92897D',
  },
  {
    name: 'Elena Petrova',
    role: 'Frontend Architect',
    stars: 5,
    text: 'DevFoundry Ember transforms long coding sessions into a visually pleasant experience. Every semantic color feels thoughtfully crafted.',
    nameColor: '#C88A3A',
    roleColor: '#92897D',
  },
  {
    name: 'Liam O’Connor',
    role: 'Full Stack Engineer',
    stars: 5,
    text: 'Finally, a dark theme that balances style with readability. The framework-specific highlights make navigating complex code effortless.',
    nameColor: '#C88A3A',
    roleColor: '#92897D',
  },
];

const slider = document.getElementById('testimonialSlider');
testimonials.forEach((t, index) => {
  const stars = '★'.repeat(t.stars) + '☆'.repeat(5 - t.stars);
  const card = document.createElement('div');
  card.className = 'testimonial-card';
  card.innerHTML = `
    <div class="testimonial-avatar">${t.name.charAt(0)}</div>
    <div class="testimonial-stars">${stars}</div>
    <div class="testimonial-text">"${t.text}"</div>
    <div class="testimonial-name" style="color: ${t.nameColor}">${t.name}</div>
    <div class="testimonial-role" style="color: ${t.roleColor}">${t.role}</div>
  `;
  card.style.opacity = 0;
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  slider.appendChild(card);
});

// Intersection Observer for testimonials
const testimonialObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        testimonialObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

document
  .querySelectorAll('.testimonial-card')
  .forEach(card => testimonialObserver.observe(card));

// Slider navigation
let currentSlide = 0;
function updateSlider() {
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  document
    .querySelectorAll('.dot')
    .forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}

function createDots() {
  const dotsContainer = document.getElementById('sliderDots');
  testimonials.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentSlide = i;
      updateSlider();
    });
    dotsContainer.appendChild(dot);
  });
}
createDots();

document.getElementById('prevBtn').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
  updateSlider();
});
document.getElementById('nextBtn').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % testimonials.length;
  updateSlider();
});

// Intersection Observer for other elements
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.2 },
);

document
  .querySelectorAll(
    '.code-card, .feature-card, .tech-card, .palette, .cta-section',
  )
  .forEach(el => observer.observe(el));

// Burger menu
const burger = document.getElementById('burgerBtn');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Navbar scroll
window.addEventListener('scroll', () =>
  document
    .getElementById('navbar')
    .classList.toggle('scrolled', window.scrollY > 50),
);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
