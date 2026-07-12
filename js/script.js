// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  
  // 0. HIDE PRELOADER ON LOAD
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    fadeOutPreloader();
  });

  // Fallback if load event already fired or delayed
  setTimeout(() => {
    fadeOutPreloader();
  }, 2200);

  function fadeOutPreloader() {
    if (preloader && !preloader.classList.contains("fade-out")) {
      preloader.classList.add("fade-out");
    }
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