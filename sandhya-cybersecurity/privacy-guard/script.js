/* =========================================================
   PRIVACYGUARD
   Premium Cybersecurity Interface
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    lucide.createIcons();

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const pages = document.querySelectorAll(".page");
    const navItems = document.querySelectorAll(".nav-item[data-page]");
    const pageLinks = document.querySelectorAll("[data-page-link]");
    const pageTitle = document.getElementById("pageTitle");

    const toast = document.getElementById("toast");
    const toastTitle = document.getElementById("toastTitle");
    const toastMessage = document.getElementById("toastMessage");

    const commandModal = document.getElementById("commandModal");
    const commandTrigger = document.getElementById("commandTrigger");
    const commandInput = document.getElementById("commandInput");

    const notificationPanel =
        document.getElementById("notificationPanel");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const closeNotifications =
        document.getElementById("closeNotifications");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.querySelector(".sidebar");


    /* =====================================================
       PAGE NAVIGATION
       ===================================================== */

    const pageNames = {
        overview: "Overview",
        permissions: "Permissions",
        devices: "Devices",
        activity: "Activity",
        privacy: "Privacy Scan",
        settings: "Settings"
    };

    function openPage(pageId) {

        if (!document.getElementById(pageId)) return;

        pages.forEach(page => {
            page.classList.remove("active");
        });

        const target = document.getElementById(pageId);

        target.classList.add("active");

        navItems.forEach(item => {
            item.classList.toggle(
                "active",
                item.dataset.page === pageId
            );
        });

        pageTitle.textContent =
            pageNames[pageId] || "Overview";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        sidebar.classList.remove("mobile-open");

        lucide.createIcons();
    }


    navItems.forEach(item => {

        item.addEventListener("click", () => {

            openPage(item.dataset.page);

        });

    });


    pageLinks.forEach(link => {

        link.addEventListener("click", () => {

            openPage(link.dataset.pageLink);

        });

    });


    /* =====================================================
       TOAST
       ===================================================== */

    let toastTimer;

    function showToast(
        title = "Success",
        message = "Action completed."
    ) {

        toastTitle.textContent = title;
        toastMessage.textContent = message;

        toast.classList.add("active");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {

            toast.classList.remove("active");

        }, 3200);

    }


    /* =====================================================
       PRIVACY SCORE
       ===================================================== */

    let privacyScore = 92;

    const scoreNumber =
        document.getElementById("scoreNumber");

    const scoreRing =
        document.getElementById("scoreRing");


    function updateScore(score) {

        privacyScore = Math.max(
            0,
            Math.min(100, score)
        );

        scoreNumber.textContent = privacyScore;

        const circumference = 452;

        const offset =
            circumference -
            (privacyScore / 100) * circumference;

        scoreRing.style.strokeDashoffset = offset;
    }


    updateScore(92);


    /* =====================================================
       PRIVACY SCAN
       ===================================================== */

    const scanBtn =
        document.getElementById("scanBtn");

    const deepScanBtn =
        document.getElementById("deepScanBtn");

    const scanProgress =
        document.getElementById("scanProgress");

    const scanStatus =
        document.getElementById("scanStatus");

    const scanTitle =
        document.getElementById("scanTitle");

    const scanDescription =
        document.getElementById("scanDescription");

    let scanning = false;


    function runPrivacyScan() {

        if (scanning) return;

        scanning = true;

        openPage("privacy");

        scanTitle.textContent =
            "Analyzing your privacy posture...";

        scanDescription.textContent =
            "PrivacyGuard is checking permissions, devices, exposure signals and recent activity.";

        scanStatus.textContent =
            "Initializing scan...";

        scanProgress.style.width = "0%";

        let progress = 0;

        const interval = setInterval(() => {

            progress += Math.floor(
                Math.random() * 9
            ) + 4;

            if (progress >= 100) {

                progress = 100;

                clearInterval(interval);

                setTimeout(() => {

                    scanning = false;

                    privacyScore = Math.min(
                        98,
                        privacyScore + 3
                    );

                    updateScore(privacyScore);

                    scanTitle.textContent =
                        "Privacy posture is excellent";

                    scanDescription.textContent =
                        "Your privacy configuration looks healthy. One medium-risk signal is recommended for review.";

                    scanStatus.textContent =
                        "Scan completed successfully";

                    showToast(
                        "Privacy scan complete",
                        `Your privacy score is now ${privacyScore}/100.`
                    );

                }, 400);

            }

            scanProgress.style.width =
                `${progress}%`;

            if (progress < 30) {

                scanStatus.textContent =
                    "Checking permissions...";

            } else if (progress < 60) {

                scanStatus.textContent =
                    "Analyzing connected devices...";

            } else if (progress < 85) {

                scanStatus.textContent =
                    "Analyzing privacy exposure...";

            } else {

                scanStatus.textContent =
                    "Generating security report...";

            }

        }, 350);

    }


    scanBtn?.addEventListener(
        "click",
        runPrivacyScan
    );

    deepScanBtn?.addEventListener(
        "click",
        runPrivacyScan
    );


    /* =====================================================
       PERMISSION FILTER
       ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter");

    const permissionCards =
        document.querySelectorAll(".permission-card");

    const permissionSearch =
        document.getElementById("permissionSearch");

    let currentFilter = "all";


    function filterPermissions() {

        const query =
            permissionSearch.value
                .toLowerCase()
                .trim();

        permissionCards.forEach(card => {

            const risk =
                card.dataset.risk;

            const name =
                card.dataset.name.toLowerCase();

            const matchesRisk =
                currentFilter === "all" ||
                risk === currentFilter;

            const matchesSearch =
                !query ||
                name.includes(query);

            card.style.display =
                matchesRisk && matchesSearch
                    ? ""
                    : "none";

        });

    }


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            currentFilter =
                button.dataset.filter;

            filterPermissions();

        });

    });


    permissionSearch?.addEventListener(
        "input",
        filterPermissions
    );


    /* =====================================================
       PERMISSION MANAGEMENT
       ===================================================== */

    document.querySelectorAll(".manage-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const card =
                    button.closest(".permission-card");

                const appName =
                    card.dataset.name;

                showToast(
                    "Permission manager",
                    `Reviewing ${appName} permissions.`
                );

            });

        });


    /* =====================================================
       REVIEW ALL
       ===================================================== */

    document
        .getElementById("reviewAllBtn")
        ?.addEventListener("click", () => {

            showToast(
                "Review started",
                "Your application permissions are being analyzed."
            );

        });


    /* =====================================================
       DEVICES
       ===================================================== */

    document
        .getElementById("secureDevicesBtn")
        ?.addEventListener("click", () => {

            showToast(
                "Devices secured",
                "All trusted devices have been verified."
            );

        });


    /* =====================================================
       ACTIVITY
       ===================================================== */

    document
        .getElementById("clearActivity")
        ?.addEventListener("click", () => {

            showToast(
                "History protected",
                "Visible activity history has been cleared."
            );

        });


    /* =====================================================
       SETTINGS TOGGLES
       ===================================================== */

    document
        .querySelectorAll(".toggle-input")
        .forEach(toggle => {

            toggle.addEventListener("change", () => {

                const row =
                    toggle.closest(".toggle-row");

                const title =
                    row.querySelector("strong")
                        ?.textContent || "Setting";

                showToast(
                    toggle.checked
                        ? "Protection enabled"
                        : "Protection disabled",
                    `${title} has been updated.`
                );

            });

        });


    /* =====================================================
       COMMAND PALETTE
       ===================================================== */

    function openCommandPalette() {

        commandModal.classList.add("active");

        commandInput.value = "";

        setTimeout(() => {
            commandInput.focus();
        }, 100);

    }


    function closeCommandPalette() {

        commandModal.classList.remove("active");

    }


    commandTrigger?.addEventListener(
        "click",
        openCommandPalette
    );


    commandModal?.addEventListener("click", event => {

        if (event.target === commandModal) {

            closeCommandPalette();

        }

    });


    document
        .querySelectorAll("[data-command]")
        .forEach(command => {

            command.addEventListener("click", () => {

                const target =
                    command.dataset.command;

                closeCommandPalette();

                openPage(target);

            });

        });


    commandInput?.addEventListener(
        "input",
        () => {

            const query =
                commandInput.value
                    .toLowerCase()
                    .trim();

            document
                .querySelectorAll(".command-results button")
                .forEach(button => {

                    const text =
                        button.textContent
                            .toLowerCase();

                    button.style.display =
                        !query ||
                        text.includes(query)
                            ? "flex"
                            : "none";

                });

        }
    );


    /* =====================================================
       KEYBOARD SHORTCUTS
       ===================================================== */

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

            notificationPanel
                .classList.remove("active");

        }

    });


    /* =====================================================
       NOTIFICATIONS
       ===================================================== */

    notificationBtn?.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            notificationPanel
                .classList.toggle("active");

        }
    );


    closeNotifications?.addEventListener(
        "click",
        () => {

            notificationPanel
                .classList.remove("active");

        }
    );


    document.addEventListener("click", event => {

        if (
            !notificationPanel.contains(event.target) &&
            !notificationBtn.contains(event.target)
        ) {

            notificationPanel
                .classList.remove("active");

        }

    });


    /* =====================================================
       THEME
       ===================================================== */

    const themeBtn =
        document.getElementById("themeBtn");

    let lightMode = false;

    themeBtn?.addEventListener("click", () => {

        lightMode = !lightMode;

        if (lightMode) {

            document.documentElement.style.setProperty(
                "--bg",
                "#eefbf8"
            );

            document.documentElement.style.setProperty(
                "--bg-soft",
                "#f7fffd"
            );

            document.documentElement.style.setProperty(
                "--panel",
                "rgba(255,255,255,.78)"
            );

            document.documentElement.style.setProperty(
                "--panel-strong",
                "rgba(255,255,255,.94)"
            );

            document.documentElement.style.setProperty(
                "--text",
                "#102d2a"
            );

            document.documentElement.style.setProperty(
                "--text-soft",
                "#4f6d69"
            );

            document.documentElement.style.setProperty(
                "--text-muted",
                "#728d89"
            );

            showToast(
                "Light mode",
                "Appearance changed successfully."
            );

        } else {

            document.documentElement.style.setProperty(
                "--bg",
                "#06101d"
            );

            document.documentElement.style.setProperty(
                "--bg-soft",
                "#091625"
            );

            document.documentElement.style.setProperty(
                "--panel",
                "rgba(13,28,45,.72)"
            );

            document.documentElement.style.setProperty(
                "--panel-strong",
                "rgba(15,32,51,.9)"
            );

            document.documentElement.style.setProperty(
                "--text",
                "#f1f7f7"
            );

            document.documentElement.style.setProperty(
                "--text-soft",
                "#a7b7bd"
            );

            document.documentElement.style.setProperty(
                "--text-muted",
                "#6f858d"
            );

            showToast(
                "Dark mode",
                "Premium dark appearance restored."
            );

        }

    });


    /* =====================================================
       CHART RANGE
       ===================================================== */

    document
        .getElementById("chartRange")
        ?.addEventListener("change", event => {

            const range = event.target.value;

            showToast(
                "Chart updated",
                `Showing privacy exposure for ${range}.`
            );

        });


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    mobileMenu?.addEventListener("click", () => {

        sidebar.classList.toggle("mobile-open");

    });


    /* =====================================================
       INITIALIZE
       ===================================================== */

    updateScore(92);

    lucide.createIcons();

});