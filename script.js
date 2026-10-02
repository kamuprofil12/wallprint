const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
const quoteForm = document.querySelector("#quote-form");
const formStatus = document.querySelector("#form-status");
const contactEmail = "";

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Menü megnyitása");
  mainNav.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Menü megnyitása" : "Menü bezárása");
  mainNav.classList.toggle("is-open", !isOpen);
});

mainNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactEmail) {
    formStatus.dataset.state = "error";
    formStatus.textContent = "Az ajánlatkérő e-mail-cím még nincs beállítva.";
    return;
  }

  const formData = new FormData(quoteForm);
  const subject = encodeURIComponent("Falnyomtatási ajánlatkérés");
  const body = encodeURIComponent(
    `Név: ${formData.get("name")}\nE-mail: ${formData.get("email")}\n\nElképzelés:\n${formData.get("message")}`,
  );
  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
});
