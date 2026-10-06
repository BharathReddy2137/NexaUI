/* =========================================================
   STUDYPILOT AI
   Frontend prototype
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
    const mobileMenu = document.getElementById("mobileMenu");

    const themeToggle = document.getElementById("themeToggle");
    const mobileTheme = document.getElementById("mobileTheme");

    const notificationBtn = document.getElementById("notificationBtn");
    const notificationPanel = document.getElementById("notificationPanel");
    const closeNotifications = document.getElementById("closeNotifications");

    const commandOverlay = document.getElementById("commandOverlay");
    const commandInput = document.getElementById("commandInput");
    const openCommand = document.getElementById("openCommand");

    const taskOverlay = document.getElementById("taskOverlay");
    const addStudyTask = document.getElementById("addStudyTask");
    const closeTaskModal = document.getElementById("closeTaskModal");

    const toast = document.getElementById("toast");
    const toastText = document.getElementById("toastText");


    /* ================= PAGE NAVIGATION ================= */

    const pageNames = {
        dashboard: "Command Center",
        planner: "Smart Planner",
        focus: "Focus Room",
        subjects: "Subjects",
        tutor: "AI Tutor",
        analytics: "Study Analytics",
        history: "Study History",
        settings: "Settings"
    };


    function navigate(pageId) {

        const target = document.getElementById(pageId);

        if (!target) return;

        pages.forEach(page => {
            page.classList.remove("active");
        });

        target.classList.add("active");

        navItems.forEach(item => {
            item.classList.toggle(
                "active",
                item.dataset.page === pageId
            );
        });

        pageTitle.textContent =
            pageNames[pageId] || "StudyPilot";

        sidebar.classList.remove("open");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        setTimeout(() => {
            if (window.lucide) {
                lucide.createIcons();
            }
        }, 50);
    }


    navItems.forEach(item => {

        item.addEventListener("click", () => {

            navigate(item.dataset.page);

        });

    });


    /* ================= QUICK NAVIGATION ================= */

    document.querySelectorAll("[data-go]").forEach(button => {

        button.addEventListener("click", () => {

            navigate(button.dataset.go);

        });

    });


    /* ================= MOBILE SIDEBAR ================= */

    mobileMenu?.addEventListener("click", () => {

        sidebar.classList.toggle("open");

    });


    /* ================= TOAST ================= */

    let toastTimer;

    function showToast(message) {

        toastText.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 2600);
    }


    /* ================= THEME ================= */

    const savedTheme = localStorage.getItem("studypilot-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }


    function toggleTheme() {

        document.body.classList.toggle("dark");

        localStorage.setItem(
            "studypilot-theme",
            document.body.classList.contains("dark")
                ? "dark"
                : "light"
        );

        showToast(
            document.body.classList.contains("dark")
                ? "Dark mode enabled"
                : "Light mode enabled"
        );
    }


    themeToggle?.addEventListener("click", toggleTheme);
    mobileTheme?.addEventListener("click", toggleTheme);


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


    openCommand?.addEventListener(
        "click",
        openCommandPalette
    );


    commandOverlay.addEventListener("click", event => {

        if (event.target === commandOverlay) {
            closeCommandPalette();
        }

    });


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

            taskOverlay.classList.remove("open");

        }

    });


    document
        .querySelectorAll("[data-command]")
        .forEach(button => {

            button.addEventListener("click", () => {

                navigate(button.dataset.command);

                closeCommandPalette();

            });

        });


    commandInput?.addEventListener("input", () => {

        const query =
            commandInput.value.toLowerCase().trim();

        document
            .querySelectorAll(".command-list button")
            .forEach(button => {

                const visible =
                    button.textContent
                        .toLowerCase()
                        .includes(query);

                button.style.display =
                    visible ? "flex" : "none";

            });

    });


    /* ================= TASK MODAL ================= */

    addStudyTask?.addEventListener("click", () => {

        taskOverlay.classList.add("open");

        document.getElementById("taskName").focus();

    });


    closeTaskModal?.addEventListener("click", () => {

        taskOverlay.classList.remove("open");

    });


    taskOverlay.addEventListener("click", event => {

        if (event.target === taskOverlay) {

            taskOverlay.classList.remove("open");

        }

    });


    /* ================= ADD TASK ================= */

    document
        .getElementById("saveTask")
        ?.addEventListener("click", () => {

            const taskName =
                document.getElementById("taskName").value.trim();

            const subject =
                document.getElementById("taskSubject").value;

            const duration =
                document.getElementById("taskDuration").value;

            if (!taskName) {

                showToast("Enter a task name first");

                return;

            }


            const taskList =
                document.getElementById("studyTasks");


            const task = document.createElement("div");

            task.className = "study-task";

            task.innerHTML = `
                <button class="check-task">
                    <i data-lucide="circle"></i>
                </button>

                <div>
                    <strong>${escapeHTML(taskName)}</strong>
                    <span>${escapeHTML(subject)} · ${escapeHTML(duration)}</span>
                </div>

                <span class="task-tag upcoming">New</span>
            `;


            taskList.appendChild(task);

            if (window.lucide) {
                lucide.createIcons();
            }

            attachTaskHandler(
                task.querySelector(".check-task")
            );


            taskOverlay.classList.remove("open");

            document.getElementById("taskName").value = "";

            showToast("Study task added");
        });


    /* ================= TASK COMPLETION ================= */

    function attachTaskHandler(button) {

        button.addEventListener("click", () => {

            const task =
                button.closest(".study-task");

            task.classList.toggle("completed");

            if (task.classList.contains("completed")) {

                button.innerHTML =
                    `<i data-lucide="check"></i>`;

                const tag =
                    task.querySelector(".task-tag");

                if (tag) {
                    tag.textContent = "Done";
                    tag.classList.remove("upcoming");
                }

                showToast("Task completed");

            } else {

                button.innerHTML =
                    `<i data-lucide="circle"></i>`;

                const tag =
                    task.querySelector(".task-tag");

                if (tag) {
                    tag.textContent = "Next";
                    tag.classList.add("upcoming");
                }

            }

            if (window.lucide) {
                lucide.createIcons();
            }

        });

    }


    document
        .querySelectorAll(".check-task")
        .forEach(attachTaskHandler);


    /* ================= FOCUS TIMER ================= */

    let timerSeconds = 25 * 60;
    let timerRunning = false;
    let timerInterval = null;

    const timerElement =
        document.getElementById("timer");

    const startTimer =
        document.getElementById("startTimer");

    const resetTimer =
        document.getElementById("resetTimer");


    function updateTimer() {

        const minutes =
            Math.floor(timerSeconds / 60);

        const seconds =
            timerSeconds % 60;

        timerElement.textContent =
            `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
    }


    function toggleTimer() {

        if (timerRunning) {

            clearInterval(timerInterval);

            timerRunning = false;

            startTimer.innerHTML = `
                <i data-lucide="play"></i>
                Resume focus
            `;

            showToast("Focus session paused");

        } else {

            timerRunning = true;

            startTimer.innerHTML = `
                <i data-lucide="pause"></i>
                Pause focus
            `;

            showToast("Focus session started");

            timerInterval = setInterval(() => {

                if (timerSeconds <= 0) {

                    clearInterval(timerInterval);

                    timerRunning = false;

                    startTimer.innerHTML = `
                        <i data-lucide="play"></i>
                        Start focus
                    `;

                    showToast("Focus session complete!");

                    return;

                }

                timerSeconds--;

                updateTimer();

            },1000);

        }

        if (window.lucide) {
            lucide.createIcons();
        }

    }


    startTimer?.addEventListener(
        "click",
        toggleTimer
    );


    resetTimer?.addEventListener(
        "click",
        () => {

            clearInterval(timerInterval);

            timerSeconds = 25 * 60;

            timerRunning = false;

            updateTimer();

            startTimer.innerHTML = `
                <i data-lucide="play"></i>
                Start focus
            `;

            if (window.lucide) {
                lucide.createIcons();
            }

            showToast("Focus timer reset");

        }
    );


    /* ================= AI TUTOR ================= */

    const chatMessages =
        document.getElementById("chatMessages");

    const chatInput =
        document.getElementById("chatInput");

    const sendMessage =
        document.getElementById("sendMessage");


    function escapeHTML(value) {

        return String(value)
            .replace(/&/g,"&amp;")
            .replace(/</g,"&lt;")
            .replace(/>/g,"&gt;")
            .replace(/"/g,"&quot;")
            .replace(/'/g,"&#039;");

    }


    function addMessage(text, type = "ai") {

        const message =
            document.createElement("div");

        message.className =
            `message ${type === "user"
                ? "user-message"
                : "ai-message"}`;

        if (type === "ai") {

            message.innerHTML = `
                <div class="message-avatar">✦</div>

                <div class="bubble">

                    <strong>StudyPilot AI</strong>

                    <p>${escapeHTML(text)}</p>

                    <span>Just now</span>

                </div>
            `;

        } else {

            message.innerHTML = `
                <div class="bubble">
                    <p>${escapeHTML(text)}</p>
                    <span>Just now</span>
                </div>
            `;

        }


        chatMessages.appendChild(message);

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }


    function generateAIResponse(question) {

        const q =
            question.toLowerCase();


        if (
            q.includes("recursion") ||
            q.includes("recursive")
        ) {

            return `
Recursion means solving a problem by making the function call itself on a smaller version of the same problem. A recursive solution normally has a base case that stops the calls and a recursive case that reduces the problem size.
            `.trim();

        }


        if (
            q.includes("practice") ||
            q.includes("question")
        ) {

            return `
Try these: 1) Write a recursive factorial function. 2) Find the maximum element in an array. 3) Explain the difference between BFS and DFS. 4) Calculate the time complexity of binary search.
            `.trim();

        }


        if (
            q.includes("plan") ||
            q.includes("study")
        ) {

            return `
A balanced study session could be: 45 minutes of DSA, 10 minutes break, 45 minutes of DAA, 10 minutes break, then 30 minutes of active recall. Finish with five practice questions.
            `.trim();

        }


        if (
            q.includes("python")
        ) {

            return `
For Python, focus on one concept at a time. A good sequence is functions → file handling → exceptions → OOP. After each concept, write a small program instead of only reading notes.
            `.trim();

        }


        if (
            q.includes("data structure") ||
            q.includes("dsa")
        ) {

            return `
Start with arrays and linked lists, then move to stacks and queues. After that, learn trees, heaps and graphs. For every structure, understand operations, implementation and time complexity.
            `.trim();

        }


        return `
I can help break that topic into smaller concepts, create practice questions, or build a study plan around it. Try asking me about a specific concept.
        `.trim();

    }


    function sendChat() {

        const question =
            chatInput.value.trim();

        if (!question) return;

        addMessage(question,"user");

        chatInput.value = "";

        setTimeout(() => {

            addMessage(
                generateAIResponse(question),
                "ai"
            );

        },500);

    }


    sendMessage?.addEventListener(
        "click",
        sendChat
    );


    chatInput?.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                sendChat();

            }

        }
    );


    /* ================= QUICK PROMPTS ================= */

    document
        .querySelectorAll("[data-prompt]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const prompt =
                    button.dataset.prompt;

                chatInput.value = prompt;

                sendChat();

            });

        });


    /* ================= AI RECOMMENDATION ================= */

    document
        .getElementById("openRecommendation")
        ?.addEventListener("click", () => {

            navigate("tutor");

            setTimeout(() => {

                chatInput.value =
                    "Why should I learn recursion next?";

                sendChat();

            },300);

        });


    /* ================= CHART ================= */

    document
        .getElementById("chartSelect")
        ?.addEventListener("change", event => {

            if (event.target.value === "Last week") {

                showToast("Showing last week's study rhythm");

            } else {

                showToast("Showing this week's study rhythm");

            }

        });


    /* ================= HISTORY ================= */

    document
        .getElementById("clearHistory")
        ?.addEventListener("click", () => {

            showToast("History filters are ready");

        });


    /* ================= SETTINGS ================= */

    document
        .querySelectorAll(".switch input")
        .forEach(toggle => {

            toggle.addEventListener("change", () => {

                showToast(
                    toggle.checked
                        ? "Setting enabled"
                        : "Setting disabled"
                );

            });

        });


    /* ================= INITIALIZE ================= */

    updateTimer();

    console.log(
        "%cStudyPilot AI initialized ✦",
        "color:#7667f8;font-weight:bold;"
    );

});