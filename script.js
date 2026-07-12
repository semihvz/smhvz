const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme) {
  root.dataset.theme = savedTheme;
} else if (prefersDark) {
  root.dataset.theme = "dark";
}

document.querySelector(".theme-toggle").addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
});

document.querySelector("#year").textContent = new Date().getFullYear();
