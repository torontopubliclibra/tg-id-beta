// app object
let app = {

    version: "0.8.7",
    updated: "March 2025",
    regions: [
        "Ontario",
        "Canada"
    ],
    region: "Ontario",
    pages: [
        {
            loc: "/on/name-changes",
            label: "Ontario name changes",
            regions: ["Ontario"],
        },
        {
            loc: "/on/birth-certificates",
            label: "Ontario birth certificates",
            regions: ["Ontario"],
        },
        {
            loc: "/on/health-cards",
            label: "Ontario health cards",
            regions: ["Ontario"],
        },
        {
            loc: "/on/drivers-licenses",
            label: "Ontario driver's licenses & photo cards",
            regions: ["Ontario"],
        },
        {
            loc: "/canadian-passports",
            label: "Canadian passports",
            regions: ["Ontario", "Canada"],
        },
        {
            loc: "/permanent-resident-cards",
            label: "Permanent resident cards",
            regions: ["Ontario", "Canada"],
            disabled: true,
        },
        {
            loc: "/social-insurance-registry",
            label: "Social Insurance Registry",
            regions: ["Ontario", "Canada"],
            disabled: true,
        },
        {
            loc: "/canada-revenue-agency",
            label: "Canada Revenue Agency",
            regions: ["Ontario", "Canada"],
            disabled: true,
        },
        {
            loc: "/downloads",
            label: "Downloads",
            regions: ["Ontario", "Canada"],
        },
    ],

    // page elements
    elements: {
        versionCode: document.querySelector("#version-code"),
        lastUpdated: document.querySelector("#last-updated"),
        regionsSelect: document.querySelector("#regions"),
        pageLinks: document.querySelector("#pageLinks"),
    },

    // app functions
    functions: {

        // smoothly scroll to location
        scroll: (direction) => {

            // establish an empty variable
            let location = "";

            // if the direction is "top", set the location to the top of the page
            if (direction === "top") {
                location = 0;
                history.pushState(null, null, ' ');
            // if the direction is anything else, set the location to the top of that section
            } else {
                location = app.elements[direction].offset().top;
                setTimeout(() => {
                    history.pushState(null, null, `#${direction}`);
                }, 300);
            };

            // smoothly scroll to the location
            window.scrollTo({top: location, behavior: "smooth"});

            // blur the button after scroll
            document.activeElement.blur();
        },

        regionsDisplay: () => {
            let regionOptions = [];
            app.regions.forEach((region) => {
                regionOptions.push(`<option value="${region}">${region}</option>`)
            })
            app.elements.regionsSelect.innerHTML = regionOptions.reduce(
                (accumulator, currentValue) => accumulator + currentValue
            );
        },

        regionSelect: () => {
            app.region = app.elements.regionsSelect.value;
            app.functions.pageLinksDisplay();
            app.elements.regionsSelect.blur();
        },

        pageLinksDisplay: () => {
            let pageLinks = [`<h2>Navigate to</h2>`];
            let filteredPages = app.pages.filter((page) => page.regions.includes(app.region));

            filteredPages.forEach((page) => {
                if (page.disabled) {
                    pageLinks.push(`<div class="link disabled">
                        <span class="link-title">
                            <p class="button-label">${page.label}</p>
                            <img src="/assets/arrow-left.svg" class="rotate" alt="download icon">
                        </span>
                    </div>`)
                } else {
                    pageLinks.push(`<a class="link" href="${page.loc}">
                        <span class="link-title">
                            <p class="button-label">${page.label}</p>
                            <img src="/assets/arrow-left.svg" class="rotate" alt="download icon">
                        </span>
                    </a>`)
                }
            })

            app.elements.pageLinks.innerHTML = pageLinks.reduce(
                (accumulator, currentValue) => accumulator + currentValue
            );
        },
    },

    // app event listeners
    events: () => {
        if (app.elements.regionsSelect) {
            app.elements.regionsSelect.addEventListener("change", () => app.functions.regionSelect());
        }
    },
    
    // app initializion
    init: () => {

        // add the event listeners
        app.events();
        app.elements.versionCode.innerHTML = 'v' + app.version + ' | ';
        app.elements.lastUpdated.innerHTML = 'Last updated: ' + app.updated + ' | ';

        if (app.elements.regionsSelect) {
            app.functions.regionsDisplay();
        }
        if (app.elements.pageLinks) {
            app.functions.pageLinksDisplay();
        }
    },
};

// initialize the app
$(document).ready(() => {
    app.init();
});