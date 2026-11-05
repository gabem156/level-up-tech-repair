(() => {
  const config = window.LEVEL_UP_CONFIG || {};
  const bookingUrl = config.bookingUrl;

  document.querySelectorAll("[data-booking-link]").forEach((link) => {
    if (!bookingUrl) return;
    link.href = bookingUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  const businessStatus = document.querySelector("#business-status");
  if (businessStatus) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const hoursByDay = [
      { open: 11 * 60, close: 19 * 60 },
      { open: 15 * 60, close: 20 * 60 },
      { open: 15 * 60, close: 20 * 60 },
      { open: 15 * 60, close: 20 * 60 },
      { open: 15 * 60, close: 20 * 60 },
      { open: 15 * 60, close: 20 * 60 },
      { open: 11 * 60, close: 19 * 60 },
    ];
    const timeLabel = (minutes) => {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
    };
    const refreshBusinessStatus = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).formatToParts(new Date());
      const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
      const today = days.indexOf(values.weekday);
      const nowMinutes = Number(values.hour) * 60 + Number(values.minute);
      const todayHours = hoursByDay[today];
      const todayLabel = document.querySelector("[data-today-hours]");
      if (todayLabel) todayLabel.textContent = `${days[today]} · ${timeLabel(todayHours.open)}–${timeLabel(todayHours.close)}`;

      const statusText = businessStatus.querySelector("[data-business-status]");
      if (nowMinutes >= todayHours.open && nowMinutes < todayHours.close) {
        businessStatus.classList.add("is-open");
        businessStatus.classList.remove("is-closed");
        statusText.textContent = `Open now · closes at ${timeLabel(todayHours.close)}`;
        return;
      }

      businessStatus.classList.add("is-closed");
      businessStatus.classList.remove("is-open");
      let offset = nowMinutes < todayHours.open ? 0 : 1;
      let nextDay = (today + offset) % 7;
      while (!hoursByDay[nextDay]) {
        offset += 1;
        nextDay = (today + offset) % 7;
      }
      const when = offset === 0 ? "today" : days[nextDay];
      statusText.textContent = `Closed now · opens ${when} at ${timeLabel(hoursByDay[nextDay].open)}`;
    };
    refreshBusinessStatus();
    window.setInterval(refreshBusinessStatus, 60_000);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) refreshBusinessStatus();
    });
  }

  const phone = String(config.phone || "").trim();
  const phoneDigits = phone.replace(/\D/g, "");
  const phoneActions = document.querySelector("[data-phone-actions]");
  if (phoneActions && (phoneDigits.length === 10 || (phoneDigits.length === 11 && phoneDigits.startsWith("1")))) {
    const internationalNumber = `+${phoneDigits.length === 10 ? "1" : ""}${phoneDigits}`;
    document.querySelector("[data-phone-call]").href = `tel:${internationalNumber}`;
    document.querySelector("[data-phone-text]").href = `sms:${internationalNumber}`;
    phoneActions.hidden = false;
  }

  const contact = document.querySelector("[data-contact-link]");
  if (contact && config.contactUrl) {
    contact.href = config.contactUrl.includes("@") && !config.contactUrl.includes(":")
      ? `mailto:${config.contactUrl}`
      : config.contactUrl;
  }
  document.querySelectorAll("[data-facebook-link]").forEach((link) => {
    if (config.facebookUrl) link.href = config.facebookUrl;
  });
  document.querySelectorAll("[data-instagram-link]").forEach((link) => {
    if (config.instagramUrl) link.href = config.instagramUrl;
  });
  document.querySelectorAll("[data-reviews-link]").forEach((link) => {
    if (!config.googleBusinessUrl) return;
    link.href = config.googleBusinessUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  const repairDropdown = document.querySelector(".nav-dropdown");
  const repairDropdownButton = document.querySelector(".nav-dropdown-toggle");
  const setRepairDropdown = (open) => {
    if (!repairDropdown || !repairDropdownButton) return;
    repairDropdown.classList.toggle("open", open);
    repairDropdownButton.setAttribute("aria-expanded", String(open));
  };
  if (repairDropdownButton) {
    repairDropdownButton.addEventListener("click", () => {
      setRepairDropdown(repairDropdownButton.getAttribute("aria-expanded") !== "true");
    });
  }
  const closeMenu = () => {
    if (!nav || !menuButton) return;
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    setRepairDropdown(false);
  };
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (repairDropdownButton?.getAttribute("aria-expanded") === "true") {
        setRepairDropdown(false);
        repairDropdownButton.focus();
        return;
      }
      if (!nav.classList.contains("open")) return;
      closeMenu();
      menuButton.focus();
    });
    document.addEventListener("click", (event) => {
      if (repairDropdown && !repairDropdown.contains(event.target)) setRepairDropdown(false);
      if (nav.classList.contains("open") && !nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
