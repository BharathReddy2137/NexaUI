/* =========================================================
   MEETMIND AI
   Frontend Prototype
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= ICONS ================= */

  if (window.lucide) {
    lucide.createIcons();
  }


  /* ================= ELEMENTS ================= */

  const pages = document.querySelectorAll(".page");
  const navItems = document.querySelectorAll(".nav-item");
  const pageTitle = document.getElementById("pageTitle");

  const sidebar = document.getElementById("sidebar");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");

  const notificationBtn = document.getElementById("notificationBtn");
  const notificationPanel = document.getElementById("notificationPanel");
  const closeNotifications = document.getElementById("closeNotifications");

  const themeBtn = document.getElementById("themeBtn");

  const commandOverlay = document.getElementById("commandOverlay");
  const commandInput = document.getElementById("commandInput");
  const searchTrigger = document.getElementById("searchTrigger");

  const toastElement = document.getElementById("toast");
  const toastTitle = document.getElementById("toastTitle");
  const toastMessage = document.getElementById("toastMessage");


  /* ================= PAGE NAVIGATION ================= */

  const titles = {
    dashboard: "Command Center",
    live: "Live Meeting",
    summary: "AI Summary",
    decisions: "Decisions",
    actions: "Action Items",
    intelligence: "Meeting Intelligence",
    history: "Meeting History",
    assistant: "AI Assistant",
    settings: "Settings"
  };

  function openPage(pageId) {

    pages.forEach(page => {
      page.classList.remove("active");
    });

    const target = document.getElementById(pageId);

    if (!target) return;

    target.classList.add("active");

    navItems.forEach(item => {
      item.classList.toggle(
        "active",
        item.dataset.page === pageId
      );
    });

    pageTitle.textContent = titles[pageId] || "MeetMind";

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    sidebar.classList.remove("open");

    if (window.lucide) {
      lucide.createIcons();
    }
  }


  navItems.forEach(item => {

    item.addEventListener("click", () => {

      openPage(item.dataset.page);

    });

  });


  document.querySelectorAll("[data-page-target]").forEach(button => {

    button.addEventListener("click", () => {

      const target = button.dataset.pageTarget;

      openPage(target);

    });

  });


  /* ================= MOBILE SIDEBAR ================= */

  mobileMenuBtn?.addEventListener("click", () => {

    sidebar.classList.toggle("open");

  });


  /* ================= TOAST ================= */

  let toastTimer;

  function showToast(
    message,
    title = "Done"
  ) {

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    toastElement.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

      toastElement.classList.remove("show");

    }, 2800);
  }


  document.querySelectorAll("[data-toast]").forEach(button => {

    button.addEventListener("click", () => {

      showToast(button.dataset.toast);

    });

  });


  /* ================= THEME ================= */


const THEME_KEY = "meetmind-theme-v2";

/* MeetMind now starts in the Aurora dark theme */
let darkMode =
  localStorage.getItem(THEME_KEY) !== "light";


  function applyTheme() {

    if (darkMode) {

      document.documentElement.style.setProperty(
        "--bg",
        "#12121a"
      );

      document.documentElement.style.setProperty(
        "--bg-secondary",
        "#191923"
      );

      document.documentElement.style.setProperty(
        "--surface",
        "rgba(28,28,40,.78)"
      );

      document.documentElement.style.setProperty(
        "--surface-solid",
        "#1d1d29"
      );

      document.documentElement.style.setProperty(
        "--text",
        "#f0eff8"
      );

      document.documentElement.style.setProperty(
        "--muted",
        "#a5a3b5"
      );

      document.documentElement.style.setProperty(
        "--border",
        "rgba(255,255,255,.08)"
      );

      document.body.style.background =
        "radial-gradient(circle at 15% 10%, rgba(120,103,247,.13), transparent 25%), radial-gradient(circle at 85% 15%, rgba(69,200,216,.08), transparent 25%), #12121a";

      themeBtn.innerHTML =
        '<i data-lucide="moon"></i>';

    } else {

      document.documentElement.style.setProperty(
        "--bg",
        "#f7f5ff"
      );

      document.documentElement.style.setProperty(
        "--bg-secondary",
        "#ffffff"
      );

      document.documentElement.style.setProperty(
        "--surface",
        "rgba(255,255,255,.72)"
      );

      document.documentElement.style.setProperty(
        "--surface-solid",
        "#ffffff"
      );

      document.documentElement.style.setProperty(
        "--text",
        "#202235"
      );

      document.documentElement.style.setProperty(
        "--muted",
        "#777991"
      );

      document.documentElement.style.setProperty(
        "--border",
        "rgba(91,77,143,.12)"
      );

      document.body.style.background =
        "radial-gradient(circle at 15% 10%, rgba(120,103,247,.08), transparent 25%), radial-gradient(circle at 85% 15%, rgba(69,200,216,.09), transparent 25%), #f7f5ff";

      themeBtn.innerHTML =
        '<i data-lucide="sun"></i>';
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  }


  themeBtn?.addEventListener("click", () => {

    darkMode = !darkMode;
localStorage.setItem(
  THEME_KEY,
  darkMode ? "dark" : "light"
);
    applyTheme();

    showToast(
      darkMode
        ? "Dark workspace enabled."
        : "Light workspace enabled.",
      "Theme updated"
    );

  });

  applyTheme();


  /* ================= NOTIFICATIONS ================= */

  notificationBtn?.addEventListener("click", () => {

    notificationPanel.classList.toggle("open");

  });


  closeNotifications?.addEventListener("click", () => {

    notificationPanel.classList.remove("open");

  });


  document.addEventListener("click", event => {

    if (
      notificationPanel.classList.contains("open") &&
      !notificationPanel.contains(event.target) &&
      !notificationBtn.contains(event.target)
    ) {

      notificationPanel.classList.remove("open");

    }

  });


  /* ================= COMMAND PALETTE ================= */

  function openCommandPalette() {

    commandOverlay.classList.add("open");

    setTimeout(() => {

      commandInput.focus();

    }, 100);

  }


  function closeCommandPalette() {

    commandOverlay.classList.remove("open");

    commandInput.value = "";

  }


  searchTrigger?.addEventListener(
    "click",
    openCommandPalette
  );


  document.addEventListener("keydown", event => {

    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "k"
    ) {

      event.preventDefault();

      openCommandPalette();

    }

    if (event.key === "Escape") {

      closeCommandPalette();

      taskModal?.classList.remove("open");

    }

  });


  commandOverlay.addEventListener("click", event => {

    if (event.target === commandOverlay) {

      closeCommandPalette();

    }

  });


  document.querySelectorAll("[data-command-page]").forEach(button => {

    button.addEventListener("click", () => {

      openPage(button.dataset.commandPage);

      closeCommandPalette();

    });

  });


  /* ================= SEARCH COMMAND FILTER ================= */

  commandInput?.addEventListener("input", () => {

    const value =
      commandInput.value.toLowerCase().trim();

    document.querySelectorAll(".command-list button")
      .forEach(button => {

        const text =
          button.textContent.toLowerCase();

        button.style.display =
          text.includes(value)
            ? "flex"
            : "none";

      });

  });


  /* ================= LIVE MEETING ================= */

  const startMeetingBtn =
    document.getElementById("startMeetingBtn");

  const newMeetingBtn =
    document.getElementById("newMeetingBtn");

  const meetingTimer =
    document.getElementById("meetingTimer");

  const listeningText =
    document.getElementById("listeningText");

  const endMeetingBtn =
    document.getElementById("endMeetingBtn");

  const muteBtn =
    document.getElementById("muteBtn");

  let meetingRunning = false;
  let meetingSeconds = 0;
  let timerInterval = null;
  let muted = false;


  function formatTime(seconds) {

    const minutes =
      Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0");

    const secs =
      (seconds % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${secs}`;

  }


  function startMeeting() {

    openPage("live");

    if (meetingRunning) {

      showToast(
        "The meeting is already running.",
        "Meeting active"
      );

      return;

    }

    meetingRunning = true;

    meetingSeconds = 0;

    meetingTimer.textContent = "00:00";

    listeningText.textContent =
      "MeetMind is actively listening";

    timerInterval = setInterval(() => {

      meetingSeconds++;

      meetingTimer.textContent =
        formatTime(meetingSeconds);

    }, 1000);

    showToast(
      "Live meeting intelligence started.",
      "Meeting started"
    );

  }


  function endMeeting() {

    if (!meetingRunning) {

      showToast(
        "There is no active meeting.",
        "Nothing to stop"
      );

      return;

    }

    meetingRunning = false;

    clearInterval(timerInterval);

    listeningText.textContent =
      "Meeting captured successfully";

    showToast(
      "Meeting intelligence has been prepared.",
      "Meeting ended"
    );

    setTimeout(() => {

      openPage("summary");

    }, 900);

  }


  startMeetingBtn?.addEventListener(
    "click",
    startMeeting
  );

  newMeetingBtn?.addEventListener(
    "click",
    startMeeting
  );

  endMeetingBtn?.addEventListener(
    "click",
    endMeeting
  );


  muteBtn?.addEventListener("click", () => {

    muted = !muted;

    if (muted) {

      muteBtn.innerHTML =
        '<i data-lucide="mic-off"></i>';

      listeningText.textContent =
        "Microphone muted";

      showToast(
        "Microphone muted.",
        "Audio"
      );

    } else {

      muteBtn.innerHTML =
        '<i data-lucide="mic"></i>';

      listeningText.textContent =
        meetingRunning
          ? "MeetMind is actively listening"
          : "AI listening intelligence ready";

      showToast(
        "Microphone enabled.",
        "Audio"
      );

    }

    if (window.lucide) {
      lucide.createIcons();
    }

  });


  /* ================= QUICK NOTE ================= */

  document.getElementById("noteBtn")
    ?.addEventListener("click", () => {

      showToast(
        "Quick meeting note captured.",
        "Note saved"
      );

    });


  /* ================= AI INSIGHT ================= */

  document.getElementById("insightBtn")
    ?.addEventListener("click", () => {

      showToast(
        "AI found a 24% improvement in decision clarity.",
        "Meeting insight"
      );

      openPage("intelligence");

    });


  /* ================= REGENERATE SUMMARY ================= */

  document.getElementById("regenerateBtn")
    ?.addEventListener("click", () => {

      const button =
        document.getElementById("regenerateBtn");

      button.innerHTML =
        '<i data-lucide="loader-circle"></i> Analyzing...';

      if (window.lucide) {
        lucide.createIcons();
      }

      setTimeout(() => {

        button.innerHTML =
          '<i data-lucide="sparkles"></i> Regenerate';

        if (window.lucide) {
          lucide.createIcons();
        }

        showToast(
          "Meeting summary refreshed.",
          "AI analysis complete"
        );

      }, 1300);

    });


  /* ================= EXPORT ================= */

  document.getElementById("exportDecisions")
    ?.addEventListener("click", () => {

      showToast(
        "Decision report prepared for export.",
        "Export ready"
      );

    });


  /* ================= TASK MODAL ================= */

  const taskModal =
    document.getElementById("taskModal");

  const addTaskBtn =
    document.getElementById("addTaskBtn");

  const taskInput =
    document.getElementById("taskInput");

  const saveTask =
    document.getElementById("saveTask");


  addTaskBtn?.addEventListener("click", () => {

    taskModal.classList.add("open");

    setTimeout(() => {
      taskInput.focus();
    }, 100);

  });


  document.querySelector(".close-modal")
    ?.addEventListener("click", () => {

      taskModal.classList.remove("open");

    });


  taskModal?.addEventListener("click", event => {

    if (event.target === taskModal) {

      taskModal.classList.remove("open");

    }

  });


  saveTask?.addEventListener("click", () => {

    const value =
      taskInput.value.trim();

    if (!value) {

      showToast(
        "Enter an action item first.",
        "Missing task"
      );

      return;

    }

    const taskPanel =
      document.querySelector(".task-panel");

    const row =
      document.createElement("div");

    row.className = "task-row";

    row.innerHTML = `
      <button class="task-check">
        <i data-lucide="check"></i>
      </button>

      <div class="task-info">
        <strong>${escapeHTML(value)}</strong>
        <span>Added just now · MeetMind</span>
      </div>

      <span class="priority medium">Medium</span>

      <span class="task-owner">You</span>

      <span class="due-date">New</span>
    `;

    taskPanel.prepend(row);

    taskInput.value = "";

    taskModal.classList.remove("open");

    if (window.lucide) {
      lucide.createIcons();
    }

    attachTaskEvents(row);

    showToast(
      "New action item added.",
      "Task created"
    );

  });


  /* ================= TASK CHECKS ================= */

  function attachTaskEvents(container = document) {

    container.querySelectorAll(".task-check")
      .forEach(button => {

        if (button.dataset.bound) return;

        button.dataset.bound = "true";

        button.addEventListener("click", () => {

          button.classList.toggle("completed");

          const taskInfo =
            button.parentElement.querySelector(".task-info");

          taskInfo?.classList.toggle(
            "completed-text"
          );

          showToast(
            button.classList.contains("completed")
              ? "Action marked complete."
              : "Action reopened.",
            "Task updated"
          );

        });

      });

  }

  attachTaskEvents();


  /* ================= FILTER BUTTONS ================= */

  document.querySelectorAll(".filter-button")
    .forEach(button => {

      button.addEventListener("click", () => {

        document.querySelectorAll(".filter-button")
          .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        showToast(
          `${button.textContent.trim()} tasks displayed.`,
          "Filter updated"
        );

      });

    });


  /* ================= HISTORY SEARCH ================= */

  const meetingSearch =
    document.getElementById("meetingSearch");

  meetingSearch?.addEventListener("input", () => {

    const query =
      meetingSearch.value.toLowerCase().trim();

    document.querySelectorAll(".history-item")
      .forEach(item => {

        const text =
          item.textContent.toLowerCase();

        item.style.display =
          text.includes(query)
            ? "flex"
            : "none";

      });

  });


  /* ================= AI ASSISTANT ================= */

  const chatMessages =
    document.getElementById("chatMessages");

  const chatInput =
    document.getElementById("chatInput");

  const sendChat =
    document.getElementById("sendChat");


  function addUserMessage(text) {

    const message =
      document.createElement("div");

    message.className =
      "chat-message user-message";

    message.innerHTML = `
      <div class="message-bubble">
        <p>${escapeHTML(text)}</p>
      </div>
    `;

    chatMessages.appendChild(message);

    chatMessages.scrollTop =
      chatMessages.scrollHeight;

  }


  function getAIResponse(question) {

    const q =
      question.toLowerCase();

    if (
      q.includes("decision") ||
      q.includes("decisions")
    ) {

      return `
        The latest meeting captured
        <strong>5 decisions</strong>.
        The most important was the agreement to use a
        phased rollout for the redesigned onboarding experience.
      `;

    }

    if (
      q.includes("action") ||
      q.includes("task")
    ) {

      return `
        I found <strong>7 action items</strong>.
        The highest-priority item is to finalize the onboarding
        prototype before the next product review.
      `;

    }

    if (
      q.includes("summar") ||
      q.includes("meeting")
    ) {

      return `
        The latest meeting focused on Q4 product direction,
        onboarding improvements and launch strategy.
        The team reached strong alignment and captured
        several follow-up actions.
      `;

    }

    if (
      q.includes("unresolved") ||
      q.includes("follow-up")
    ) {

      return `
        One important unresolved topic is
        <strong>resource allocation</strong>.
        The team should revisit it before finalizing the
        rollout timeline.
      `;

    }

    if (
      q.includes("productive") ||
      q.includes("health")
    ) {

      return `
        The latest meeting received a
        <strong>91/100 productivity score</strong>.
        Clarity, focus and decision quality were all strong.
      `;

    }

    return `
      Based on your recent meeting data, the strongest signal is
      improved decision clarity. I can help you explore decisions,
      action items, summaries or unresolved topics.
    `;

  }


  function addAIMessage(text) {

    const message =
      document.createElement("div");

    message.className =
      "chat-message ai-message";

    message.innerHTML = `
      <div class="chat-avatar">
        <i data-lucide="sparkles"></i>
      </div>

      <div class="message-bubble">
        <p>${text}</p>
      </div>
    `;

    chatMessages.appendChild(message);

    if (window.lucide) {
      lucide.createIcons();
    }

    chatMessages.scrollTop =
      chatMessages.scrollHeight;

  }


  function sendMessage(text = chatInput.value) {

    text = text.trim();

    if (!text) return;

    addUserMessage(text);

    chatInput.value = "";

    setTimeout(() => {

      addAIMessage(
        getAIResponse(text)
      );

    }, 650);

  }


  sendChat?.addEventListener(
    "click",
    () => sendMessage()
  );


  chatInput?.addEventListener("keydown", event => {

    if (event.key === "Enter") {

      event.preventDefault();

      sendMessage();

    }

  });


  document.querySelectorAll("[data-prompt]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const prompt =
          button.dataset.prompt;

        openPage("assistant");

        setTimeout(() => {

          sendMessage(prompt);

        }, 200);

      });

    });


  /* ================= SETTINGS ================= */

  document.querySelectorAll(".toggle input")
    .forEach(toggle => {

      toggle.addEventListener("change", () => {

        showToast(
          toggle.checked
            ? "Setting enabled."
            : "Setting disabled.",
          "Preferences updated"
        );

      });

    });


  /* ================= ESCAPE HTML ================= */

  function escapeHTML(value) {

    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  }


  /* ================= INITIALIZATION ================= */

  console.log(
    "%cMeetMind AI",
    "font-size:20px;font-weight:bold;color:#7867f7"
  );

  console.log(
    "Meeting intelligence workspace initialized."
  );

});