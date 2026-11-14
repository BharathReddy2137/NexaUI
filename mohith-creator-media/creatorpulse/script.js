const pages = [...document.querySelectorAll(".page")];
const nav = [...document.querySelectorAll(".nav button")];

function show(id) {
    pages.forEach(p => {
        p.classList.toggle("active", p.id === id);
    });

    nav.forEach(b => {
        b.classList.toggle("active", b.dataset.page === id);
    });

    scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

nav.forEach(b => {
    b.onclick = () => show(b.dataset.page);
});

document.querySelectorAll("[data-go]").forEach(b => {
    b.onclick = () => show(b.dataset.go);
});

const toast = document.querySelector("#toast");
let tt;

function note(t) {
    toast.textContent = t;
    toast.classList.add("show");

    clearTimeout(tt);

    tt = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

document.querySelector("#notify")?.addEventListener("click", () => {
    note("You have 3 new creator insights.");
});

document.querySelector("#command")?.addEventListener("click", () => {
    note("Command center ready.");
});

document.querySelector("#heroAction")?.addEventListener("click", () => {
    note("Workspace opened successfully.");
});

document.querySelector("#newItem")?.addEventListener("click", () => {
    document.querySelector("#modal").classList.add("show");
});

document.querySelector("#quick")?.addEventListener("click", () => {
    document.querySelector("#modal").classList.add("show");
});

document.querySelector("#closeModal")?.addEventListener("click", () => {
    document.querySelector("#modal").classList.remove("show");
});

document.querySelector("#saveModal")?.addEventListener("click", () => {
    document.querySelector("#modal").classList.remove("show");
    note("Saved successfully.");
});

document.querySelectorAll(".toggle").forEach(x => {
    x.onclick = () => {
        x.textContent = x.textContent === "Enabled"
            ? "Paused"
            : "Enabled";

        note("Preference updated.");
    };
});

document.querySelector("#mobileAction")?.addEventListener("click", () => {
    note("Open the desktop navigation to explore sections.");
});

if (window.lucide) {
    lucide.createIcons();
}
