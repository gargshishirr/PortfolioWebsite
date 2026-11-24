// Applies the visitor's saved light or dark choice before the page paints, so it never flashes the other
// theme. Without a saved choice, the device's setting applies (styles/global.css).
(function () {
  try {
    var theme = localStorage.getItem("theme");
    if (theme === "light" || theme === "dark") document.documentElement.setAttribute("data-theme", theme);
  } catch (error) {
    // Storage can be blocked. The device's setting applies then.
  }
})();
