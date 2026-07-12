const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme) {
  root.dataset.theme = savedTheme;
} else if (prefersDark) {
  root.dataset.theme = "dark";
}

const themeToggle = document.querySelector(".theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  });
}

const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const articleGrid = document.querySelector("#article-grid");
const cards = [...document.querySelectorAll(".article-card")];
const filters = [...document.querySelectorAll(".filter")];
const search = document.querySelector("#search");
const emptyState = document.querySelector(".empty-state");
let activeFilter = "all";

function normalize(value) {
  return value.toLocaleLowerCase("tr-TR").trim();
}

function applyArticleFilters() {
  if (!articleGrid) {
    return;
  }

  const query = normalize(search?.value || "");
  let visibleCount = 0;

  cards.forEach((card) => {
    const category = card.dataset.category || "";
    const text = normalize(card.textContent || "");
    const categoryMatches = activeFilter === "all" || category === activeFilter;
    const queryMatches = !query || text.includes(query);
    const visible = categoryMatches && queryMatches;

    card.hidden = !visible;
    if (visible) {
      visibleCount += 1;
    }
  });

  if (emptyState) {
    emptyState.hidden = visibleCount > 0;
  }
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter || "all";
    filters.forEach((item) => item.classList.toggle("active", item === button));
    applyArticleFilters();
  });
});

if (search) {
  search.addEventListener("input", applyArticleFilters);
  search.form?.addEventListener("reset", () => {
    window.setTimeout(applyArticleFilters, 0);
  });
}
