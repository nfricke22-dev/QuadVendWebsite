const form = document.querySelector("#request-form");
const formStatus = document.querySelector("#form-status");

// INTENTIONAL BUG:
// The HTML uses id="request-list", not id="requests-list".
const requestList = document.querySelector("#requests-list");

function renderRequests() {
    const requests =
        JSON.parse(localStorage.getItem("requests")) || [];

    requestList.innerHTML = "";

    requests.forEach(function (request, index) {
        const listItem = document.createElement("li");

        const requestText = document.createElement("span");
        requestText.textContent =
            `${request.businessName} - ${request.email}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-request");

        deleteButton.addEventListener("click", function () {
            requests.splice(index, 1);

            localStorage.setItem(
                "requests",
                JSON.stringify(requests)
            );

            renderRequests();
        });

        listItem.appendChild(requestText);
        listItem.appendChild(deleteButton);
        requestList.appendChild(listItem);
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
        businessName: document.querySelector("#business-name").value,
        email: document.querySelector("#email").value,
        message: document.querySelector("#message").value
    };

    const savedRequests =
        JSON.parse(localStorage.getItem("requests")) || [];

    savedRequests.push(formData);

    localStorage.setItem(
        "requests",
        JSON.stringify(savedRequests)
    );

    console.log(savedRequests);

    formStatus.textContent =
        `Thanks, ${formData.businessName}. Your request was captured locally, but it has not been sent.`;

    form.reset();
    renderRequests();
});

const changeHeadingButton =
    document.querySelector("#change-heading");

const mainHeading =
    document.querySelector("h1");

const savedHeading =
    localStorage.getItem("heading");

if (savedHeading !== null) {
    mainHeading.textContent = savedHeading;
}

changeHeadingButton.addEventListener("click", function () {
    if (mainHeading.textContent === "QuadVend") {
        mainHeading.textContent = "QuadVend Technologies";
    } else {
        mainHeading.textContent = "QuadVend";
    }

    localStorage.setItem(
        "heading",
        mainHeading.textContent
    );
});

const themeButton =
    document.querySelector("#toggle-theme");

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

renderRequests();
