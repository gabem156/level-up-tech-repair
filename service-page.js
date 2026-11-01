(() => {
  const config = window.LEVEL_UP_CONFIG || {};
  const bookingUrl = config.bookingUrl;
  document.querySelectorAll("[data-booking-link]").forEach((link) => {
    if (!bookingUrl) return;
    link.href = bookingUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const accepted = window.confirm("Before continuing to Square: the $25 booking deposit is due once per appointment, is applied toward the final repair cost, and is non-refundable if you cancel. This website does not collect payment. Square controls checkout; confirm the payment screen shows one deposit for your appointment before paying.");
      if (accepted) window.open(bookingUrl, "_blank", "noopener,noreferrer");
    });
  });
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  const closeMenu = () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  };
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav.addEventListener("click", (event) => { if (event.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") { closeMenu(); menuButton.focus(); } });
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
