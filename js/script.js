/* ============================================================
   BUGATTI.COM REPLICA — JAVASCRIPT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. PRELOADER
  // ============================================================
  const preloader    = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloader-bar');
  let progress = 0;

  const loadInterval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      setTimeout(() => {
        preloader.classList.add('done');
        document.body.style.overflow = 'auto';
        initReveal();
        initCounters();
      }, 500);
    }
    preloaderBar.style.width = progress + '%';
  }, 120);

  document.body.style.overflow = 'hidden';

  // ============================================================
  // 2. NAVBAR SCROLL EFFECT
  // ============================================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ============================================================
  // 3. FULLSCREEN MENU
  // ============================================================
  const menuToggle    = document.getElementById('menu-toggle');
  const fullMenu      = document.getElementById('fullscreen-menu');
  const menuClose     = document.getElementById('menu-close');
  const menuLinks     = document.querySelectorAll('[data-close]');

  const openMenu  = () => fullMenu.classList.add('open');
  const closeMenu = () => fullMenu.classList.remove('open');

  menuToggle.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  menuLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  // ============================================================
  // 4. 3D TILT HERO CAR
  // ============================================================
  const heroCarWrap = document.getElementById('hero-car-tilt');
  if (heroCarWrap && window.VanillaTilt) {
    VanillaTilt.init(heroCarWrap, {
      max:          12,
      speed:        400,
      glare:        true,
      'max-glare':  0.2,
      perspective:  1200,
      scale:        1.03,
      gyroscope:    true,
    });
  }

  // ============================================================
  // 5. SCROLL REVEAL (Intersection Observer)
  // ============================================================
  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-side');
    const observer  = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  // ============================================================
  // 6. ANIMATED STAT COUNTERS
  // ============================================================
  function initCounters() {
    const counters = document.querySelectorAll('.stat-n[data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target);
    const duration = 2200;
    const step     = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString();
    }, step);
  }

  // ============================================================
  // 7. MODEL DATA
  // ============================================================
  const models = {
    chiron: {
      tag:   'HYPER SPORTS CAR',
      name:  'CHIRON',
      img:   'images/bg_chiron.png',
      desc:  'The most powerful, fastest and most exclusive production super sports car in BUGATTI\'s history. Its 8.0-litre quad-turbocharged W16 engine produces 1,500 PS and 1,600 Nm of torque.',
      specs: [
        { val: '1,500 HP', label: 'Power' },
        { val: '420 KM/H', label: 'Top Speed' },
        { val: '2.4s',     label: '0–100 KM/H' },
        { val: '₹28 CR',   label: 'Est. Price' },
      ]
    },
    tourbillon: {
      tag:   'THE NEXT ERA',
      name:  'TOURBILLON',
      img:   'images/bg_tourbillon.png',
      desc:  'The successor to the Chiron era. A naturally aspirated V16 hybrid with three electric motors. Purely mechanical instruments at its heart. The pinnacle of BUGATTI engineering.',
      specs: [
        { val: '1,800 HP', label: 'Power' },
        { val: '445 KM/H', label: 'Top Speed' },
        { val: '2.0s',     label: '0–100 KM/H' },
        { val: '₹42 CR',   label: 'Est. Price' },
      ]
    },
    mistral: {
      tag:   'W16 ROADSTER',
      name:  'W16 MISTRAL',
      img:   'images/bg_mistral.png',
      desc:  'The world\'s fastest roadster. 99 examples only. The final chapter of the legendary W16 engine, open to the sky, unbridled.',
      specs: [
        { val: '1,600 HP', label: 'Power' },
        { val: '420 KM/H', label: 'Top Speed' },
        { val: '2.4s',     label: '0–100 KM/H' },
        { val: '₹55 CR',   label: 'Est. Price' },
      ]
    },
    bolide: {
      tag:   'TRACK EXTREME',
      name:  'BOLIDE',
      img:   'images/bg_bolide.png',
      desc:  'The most extreme BUGATTI ever conceived. A 1,850 HP track beast stripped of all excess. Born from racing DNA. Built to shatter every limit.',
      specs: [
        { val: '1,850 HP',  label: 'Power' },
        { val: '500+ KM/H', label: 'Calc. Top Speed' },
        { val: '2.1s',      label: '0–100 KM/H' },
        { val: '₹63 CR',    label: 'Est. Price' },
      ]
    }
  };

  // ============================================================
  // 8. MODEL MODAL
  // ============================================================
  const modalWrap      = document.getElementById('model-modal');
  const modalClose     = document.getElementById('modal-close');
  const modalBackdrop  = modalWrap.querySelector('.modal-backdrop');
  const modalCarImg    = document.getElementById('modal-car-img');
  const modalCarTag    = document.getElementById('modal-car-tag');
  const modalCarName   = document.getElementById('modal-car-name');
  const modalSpecsRow  = document.getElementById('modal-specs-row');
  const modalCarDesc   = document.getElementById('modal-car-desc');
  const modalEnquire   = document.getElementById('modal-enquire-btn');

  function openModal(modelKey) {
    const m = models[modelKey];
    if (!m) return;

    modalCarImg.src    = m.img;
    modalCarImg.alt    = m.name;
    modalCarTag.textContent  = m.tag;
    modalCarName.textContent = m.name;
    modalCarDesc.textContent = m.desc;

    modalSpecsRow.innerHTML = m.specs.map(s => `
      <div class="modal-spec">
        <span>${s.val}</span>
        <small>${s.label}</small>
      </div>
    `).join('');

    modalWrap.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Link enquire button to contact form
    modalEnquire.onclick = () => {
      closeModal();
      const formModel = document.getElementById('form-model');
      if (formModel) formModel.value = m.name;
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => document.getElementById('form-fname').focus(), 800);
    };
  }

  function closeModal() {
    modalWrap.classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Attach CONFIGURE buttons
  document.querySelectorAll('.model-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.model));
  });

  // ============================================================
  // 9. CONTACT FORM
  // ============================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fname = document.getElementById('form-fname').value.trim();
      const model = document.getElementById('form-model').value;
      if (!fname || !model) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }
      showToast(`Enquiry sent for ${model}. Our team will contact you soon.`);
      contactForm.reset();
    });
  }

  // ============================================================
  // 10. TOAST NOTIFICATIONS
  // ============================================================
  function showToast(msg, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast     = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fa-solid ${type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check'}"></i>
      <span>${msg}</span>
    `;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('show'));
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 500);
    }, 4500);
  }

  // ============================================================
  // 11. SMOOTH PARALLAX ON MODEL BG
  // ============================================================
  const modelBgs = document.querySelectorAll('.model-bg');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    modelBgs.forEach(bg => {
      const parent = bg.parentElement;
      const rect   = parent.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const offset = (rect.top / window.innerHeight) * 30;
        bg.style.transform = `scale(1.05) translateY(${offset}px)`;
      }
    });
  }, { passive: true });

  // ============================================================
  // 12. RAIN CANVAS EFFECT
  // ============================================================
  const canvas = document.getElementById('rain-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let isHoveringRain = false;

    function resizeCanvas() {
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function createParticles() {
      particles = [];
      const numParticles = 100;
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          length: Math.random() * 20 + 10,
          speed: Math.random() * 10 + 10,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    }

    function drawRain() {
      ctx.clearRect(0, 0, width, height);
      // If hovering, make it storm faster/denser!
      const speedMult = isHoveringRain ? 2.5 : 1;
      const opacityMult = isHoveringRain ? 1.5 : 1;

      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      
      particles.forEach(p => {
        ctx.strokeStyle = `rgba(255,255,255,${p.opacity * opacityMult})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.length * 0.2, p.y + p.length * speedMult);
        ctx.stroke();

        p.y += p.speed * speedMult;
        p.x -= (p.speed * speedMult) * 0.2; // Angle

        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width + 50; // shift right to fall left
        }
      });
      requestAnimationFrame(drawRain);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    createParticles();
    drawRain();

    // Hover effect
    canvas.parentElement.addEventListener('mouseenter', () => isHoveringRain = true);
    canvas.parentElement.addEventListener('mouseleave', () => isHoveringRain = false);
  }

  // ============================================================
  // 13. SPOTLIGHT HOVER EFFECT
  // ============================================================
  const spotlightWrap = document.getElementById('spotlight-wrap');
  const spotlightOverlay = document.getElementById('spotlight-overlay');

  if (spotlightWrap && spotlightOverlay) {
    spotlightWrap.addEventListener('mousemove', (e) => {
      const rect = spotlightWrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const maskStr = `radial-gradient(circle 180px at ${x}px ${y}px, black 15%, transparent 80%)`;
      spotlightOverlay.style.webkitMaskImage = maskStr;
      spotlightOverlay.style.maskImage = maskStr;
    });
    
    // Reset to center on leave
    spotlightWrap.addEventListener('mouseleave', () => {
      const maskStr = `radial-gradient(circle 120px at 50% 50%, black 20%, transparent 100%)`;
      spotlightOverlay.style.webkitMaskImage = maskStr;
      spotlightOverlay.style.maskImage = maskStr;
    });
  }

  // ============================================================
  // 14. CUSTOM CURSOR
  // ============================================================
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Make cursor grow on hover over clickable elements
  const clickables = document.querySelectorAll('a, button, .hero-car-wrap, .spotlight-bg');
  clickables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });

});