
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const sections = $$(".page-section");
  const navLinks = $$(".nav-link");
  const sidebar = $("#sidebar");
  const sidebarBackdrop = $("#sidebarBackdrop");
  const mobileMenu = $("#mobileMenu");
  const breadcrumbTitle = $("#breadcrumbTitle");

  const sectionNames = {
    overview: "Overview",
    authentication: "Authentication",
    devices: "Devices",
    activity: "Activity logs",
    privacy: "Privacy & security",
    settings: "Settings"
  };

  // Storage helpers: the app remains usable if browser storage is unavailable.
  const storage = {
    read(key, fallback = null) {
      try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : value;
      } catch {
        return fallback;
      }
    },
    write(key, value) {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch {
        return false;
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch {
        // Storage may be blocked by the browser.
      }
    }
  };

  // Toast notifications
  let toastTimer;
  function showToast(title, message) {
    const toast = $("#toast");
    if (!toast) return;

    $("#toastTitle").textContent = title;
    $("#toastMessage").textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3800);
  }

  $("#toastClose")?.addEventListener("click", () => {
    clearTimeout(toastTimer);
    $("#toast").classList.remove("show");
  });

  // Icons
  function refreshIcons() {
    if (window.lucide?.createIcons) {
      window.lucide.createIcons();
    }
  }
  refreshIcons();

  // Section navigation
  function closeMobileMenu() {
    sidebar.classList.remove("open");
    sidebarBackdrop.classList.remove("show");
    mobileMenu?.setAttribute("aria-expanded", "false");
  }

  function openSection(sectionId, updateHash = true) {
    const target = document.getElementById(sectionId);
    if (!target?.classList.contains("page-section")) {
      showToast("Section unavailable", "That dashboard section could not be found.");
      return;
    }

    sections.forEach(section => {
      section.classList.toggle("is-active", section.id === sectionId);
    });

    navLinks.forEach(link => {
      const active = link.dataset.section === sectionId;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    breadcrumbTitle.textContent = sectionNames[sectionId] || "Workspace";
    closeMobileMenu();

    if (updateHash) {
      try {
        history.replaceState(null, "", `#${sectionId}`);
      } catch {
        // Navigation still works if history updates are blocked.
      }
    }

    window.scrollTo({ top: 0, behavior: document.body.classList.contains("reduce-motion") ? "auto" : "smooth" });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", () => openSection(link.dataset.section));
  });

  // All Explore buttons and internal links
  $$("[data-target]").forEach(button => {
    button.addEventListener("click", event => {
      if (button.tagName === "A") event.preventDefault();
      openSection(button.dataset.target);
    });
  });

  // Mobile navigation
  mobileMenu?.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("open");
    sidebarBackdrop.classList.toggle("show", isOpen);
    mobileMenu.setAttribute("aria-expanded", String(isOpen));
  });

  sidebarBackdrop?.addEventListener("click", closeMobileMenu);

  // Search modal
  const searchOverlay = $("#searchOverlay");
  const globalSearch = $("#globalSearch");
  const searchResults = $("#searchResults");
  const searchToggle = $("#searchToggle");
  let previousFocus = null;

  const searchItems = [
    { id: "overview", title: "Overview", description: "Dashboard summary", icon: "layout-dashboard" },
    { id: "authentication", title: "Authentication", description: "Passkeys and verification", icon: "fingerprint" },
    { id: "devices", title: "Devices", description: "Review sample devices", icon: "monitor-smartphone" },
    { id: "activity", title: "Activity logs", description: "Search and export events", icon: "activity" },
    { id: "privacy", title: "Privacy & security", description: "Local privacy preferences", icon: "shield-check" },
    { id: "settings", title: "Settings", description: "Interface preferences", icon: "settings-2" }
  ];

  function renderSearchResults(query = "") {
    const normalized = query.trim().toLowerCase();
    const matches = searchItems.filter(item =>
      `${item.title} ${item.description}`.toLowerCase().includes(normalized)
    );

    searchResults.replaceChildren();

    if (!matches.length) {
      const empty = document.createElement("div");
      empty.className = "search-no-results";
      empty.textContent = "No matching sections. Try another search.";
      searchResults.append(empty);
      return;
    }

    matches.forEach(item => {
      const button = document.createElement("button");
      button.className = "search-result";
      button.type = "button";

      const icon = document.createElement("i");
      icon.dataset.lucide = item.icon;

      const text = document.createElement("span");
      text.textContent = item.title;

      const arrow = document.createElement("i");
      arrow.dataset.lucide = "arrow-up-right";

      button.append(icon, text, arrow);
      button.addEventListener("click", () => {
        closeSearch();
        openSection(item.id);
      });
      searchResults.append(button);
    });

    refreshIcons();
  }

  function openSearch() {
    previousFocus = document.activeElement;
    searchOverlay.classList.add("open");
    searchOverlay.setAttribute("aria-hidden", "false");
    renderSearchResults(globalSearch.value);
    globalSearch.focus();
  }

  function closeSearch() {
    searchOverlay.classList.remove("open");
    searchOverlay.setAttribute("aria-hidden", "true");
    searchToggle?.focus();
  }

  searchToggle?.addEventListener("click", openSearch);
  $("#closeSearch")?.addEventListener("click", closeSearch);
  globalSearch?.addEventListener("input", () => renderSearchResults(globalSearch.value));

  searchOverlay?.addEventListener("click", event => {
    if (event.target === searchOverlay) closeSearch();
  });

  document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (searchOverlay.classList.contains("open")) closeSearch();
      else openSearch();
    }

    if (event.key === "Escape") {
      if (searchOverlay.classList.contains("open")) closeSearch();
      else closeMobileMenu();
    }
  });

  // Notification and demo security check
  $("#notificationBtn")?.addEventListener("click", () => {
    showToast("Notifications", "This prototype has no live account notifications.");
  });

  $("#runCheck")?.addEventListener("click", event => {
    const button = event.currentTarget;
    button.disabled = true;
    button.innerHTML = '<i data-lucide="loader-circle"></i> Checking demo...';
    refreshIcons();

    setTimeout(() => {
      button.disabled = false;
      button.innerHTML = '<i data-lucide="scan-line"></i> Run demo check';
      refreshIcons();
      showToast("Demo check complete", "The interface responded correctly. No real account was checked.");
    }, 650);
  });

  // Device list
  const deviceList = $("#deviceList");

  function updateDeviceCount() {
    const count = $$(".device-item", deviceList).length;
    $("#deviceCount").textContent = count;
    $("#overviewDeviceCount").textContent = count;
    $("#navDeviceCount").textContent = count;
    $("#deviceSubtitle").textContent = `${count} sample device${count === 1 ? "" : "s"}`;
  }

  deviceList?.addEventListener("click", event => {
    const button = event.target.closest(".revoke-device");
    if (!button) return;

    const item = button.closest(".device-item");
    if (!item) return;

    const deviceName = $(".device-info strong", item)?.textContent || "Device";
    item.remove();
    updateDeviceCount();
    showToast("Demo device removed", `${deviceName} was removed from this page only.`);
  });

  $("#refreshDevices")?.addEventListener("click", () => {
    updateDeviceCount();
    showToast("Device list refreshed", "The current sample device list has been counted.");
  });

  updateDeviceCount();

  // Activity filtering
  const activityBody = $("#activityTableBody");
  const activitySearch = $("#activitySearch");
  const activityFilter = $("#activityFilter");
  const emptyActivity = $("#emptyActivity");

  function filterActivity() {
    if (!activityBody) return;

    const query = (activitySearch?.value || "").trim().toLowerCase();
    const type = activityFilter?.value || "all";
    const rows = $$("tr", activityBody);
    let visible = 0;

    rows.forEach(row => {
      const matchesQuery = row.textContent.toLowerCase().includes(query);
      const matchesType = type === "all" || row.dataset.type === type;
      const show = matchesQuery && matchesType;

      row.hidden = !show;
      if (show) visible++;
    });

    $("#visibleActivityCount").textContent = visible;
    $("#activityTotal").textContent = rows.length;
    $("#overviewActivityCount").textContent = rows.length;
    emptyActivity.hidden = visible !== 0;
  }

  activitySearch?.addEventListener("input", filterActivity);
  activityFilter?.addEventListener("change", filterActivity);

  $("#clearActivityFilters")?.addEventListener("click", () => {
    activitySearch.value = "";
    activityFilter.value = "all";
    filterActivity();
    showToast("Filters cleared", "All sample activity records are visible.");
  });

  $("#exportActivity")?.addEventListener("click", () => {
    const rows = $$("#activityTableBody tr").filter(row => !row.hidden);

    const records = rows.map(row => {
      const cells = [...row.cells];
      return {
        event: cells[0]?.innerText.trim() || "",
        type: cells[1]?.innerText.trim() || "",
        details: cells[2]?.innerText.trim() || "",
        time: cells[3]?.innerText.trim() || "",
        status: cells[4]?.innerText.trim() || ""
      };
    });

    const blob = new Blob([JSON.stringify({
      exportedAt: new Date().toISOString(),
      mode: "demo",
      records
    }, null, 2)], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "secureid-activity-demo.json";
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    showToast("Export ready", `${records.length} visible sample records exported as JSON.`);
  });

  filterActivity();

  // Demo authentication feature cards
  $$(".demo-action").forEach(button => {
    button.addEventListener("click", () => {
      showToast(button.dataset.title || "Demo feature", button.dataset.message || "This is a demonstration only.");
    });
  });

  // Preferences
  const defaultPreferences = {
    notifications: true,
    remember: true,
    reduceMotion: false
  };

  const preferenceKey = "secureid-demo-preferences";

  function readPreferences() {
    try {
      const saved = storage.read(preferenceKey);
      return saved ? { ...defaultPreferences, ...JSON.parse(saved) } : { ...defaultPreferences };
    } catch {
      return { ...defaultPreferences };
    }
  }

  let preferences = readPreferences();

  const preferenceControls = {
    notifications: ["#privacyNotifications", "#settingsNotifications"],
    remember: ["#privacyRemember", "#settingsRemember"],
    reduceMotion: ["#privacyMotion", "#settingsMotion"]
  };

  function renderPreferences() {
    Object.entries(preferenceControls).forEach(([key, selectors]) => {
      selectors.forEach(selector => {
        const control = $(selector);
        if (control) control.checked = Boolean(preferences[key]);
      });
    });

    document.body.classList.toggle("reduce-motion", Boolean(preferences.reduceMotion));
  }

  function readControls() {
    return {
      notifications: $("#settingsNotifications").checked,
      remember: $("#settingsRemember").checked,
      reduceMotion: $("#settingsMotion").checked
    };
  }

  function savePreferences(source = "settings") {
    const prefix = source === "privacy" ? "privacy" : "settings";
    const notification = $(`#${prefix}Notifications`);
    const remember = $(`#${prefix}Remember`);
    const motion = $(`#${prefix}Motion`);

    preferences = {
      notifications: notification.checked,
      remember: remember.checked,
      reduceMotion: motion.checked
    };

    renderPreferences();

    if (preferences.remember) {
      const saved = storage.write(preferenceKey, JSON.stringify(preferences));
      if (!saved) {
        showToast("Browser storage unavailable", "Preferences work now but could not be saved.");
        return;
      }
    } else {
      storage.remove(preferenceKey);
    }

    showToast("Preferences saved", "Your demo preferences have been updated.");
  }

  function resetPreferences() {
    preferences = { ...defaultPreferences };
    renderPreferences();
    storage.remove(preferenceKey);
    showToast("Preferences reset", "Default demo settings have been restored.");
  }

  $("#savePrivacy")?.addEventListener("click", () => savePreferences("privacy"));
  $("#saveSettings")?.addEventListener("click", () => savePreferences("settings"));
  $("#resetPrivacy")?.addEventListener("click", resetPreferences);
  $("#resetSettings")?.addEventListener("click", resetPreferences);

  // Keep both settings pages synchronized as the user changes a switch.
  Object.entries(preferenceControls).forEach(([key, selectors]) => {
    selectors.forEach(selector => {
      $(selector)?.addEventListener("change", event => {
        const checked = event.currentTarget.checked;
        preferences[key] = checked;

        preferenceControls[key].forEach(otherSelector => {
          const other = $(otherSelector);
          if (other) other.checked = checked;
        });

        document.body.classList.toggle("reduce-motion", Boolean(preferences.reduceMotion));

        // Persist changes only if the user has enabled remembering preferences.
        if (preferences.remember) {
          storage.write(preferenceKey, JSON.stringify(preferences));
        } else {
          storage.remove(preferenceKey);
        }
      });
    });
  });

  renderPreferences();

  // Respect a valid starting section in the URL.
  const initialSection = window.location.hash.slice(1);
  if (sectionNames[initialSection]) {
    openSection(initialSection, false);
  }

  // Keep navigation usable when the viewport changes.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMobileMenu();
  });
});
