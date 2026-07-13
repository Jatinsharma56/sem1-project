// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  
  // 0. INTERACTIVE PRELOADER (ENGINE START BUTTON & AUDIO)
  const preloader = document.getElementById("preloader");
  const startBtn = document.getElementById("start-btn");
  const startContainer = document.getElementById("start-engine-container");
  const loaderContent = document.getElementById("loader-active-content");

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      // 1. Play Exhaust Sound (Aggressive sports car start & rev)
      const audioUrl = "https://orangefreesounds.com/wp-content/uploads/2025/08/Car-engine-start-and-acceleration-sound-effect.mp3";
      const engineSound = new Audio(audioUrl);
      engineSound.volume = 0.95; // Boost volume to 95% for maximum impact
      engineSound.play().catch(error => {
        console.log("Audio play blocked by browser:", error);
      });

      // 2. Hide button container, show loading animation
      startContainer.classList.add("hidden");
      loaderContent.classList.remove("hidden");
      
      // Trigger F1 Shift Lights animation
      const shiftLights = document.querySelector(".shift-lights");
      if (shiftLights) shiftLights.classList.add("revving");

      // 2.5 Animate digital speed number
      const speedNum = document.querySelector(".speed-number");
      if (speedNum) {
        let startTime = null;
        const duration = 5500;
        const animateSpeed = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = (timestamp - startTime) / duration;
          if (progress < 1) {
            const speed = Math.floor(Math.pow(progress, 1.5) * 340);
            speedNum.textContent = speed;
            requestAnimationFrame(animateSpeed);
          } else {
            speedNum.textContent = 340;
          }
        };
        requestAnimationFrame(animateSpeed);
      }

      // 3. Keep loading for 5.5 seconds (5500ms), then fade out
      setTimeout(() => {
        if (preloader) {
          preloader.classList.add("fade-out");
        }
      }, 5500);
    });
  }
  
  // 1. STICKY NAVBAR GLASS EFFECT ON SCROLL
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 2. DYNAMIC THEMING / COLOR CUSTOMIZER
  const colorDots = document.querySelectorAll(".color-dot");
  const body = document.body;

  colorDots.forEach(dot => {
    dot.addEventListener("click", () => {
      // Remove active class from all dots
      colorDots.forEach(d => d.classList.remove("active"));
      // Add active to current
      dot.classList.add("active");
      
      // Get selected color
      const color = dot.getAttribute("data-color");
      
      // Reset body class list for theme
      body.className = "";
      body.classList.add(`theme-${color}`);

      showToast(`Theme switched to ${color.toUpperCase()}! 🎨`);
    });
  });

  // 2.5 3D TILT EFFECT ON CARDS
  const cards = document.querySelectorAll(".card");
  
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation (max 15 degrees)
      const rotateX = ((y - centerY) / centerY) * -15; 
      const rotateY = ((x - centerX) / centerX) * 15;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      card.style.transition = 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)';
    });
    
    card.addEventListener("mouseenter", () => {
      card.style.transition = 'none'; // Remove transition for smooth cursor tracking
    });
  });

  // 3. DETAILED SPECS MODAL POPUP
  const specsModal = document.getElementById("specs-modal");
  const closeModalBtn = document.querySelector(".close-modal-btn");
  const modalOverlay = document.querySelector(".modal-overlay");

  // Modal elements to update
  const modalImg1 = document.getElementById("modal-img-1");
  const modalImg2 = document.getElementById("modal-img-2");
  const modalImg3 = document.getElementById("modal-img-3");
  const viewBtns = document.querySelectorAll(".view-btn-ctrl");
  
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalHp = document.getElementById("modal-hp");
  const modalTime = document.getElementById("modal-time");
  const modalSpeed = document.getElementById("modal-speed");
  const modalPrice = document.getElementById("modal-price");
  const modalBookBtn = document.getElementById("modal-book-btn");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      // Extract data attributes
      const model = card.getAttribute("data-model");
      const hp = card.getAttribute("data-hp");
      const time = card.getAttribute("data-time");
      const speed = card.getAttribute("data-speed");
      const price = card.getAttribute("data-price");
      const img1 = card.getAttribute("data-img");
      const img2 = card.getAttribute("data-img-rear");
      const img3 = card.getAttribute("data-img-int");
      const desc = card.getAttribute("data-desc");

      // Update modal contents
      modalImg1.src = img1;
      modalImg2.src = img2;
      modalImg3.src = img3;
      
      modalTitle.textContent = model;
      modalDesc.textContent = desc;
      modalHp.textContent = hp;
      modalTime.textContent = time;
      modalSpeed.textContent = speed;
      modalPrice.textContent = price;

      // Reset gallery state to first image
      document.querySelectorAll(".modal-slide").forEach(s => s.classList.remove("active"));
      viewBtns.forEach(b => b.classList.remove("active"));
      modalImg1.classList.add("active");
      viewBtns[0].classList.add("active");

      // Open Modal
      specsModal.classList.add("open");
      document.body.style.overflow = "hidden"; // Prevent background scroll
    });
  });

  // Slider Button Logic
  viewBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".modal-slide").forEach(s => s.classList.remove("active"));
      viewBtns.forEach(b => b.classList.remove("active"));
      
      btn.classList.add("active");
      document.getElementById(`modal-img-${index + 1}`).classList.add("active");
    });
  });

  // Close Modal functions
  const closeModal = () => {
    specsModal.classList.remove("open");
    document.body.style.overflow = "auto";
  };

  closeModalBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);

  // Modal Action Button (Auto fills form and scrolls down)
  modalBookBtn.addEventListener("click", () => {
    const selectedModel = modalTitle.textContent;
    const modelDropdown = document.getElementById("form-model");
    
    // Fill option
    modelDropdown.value = selectedModel;
    
    closeModal();
    
    // Smooth scroll to form
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    
    // Focus on name input
    setTimeout(() => {
      document.getElementById("form-name").focus();
    }, 800);
  });

  // 4. TEST DRIVE BOOKING FORM WITH TOAST NOTIFICATION
  const bookingForm = document.getElementById("booking-form");
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop page reload

    const name = document.getElementById("form-name").value;
    const email = document.getElementById("form-email").value;
    const model = document.getElementById("form-model").value;

    // Show booking toast success
    showToast(`🏁 Success! Inquiry sent for ${model}. Our representative will contact you soon!`);

    // Reset Form
    bookingForm.reset();
  });

  // 5. HELPER FUNCTION TO SHOW TOAST NOTIFICATION
  function showToast(message) {
    const toastContainer = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
    
    toastContainer.appendChild(toast);

    // Fade out after 4 seconds
    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 4000);
  }
});