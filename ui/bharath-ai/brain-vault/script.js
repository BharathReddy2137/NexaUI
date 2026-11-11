/* =========================================================
   BRAINVAULT AI — SCRIPT.JS
   Interactive Knowledge OS
========================================================= */


/* =========================================================
   GLOBAL ELEMENTS
========================================================= */

const body = document.body;

const sidebar = document.getElementById("sidebar");
const mobileOverlay = document.getElementById("mobileOverlay");

const menuButton = document.getElementById("menuButton");
const mobileSearchButton = document.getElementById("mobileSearchButton");

const breadcrumbPage = document.getElementById("breadcrumbPage");

const themeButton = document.getElementById("themeButton");

const notificationButton =
    document.getElementById("notificationButton");

const notificationPanel =
    document.getElementById("notificationPanel");

const closeNotifications =
    document.getElementById("closeNotifications");

const searchModal =
    document.getElementById("searchModal");

const globalSearchButton =
    document.getElementById("globalSearchButton");

const globalSearchInput =
    document.getElementById("globalSearchInput");

const toast =
    document.getElementById("toast");


/* =========================================================
   PAGE NAMES
========================================================= */

const pageNames = {

    overview: "Overview",

    vault: "Knowledge Vault",

    capture: "Capture",

    collections: "Collections",

    assistant: "AI Assistant",

    insights: "Knowledge Insights",

    search: "Semantic Search",

    settings: "Settings"

};


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function openPage(pageId) {

    const targetPage =
        document.getElementById(pageId);

    if (!targetPage) {
        return;
    }


    /* Hide every page */

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });


    /* Show selected page */

    targetPage.classList.add("active");


    /* Update sidebar */

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.toggle(
                "active",
                item.dataset.page === pageId
            );

        });


    /* Update breadcrumb */

    if (breadcrumbPage) {

        breadcrumbPage.textContent =
            pageNames[pageId] || "Overview";

    }


    /* Close mobile menu */

    closeMobileMenu();


    /* Scroll to top */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   NAVIGATION CLICK EVENTS
========================================================= */

document.addEventListener("click", event => {

    const button =
        event.target.closest("[data-page]");

    if (!button) {
        return;
    }

    const page =
        button.dataset.page;

    if (page) {

        openPage(page);

    }

});


/* =========================================================
   MOBILE MENU
========================================================= */

function openMobileMenu() {

    if (!sidebar) return;

    sidebar.classList.add("open");

    mobileOverlay.classList.add("active");

}


function closeMobileMenu() {

    if (!sidebar) return;

    sidebar.classList.remove("open");

    mobileOverlay.classList.remove("active");

}


if (menuButton) {

    menuButton.addEventListener(
        "click",
        openMobileMenu
    );

}


if (mobileOverlay) {

    mobileOverlay.addEventListener(
        "click",
        closeMobileMenu
    );

}


/* =========================================================
   MOBILE SEARCH
========================================================= */

if (mobileSearchButton) {

    mobileSearchButton.addEventListener(
        "click",
        openSearchModal
    );

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function showToast(message) {

    if (!toast) return;

    clearTimeout(toastTimer);

    toast.textContent = message;

    toast.classList.add("show");

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2600);

}


/* =========================================================
   THEME
========================================================= */

function updateThemeIcon() {

    if (!themeButton) return;

    if (body.classList.contains("light")) {

        themeButton.textContent = "☀";

    } else {

        themeButton.textContent = "◐";

    }

}


function toggleTheme() {

    body.classList.toggle("light");

    const isLight =
        body.classList.contains("light");


    localStorage.setItem(
        "brainvault-theme",
        isLight ? "light" : "dark"
    );


    updateThemeIcon();


    showToast(
        isLight
            ? "Light theme enabled"
            : "Dark theme enabled"
    );

}


if (themeButton) {

    themeButton.addEventListener(
        "click",
        toggleTheme
    );

}


/* Restore theme */

const savedTheme =
    localStorage.getItem("brainvault-theme");

if (savedTheme === "light") {

    body.classList.add("light");

}

updateThemeIcon();


/* =========================================================
   NOTIFICATIONS
========================================================= */

function toggleNotifications() {

    notificationPanel.classList.toggle("active");

}


if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            toggleNotifications();

        }
    );

}


if (closeNotifications) {

    closeNotifications.addEventListener(
        "click",
        () => {

            notificationPanel.classList.remove(
                "active"
            );

        }
    );

}


/* Close notification panel outside */

document.addEventListener("click", event => {

    if (
        notificationPanel &&
        notificationPanel.classList.contains("active") &&
        !notificationPanel.contains(event.target) &&
        !notificationButton.contains(event.target)
    ) {

        notificationPanel.classList.remove(
            "active"
        );

    }

});


/* =========================================================
   SEARCH MODAL
========================================================= */

function openSearchModal() {

    if (!searchModal) return;

    searchModal.classList.add("active");

    setTimeout(() => {

        if (globalSearchInput) {

            globalSearchInput.focus();

        }

    }, 100);

}


function closeSearchModal() {

    if (!searchModal) return;

    searchModal.classList.remove("active");

}


if (globalSearchButton) {

    globalSearchButton.addEventListener(
        "click",
        openSearchModal
    );

}


/* Close modal buttons */

document
    .querySelectorAll("[data-close]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    document.getElementById(
                        button.dataset.close
                    );

                if (target) {

                    target.classList.remove(
                        "active"
                    );

                }

            }
        );

    });


/* Click outside search modal */

if (searchModal) {

    searchModal.addEventListener(
        "click",
        event => {

            if (event.target === searchModal) {

                closeSearchModal();

            }

        }
    );

}


/* Escape */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeSearchModal();

            if (notificationPanel) {

                notificationPanel.classList.remove(
                    "active"
                );

            }

            closeMobileMenu();

        }

    }
);


/* Ctrl + K */

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            openSearchModal();

        }

    }
);


/* =========================================================
   GLOBAL SEARCH
========================================================= */

const globalResults =
    document.getElementById("globalResults");

if (globalSearchInput) {

    globalSearchInput.addEventListener(
        "input",
        () => {

            const query =
                globalSearchInput.value
                    .toLowerCase()
                    .trim();


            if (!globalResults) return;


            const items =
                globalResults.querySelectorAll(
                    "button"
                );


            items.forEach(item => {

                const text =
                    item.textContent
                        .toLowerCase();

                item.style.display =
                    !query ||
                    text.includes(query)
                        ? "flex"
                        : "none";

            });

        }
    );

}


/* Global result navigation */

if (globalResults) {

    globalResults.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-page]"
                );

            if (!button) return;

            const page =
                button.dataset.page;

            closeSearchModal();

            openPage(page);

            if (globalSearchInput) {

                globalSearchInput.value = "";

            }

        }
    );

}


/* =========================================================
   KNOWLEDGE VAULT SEARCH
========================================================= */

const vaultSearch =
    document.getElementById("vaultSearch");

const vaultFilter =
    document.getElementById("vaultFilter");

const vaultCards =
    document.querySelectorAll(".vault-card");


function filterVault() {

    const query =
        vaultSearch
            ? vaultSearch.value
                .toLowerCase()
                .trim()
            : "";


    const category =
        vaultFilter
            ? vaultFilter.value
            : "all";


    vaultCards.forEach(card => {

        const text =
            card.textContent
                .toLowerCase();

        const cardCategory =
            card.dataset.category;


        const matchesText =
            !query ||
            text.includes(query);


        const matchesCategory =
            category === "all" ||
            cardCategory === category;


        card.style.display =
            matchesText && matchesCategory
                ? ""
                : "none";

    });

}


if (vaultSearch) {

    vaultSearch.addEventListener(
        "input",
        filterVault
    );

}


if (vaultFilter) {

    vaultFilter.addEventListener(
        "change",
        filterVault
    );

}


/* =========================================================
   CAPTURE / EDITOR
========================================================= */

const editorTitle =
    document.getElementById("editorTitle");

const editorBody =
    document.getElementById("editorBody");

const editorWords =
    document.getElementById("editorWords");

const saveKnowledge =
    document.getElementById("saveKnowledge");


function updateWordCount() {

    if (!editorBody || !editorWords) {
        return;
    }


    const text =
        editorBody.value.trim();


    if (!text) {

        editorWords.textContent =
            "0 words";

        return;

    }


    const words =
        text.split(/\s+/).filter(Boolean);


    editorWords.textContent =
        `${words.length} words`;

}


if (editorBody) {

    editorBody.addEventListener(
        "input",
        updateWordCount
    );

}


/* Save knowledge */

if (saveKnowledge) {

    saveKnowledge.addEventListener(
        "click",
        () => {

            const title =
                editorTitle.value.trim();

            const content =
                editorBody.value.trim();


            if (!title && !content) {

                showToast(
                    "Write something before saving."
                );

                editorTitle.focus();

                return;

            }


            const finalTitle =
                title || "Untitled Knowledge";


            const newCard =
                createKnowledgeCard(
                    finalTitle,
                    content
                );


            const vaultGrid =
                document.getElementById(
                    "vaultGrid"
                );


            if (vaultGrid) {

                vaultGrid.prepend(
                    newCard
                );

            }


            editorTitle.value = "";

            editorBody.value = "";

            updateWordCount();


            showToast(
                "Knowledge saved successfully ✦"
            );


            setTimeout(() => {

                openPage("vault");

            }, 500);

        }
    );

}


/* =========================================================
   CREATE KNOWLEDGE CARD
========================================================= */

function createKnowledgeCard(title, content) {

    const article =
        document.createElement("article");


    article.className =
        "vault-card";

    article.dataset.category =
        "ideas";


    const preview =
        content
            ? content.substring(0, 130)
            : "New knowledge captured in BrainVault.";


    article.innerHTML = `

        <div class="vault-card-top">

            <span class="tag cyan">
                NEW IDEA
            </span>

            <button class="card-menu">
                •••
            </button>

        </div>


        <div class="vault-card-icon cyan">
            ✦
        </div>


        <h2>
            ${escapeHTML(title)}
        </h2>


        <p>
            ${escapeHTML(preview)}
            ${content.length > 130 ? "..." : ""}
        </p>


        <div class="vault-card-footer">

            <span>
                Just now
            </span>

            <span>
                New capture
            </span>

        </div>

    `;


    return article;

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   AI ASSISTANT
========================================================= */

const chatMessages =
    document.getElementById("chatMessages");

const chatInput =
    document.getElementById("chatInput");

const sendMessage =
    document.getElementById("sendMessage");

const quickPrompts =
    document.querySelectorAll(
        ".quick-prompts button"
    );


/* AI response generator */

function getAIResponse(message) {

    const text =
        message.toLowerCase();


    if (
        text.includes("connection") ||
        text.includes("connected")
    ) {

        return `
            Your strongest connection appears to be
            between <strong>AI, UX and Future Interfaces</strong>.
            BrainVault currently detects 87 connections,
            with this cluster showing a 94% confidence score.
        `;

    }


    if (
        text.includes("summarize") ||
        text.includes("summary")
    ) {

        return `
            Your recent ideas focus mainly on
            <strong>artificial intelligence, interface design,
            personal knowledge systems and human-AI collaboration</strong>.
            These topics form a strong emerging knowledge cluster.
        `;

    }


    if (
        text.includes("next") ||
        text.includes("explore")
    ) {

        return `
            Based on your current knowledge,
            a useful next area to explore would be
            <strong>AI-native interfaces</strong>.
            It connects several existing ideas in your vault.
        `;

    }


    if (
        text.includes("trend") ||
        text.includes("growing")
    ) {

        return `
            Your fastest-growing topics are
            <strong>AI interfaces, personal AI systems
            and knowledge graphs</strong>.
            They account for most of your recent captures.
        `;

    }


    return `
        I found several related ideas in your knowledge.
        The strongest current themes are
        <strong>AI, UX, research and future technology</strong>.
        Try asking me to find connections or suggest
        what you should explore next.
    `;

}


/* Add chat message */

function addUserMessage(text) {

    const message =
        document.createElement("div");

    message.className =
        "chat-message user";


    message.innerHTML = `

        <div class="message-content">

            <small>You</small>

            <p>
                ${escapeHTML(text)}
            </p>

        </div>

    `;


    chatMessages.appendChild(message);

    scrollChat();

}


/* Add AI message */

function addAIMessage(text) {

    const message =
        document.createElement("div");

    message.className =
        "chat-message ai";


    message.innerHTML = `

        <div class="chat-avatar">
            ✦
        </div>

        <div class="message-content">

            <small>BrainVault AI</small>

            <p>
                ${text}
            </p>

        </div>

    `;


    chatMessages.appendChild(message);

    scrollChat();

}


/* Scroll chat */

function scrollChat() {

    if (!chatMessages) return;

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


/* Send */

function sendChatMessage() {

    if (!chatInput) return;


    const text =
        chatInput.value.trim();


    if (!text) {

        return;

    }


    addUserMessage(text);

    chatInput.value = "";


    /* Thinking delay */

    const typing =
        document.createElement("div");

    typing.className =
        "chat-message ai";

    typing.innerHTML = `

        <div class="chat-avatar">
            ✦
        </div>

        <div class="message-content">

            <small>BrainVault AI</small>

            <p>
                Thinking...
            </p>

        </div>

    `;


    chatMessages.appendChild(typing);

    scrollChat();


    setTimeout(() => {

        typing.remove();

        addAIMessage(
            getAIResponse(text)
        );

    }, 850);

}


if (sendMessage) {

    sendMessage.addEventListener(
        "click",
        sendChatMessage
    );

}


if (chatInput) {

    chatInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                sendChatMessage();

            }

        }
    );

}


/* Quick prompts */

quickPrompts.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const prompt =
                button.dataset.prompt;

            if (!prompt) return;

            chatInput.value = prompt;

            sendChatMessage();

        }
    );

});


/* =========================================================
   SEMANTIC SEARCH
========================================================= */

const semanticSearch =
    document.getElementById("semanticSearch");

const semanticResults =
    document.getElementById("semanticResults");


if (semanticSearch) {

    semanticSearch.addEventListener(
        "input",
        () => {

            const query =
                semanticSearch.value
                    .toLowerCase()
                    .trim();


            const results =
                semanticResults.querySelectorAll(
                    "article"
                );


            results.forEach(result => {

                const text =
                    result.textContent
                        .toLowerCase();


                result.style.display =
                    !query ||
                    text.includes(query) ||
                    query.includes("ai") ||
                    query.includes("interface")
                        ? "flex"
                        : "none";

            });

        }
    );

}


/* =========================================================
   GRAPH NODE INTERACTION
========================================================= */

document
    .querySelectorAll(".graph-node")
    .forEach(node => {

        node.addEventListener(
            "click",
            () => {

                const topic =
                    node.textContent.trim();


                showToast(
                    `${topic} knowledge cluster selected`
                );

            }
        );

    });


/* =========================================================
   COLLECTION BUTTONS
========================================================= */

document
    .querySelectorAll(".collection-card button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const collection =
                    button
                        .closest(".collection-card")
                        .querySelector("h2")
                        .textContent;


                showToast(
                    `${collection} collection opened`
                );

            }
        );

    });


/* =========================================================
   CARD MENU
========================================================= */

document
    .querySelectorAll(".card-menu")
    .forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                showToast(
                    "Knowledge options opened"
                );

            }
        );

    });


/* =========================================================
   PROFILE BUTTON
========================================================= */

const profileButton =
    document.querySelector(".profile-button");


if (profileButton) {

    profileButton.addEventListener(
        "click",
        () => {

            openPage("settings");

            showToast(
                "Workspace settings opened"
            );

        }
    );

}


/* =========================================================
   AI SIDEBAR BUTTON
========================================================= */

document
    .querySelectorAll(".sidebar-ai")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openPage("assistant");

            }
        );

    });


/* =========================================================
   AUTO SAVE DRAFT
========================================================= */

if (editorTitle && editorBody) {

    editorTitle.value =
        localStorage.getItem(
            "brainvault-draft-title"
        ) || "";


    editorBody.value =
        localStorage.getItem(
            "brainvault-draft-body"
        ) || "";


    updateWordCount();


    editorTitle.addEventListener(
        "input",
        saveDraft
    );


    editorBody.addEventListener(
        "input",
        saveDraft
    );

}


function saveDraft() {

    if (!editorTitle || !editorBody) {
        return;
    }


    localStorage.setItem(
        "brainvault-draft-title",
        editorTitle.value
    );


    localStorage.setItem(
        "brainvault-draft-body",
        editorBody.value
    );

}


/* Clear draft after successful save */

function clearDraft() {

    localStorage.removeItem(
        "brainvault-draft-title"
    );

    localStorage.removeItem(
        "brainvault-draft-body"
    );

}


/* =========================================================
   OVERRIDE SAVE TO CLEAR DRAFT
========================================================= */

if (saveKnowledge) {

    saveKnowledge.addEventListener(
        "click",
        () => {

            setTimeout(() => {

                clearDraft();

            }, 100);

        }
    );

}


/* =========================================================
   INITIALIZATION
========================================================= */

openPage("overview");

console.log(
    "%cBrainVault AI",
    "font-size:24px;font-weight:bold;color:#9b7cff;"
);

console.log(
    "%cKnowledge OS initialized successfully.",
    "color:#62e7c4;"
);