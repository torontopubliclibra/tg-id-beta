// app object
let app = {

    version: "0.8.5",
    updated: "March 2025",

    // page elements
    elements: {
        versionCode: document.querySelector("#version-code"),
        lastUpdated: document.querySelector("#last-updated"),
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
    },

    // app event listeners
    // events: () => {

    // },
    
    // app initializion
    init: () => {

        // add the event listeners
        // app.events();

        app.elements.versionCode.innerHTML = 'v' + app.version + ' | ';
        app.elements.lastUpdated.innerHTML = 'Last updated: ' + app.updated + ' | ';
    },
};

// initialize the app
$(document).ready(() => {
    app.init();
});