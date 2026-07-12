// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  
  // 0. INTERACTIVE PRELOADER (ENGINE START BUTTON & AUDIO)
  const preloader = document.getElementById("preloader");
  const startBtn = document.getElementById("start-btn");
  const startContainer = document.getElementById("start-engine-container");
  const loaderContent = document.getElementById("loader-active-content");

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      // 1. Play Exhaust Sound
      const audioUrl = "https://www.orangefreesounds.com/wp-content/uploads/2017/08/Car-exhaust-sound.mp3";
      const engineSound = new Audio(audioUrl);
      engineSound.volume = 0.8; // Set volume to 80%
      engineSound.play().catch(error => {
        console.log("Audio play blocked by browser:", error);
      });

      // 2. Hide button container, show loading animation
      startContainer.classList.add("hidden");
      loaderContent.classList.remove("hidden");

      // 3. Keep loading for 4.5 seconds (4500ms), then fade out
      setTimeout(() => {
        if (preloader) {
          preloader.classList.add("fade-out");
        }
      }, 4500);
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

      showToast(`BMW Theme switched to ${color.toUpperCase()}! 🎨`);
    });
  });

  // 3. DETAILED SPECS MODAL POPUP
  const cards = document.querySelectorAll(".card");
  const specsModal = document.getElementById("specs-modal");
  const closeModalBtn = document.querySelector(".close-modal-btn");
  const modalOverlay = document.querySelector(".modal-overlay");

  // Modal elements to update
  const modalImg = document.getElementById("modal-img");
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
      const img = card.getAttribute("data-img");
      const desc = card.getAttribute("data-desc");

      // Update modal contents
      modalImg.src = img;
      modalImg.alt = model;
      modalTitle.textContent = model;
      modalDesc.textContent = desc;
      modalHp.textContent = hp;
      modalTime.textContent = time;
      modalSpeed.textContent = speed;
      modalPrice.textContent = price;

      // Open Modal
      specsModal.classList.add("open");
      document.body.style.overflow = "hidden"; // Prevent background scroll
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
    showToast(`🏁 Success! Test Drive booked for ${model}. Our representative will contact you in Shimla soon!`);

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