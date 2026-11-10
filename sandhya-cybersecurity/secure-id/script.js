/* =========================================================
   SECUREID
   Interactive Identity Security Workspace
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    lucide.createIcons();

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const pages = document.querySelectorAll(".page");
    const navItems = document.querySelectorAll(".nav-item");
    const pageTitle = document.getElementById("pageTitle");

    const sidebar = document.getElementById("sidebar");
    const mobileMenu = document.getElementById("mobileMenu");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const mobileNotification =
        document.getElementById("mobileNotification");

    const notificationPanel =
        document.getElementById("notificationPanel");

    const closeNotifications =
        document.getElementById("closeNotifications");

    const searchTrigger =
        document.getElementById("searchTrigger");

    const commandOverlay =
        document.getElementById("commandOverlay");

    const commandInput =
        document.getElementById("commandInput");

    const toast =
        document.getElementById("toast");

    const toastClose =
        document.getElementById("toastClose");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastMessage =
        document.getElementById("toastMessage");


    /* =====================================================
       PAGE TITLES
    ===================================================== */

    const titles = {
        overview: "Identity Overview",
        authentication: "Authentication",
        devices: "Trusted Devices",
        sessions: "Active Sessions",
        activity: "Login Activity",
        insights: "AI Identity Insights",
        recovery: "Recovery Center",
        settings: "Settings"
    };


    /* =====================================================
       NAVIGATION
    ===================================================== */

    function showPage(pageId) {

        pages.forEach(page => {
            page.classList.remove("active");
        });

        const target = document.getElementById(pageId);

        if (target) {
            target.classList.add("active");
        }

        navItems.forEach(item => {
            item.classList.toggle(
                "active",
                item.dataset.page === pageId
            );
        });

        if (pageTitle) {
            pageTitle.textContent =
                titles[pageId] || "SecureID";
        }

        sidebar.classList.remove("open");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        setTimeout(() => {
            lucide.createIcons();
        }, 50);
    }


    navItems.forEach(item => {

        item.addEventListener("click", () => {

            showPage(item.dataset.page);

        });

    });


    /* =====================================================
       DATA-GO BUTTONS
    ===================================================== */

    document.querySelectorAll("[data-go]").forEach(button => {

        button.addEventListener("click", () => {

            const destination = button.dataset.go;

            if (destination) {
                showPage(destination);
            }

        });

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (mobileMenu) {

        mobileMenu.addEventListener("click", () => {

            sidebar.classList.toggle("open");

        });

    }


    /* =====================================================
       NOTIFICATIONS
    ===================================================== */

    function toggleNotifications() {

        notificationPanel.classList.toggle("open");

    }


    notificationBtn?.addEventListener(
        "click",
        toggleNotifications
    );

    mobileNotification?.addEventListener(
        "click",
        toggleNotifications
    );


    closeNotifications?.addEventListener(
        "click",
        () => {
            notificationPanel.classList.remove("open");
        }
    );


    document.addEventListener("click", event => {

        if (
            notificationPanel.classList.contains("open") &&
            !notificationPanel.contains(event.target) &&
            !notificationBtn?.contains(event.target) &&
            !mobileNotification?.contains(event.target)
        ) {

            notificationPanel.classList.remove("open");

        }

    });


    /* =====================================================
       COMMAND PALETTE
    ===================================================== */

    function openCommandPalette() {

        commandOverlay.classList.add("open");

        setTimeout(() => {
            commandInput?.focus();
        }, 100);

    }


    function closeCommandPalette() {

        commandOverlay.classList.remove("open");

        if (commandInput) {
            commandInput.value = "";
        }

    }


    searchTrigger?.addEventListener(
        "click",
        openCommandPalette
    );


    commandOverlay?.addEventListener("click", event => {

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

            notificationPanel.classList.remove("open");

        }

    });


    document
        .querySelectorAll("[data-command]")
        .forEach(command => {

            command.addEventListener("click", () => {

                const destination =
                    command.dataset.command;

                closeCommandPalette();

                showPage(destination);

            });

        });


    /* =====================================================
       COMMAND SEARCH
    ===================================================== */

    commandInput?.addEventListener("input", () => {

        const query =
            commandInput.value
                .toLowerCase()
                .trim();

        document
            .querySelectorAll(".command-results button")
            .forEach(button => {

                const text =
                    button.textContent.toLowerCase();

                button.style.display =
                    !query || text.includes(query)
                        ? "flex"
                        : "none";

            });

    });


    /* =====================================================
       TOAST
    ===================================================== */

    let toastTimer;

    function showToast(
        title = "Security action complete",
        message = "SecureID has updated your identity workspace."
    ) {

        toastTitle.textContent = title;
        toastMessage.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 4000);

    }


    toastClose?.addEventListener(
        "click",
        () => {
            toast.classList.remove("show");
        }
    );


    /* =====================================================
       SECURITY CHECK
    ===================================================== */

    const runCheck =
        document.getElementById("runCheck");

    const identityScore =
        document.getElementById("identityScore");


    runCheck?.addEventListener("click", () => {

        runCheck.disabled = true;

        const originalHTML =
            runCheck.innerHTML;

        runCheck.innerHTML = `
            <i data-lucide="loader-circle"></i>
            Scanning...
        `;

        lucide.createIcons();


        let progress = 0;

        const interval =
            setInterval(() => {

                progress += 20;

                if (identityScore) {

                    const values =
                        [96, 96, 97, 97, 98];

                    identityScore.textContent =
                        values[Math.floor(progress / 20) - 1] || 98;

                }

                if (progress >= 100) {

                    clearInterval(interval);

                    runCheck.disabled = false;

                    runCheck.innerHTML =
                        originalHTML;

                    lucide.createIcons();

                    showToast(
                        "Security check complete",
                        "No critical identity risks were detected."
                    );

                }

            }, 280);

    });


    /* =====================================================
       DEVICE REFRESH
    ===================================================== */

    const refreshDevices =
        document.getElementById("refreshDevices");

    refreshDevices?.addEventListener("click", () => {

        const original =
            refreshDevices.innerHTML;

        refreshDevices.innerHTML = `
            <i data-lucide="loader-circle"></i>
            Checking...
        `;

        refreshDevices.disabled = true;

        lucide.createIcons();

        setTimeout(() => {

            refreshDevices.innerHTML = original;
            refreshDevices.disabled = false;

            lucide.createIcons();

            showToast(
                "Devices refreshed",
                "All trusted devices are currently recognized."
            );

        }, 1200);

    });


    /* =====================================================
       REVIEW RECOVERY
    ===================================================== */

    const reviewRecovery =
        document.getElementById("reviewRecovery");

    reviewRecovery?.addEventListener("click", () => {

        showToast(
            "Recovery review started",
            "Your recovery readiness has been checked."
        );

    });


    /* =====================================================
       SESSION REVIEW
    ===================================================== */

    const endOtherSessions =
        document.getElementById("endOtherSessions");

    endOtherSessions?.addEventListener("click", () => {

        showToast(
            "Session review ready",
            "All currently active sessions are trusted."
        );

    });


    /* =====================================================
       SMALL BUTTONS
    ===================================================== */

    document.querySelectorAll(".small-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                showToast(
                    "Security settings opened",
                    "This interface is ready for backend integration."
                );

            });

        });


    /* =====================================================
       DEVICE MENU
    ===================================================== */

    document.querySelectorAll(".more-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                showToast(
                    "Device options",
                    "Device management controls are available here."
                );

            });

        });


    /* =====================================================
       FILTER BUTTON
    ===================================================== */

    document.querySelector(".filter-btn")
        ?.addEventListener("click", () => {

            showToast(
                "Activity filter",
                "Identity events are currently showing the latest activity."
            );

        });


    /* =====================================================
       SETTINGS SWITCHES
    ===================================================== */

    document.querySelectorAll(".switch input")
        .forEach(toggle => {

            toggle.addEventListener("change", () => {

                const row =
                    toggle.closest(".setting-row");

                const name =
                    row?.querySelector("strong")
                        ?.textContent ||
                    "Security setting";

                showToast(
                    `${name} updated`,
                    toggle.checked
                        ? "Monitoring has been enabled."
                        : "Monitoring has been disabled."
                );

            });

        });


    /* =====================================================
       AI LIVE EFFECT
    ===================================================== */

    const aiConfidenceValues =
        [96, 97, 95, 98, 96];

    let confidenceIndex = 0;

    setInterval(() => {

        confidenceIndex =
            (confidenceIndex + 1) %
            aiConfidenceValues.length;

        const score =
            document.querySelector(".ai-score-card > strong");

        if (score) {

            score.textContent =
                `${aiConfidenceValues[confidenceIndex]}%`;

        }

    }, 6000);


    /* =====================================================
       SUBTLE IDENTITY SCORE PULSE
    ===================================================== */

    setInterval(() => {

        const score =
            document.querySelector(".identity-ring");

        if (!score) return;

        score.animate(
            [
                {
                    transform: "scale(1)"
                },
                {
                    transform: "scale(1.025)"
                },
                {
                    transform: "scale(1)"
                }
            ],
            {
                duration: 1300,
                easing: "ease-in-out"
            }
        );

    }, 7000);


    /* =====================================================
       INITIAL ICON REFRESH
    ===================================================== */

    lucide.createIcons();

});