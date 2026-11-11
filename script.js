// ==========================================
// NEXAUI — MAIN HOMEPAGE
// ==========================================


// ------------------------------------------
// LUCIDE ICONS
// ------------------------------------------

lucide.createIcons();


// ------------------------------------------
// CURSOR GLOW
// ------------------------------------------

const cursorGlow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left = event.clientX + "px";
    cursorGlow.style.top = event.clientY + "px";

});


// ------------------------------------------
// THEME
// ------------------------------------------

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("nexaui-theme");

if (savedTheme === "light") {
    document.body.classList.add("light");
    themeBtn.innerHTML = `<i data-lucide="moon"></i>`;
    lucide.createIcons();
}


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    localStorage.setItem(
        "nexaui-theme",
        isLight ? "light" : "dark"
    );

    themeBtn.innerHTML = isLight
        ? `<i data-lucide="moon"></i>`
        : `<i data-lucide="sun"></i>`;

    lucide.createIcons();

});


// ------------------------------------------
// SCROLL REVEAL
// ------------------------------------------

const revealElements = document.querySelectorAll(
    ".project-card, .flow-item, .system-copy, .system-preview, .about-card"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {
    revealObserver.observe(element);
});


// ------------------------------------------
// PROJECT CARD TILT
// ------------------------------------------

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        if (window.innerWidth < 900) return;

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const rotateX =
            ((y / rect.height) - 0.5) * -5;

        const rotateY =
            ((x / rect.width) - 0.5) * 5;

        card.style.transform =
            `translateY(-10px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


// ------------------------------------------
// NAVIGATION
// ------------------------------------------

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (targetId === "#") return;

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});


// ------------------------------------------
// ACTIVE SECTION
// ------------------------------------------

const sections = document.querySelectorAll(
    "section[id]"
);

const navLinks =
    document.querySelectorAll(".navbar nav a");


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    navLinks.forEach((link) => {

                        link.style.color =
                            "var(--muted)";

                    });

                    const active =
                        document.querySelector(
                            `.navbar nav a[href="#${entry.target.id}"]`
                        );

                    if (active) {

                        active.style.color =
                            "var(--text)";

                    }

                }

            });

        },
        {
            threshold: 0.35
        }
    );


sections.forEach((section) => {
    sectionObserver.observe(section);
});


// ------------------------------------------
// PARALLAX HERO
// ------------------------------------------

const heroVisual =
    document.querySelector(".hero-visual");


document.addEventListener("mousemove", (event) => {

    if (!heroVisual || window.innerWidth < 900) {
        return;
    }

    const x =
        (event.clientX / window.innerWidth - 0.5);

    const y =
        (event.clientY / window.innerHeight - 0.5);

    heroVisual.style.transform =
        `translate(${x * 8}px, ${y * 8}px)`;

});


// ------------------------------------------
// BUTTON MICRO INTERACTION
// ------------------------------------------

document.querySelectorAll(
    ".primary-btn, .secondary-btn, .project-btn, .nav-cta"
).forEach((button) => {

    button.addEventListener("mouseenter", () => {

        button.style.transition =
            "transform .25s ease";

    });

});


// ------------------------------------------
// CONSOLE BRANDING
// ------------------------------------------

console.log(
`
╔════════════════════════════════════╗
║             NexaUI                 ║
║   Emerging Interface Collection    ║
╠════════════════════════════════════╣
║ BrainVault AI                      ║
║ MeetMind AI                        ║
║ StudyPilot AI                      ║
╚════════════════════════════════════╝
`
);