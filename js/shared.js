/**
 * Shared functionality for all pages
 */
document.addEventListener("DOMContentLoaded", function () {
  // Initialize theme
  initTheme();

  // Add page transition effect
  document.body.classList.add("opacity-0");
  setTimeout(() => {
    document.body.classList.add(
      "transition-opacity",
      "duration-300",
      "ease-in-out"
    );
    document.body.classList.remove("opacity-0");
  }, 50);
});

/**
 * Initialize theme functionality
 */
function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const themeText = document.getElementById("themeText");

  // Check for saved theme preference
  const currentTheme = localStorage.getItem("theme") || "light";
  setTheme(currentTheme);

  // Theme toggle button
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-theme");
    const newTheme = isDark ? "light" : "dark";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });

  function setTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      themeIcon.className = "ri-moon-line mr-1.5";
      themeText.textContent = "Dark Mode";
    } else {
      document.body.classList.remove("dark-theme");
      themeIcon.className = "ri-sun-line mr-1.5";
      themeText.textContent = "Light Mode";
    }
  }
}

/**
 * Show notification
 *
 * @param {string} message - Message to display
 * @param {string} type - Type of notification (success, error, info)
 */
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  if (!notification) return;

  // Set notification styling based on type
  notification.className = "mb-6 flex items-center p-4 rounded-md";

  if (type === "success") {
    notification.classList.add("bg-green-50", "border-l-4", "border-green-500");
    notification.innerHTML = `<i class="ri-checkbox-circle-line text-green-500 mr-3 text-lg"></i>${message}`;
  } else if (type === "error") {
    notification.classList.add("bg-red-50", "border-l-4", "border-red-500");
    notification.innerHTML = `<i class="ri-error-warning-line text-red-500 mr-3 text-lg"></i>${message}`;
  } else if (type === "info") {
    notification.classList.add("bg-blue-50", "border-l-4", "border-blue-500");
    notification.innerHTML = `<i class="ri-information-line text-blue-500 mr-3 text-lg"></i>${message}`;
  }

  notification.classList.remove("hidden");

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.add("hidden");
  }, 3000);
}
