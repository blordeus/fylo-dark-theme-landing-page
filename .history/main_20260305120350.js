// Mobile Menu Toggle
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileOverlay = document.getElementById("mobileOverlay");

// Fix: match your markup (.nav-links-mobile)
const mobileNavLinks = document.querySelectorAll(".mobile-menu .nav-links-mobile a");

function isMenuOpen() {
  return mobileMenu.classList.contains("active");
}

function openMobileMenu() {
  hamburger.classList.add("active");
  mobileMenu.classList.add("active");
  mobileOverlay.classList.add("active");
  document.body.style.overflow = "hidden";

  // Accessibility state
  hamburger.setAttribute("aria-expanded", "true");
  hamburger.setAttribute("aria-label", "Close menu");
  
}

function closeMobileMenu() {
  if (!hamburger || !mobileMenu || !mobileOverlay) return;

  hamburger.classList.remove("active");
  mobileMenu.classList.remove("active");
  mobileOverlay.classList.remove("active");
  document.body.style.overflow = "auto";

  hamburger.setAttribute("aria-expanded", "false");
  hamburger.setAttribute("aria-label", "Open menu");
}

function toggleMobileMenu() {
  if (!hamburger || !mobileMenu || !mobileOverlay) return;
  if (isMenuOpen()) closeMobileMenu();
  else openMobileMenu();
}

hamburger.addEventListener("click", toggleMobileMenu);
mobileOverlay.addEventListener("click", closeMobileMenu);

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// Close mobile menu on Escape key (only if open)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isMenuOpen()) closeMobileMenu();
});

// Form Validation
const ctaForm = document.getElementById("ctaForm");
const emailInput = document.getElementById("emailInput");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");
const submitBtn = document.getElementById("submitBtn");

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(message) {
  emailInput.classList.add("error");
  emailInput.classList.remove("success");

  errorMessage.textContent = message;
  errorMessage.classList.add("show");

  successMessage.classList.remove("show");
}

function showSuccess(message) {
  emailInput.classList.add("success");
  emailInput.classList.remove("error");

  successMessage.textContent = message;
  successMessage.classList.add("show");

  errorMessage.classList.remove("show");
}

function clearMessages() {
  emailInput.classList.remove("error", "success");
  errorMessage.classList.remove("show");
  successMessage.classList.remove("show");
}

// Real-time validation (optional success message: keep or remove if you prefer quieter UX)
emailInput.addEventListener("input", () => {
  const email = emailInput.value.trim();
  if (email === "") {
    clearMessages();
  } else if (!validateEmail(email)) {
    showError("Please enter a valid email address");
  } else {
    clearMessages(); //valid email, no message needed until submission
  }
});

// Form submission
ctaForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (email === "") {
    showError("Email address is required");
    emailInput.focus();
    return;
  }

  if (!validateEmail(email)) {
    showError("Please enter a valid email address");
    emailInput.focus();
    return;
  }

  submitBtn.textContent = "Submitting...";
  submitBtn.disabled = true;

  setTimeout(() => {
    showSuccess("Thank you! We'll be in touch soon.");
    emailInput.value = "";
    submitBtn.textContent = "Get Started For Free";
    submitBtn.disabled = false;

    setTimeout(clearMessages, 3000);
  }, 1500);
});

// Clear validation on focus when empty
emailInput.addEventListener("focus", () => {
  if (emailInput.value.trim() === "") clearMessages();
});