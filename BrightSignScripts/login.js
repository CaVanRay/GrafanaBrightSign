(function () {

    console.log("================================");
    console.log("GRAFANA AUTO LOGIN");
    console.log("================================");


    /*
     * Set a React-controlled input safely.
     */
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


    /*
     * ----------------------------------------------------
     * STEP 1: LOGIN
     * ----------------------------------------------------
     */

    var loginAttempts = 0;
    var maxLoginAttempts = 60;


    function findLogin() {

        loginAttempts++;

        var userField = document.querySelector(
            'input[name="user"]'
        );

        var passField = document.querySelector(
            'input[name="password"]'
        );


        console.log(
            "Login attempt " + loginAttempts +
            " | user=" + !!userField +
            " | password=" + !!passField
        );


        /*
         * Login page hasn't rendered yet.
         */
        if (!userField || !passField) {

            /*
             * Check whether we're already on the
             * password-change page.
             */
            var newPassword = document.querySelector(
                'input[name="newPassword"]'
            );

            var confirmPassword = document.querySelector(
                'input[name="confirmNew"]'
            );


            if (newPassword && confirmPassword) {

                console.log(
                    "Password-change page detected."
                );

                handlePasswordChange();

                return;
            }


            if (loginAttempts < maxLoginAttempts) {

                setTimeout(findLogin, 500);

            } else {

                console.log(
                    "ERROR: Login fields never appeared."
                );

            }

            return;
        }


        console.log("***** LOGIN FIELDS FOUND *****");


        /*
         * Fill username.
         */
        setReactInput(
            userField,
            "admin"
        );


        /*
         * Fill password.
         */
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


        /*
         * Give React time to process the input.
         */
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


                /*
                 * Start watching for the
                 * forced password change page.
                 */
                setTimeout(
                    checkPasswordChange,
                    1000
                );


            } else {

                console.log(
                    "ERROR: Login button not found."
                );

            }

        }, 500);

    }


    /*
     * ----------------------------------------------------
     * STEP 2: WATCH FOR PASSWORD CHANGE PAGE
     * ----------------------------------------------------
     */

    var passwordChangeAttempts = 0;
    var maxPasswordChangeAttempts = 30;


    function checkPasswordChange() {

        passwordChangeAttempts++;


        var newPassword = document.querySelector(
            'input[name="newPassword"]'
        );

        var confirmPassword = document.querySelector(
            'input[name="confirmNew"]'
        );


        console.log(
            "Password-change check " +
            passwordChangeAttempts +
            " | newPassword=" +
            !!newPassword +
            " | confirm=" +
            !!confirmPassword
        );


        /*
         * Password-change page found.
         */
        if (newPassword && confirmPassword) {

            console.log(
                "***** PASSWORD CHANGE PAGE FOUND *****"
            );

            handlePasswordChange();

            return;
        }


        /*
         * It may simply be taking a little longer
         * for Grafana to render the next page.
         */
        if (
            passwordChangeAttempts <
            maxPasswordChangeAttempts
        ) {

            setTimeout(
                checkPasswordChange,
                500
            );

        } else {

            console.log(
                "Password-change page not detected."
            );

        }

    }


    /*
     * ----------------------------------------------------
     * STEP 3: CHANGE PASSWORD
     * ----------------------------------------------------
     */

    function handlePasswordChange() {

        var newPassword = document.querySelector(
            'input[name="newPassword"]'
        );

        var confirmPassword = document.querySelector(
            'input[name="confirmNew"]'
        );


        if (!newPassword || !confirmPassword) {

            console.log(
                "ERROR: Password fields not found."
            );

            return;
        }


        console.log(
            "Filling new password..."
        );


        setReactInput(
            newPassword,
            "admin"
        );


        setReactInput(
            confirmPassword,
            "admin"
        );


        console.log(
            "New password fields populated."
        );


        /*
         * Give React time to process both fields.
         */
        setTimeout(function () {

            var submitButton = document.querySelector(
                'button[type="submit"]'
            );


            if (submitButton) {

                console.log(
                    "Password Submit button found:",
                    submitButton.innerText
                );

                console.log(
                    "Submitting new password..."
                );

                submitButton.click();

            } else {

                console.log(
                    "ERROR: Password Submit button not found."
                );

            }

        }, 500);

    }


    /*
     * Start the whole process.
     */
    setTimeout(
        findLogin,
        500
    );

})();
