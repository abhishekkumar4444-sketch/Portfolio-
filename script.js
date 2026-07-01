/* =========================
   PART 1: CORE + THEME SYSTEM
   ========================= */

/* Elements */
const body = document.body;
const toggleBtn = document.querySelector(".toggle-btn");

/* Load saved theme */
function loadTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
    }
}

/* Toggle theme */
function toggleTheme() {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

/* Event */
if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleTheme);
}

/* Init */
window.addEventListener("load", loadTheme);
/* =========================
   PART 2: MOBILE NAVIGATION
   ========================= */

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav a");

/* Toggle mobile menu */
function toggleMenu() {
    nav.classList.toggle("nav-active");
}

/* Close menu on link click */
function closeMenu() {
    nav.classList.remove("nav-active");
}

/* Events */
if (menuBtn) {
    menuBtn.addEventListener("click", toggleMenu);
}

navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});
/* =========================
   PART 3: SMOOTH SCROLL SYSTEM
   ========================= */

navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");

        if (targetId.startsWith("#")) {
            e.preventDefault();

            const target = document.querySelector(targetId);

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        }
    });
});
/* =========================
   PART 4: SCROLL ANIMATIONS
   ========================= */

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

/* Apply to elements */
const animatedElements = document.querySelectorAll(".card, .box, section");

animatedElements.forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});
/* =========================
   PART 5: ACTIVE NAV HIGHLIGHT
   ========================= */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop - 120;

        if (scrollY >= top) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});
/* =========================
   PORTFOLIO JAVASCRIPT
   ========================= */

/* ---------- DARK MODE TOGGLE ---------- */
const toggleBtn = document.querySelector(".toggle-btn");

if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        // Save preference
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
}

/* Load saved theme */
window.addEventListener("load", () => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    }
});


/* ---------- MOBILE NAV MENU ---------- */
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}


/* ---------- SMOOTH SCROLL FOR LINKS ---------- */
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: "smooth"
            });
        }
    });
});


/* ---------- ACTIVE NAV HIGHLIGHT ---------- */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;

        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


/* ---------- SIMPLE SCROLL ANIMATION ---------- */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll("section, .card, .box").forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});
/* =========================
   PART 6: HERO TYPING EFFECT
   ========================= */

const textArray = [
    "Frontend Developer",
    "UI Designer",
    "Web Developer",
    "Freelancer"
];

let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

const heroText = document.querySelector(".hero-text");

function typeEffect() {
    if (!heroText) return;

    currentText = textArray[index];

    if (!isDeleting) {
        heroText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        heroText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % textArray.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 60 : 100);
}

window.addEventListener("load", typeEffect);
/* =========================
   PART 7: HORIZONTAL CARD SLIDER
   ========================= */

const sliders = document.querySelectorAll(".slider");

sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
        isDown = false;
    });

    slider.addEventListener("mouseup", () => {
        isDown = false;
    });

    slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
});
/* =========================
   PART 8: PAGE LOADER
   ========================= */

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader-screen");

    if (loader) {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
    }
});
/* =========================
   PART 9: CINEMATIC SCROLL REVEAL
   ========================= */

const revealElements = document.querySelectorAll(".card, .box, section");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            entry.target.style.transition = "all 0.7s ease";
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => {
    el.classList.add("hidden");
    revealObserver.observe(el);
});