
/* =========================================================
   SecureID — Digital Identity & Account Security
   NexaUI | Sandhya — Cybersecurity
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  // Toast notifications
  function showToast(message, type = "success") {
    let toast = $("#secureid-toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "secureid-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");

      Object.assign(toast.style, {
        position: "fixed",
        right: "24px",
        bottom: "24px",
        zIndex: "99999",
        maxWidth: "min(380px, calc(100vw - 32px))",
        padding: "14px 18px",
        borderRadius: "14px",
        color: "#f8fafc",
        background: "#142438",
        border: "1px solid #2dd4bf",
        boxShadow: "0 16px 45px rgba(0,0,0,.35)",
        fontSize: "14px",
        lineHeight: "1.5",
        opacity: "0",
        transform: "translateY(10px)",
        transition: "opacity .2s ease, transform .2s ease"
      });

      document.body.appendChild(toast);
    }

    toast.style.borderColor =
      type === "error" ? "#fb7185" : "#2dd4bf";

    toast.textContent = message;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";

    clearTimeout(toast.hideTimer);
    toast.hideTimer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
    }, 3000);
  }

  // Sidebar navigation
  const navItems = $$(
    "[data-page], .sidebar-nav a, .nav-item[data-target]"
  );

  function activatePage(target) {
    const id = target.replace(/^#/, "");

    const page = document.getElementById(id);

    if (!page) {
      showToast(`Page "${id}" was not found.`, "error");
      return;
    }

    $$("[data-page-content], .page-section, .dashboard-page")
      .forEach(section => {
        section.hidden = true;
        section.classList.remove("active");
      });

    page.hidden = false;
    page.classList.add("active");

    navItems.forEach(item => {
      const itemTarget =
        item.dataset.page ||
        item.dataset.target ||
        item.getAttribute("href")?.replace(/^#/, "");

      const active = itemTarget === id;

      item.classList.toggle("active", active);

      if (active) {
        item.setAttribute("aria-current", "page");
      } else {
        item.removeAttribute("aria-current");
      }
    });

    history.replaceState(null, "", `#${id}`);
  }

  navItems.forEach(item => {
    item.addEventListener("click", event => {
      const target =
        item.dataset.page ||
        item.dataset.target ||
        item.getAttribute("href");

      if (!target || target === "#") return;

      const id = target.replace(/^#/, "");

      if (document.getElementById(id)) {
        event.preventDefault();
        activatePage(id);
      }
    });
  });

  // Restore the page from the URL hash if the target exists.
  const initialPage = location.hash.slice(1);

  if (initialPage && document.getElementById(initialPage)) {
    activatePage(initialPage);
  }

  // Permission toggles
  $$(
    'input[type="checkbox"][data-permission], ' +
    '[data-permission-toggle]'
  ).forEach(toggle => {
    toggle.addEventListener("change", () => {
      const permission =
        toggle.dataset.permission ||
        toggle.dataset.permissionToggle ||
        toggle.name ||
        "Permission";

      const enabled = toggle.checked;

      toggle.setAttribute("aria-checked", String(enabled));

      showToast(
        `${permission}: ${enabled ? "enabled" : "disabled"}.`
      );
    });
  });

  // Generic switches with data-toggle
  $$("[data-toggle]").forEach(toggle => {
    toggle.addEventListener("click", () => {
      const enabled = toggle.getAttribute("aria-pressed") !== "true";

      toggle.setAttribute("aria-pressed", String(enabled));
      toggle.classList.toggle("active", enabled);

      showToast(
        `${toggle.dataset.toggle}: ${enabled ? "on" : "off"}.`
      );
    });
  });

  // Security method cards
  $$(".method-card, [data-security-method]").forEach(card => {
    const button = $("button", card) || card;

    button.addEventListener("click", event => {
      if (event.target.closest("a")) return;

      const method =
        card.dataset.securityMethod ||
        $(".method-title, h3, h4", card)?.textContent?.trim() ||
        "Security method";

      showToast(
        `${method} selected. Connect a verified authentication service to activate it.`
      );
    });
  });

  // Device actions
  $$("[data-device-action]").forEach(button => {
    button.addEventListener("click", () => {
      const action = button.dataset.deviceAction;
      const device = button.dataset.device || "Selected device";

      if (action === "remove" || action === "revoke") {
        const confirmed = window.confirm(
          `Remove access for "${device}"?`
        );

        if (!confirmed) return;

        const card = button.closest(
          "[data-device-card], .device-card, .device-item"
        );

        if (card) {
          card.remove();
          showToast(`${device} removed from this demo.`);
        } else {
          showToast(
            "Connect a backend to revoke a real device session.",
            "error"
          );
        }

        return;
      }

      showToast(`${action || "Device action"} selected for ${device}.`);
    });
  });

  // Review privacy / run security check
  $$(
    '[data-action="review-privacy"], ' +
    '[data-action="security-scan"], ' +
    ".review-privacy-btn, .security-scan-btn"
  ).forEach(button => {
    button.addEventListener("click", async () => {
      const originalText = button.textContent;

      button.disabled = true;
      button.textContent = "Checking...";

      try {
        await new Promise(resolve => setTimeout(resolve, 900));

        showToast(
          "Demo security check complete. Review your settings and connected devices."
        );
      } finally {
        button.disabled = false;
        button.textContent = originalText;
      }
    });
  });

  // Notification controls
  $$(
    '[data-action="notifications"], ' +
    ".notification-btn, .notifications-button"
  ).forEach(button => {
    button.addEventListener("click", () => {
      showToast("You're all caught up in this demo.");
    });
  });

  // Settings form
  $$("form[data-settings-form]").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();

      const data = Object.fromEntries(
        new FormData(form).entries()
      );

      console.info("SecureID demo settings:", data);

      showToast(
        "Settings validated for this demo. No server data was changed."
      );
    });
  });

  // Reveal / hide sensitive values
  $$("[data-reveal]").forEach(button => {
    button.addEventListener("click", () => {
      const target = document.getElementById(
        button.dataset.reveal
      );

      if (!target) return;

      const showing = target.dataset.revealed === "true";

      target.dataset.revealed = String(!showing);
      target.classList.toggle("revealed", !showing);

      button.setAttribute("aria-pressed", String(!showing));
      button.textContent = showing ? "Show" : "Hide";
    });
  });

  // Modal open / close
  $$("[data-modal-open]").forEach(button => {
    button.addEventListener("click", () => {
      const modal = document.getElementById(
        button.dataset.modalOpen
      );

      if (!modal) {
        showToast("The requested dialog was not found.", "error");
        return;
      }

      if (typeof modal.showModal === "function") {
        modal.showModal();
      } else {
        modal.hidden = false;
        modal.classList.add("open");
      }
    });
  });

  $$("[data-modal-close]").forEach(button => {
    button.addEventListener("click", () => {
      const modal = button.closest("dialog, [data-modal]");

      if (!modal) return;

      if (typeof modal.close === "function") {
        modal.close();
      } else {
        modal.hidden = true;
        modal.classList.remove("open");
      }
    });
  });

  // Mobile sidebar
  const menuButton = $(
    "[data-sidebar-toggle], .menu-toggle, .mobile-menu-button"
  );

  const sidebar = $(
    ".sidebar, .app-sidebar, [data-sidebar]"
  );

  if (menuButton && sidebar) {
    menuButton.addEventListener("click", () => {
      const opened = sidebar.classList.toggle("mobile-open");

      menuButton.setAttribute("aria-expanded", String(opened));
    });
  }

  // Search across visible content
  $$("[data-search-input]").forEach(input => {
    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      const targetSelector = input.dataset.searchTarget;

      const container = targetSelector
        ? $(targetSelector)
        : document;

      if (!container) return;

      $$("[data-searchable], .searchable-item", container)
        .forEach(item => {
          const text = item.textContent.toLowerCase();

          item.hidden = query !== "" && !text.includes(query);
        });
    });
  });

  // Current year
  $$("[data-current-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  // Keyboard accessibility for custom clickable cards
  $$("[role='button']:not(button)").forEach(element => {
    element.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        element.click();
      }
    });
  });

  console.info("SecureID initialized successfully.");
});
```