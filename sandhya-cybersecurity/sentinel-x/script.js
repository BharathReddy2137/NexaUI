document.addEventListener("DOMContentLoaded", () => {

    lucide.createIcons();


    /* ==========================================
       ELEMENTS
    ========================================== */

    const pages =
        document.querySelectorAll(".page");

    const navItems =
        document.querySelectorAll(".nav-item[data-page]");

    const pageLinks =
        document.querySelectorAll("[data-page-link]");

    const pageTitle =
        document.getElementById("pageTitle");

    const sidebar =
        document.querySelector(".sidebar");

    const mobileMenu =
        document.getElementById("mobileMenu");


    const toast =
        document.getElementById("toast");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastMessage =
        document.getElementById("toastMessage");


    /* ==========================================
       PAGE NAVIGATION
    ========================================== */

    const pageNames = {

        overview: "Command Center",
        threats: "Threats",
        incidents: "Incidents",
        endpoints: "Endpoints",
        network: "Network",
        intelligence: "AI Intelligence",
        activity: "Event Stream",
        settings: "Settings"

    };


    function openPage(pageId) {

        const target =
            document.getElementById(pageId);

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
            pageNames[pageId] || "Command Center";


        sidebar.classList.remove(
            "mobile-open"
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


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


    /* ==========================================
       TOAST
    ========================================== */

    let toastTimer;


    function showToast(
        title,
        message
    ) {

        toastTitle.textContent =
            title || "Success";

        toastMessage.textContent =
            message || "Action completed.";


        toast.classList.add("active");


        clearTimeout(toastTimer);


        toastTimer =
            setTimeout(() => {

                toast.classList.remove("active");

            }, 3200);

    }


    /* ==========================================
       NETWORK SCAN
    ========================================== */

    const scanButton =
        document.getElementById("scanNetworkBtn");


    let scanning = false;


    scanButton?.addEventListener(
        "click",
        () => {

            if (scanning) return;

            scanning = true;


            const originalHTML =
                scanButton.innerHTML;


            let progress = 0;


            scanButton.innerHTML = `
                <i data-lucide="loader-circle"></i>
                Scanning...
            `;


            lucide.createIcons();


            const interval =
                setInterval(() => {

                    progress +=
                        Math.floor(
                            Math.random() * 15
                        ) + 5;


                    if (progress >= 100) {

                        progress = 100;

                        clearInterval(interval);


                        scanning = false;


                        scanButton.innerHTML =
                            originalHTML;


                        lucide.createIcons();


                        showToast(
                            "Infrastructure scan complete",
                            "24 endpoints analyzed. No new critical threats found."
                        );

                    }

                }, 280);

        }
    );


    /* ==========================================
       THREAT FILTERING
    ========================================== */

    const threatSearch =
        document.getElementById("threatSearch");

    const threatRows =
        document.querySelectorAll(".table-row");


    let threatFilter = "all";


    function filterThreats() {

        const query =
            threatSearch?.value
                .toLowerCase()
                .trim() || "";


        threatRows.forEach(row => {

            const severity =
                row.dataset.threat;

            const name =
                row.dataset.name
                    .toLowerCase();


            const matchesFilter =
                threatFilter === "all" ||
                severity === threatFilter;


            const matchesSearch =
                !query ||
                name.includes(query);


            row.style.display =
                matchesFilter && matchesSearch
                    ? ""
                    : "none";

        });

    }


    document
        .querySelectorAll("[data-threat-filter]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            "[data-threat-filter]"
                        )
                        .forEach(btn => {

                            btn.classList.remove(
                                "active"
                            );

                        });


                    button.classList.add(
                        "active"
                    );


                    threatFilter =
                        button.dataset.threatFilter;


                    filterThreats();

                }
            );

        });


    threatSearch?.addEventListener(
        "input",
        filterThreats
    );


    /* ==========================================
       REFRESH THREATS
    ========================================== */

    document
        .getElementById("refreshThreats")
        ?.addEventListener(
            "click",
            () => {

                showToast(
                    "Threat feed refreshed",
                    "SentinelX checked the latest security events."
                );

            }
        );


    /* ==========================================
       INVESTIGATE THREAT
    ========================================== */

    document
        .querySelectorAll(".investigate-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    showToast(
                        "Threat investigation",
                        "Opening analyst investigation workspace."
                    );

                    setTimeout(() => {

                        openPage(
                            "intelligence"
                        );

                    }, 450);

                }
            );

        });


    /* ==========================================
       INCIDENTS
    ========================================== */

    document
        .getElementById("newIncidentBtn")
        ?.addEventListener(
            "click",
            () => {

                showToast(
                    "Incident workspace",
                    "New incident investigation workspace created."
                );

            }
        );


    document
        .querySelectorAll(".manage-incident")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    showToast(
                        "Investigation opened",
                        "Incident response workspace is ready."
                    );

                }
            );

        });


    /* ==========================================
       ENDPOINT SCAN
    ========================================== */

    document
        .getElementById("endpointScan")
        ?.addEventListener(
            "click",
            () => {

                showToast(
                    "Endpoint scan started",
                    "SentinelX is checking connected systems."
                );

            }
        );


    /* ==========================================
       ANALYTICS RANGE
    ========================================== */

    document
        .getElementById("analyticsRange")
        ?.addEventListener(
            "change",
            event => {

                showToast(
                    "Analytics updated",
                    `Showing threat activity for ${event.target.value}.`
                );

            }
        );


    /* ==========================================
       SETTINGS
    ========================================== */

    document
        .querySelectorAll(".toggle-input")
        .forEach(toggle => {

            toggle.addEventListener(
                "change",
                () => {

                    const row =
                        toggle.closest(".toggle-row");

                    const title =
                        row
                            ?.querySelector("strong")
                            ?.textContent ||
                        "Setting";


                    showToast(
                        toggle.checked
                            ? "Protection enabled"
                            : "Protection disabled",
                        `${title} has been updated.`
                    );

                }
            );

        });


    /* ==========================================
       COMMAND PALETTE
    ========================================== */

    const commandModal =
        document.getElementById(
            "commandModal"
        );

    const commandTrigger =
        document.getElementById(
            "commandTrigger"
        );

    const commandInput =
        document.getElementById(
            "commandInput"
        );


    function openCommandPalette() {

        commandModal.classList.add(
            "active"
        );


        commandInput.value = "";


        setTimeout(() => {

            commandInput.focus();

        }, 100);

    }


    function closeCommandPalette() {

        commandModal.classList.remove(
            "active"
        );

    }


    commandTrigger?.addEventListener(
        "click",
        openCommandPalette
    );


    commandModal?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                commandModal
            ) {

                closeCommandPalette();

            }

        }
    );


    commandInput?.addEventListener(
        "input",
        () => {

            const query =
                commandInput.value
                    .toLowerCase()
                    .trim();


            document
                .querySelectorAll(
                    ".command-results button"
                )
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


    document
        .querySelectorAll("[data-command]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openPage(
                        button.dataset.command
                    );


                    closeCommandPalette();

                }
            );

        });


    /* ==========================================
       KEYBOARD
    ========================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                (event.ctrlKey ||
                 event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                openCommandPalette();

            }


            if (event.key === "Escape") {

                closeCommandPalette();

                document
                    .getElementById(
                        "notificationPanel"
                    )
                    ?.classList.remove(
                        "active"
                    );

            }

        }
    );


    /* ==========================================
       NOTIFICATIONS
    ========================================== */

    const notificationBtn =
        document.getElementById(
            "notificationBtn"
        );

    const notificationPanel =
        document.getElementById(
            "notificationPanel"
        );

    const closeNotifications =
        document.getElementById(
            "closeNotifications"
        );


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


    document.addEventListener(
        "click",
        event => {

            if (
                notificationPanel &&
                !notificationPanel.contains(
                    event.target
                ) &&
                !notificationBtn.contains(
                    event.target
                )
            ) {

                notificationPanel
                    .classList.remove(
                        "active"
                    );

            }

        }
    );


    /* ==========================================
       MOBILE
    ========================================== */

    mobileMenu?.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "mobile-open"
            );

        }
    );


    /* ==========================================
       LIVE THREAT COUNTER
    ========================================== */

    const threatCounter =
        document.getElementById(
            "activeThreats"
        );


    setInterval(() => {

        if (!threatCounter) return;


        const current =
            Number(
                threatCounter.textContent
            );


        const variation =
            Math.random();


        if (variation > .72) {

            threatCounter.textContent =
                Math.max(
                    6,
                    current - 1
                );

        }

        else if (variation < .08) {

            threatCounter.textContent =
                Math.min(
                    12,
                    current + 1
                );

        }

    }, 7000);


    /* ==========================================
       INITIALIZE
    ========================================== */

    lucide.createIcons();

});