// app object
let app = {
    version: "0.8.9",
    updated: "March 2025",
    regions: [
        "Ontario",
        "Canada"
    ],
    updates: [
        "Name & gender",
        "Gender"
    ],
    region: "Ontario",
    updating: "Name & gender",
    filterRemembered: false,
    pages: [
        {
            loc: "/on/name-changes",
            label: "Ontario name changes",
            regions: ["Ontario"],
            updates: ["Name"]
        },
        {
            loc: "/on/birth-certificates",
            label: "Ontario birth certificates",
            regions: ["Ontario"],
            updates: ["Name", "Gender"]
        },
        {
            loc: "/on/health-cards",
            label: "Ontario health cards",
            regions: ["Ontario"],
            updates: ["Name"]
        },
        {
            loc: "/on/drivers-licenses",
            label: "Ontario driver's licenses & photo cards",
            regions: ["Ontario"],
            updates: ["Name", "Gender"]
        },
        {
            loc: "/canadian-passports",
            label: "Canadian passports",
            regions: ["Ontario", "Canada"],
            updates: ["Name", "Gender"]
        },
        {
            loc: "/permanent-resident-cards",
            label: "Permanent resident cards",
            regions: ["Ontario", "Canada"],
            updates: ["Name", "Gender"],
            disabled: true,
        },
        {
            loc: "/social-insurance-registry",
            label: "Social Insurance Registry",
            regions: ["Ontario", "Canada"],
            updates: ["Name", "Gender"],
            disabled: true,
        },
        {
            loc: "/canada-revenue-agency",
            label: "Canada Revenue Agency",
            regions: ["Ontario", "Canada"],
            updates: ["Name", "Gender"],
            disabled: true,
        },
        {
            loc: "/downloads",
            label: "Downloads",
            regions: ["Ontario", "Canada"],
            updates: ["Name", "Gender"]
        },
    ],
    downloads: [
        {
            id: "name-changes",
            header: "Ontario name changes",
            regions : ["Ontario"],
            items: [
                {
                    id: "11155e",
                    loc: "/data/11155e.pdf",
                    label: "Ontario Name Change Application",
                    description: "PDF document [#11155e]"
                },
                {
                    id: "11320e",
                    loc: "/data/11320e.pdf",
                    label: "Request for Non-Publication in The Ontario Gazette",
                    description: "PDF document [#11320e]"
                },
                {
                    id: "5349e",
                    loc: "/data/5349e.pdf",
                    label: "Requirements for a Police Record Check for a Change of Name",
                    description: "PDF document [#5349e]"
                },
            ],
            sources: ["https://www.ontario.ca/page/change-name"],
            updates: ["Name"],
            loc: "/on/name-changes"
        },
        {
            id: "birth-certificates",
            header: "Ontario birth certificates",
            regions : ["Ontario"],
            items: [
                {
                    id: "11325e",
                    loc: "/data/11325e.pdf",
                    label: "Ontario Birth Certificate Sex Designation Form",
                    description: "PDF document [#11325e]"
                },
                {
                    id: "11324e",
                    loc: "/data/11324e.pdf",
                    label: "Ontario Birth Certificate Sex Designation Statutory Declaration",
                    description: "PDF document [#11324e]"
                },
            ],
            sources: ["https://www.ontario.ca/page/changing-your-sex-designation-your-birth-registration-and-birth-certificate"],
            updates: ["Name", "Gender"],
            loc: "/on/birth-certificates"
        },
        {
            id: "health-cards",
            header: "Ontario health cards",
            regions : ["Ontario"],
            items: [
                {
                    id: "0280-82e",
                    loc: "/data/0280-82e.pdf",
                    label: "Ontario Health Card Change of Information Form",
                    description: "PDF document [#0280-82e]"
                },
            ],
            sources: ["https://www.ontario.ca/page/replace-cancel-or-change-information-your-health-card#section-3"],
            updates: ["Name"],
            loc: "/on/health-cards"
        },
        {
            id: "canadian-passports",
            header: "Canadian passports",
            regions : ["Ontario", "Canada"],
            items: [
                {
                    id: "pptc-153",
                    loc: "/data/pptc153.pdf",
                    label: "Adult General Passport Application",
                    description: "PDF document [#pptc-153]"
                },
                {
                    id: "pptc-643",
                    loc: "/data/pptc643.pdf",
                    label: "Canadian Passport Sex Identifier Update Form",
                    description: "PDF document [#pptc-643]"
                },
            ],
            sources: ["https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/new-adult-passport/required-documents-photos", "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/change-sex"],
            updates: ["Name", "Gender"],
            loc: "/canadian-passports"
        },
    ],
    elements: {
        versionCode: document.querySelector("#version-code"),
        lastUpdated: document.querySelector("#last-updated"),
        regionsSelect: document.querySelector("#regions"),
        updatingSelect: document.querySelector("#updating"),
        pageLinks: document.querySelector("#pageLinks"),
        downloadLinks: document.querySelector("#downloadLinks"),
        downloadSources: document.querySelector("#downloadSources"),
        filterCheckbox: $("#filter-checkbox"),
        filterCheckboxInput: $("#filter-checkbox input"),
    },
    functions: {
        scroll: (direction) => {
            let location = "";
            if (direction === "top") {
                location = 0;
                history.pushState(null, null, ' ');
            } else {
                location = app.elements[direction].offset().top;
                setTimeout(() => {
                    history.pushState(null, null, `#${direction}`);
                }, 300);
            };
            window.scrollTo({top: location, behavior: "smooth"});
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
        updatesDisplay: () => {
            let updatesOptions = [];
            app.updates.forEach((update) => {
                updatesOptions.push(`<option value="${update}">${update}</option>`)
            })
            app.elements.updatingSelect.innerHTML = updatesOptions.reduce(
                (accumulator, currentValue) => accumulator + currentValue
            );
        },
        regionSelect: () => {
            app.region = app.elements.regionsSelect.value;
            if (app.elements.pageLinks) {
                app.functions.pageLinksDisplay();
            }
            if (app.elements.downloadLinks) {
                app.functions.downloadLinksDisplay();
            }
            if (app.filterRemembered) {
                app.functions.rememberFilters();
            }
            app.elements.regionsSelect.blur();
        },
        updateSelect: () => {
            app.updating = app.elements.updatingSelect.value;

            if (app.elements.pageLinks) {
                app.functions.pageLinksDisplay();
            }
            if (app.elements.downloadLinks) {
                app.functions.downloadLinksDisplay();
            }
            if (app.filterRemembered) {
                app.functions.rememberFilters();
            }
            app.elements.updatingSelect.blur();
        },
        rememberFilters: () => {
            if (app.elements.filterCheckboxInput.is(':checked')){
                localStorage.setItem('updatingFilter', app.updating);
                localStorage.setItem('regionFilter', app.region);
                app.filterRemembered = true;
            };
            if (!app.elements.filterCheckboxInput.is(':checked')){
                localStorage.removeItem('updatingFilter');
                localStorage.removeItem('regionFilter');
                app.filterRemembered = false;
            };
        },
        pageLinksDisplay: () => {
            let pageLinks = [`<h2>Navigate to</h2>`];
            let filteredPages = app.pages.filter((page) => page.regions.includes(app.region));
            filteredPages = filteredPages.filter((page) => {
                if (app.updating === "Gender") {
                    return page.updates.includes("Gender");
                } else {
                    return page;
                }
            })

            filteredPages.forEach((page) => {
                if (page.disabled) {
                    pageLinks.push(`<div class="link disabled"><span class="link-title"><p class="button-label">${page.label}</p><img src="/assets/arrow-left.svg" class="rotate" alt="arrow icon"></span></div>`)
                } else {
                    pageLinks.push(`<a class="link" href="${page.loc}"><span class="link-title"><p class="button-label">${page.label}</p><img src="/assets/arrow-left.svg" class="rotate" alt="arrow icon"></span></a>`)
                }
            })
            app.elements.pageLinks.innerHTML = pageLinks.reduce(
                (accumulator, currentValue) => accumulator + currentValue
            );
        },
        downloadLinksDisplay: () => {
            let downloadLinks = [`<h2>Downloads</h2>`];
            let downloadSources = []
            let filteredDownloads = app.downloads.filter((category) => category.regions.includes(app.region));
            filteredDownloads = filteredDownloads.filter((category) => {
                if (app.updating === "Gender") {
                    return category.updates.includes("Gender");
                } else {
                    return category;
                }
            })

            filteredDownloads.forEach((category) => {
                let items = [];
                category.items.forEach((item) => {
                    items.push(`<a id="${item.id}" class="download" href="${item.loc}" target="_blank"><span class="link-title"><p class="button-label">${item.label}</p><img src="/assets/file-download.svg" alt="download icon"></span><hr><p class="button-description">${item.description}</p> </a>`);
                });
                items.push(`<a class="link" href="${category.loc}"><span class="link-title"><p class="button-label">More about ${category.header}</p><img src="/assets/arrow-left.svg" class="rotate" alt="arrow icon"></span></a></ul>`)
                downloadLinks.push(`<h3 id="${category.id}">${category.header}<button onclick="navigator.clipboard.writeText('https://tg-id.ca/downloads#${category.id}'); window.location.href='#${category.id}'"><img src="/assets/link.svg" alt="link icon"></button></h3>` + items.reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                ));
                category.sources.forEach((source) => {
                    downloadSources.push(`<li><a href="${source}" target="_blank" rel="norefferer">${source}</a></li>`)
                })
            })
            app.elements.downloadLinks.innerHTML = downloadLinks.reduce(
                (accumulator, currentValue) => accumulator + currentValue
            ) + `<h3 id="presentation-materials">Presentation materials</h3><a class="download" href="/data/transID-2023.docx" target="_blank"><span class="link-title"><p class="button-label">Trans I.D. Ontario document</p><img src="/assets/file-download.svg" alt="download icon"></span><hr><p class="button-description">MS Word document for the CUPE 3903 TFAC presentation on Nov 29, 2023</p></a><a class="download" href="/data/transID-2023.pptx" target="_blank"><span class="link-title"><p class="button-label">Trans I.D. Ontario slideshow</p><img src="/assets/file-download.svg" alt="download icon"></span><hr><p class="button-description">MS Powerpoint slideshow for the CUPE 3903 TFAC presentation on Nov 29, 2023</p></a>`;
            app.elements.downloadSources.innerHTML = `<h2>Sources</h2><ul>` + downloadSources.reduce(
                (accumulator, currentValue) => accumulator + currentValue
            );
        },
    },
    events: () => {
        if (app.elements.regionsSelect) {
            app.elements.regionsSelect.addEventListener("change", () => app.functions.regionSelect());
        }
        if (app.elements.updatingSelect) {
            app.elements.updatingSelect.addEventListener("change", () => app.functions.updateSelect());
        }
        if (app.elements.filterCheckbox) {
            app.elements.filterCheckboxInput.on("change", () => app.functions.rememberFilters());
        }
    },
    init: () => {
        app.events();
        app.elements.versionCode.innerHTML = 'v' + app.version + ' | ';
        app.elements.lastUpdated.innerHTML = 'Last updated: ' + app.updated + ' | ';
        if (app.elements.regionsSelect) {
            app.functions.regionsDisplay();
        }
        if (app.elements.updatingSelect) {
            app.functions.updatesDisplay();
        }
        if (localStorage.getItem('updatingFilter')) {
            app.updating = localStorage.getItem('updatingFilter');
            app.elements.updatingSelect.value = app.updating;
            app.filterRemembered = true;
        }
        if (localStorage.getItem('regionFilter')) {
            app.region = localStorage.getItem('regionFilter');
            app.elements.regionsSelect.value = app.region;
            app.filterRemembered = true;
        }
        if (app.filterRemembered) {
            app.elements.filterCheckboxInput[0].checked = true;
        }
        if (app.elements.pageLinks) {
            app.functions.pageLinksDisplay();
        }
        if (app.elements.downloadLinks) {
            app.functions.downloadLinksDisplay();
        }
    },
};

$(document).ready(() => {
    app.init();
});