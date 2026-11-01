(() => {
  const config = window.LEVEL_UP_CONFIG || {};
  const category = document.querySelector("#device-category");
  const manufacturer = document.querySelector("#manufacturer");
  const model = document.querySelector("#device-model");
  const modelSuggestions = document.querySelector("#model-suggestions");
  const repair = document.querySelector("#repair-type");
  const estimateTitle = document.querySelector("#estimate-title");
  const estimateCopy = document.querySelector("#estimate-copy");
  const estimatePrice = document.querySelector("#estimate-price");
  const estimateNote = document.querySelector("#estimate-note");
  const quoteLink = document.querySelector("#quote-link");
  const quoteServices = new Map();
  let currentRepair = null;

  const catalog = {
    gaming: {
      label: "Gaming Consoles",
      makers: ["PlayStation", "Xbox", "Nintendo"],
      models: {
        PlayStation: ["PlayStation 3", "PlayStation 3 Slim", "PlayStation 3 Super Slim", "PlayStation 4", "PlayStation 4 Slim", "PlayStation 4 Pro", "PlayStation 5", "PlayStation 5 Slim", "PlayStation 5 Pro"],
        Xbox: ["Xbox 360", "Xbox 360 S", "Xbox 360 E", "Xbox One", "Xbox One S", "Xbox One X", "Xbox Series S", "Xbox Series X"],
        Nintendo: ["Nintendo Switch", "Nintendo Switch Lite", "Nintendo Switch OLED", "Nintendo Switch 2"]
      }
    },
    iphone: { label: "iPhone", makers: ["Apple"], models: { Apple: [
      "iPhone 11", "iPhone 11 Pro", "iPhone 11 Pro Max",
      "iPhone 12 mini", "iPhone 12", "iPhone 12 Pro", "iPhone 12 Pro Max",
      "iPhone 13 mini", "iPhone 13", "iPhone 13 Pro", "iPhone 13 Pro Max",
      "iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max",
      "iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max",
      "iPhone 16", "iPhone 16 Plus", "iPhone 16 Pro", "iPhone 16 Pro Max",
      "iPhone 17e", "iPhone 17", "iPhone Air", "iPhone 17 Pro", "iPhone 17 Pro Max",
      "iPhone 18 Pro", "iPhone 18 Pro Max", "Other iPhone"
    ] } },
    samsung: { label: "Samsung Galaxy", makers: ["Samsung"], models: { Samsung: [
      "Galaxy S10", "Galaxy S10+", "Galaxy S10e", "Galaxy S10 5G",
      "Galaxy S20", "Galaxy S20+", "Galaxy S20 Ultra", "Galaxy S20 FE",
      "Galaxy S21", "Galaxy S21+", "Galaxy S21 Ultra", "Galaxy S21 FE",
      "Galaxy S22", "Galaxy S22+", "Galaxy S22 Ultra",
      "Galaxy S23", "Galaxy S23+", "Galaxy S23 Ultra", "Galaxy S23 FE",
      "Galaxy S24", "Galaxy S24+", "Galaxy S24 Ultra", "Galaxy S24 FE",
      "Galaxy S25", "Galaxy S25+", "Galaxy S25 Ultra", "Galaxy S25 Edge", "Galaxy S25 FE",
      "Galaxy S26", "Galaxy S26+", "Galaxy S26 Ultra", "Galaxy S26 FE",
      "Galaxy A10", "Galaxy A10e", "Galaxy A10s", "Galaxy A11", "Galaxy A12", "Galaxy A13", "Galaxy A14", "Galaxy A15", "Galaxy A16", "Galaxy A17",
      "Galaxy A20", "Galaxy A20e", "Galaxy A20s", "Galaxy A21", "Galaxy A21s", "Galaxy A22", "Galaxy A23", "Galaxy A24", "Galaxy A25", "Galaxy A26", "Galaxy A27",
      "Galaxy A30", "Galaxy A30s", "Galaxy A31", "Galaxy A32", "Galaxy A33", "Galaxy A34", "Galaxy A35", "Galaxy A36", "Galaxy A37",
      "Galaxy A40", "Galaxy A41", "Galaxy A42", "Galaxy A50", "Galaxy A50s", "Galaxy A51", "Galaxy A52", "Galaxy A53", "Galaxy A54", "Galaxy A55", "Galaxy A56", "Galaxy A57",
      "Galaxy A70", "Galaxy A70s", "Galaxy A71", "Galaxy A72", "Galaxy A73",
      "Galaxy Z Fold", "Galaxy Z Fold2", "Galaxy Z Fold3", "Galaxy Z Fold4", "Galaxy Z Fold5", "Galaxy Z Fold6", "Galaxy Z Fold7", "Galaxy Z Fold8",
      "Galaxy Z Flip", "Galaxy Z Flip 5G", "Galaxy Z Flip3", "Galaxy Z Flip4", "Galaxy Z Flip5", "Galaxy Z Flip6", "Galaxy Z Flip7", "Galaxy Z Flip8",
      "Other Galaxy"
    ] } },
    pixel: { label: "Google Pixel", makers: ["Google"], models: { Google: ["Pixel", "Pixel XL", "Pixel 2", "Pixel 2 XL", "Pixel 3", "Pixel 3 XL", "Pixel 3a", "Pixel 3a XL", "Pixel 4", "Pixel 4 XL", "Pixel 4a", "Pixel 4a 5G", "Pixel 5", "Pixel 5a", "Pixel 6", "Pixel 6 Pro", "Pixel 6a", "Pixel 7", "Pixel 7 Pro", "Pixel 7a", "Pixel 8", "Pixel 8 Pro", "Pixel 8a", "Pixel 9", "Pixel 9 Pro", "Pixel 9 Pro XL", "Pixel 9 Pro Fold", "Pixel 9a", "Pixel 10", "Pixel 10 Pro", "Pixel 10 Pro XL", "Pixel 10 Pro Fold", "Pixel 10a", "Pixel 11", "Pixel 11 Pro", "Pixel 11 Pro XL", "Pixel 11 Pro Fold", "Other Pixel"] } },
    motorola: { label: "Motorola", makers: ["Motorola"], models: { Motorola: ["Moto G", "Moto G Play", "Moto G Power", "Moto G Stylus", "Moto G Fast", "Moto G 5G", "Moto G (2020)", "Moto G Power (2020)", "Moto G Stylus (2020)", "Moto G Fast (2020)", "Moto G Power (2021)", "Moto G Stylus (2021)", "Moto G Play (2021)", "Moto G Pure", "Moto G Power (2022)", "Moto G Stylus 5G (2022)", "Moto G 5G (2022)", "Moto G Play (2023)", "Moto G Power 5G (2023)", "Moto G Stylus 5G (2023)", "Moto G 5G (2023)", "Moto G Play (2024)", "Moto G Power 5G (2024)", "Moto G Stylus 5G (2024)", "Moto G 5G (2024)", "Moto G Power 5G (2025)", "Moto G Stylus 5G (2025)", "Moto G (2026)", "Motorola Edge (2020)", "Motorola Edge+ (2020)", "Motorola Edge (2021)", "Motorola Edge (2022)", "Motorola Edge 30", "Motorola Edge 30 Pro", "Motorola Edge 30 Ultra", "Motorola Edge 40", "Motorola Edge 40 Pro", "Motorola Edge (2023)", "Motorola Edge+ (2023)", "Motorola Edge 50", "Motorola Edge 50 Pro", "Motorola Edge 50 Ultra", "Motorola Edge 50 Fusion", "Motorola Edge (2025)", "Motorola Edge 60", "Motorola Edge 60 Pro", "Motorola Edge 60 Fusion", "Motorola Edge 70", "Motorola Razr (2019)", "Motorola Razr 5G (2020)", "Motorola Razr (2022)", "Motorola Razr (2023)", "Motorola Razr+ (2023)", "Motorola Razr (2024)", "Motorola Razr+ (2024)", "Motorola Razr (2025)", "Motorola Razr+ (2025)", "Motorola Razr Ultra (2025)", "Motorola Razr (2026)", "Other Motorola"] } },
    ipad: { label: "iPad", makers: ["Apple"], models: { "Apple": ["iPad (5th generation)", "iPad (6th generation)", "iPad (7th generation)", "iPad (8th generation)", "iPad (9th generation)", "iPad (10th generation)", "iPad (A16)", "iPad mini 4", "iPad mini (5th generation)", "iPad mini (6th generation)", "iPad mini (A17 Pro)", "iPad mini (A20 Pro)", "iPad Air 2", "iPad Air (3rd generation)", "iPad Air (4th generation)", "iPad Air (5th generation)", "iPad Air 11-inch (M2)", "iPad Air 13-inch (M2)", "iPad Air 11-inch (M3)", "iPad Air 13-inch (M3)", "iPad Air 11-inch (M4)", "iPad Air 13-inch (M4)", "iPad Pro 9.7-inch", "iPad Pro 10.5-inch", "iPad Pro 11-inch (1st generation)", "iPad Pro 11-inch (2nd generation)", "iPad Pro 11-inch (3rd generation)", "iPad Pro 11-inch (4th generation)", "iPad Pro 11-inch (M4)", "iPad Pro 11-inch (M5)", "iPad Pro 12.9-inch (1st generation)", "iPad Pro 12.9-inch (2nd generation)", "iPad Pro 12.9-inch (3rd generation)", "iPad Pro 12.9-inch (4th generation)", "iPad Pro 12.9-inch (5th generation)", "iPad Pro 12.9-inch (6th generation)", "iPad Pro 13-inch (M4)", "iPad Pro 13-inch (M5)", "Other iPad"] } },
    tablet: { label: "Tablets", makers: ["Samsung Galaxy Tab", "Other Tablet"], models: { "Samsung Galaxy Tab": ["Galaxy Tab S", "Galaxy Tab S2", "Galaxy Tab S3", "Galaxy Tab S4", "Galaxy Tab S5e", "Galaxy Tab S6", "Galaxy Tab S6 Lite", "Galaxy Tab S7", "Galaxy Tab S7+", "Galaxy Tab S7 FE", "Galaxy Tab S8", "Galaxy Tab S8+", "Galaxy Tab S8 Ultra", "Galaxy Tab S9", "Galaxy Tab S9+", "Galaxy Tab S9 Ultra", "Galaxy Tab S9 FE", "Galaxy Tab S9 FE+", "Galaxy Tab S10+", "Galaxy Tab S10 Ultra", "Galaxy Tab S10 FE", "Galaxy Tab S10 FE+", "Galaxy Tab S10 Lite", "Galaxy Tab S11", "Galaxy Tab S11 Ultra", "Galaxy Tab S12+", "Galaxy Tab S12 Ultra", "Galaxy Tab A", "Galaxy Tab A7", "Galaxy Tab A8", "Galaxy Tab A9", "Galaxy Tab A9+", "Galaxy Tab A10", "Galaxy Tab A11", "Galaxy Tab A11+", "Other Galaxy Tab"], "Other Tablet": ["Other Tablet Model"] } },
    controller: { label: "Controllers", makers: ["PlayStation", "Xbox", "Nintendo", "Other Controller"], models: { PlayStation: ["Sixaxis Wireless Controller", "DualShock 3", "DualShock 4", "DualSense PS5", "DualSense Edge"], Xbox: ["Xbox 360 Wireless Controller", "Xbox One Controller", "Xbox One Elite Controller", "Xbox Wireless Controller (Series X|S)", "Xbox Elite Wireless Controller Series 2"], Nintendo: ["Joy-Con (L/R)", "Nintendo Switch Pro Controller", "Nintendo Switch 2 Joy-Con", "Nintendo Switch 2 Pro Controller"], "Other Controller": ["Other Controller Model"] } },
  };

  const repairsFor = (key, maker, pickedModel) => {
    if (key === "gaming") {
      if (maker === "Nintendo" && /Switch 2/i.test(pickedModel)) return [{ name: "Nintendo Switch 2 repair" }];
      if (maker === "Nintendo") return ["Battery replacement", "Charging port", "Connectivity repair", "Overheating repair", "Screen / digitizer", "Deep clean only", "Premium cleaning care package"].map((name) => ({ name }));
      return ["Disk drive repair", "HDMI port repair", "Overheating repair", "Power issue repair", "Deep clean only", "Premium cleaning care package"].map((name) => ({ name }));
    }
    if (["iphone", "samsung", "pixel", "motorola"].includes(key)) {
      const screenLabels = { iphone: "iPhone screen replacement", samsung: "Samsung Galaxy screen replacement", pixel: "Google Pixel screen replacement", motorola: "Motorola screen replacement" };
      return [screenLabels[key], "Battery replacement", "Charging port repair", "Back glass repair", "Diagnostic", "Deep clean only", "Premium cleaning care package"].map((name) => ({ name }));
    }
    if (["ipad", "tablet"].includes(key)) return [
      { name: "Screen / digitizer repair" }, { name: "Battery replacement" }, { name: "Charging port repair" }, { name: "Diagnostic" }
    ];
    if (key === "controller") {
      if (maker === "PlayStation") {
        if (/edge/i.test(pickedModel)) return [{ name: "PS5 Edge drift fix" }, { name: "Other PS5 Edge repair" }];
        if (/ps5|dualsense/i.test(pickedModel)) return [{ name: "PS5 controller drift fix" }, { name: "Other PS5 controller repair" }];
        return [{ name: "PlayStation controller repair" }];
      }
      if (maker === "Xbox") return [{ name: "Xbox controller drift fix" }, { name: "Other Xbox controller repair" }];
      return [{ name: "Controller repair" }];
    }
    return [];
  };

  const resetSelect = (select, message) => {
    const placeholder = new Option(message, "");
    placeholder.disabled = true;
    placeholder.hidden = true;
    select.replaceChildren(placeholder);
    select.value = "";
  };
  const formatRepairLabel = (label) => label.split(/\s+/).map((word) => {
    if (/[a-z][A-Z]/.test(word)) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
  const setOptions = (select, choices, placeholder) => {
    resetSelect(select, placeholder);
    choices.forEach((choice) => select.add(new Option(choice, choice)));
  };
  const makeQuoteLink = () => {
    const subject = encodeURIComponent("Repair quote request - Level Up Tech Repair");
    const details = [
      `Device category: ${category.value ? catalog[category.value].label : "Not selected"}`,
      `Manufacturer: ${manufacturer.value || "Not selected"}`,
      `Model: ${model.value.trim() || "Not provided"}`,
      `Repair/service: ${repair.value || "Not selected"}`,
      `Price: ${currentRepair?.price || "Please provide a quote"}`,
      "\nPlease contact me about availability and a repair quote."
    ].join("\n");
    const email = encodeURIComponent((config.contactUrl || "info@leveluptechrepairfl.com").replace(/^mailto:/i, "").trim());
    quoteLink.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(details)}`;
  };
  const updateSummary = () => {
    const selectedCategory = catalog[category.value];
    if (!selectedCategory) {
      estimateTitle.textContent = "Let’s find the right fix.";
      estimateCopy.textContent = "Your device and repair details will appear here as you make your selections.";
      estimatePrice.textContent = "—";
      estimateNote.textContent = "No model-specific prices have been verified yet. Request a quote for your exact device. A $25 booking deposit is required; it is applied toward the repair and is non-refundable if you cancel.";
      currentRepair = null;
      makeQuoteLink();
      return;
    }
    if (!manufacturer.value) {
      estimateTitle.textContent = selectedCategory.label;
      estimateCopy.textContent = "Choose a Manufacturer, then enter the device model.";
      estimatePrice.textContent = "—";
      currentRepair = null;
      makeQuoteLink();
      return;
    }
    if (!model.value.trim()) {
      estimateTitle.textContent = `${manufacturer.value} selected`;
      estimateCopy.textContent = "Enter your model to see matching services.";
      estimatePrice.textContent = "—";
      currentRepair = null;
      makeQuoteLink();
      return;
    }
    if (!repair.value) {
      estimateTitle.textContent = model.value.trim();
      estimateCopy.textContent = "Choose the issue or repair service to see your estimate.";
      estimatePrice.textContent = "—";
      currentRepair = null;
      makeQuoteLink();
      return;
    }
    currentRepair = quoteServices.get(repair.value);
    estimateTitle.textContent = formatRepairLabel(repair.value);
    estimateCopy.textContent = `${selectedCategory.label} · ${manufacturer.value} · ${model.value.trim()}`;
    estimatePrice.textContent = currentRepair?.price || "Request a Quote";
    estimateNote.textContent = currentRepair?.price?.startsWith("From") ? "Verified starting price for this exact model and repair. Final price depends on diagnosis and parts required; we’ll confirm before proceeding." : currentRepair?.price ? "Configured price for this exact model and repair. We’ll confirm repair details before proceeding." : "We don’t have a verified price for this exact model and repair. Email us for a quote; general starting prices are listed in the pricing section.";
    makeQuoteLink();
  };
  const updateRepairs = () => {
    const matching = repairsFor(category.value, manufacturer.value, model.value.trim()).map((item) => {
      const priceKey = [category.value, manufacturer.value, model.value.trim(), item.name].join("|");
      const configuredPrice = config.verifiedModelPrices?.[priceKey];
      return { ...item, price: typeof configuredPrice === "string" && configuredPrice.trim() ? configuredPrice.trim() : null };
    });
    quoteServices.clear();
    resetSelect(repair, matching.length ? "Choose a Repair or Service" : "Enter Model to Continue");
    matching.forEach((item) => {
      quoteServices.set(item.name, item);
      repair.add(new Option(formatRepairLabel(item.name), item.name));
    });
    repair.disabled = !model.value.trim() || !manufacturer.value;
  };
  const getModelPlaceholder = (maker) => maker === "Other Tablet" ? "Enter Other Tablet" : maker === "Other Controller" ? "Enter Other Controller" : maker ? `Enter or Choose ${maker === "Apple" ? "an" : "a"} ${maker} Model` : "Choose Manufacturer First";
  const updateModels = () => {
    modelSuggestions.replaceChildren();
    (catalog[category.value]?.models?.[manufacturer.value] || []).forEach((value) => modelSuggestions.append(new Option(value, value)));
    model.disabled = !manufacturer.value;
    model.placeholder = getModelPlaceholder(manufacturer.value);
    model.value = "";
    resetSelect(repair, "Enter Model to Continue");
    repair.disabled = true;
  };

  category.addEventListener("change", () => {
    const choices = catalog[category.value]?.makers || [];
    const fixedPhoneMaker = ["iphone", "samsung", "pixel", "motorola", "ipad"].includes(category.value);
    setOptions(manufacturer, choices, choices.length ? "Choose a Manufacturer" : "Choose Category First");
    if (fixedPhoneMaker && choices.length) {
      manufacturer.value = choices[0];
      manufacturer.disabled = true;
    } else {
      manufacturer.disabled = !choices.length;
    }
    modelSuggestions.replaceChildren();
    model.value = "";
    model.disabled = !manufacturer.value;
    model.placeholder = getModelPlaceholder(manufacturer.value);
    resetSelect(repair, manufacturer.value ? "Enter Model to Continue" : "Choose Manufacturer and Model First");
    repair.disabled = true;
    quoteServices.clear();
    currentRepair = null;
    if (manufacturer.value) updateModels();
    updateSummary();
  });
  manufacturer.addEventListener("change", () => {
    updateModels();
    quoteServices.clear();
    currentRepair = null;
    updateSummary();
  });
  model.addEventListener("input", () => {
    repair.value = "";
    updateRepairs();
    currentRepair = null;
    updateSummary();
  });
  repair.addEventListener("change", updateSummary);

  document.querySelectorAll("[data-select-category]").forEach((link) => {
    link.addEventListener("click", () => {
      category.value = link.dataset.selectCategory;
      category.dispatchEvent(new Event("change", { bubbles: true }));
      window.setTimeout(() => (manufacturer.disabled ? model : manufacturer).focus(), 250);
    });
  });
  document.querySelectorAll("[data-booking-link]").forEach((link) => {
    link.href = config.bookingUrl || "#find-repair";
    if (config.bookingUrl) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const accepted = window.confirm("Before continuing to Square: the $25 booking deposit is due once per appointment, is applied toward the final repair cost, and is non-refundable if you cancel. This website does not collect payment. Square controls checkout; confirm the payment screen shows one deposit for your appointment before paying.");
        if (accepted) window.open(config.bookingUrl, "_blank", "noopener,noreferrer");
      });
    }
  });
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
  if (contact && config.contactUrl) contact.href = config.contactUrl.includes("@") && !config.contactUrl.includes(":") ? `mailto:${config.contactUrl}` : config.contactUrl;
  document.querySelectorAll("[data-facebook-link]").forEach((link) => { if (config.facebookUrl) link.href = config.facebookUrl; });
  document.querySelectorAll("[data-instagram-link]").forEach((link) => { if (config.instagramUrl) link.href = config.instagramUrl; });

  const reviewsLink = document.querySelector("[data-reviews-link]");
  if (reviewsLink && config.googleBusinessUrl) {
    reviewsLink.href = config.googleBusinessUrl;
    reviewsLink.target = "_blank";
    reviewsLink.rel = "noopener noreferrer";
  }

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  const repairDropdown = document.querySelector(".nav-dropdown");
  const repairDropdownButton = document.querySelector(".nav-dropdown-toggle");
  const setRepairDropdown = (open) => {
    repairDropdown.classList.toggle("open", open);
    repairDropdownButton.setAttribute("aria-expanded", String(open));
  };
  repairDropdownButton.addEventListener("click", () => {
    setRepairDropdown(repairDropdownButton.getAttribute("aria-expanded") !== "true");
  });
  const closeMenu = () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    setRepairDropdown(false);
  };
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav.addEventListener("click", (event) => { if (event.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (repairDropdownButton.getAttribute("aria-expanded") === "true") {
      setRepairDropdown(false);
      repairDropdownButton.focus();
      return;
    }
    if (!nav.classList.contains("open")) return;
    closeMenu();
    menuButton.focus();
  });
  document.addEventListener("click", (event) => {
    if (!repairDropdown.contains(event.target)) setRepairDropdown(false);
    if (nav.classList.contains("open") && !nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
  document.querySelector("#year").textContent = new Date().getFullYear();
  updateSummary();
})();





