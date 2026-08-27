// ==========================================
// MY PORTFOLIO - JAVASCRIPT
// ==========================================


// Wait until the HTML page has completely loaded
document.addEventListener("DOMContentLoaded", function () {

    console.log("JavaScript is working!");


    // ==========================================
    // 1. MOBILE NAVIGATION MENU
    // ==========================================

    const nav = document.querySelector(".nav");
    const headerInner = document.querySelector(".header-inner");

    if (nav && headerInner) {

        // Create the menu button
        const menuButton = document.createElement("button");

        menuButton.className = "menu-button";
        menuButton.innerHTML = "☰";
        menuButton.setAttribute("aria-label", "Open navigation menu");

        // Add the button to the header
        headerInner.appendChild(menuButton);

        // Show / hide the navigation
        menuButton.addEventListener("click", function () {

            nav.classList.toggle("nav-open");

            if (nav.classList.contains("nav-open")) {
                menuButton.innerHTML = "✕";
                menuButton.setAttribute(
                    "aria-label",
                    "Close navigation menu"
                );
            } else {
                menuButton.innerHTML = "☰";
                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }

        });


        // Close menu when a navigation link is clicked
        const navLinks = nav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                nav.classList.remove("nav-open");

                menuButton.innerHTML = "☰";

            });

        });

    }


    // ==========================================
    // 2. ACTIVE NAVIGATION LINK
    // ==========================================

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    const navigationLinks = document.querySelectorAll(".nav a");

    navigationLinks.forEach(function (link) {

        const linkPage = link
            .getAttribute("href")
            ?.split("/")
            .pop()
            .toLowerCase();

        if (
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html")
        ) {
            link.classList.add("active");
        }

    });


    // ==========================================
    // 3. SMOOTH SCROLLING
    // ==========================================

    const pageLinks = document.querySelectorAll('a[href^="#"]');

    pageLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    // ==========================================
    // 4. SCROLL REVEAL ANIMATION
    // ==========================================

    const revealElements = document.querySelectorAll(
        ".project-card, .service-card, .about-copy, .section-title, .services-title"
    );

    revealElements.forEach(function (element) {

        element.classList.add("scroll-hidden");

    });


    const revealObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("scroll-show");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });


    // ==========================================
    // 5. TYPING EFFECT
    // ==========================================

    const typingElement = document.querySelector(".hero h1 .blue");

    if (typingElement) {

        const words = [
            "WEB DEVELOPER",
            "UI DESIGNER",
            "JAVASCRIPT DEVELOPER",
            "DATABASE DEVELOPER"
        ];

        let wordIndex = 0;
        let characterIndex = 0;
        let deleting = false;


        function typeEffect() {

            const currentWord = words[wordIndex];


            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(0, characterIndex + 1);

                characterIndex++;


                if (characterIndex === currentWord.length) {

                    deleting = true;

                    setTimeout(typeEffect, 1500);

                    return;
                }

            } else {

                typingElement.textContent =
                    currentWord.substring(0, characterIndex - 1);

                characterIndex--;


                if (characterIndex === 0) {

                    deleting = false;

                    wordIndex++;

                    if (wordIndex === words.length) {
                        wordIndex = 0;
                    }

                }

            }


            const speed = deleting ? 60 : 100;

            setTimeout(typeEffect, speed);

        }


        typeEffect();

    }


    // ==========================================
    // 6. BACK TO TOP BUTTON
    // ==========================================

    const backToTop = document.createElement("button");

    backToTop.innerHTML = "↑";

    backToTop.className = "back-to-top";

    backToTop.setAttribute(
        "aria-label",
        "Back to top"
    );

    document.body.appendChild(backToTop);


    // Show button after scrolling
    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    // Scroll back to top
    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // ==========================================
    // 7. CONTACT FORM VALIDATION
    // ==========================================

    const contactForm = document.querySelector("form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            const nameInput =
                contactForm.querySelector(
                    'input[name="name"], #name'
                );

            const emailInput =
                contactForm.querySelector(
                    'input[type="email"], #email'
                );

            const messageInput =
                contactForm.querySelector(
                    "textarea"
                );


            let valid = true;


            // Check name
            if (nameInput && nameInput.value.trim() === "") {

                alert("Please enter your name.");

                nameInput.focus();

                valid = false;

            }


            // Check email
            if (
                valid &&
                emailInput &&
                emailInput.value.trim() !== ""
            ) {

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(emailInput.value)) {

                    alert("Please enter a valid email address.");

                    emailInput.focus();

                    valid = false;

                }

            }


            // Check message
            if (
                valid &&
                messageInput &&
                messageInput.value.trim() === ""
            ) {

                alert("Please enter your message.");

                messageInput.focus();

                valid = false;

            }


            if (!valid) {

                event.preventDefault();

            }

        });

    }


    // ==========================================
    // 8. AUTOMATIC COPYRIGHT YEAR
    // ==========================================

    const yearElement =
        document.querySelector("#year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

});