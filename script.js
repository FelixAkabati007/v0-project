// Tabs functionality
document.querySelectorAll(".tab-header").forEach((button) => {
  button.addEventListener("click", () => {
    const tabId = button.dataset.tab;
    // Hide all tab contents
    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active");
    });
    // Show selected tab content
    document.getElementById(tabId).classList.add("active");

    // Update tab headers
    document.querySelectorAll(".tab-header").forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
  });
});

// Modal handling
const csspsModal = document.querySelector(".cssps-modal");
document.querySelector(".cssps-btn").addEventListener("click", () => {
  csspsModal.style.display = "block";
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === csspsModal) {
    csspsModal.style.display = "none";
  }
});

// Mobile menu toggle
document.querySelector(".mobile-menu-btn").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("active");
});
