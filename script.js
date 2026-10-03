document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navItems = document.querySelectorAll(".nav-item");
    const pages = document.querySelectorAll(".page");

    const breadcrumbTitle =
        document.getElementById("breadcrumbTitle");


    /* =====================================================
       PAGE NAVIGATION
    ===================================================== */

    function showPage(pageName) {

        pages.forEach(page => {
            page.classList.remove("active-page");
        });

        navItems.forEach(item => {
            item.classList.remove("active");
        });

        const targetPage =
            document.getElementById(`page-${pageName}`);

        const targetNav =
            document.querySelector(
                `.nav-item[data-page="${pageName}"]`
            );

        if (targetPage) {
            targetPage.classList.add("active-page");
        }

        if (targetNav) {
            targetNav.classList.add("active");

            breadcrumbTitle.textContent =
                targetNav.textContent.trim();
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        closeSidebar();
    }


    navItems.forEach(item => {

        item.addEventListener("click", () => {

            showPage(item.dataset.page);

        });

    });


    document.querySelectorAll("[data-page-link]").forEach(button => {

        button.addEventListener("click", () => {

            showPage(button.dataset.pageLink);

        });

    });


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    const sidebar =
        document.getElementById("sidebar");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const mobileOverlay =
        document.getElementById("mobileOverlay");


    function openSidebar() {

        sidebar.classList.add("open");

        mobileOverlay.classList.add("show");

    }


    function closeSidebar() {

        sidebar.classList.remove("open");

        mobileOverlay.classList.remove("show");

    }


    mobileMenu.addEventListener("click", openSidebar);

    mobileOverlay.addEventListener("click", closeSidebar);


    /* =====================================================
       DARK MODE
    ===================================================== */

    const themeToggle =
        document.getElementById("themeToggle");


    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const dark =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "maisonDarkMode",
            dark ? "true" : "false"
        );

        showToast(
            dark
                ? "Dark mode enabled."
                : "Light mode enabled."
        );

    });


    if (
        localStorage.getItem("maisonDarkMode") === "true"
    ) {

        document.body.classList.add("dark-mode");

    }


    /* =====================================================
       SEARCH MODAL
    ===================================================== */

    const searchModal =
        document.getElementById("searchModal");

    const globalSearch =
        document.getElementById("globalSearch");

    const globalSearchInput =
        document.getElementById("globalSearchInput");


    globalSearch.addEventListener("click", () => {

        searchModal.classList.add("show");

        setTimeout(() => {
            globalSearchInput.focus();
        }, 100);

    });


    /* =====================================================
       GENERIC MODAL CLOSE
    ===================================================== */

    document.querySelectorAll(".modal-close").forEach(button => {

        button.addEventListener("click", () => {

            button.closest(".modal").classList.remove("show");

        });

    });


    document.querySelectorAll(".modal").forEach(modal => {

        modal.addEventListener("click", event => {

            if (event.target === modal) {

                modal.classList.remove("show");

            }

        });

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            document.querySelectorAll(".modal").forEach(modal => {
                modal.classList.remove("show");
            });

        }

    });


    /* =====================================================
       NOTIFICATIONS
    ===================================================== */

    document
        .getElementById("notificationBtn")
        .addEventListener("click", () => {

            showToast(
                "You have 3 new notifications."
            );

        });


    /* =====================================================
       CLIENT SEARCH
    ===================================================== */

    const clientSearch =
        document.getElementById("clientSearch");

    const clientFilter =
        document.getElementById("clientFilter");

    const clientCards =
        document.querySelectorAll(".client-card");


    function filterClients() {

        const search =
            clientSearch.value.toLowerCase();

        const filter =
            clientFilter.value;


        clientCards.forEach(card => {

            const name =
                card.dataset.name.toLowerCase();

            const type =
                card.dataset.type;

            const matchesSearch =
                name.includes(search);

            const matchesFilter =
                filter === "all" ||
                type === filter;


            if (
                matchesSearch &&
                matchesFilter
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    }


    clientSearch.addEventListener(
        "input",
        filterClients
    );


    clientFilter.addEventListener(
        "change",
        filterClients
    );


    /* =====================================================
       PROJECT FILTERS
    ===================================================== */

    const projectTabs =
        document.querySelectorAll(".project-tab");

    const projectItems =
        document.querySelectorAll(".project-item");


    projectTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            projectTabs.forEach(item => {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            const filter =
                tab.dataset.projectFilter;


            projectItems.forEach(project => {

                if (
                    filter === "all" ||
                    project.dataset.project === filter
                ) {

                    project.style.display = "grid";

                } else {

                    project.style.display = "none";

                }

            });

        });

    });


    /* =====================================================
       SETTINGS TABS
    ===================================================== */

    const settingTabs =
        document.querySelectorAll(".setting-tab");

    const settingSections =
        document.querySelectorAll(".settings-section");


    settingTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            settingTabs.forEach(item => {
                item.classList.remove("active");
            });

            settingSections.forEach(section => {
                section.classList.remove("active-setting");
            });

            tab.classList.add("active");

            const target =
                document.getElementById(
                    `setting-${tab.dataset.setting}`
                );

            if (target) {
                target.classList.add("active-setting");
            }

        });

    });


    /* =====================================================
       TOGGLES
    ===================================================== */

    document.querySelectorAll(".toggle").forEach(toggle => {

        toggle.addEventListener("click", () => {

            toggle.classList.toggle("active");

        });

    });


    /* =====================================================
       FORM MODAL
    ===================================================== */

    const formModal =
        document.getElementById("formModal");

    const dynamicForm =
        document.getElementById("dynamicForm");

    const modalLabel =
        document.getElementById("modalLabel");

    const modalTitle =
        document.getElementById("modalTitle");


    let currentFormType = "project";


    function openForm(type) {

        currentFormType = type;

        if (type === "project") {

            modalLabel.textContent =
                "NEW PROJECT";

            modalTitle.textContent =
                "Create something new.";

        }

        if (type === "client") {

            modalLabel.textContent =
                "NEW CLIENT";

            modalTitle.textContent =
                "Welcome someone new.";

        }

        if (type === "invoice") {

            modalLabel.textContent =
                "NEW INVOICE";

            modalTitle.textContent =
                "Create an invoice.";

        }

        if (type === "team") {

            modalLabel.textContent =
                "NEW MEMBER";

            modalTitle.textContent =
                "Add someone brilliant.";

        }

        if (type === "event") {

            modalLabel.textContent =
                "NEW EVENT";

            modalTitle.textContent =
                "Plan something important.";

        }


        formModal.classList.add("show");

        document
            .getElementById("formName")
            .focus();

    }


    document
        .getElementById("newProjectBtn")
        .addEventListener("click", () => {
            openForm("project");
        });


    document
        .getElementById("projectAddButton")
        .addEventListener("click", () => {
            openForm("project");
        });


    document
        .getElementById("addClientBtn")
        .addEventListener("click", () => {
            openForm("client");
        });


    document
        .getElementById("invoiceBtn")
        .addEventListener("click", () => {
            openForm("invoice");
        });


    document
        .getElementById("inviteBtn")
        .addEventListener("click", () => {
            openForm("team");
        });


    document
        .getElementById("eventBtn")
        .addEventListener("click", () => {
            openForm("event");
        });


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    dynamicForm.addEventListener("submit", event => {

        event.preventDefault();

        const name =
            document.getElementById("formName").value.trim();


        if (!name) {
            return;
        }


        let message = "";


        switch (currentFormType) {

            case "project":
                message = `${name} project created.`;
                break;

            case "client":
                message = `${name} added to your clients.`;
                break;

            case "invoice":
                message = `Invoice for ${name} created.`;
                break;

            case "team":
                message = `Invitation prepared for ${name}.`;
                break;

            case "event":
                message = `${name} added to your calendar.`;
                break;

        }


        formModal.classList.remove("show");

        dynamicForm.reset();

        showToast(message);

    });


    /* =====================================================
       UPGRADE
    ===================================================== */

    document
        .getElementById("upgradeBtn")
        .addEventListener("click", () => {

            showToast(
                "Upgrade plans are coming soon."
            );

        });


    /* =====================================================
       EXPORT ANALYTICS
    ===================================================== */

    document
        .getElementById("exportAnalytics")
        .addEventListener("click", () => {

            showToast(
                "Analytics report prepared for export."
            );

        });


    document
        .querySelectorAll(".export-button")
        .forEach(button => {

            button.addEventListener("click", () => {

                showToast(
                    "Transaction report exported."
                );

            });

        });


    /* =====================================================
       REVENUE PERIOD
    ===================================================== */

    const revenuePeriod =
        document.getElementById("revenuePeriod");

    const overviewRevenue =
        document.getElementById("overviewRevenue");


    revenuePeriod.addEventListener("change", () => {

        const values = {

            "Last 6 months": "$84,260",

            "Last 12 months": "$164,820",

            "Last 3 months": "$46,910"

        };


        overviewRevenue.textContent =
            values[revenuePeriod.value];

        showToast(
            `${revenuePeriod.value} selected.`
        );

    });


    /* =====================================================
       CALENDAR
    ===================================================== */

    let currentCalendarMonth = 9;

    let currentCalendarYear = 2026;


    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    const calendarTitle =
        document.querySelector(".calendar-head h3");


    document
        .getElementById("prevMonth")
        .addEventListener("click", () => {

            currentCalendarMonth--;

            if (currentCalendarMonth < 0) {

                currentCalendarMonth = 11;

                currentCalendarYear--;

            }

            updateCalendarTitle();

        });


    document
        .getElementById("nextMonth")
        .addEventListener("click", () => {

            currentCalendarMonth++;

            if (currentCalendarMonth > 11) {

                currentCalendarMonth = 0;

                currentCalendarYear++;

            }

            updateCalendarTitle();

        });


    function updateCalendarTitle() {

        calendarTitle.textContent =
            `${monthNames[currentCalendarMonth]} ${currentCalendarYear}`;

    }


    /* =====================================================
       CALENDAR DAY CLICK
    ===================================================== */

    document
        .querySelectorAll(".calendar-days span:not(.muted-day)")
        .forEach(day => {

            day.addEventListener("click", () => {

                document
                    .querySelectorAll(".calendar-days span")
                    .forEach(item => {
                        item.classList.remove("selected-day");
                    });

                day.classList.add("selected-day");

                showToast(
                    `October ${day.textContent} selected.`
                );

            });

        });


    /* =====================================================
       SAVE SETTINGS
    ===================================================== */

    document
        .querySelectorAll(".save-settings")
        .forEach(button => {

            button.addEventListener("click", () => {

                showToast(
                    "Your settings have been saved."
                );

            });

        });


    /* =====================================================
       SEARCH SUGGESTIONS
    ===================================================== */

    document
        .querySelectorAll(".search-suggestions span")
        .forEach(item => {

            item.addEventListener("click", () => {

                globalSearchInput.value =
                    item.textContent;

                showToast(
                    `Searching ${item.textContent}...`
                );

            });

        });


    /* =====================================================
       TOAST SYSTEM
    ===================================================== */

    const toast =
        document.getElementById("toast");

    const toastText =
        document.getElementById("toastText");


    let toastTimer;


    function showToast(message) {

        toastText.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 2800);

    }


    /* =====================================================
       KEYBOARD SHORTCUT
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            searchModal.classList.add("show");

            globalSearchInput.focus();

        }

    });


    /* =====================================================
       CLIENT CARD INTERACTION
    ===================================================== */

    document
        .querySelectorAll(".card-link")
        .forEach(button => {

            button.addEventListener("click", () => {

                const card =
                    button.closest(".client-card");

                const clientName =
                    card.querySelector("h3").textContent;

                showToast(
                    `Opening ${clientName}'s profile.`
                );

            });

        });


    /* =====================================================
       INITIAL PAGE
    ===================================================== */

    showPage("overview");

});
