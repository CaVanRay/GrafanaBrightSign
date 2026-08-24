(function () {

    console.log("================================");
    console.log("GRAFANA AUTO LOGIN - WAITING");
    console.log("================================");

    var attempts = 0;
    var maxAttempts = 60;


    function setReactInput(element, value) {

        var setter = Object.getOwnPropertyDescriptor(
            HTMLInputElement.prototype,
            "value"
        ).set;

        setter.call(element, value);

        element.dispatchEvent(
            new Event("input", { bubbles: true })
        );

        element.dispatchEvent(
            new Event("change", { bubbles: true })
        );
    }


    function tryLogin() {

        attempts++;

        var userField = document.querySelector(
            'input[name="user"]'
        );

        var passField = document.querySelector(
            'input[name="password"]'
        );

        console.log(
            "Attempt " + attempts +
            " | user=" + !!userField +
            " | password=" + !!passField
        );


        // Fields aren't rendered yet.
        if (!userField || !passField) {

            if (attempts < maxAttempts) {

                setTimeout(tryLogin, 500);

            } else {

                console.log(
                    "ERROR: Login fields never appeared."
                );

            }

            return;
        }


        console.log("***** LOGIN FIELDS FOUND *****");


        // Fill username
        setReactInput(
            userField,
            "admin"
        );


        // Fill password
        setReactInput(
            passField,
            "admin"
        );


        console.log("Credentials inserted.");

        console.log(
            "Username value:",
            userField.value
        );

        console.log(
            "Password length:",
            passField.value.length
        );


        // Wait for React to process the state update.
        setTimeout(function () {

            var loginButton = document.querySelector(
                'button[type="submit"]'
            );


            if (loginButton) {

                console.log(
                    "Login button found:",
                    loginButton.innerText
                );

                console.log("Clicking Login...");

                loginButton.click();

            } else {

                console.log(
                    "ERROR: Login button not found."
                );

            }

        }, 500);

    }


    // Start polling.
    setTimeout(tryLogin, 500);

})();
