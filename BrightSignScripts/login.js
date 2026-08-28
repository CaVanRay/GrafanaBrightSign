/****************************************************
Date: 8/28/2026
Title: playlist.js
Author: Cavan Ray Theiss
Description: after a successful login the playlist.js
script will navigate the dashboard menu to reach the
playlist section and then start the demo playlist
****************************************************/

(function () {

	var loginComplete =
        sessionStorage.getItem("grafanaAutoLoginComplete") === "true";

    if (loginComplete) {

        console.log(
            "Grafana login already completed."
        );

        console.log(
            "Skipping login process."
        );

		console.log(
			"Starting playlist.js"
		);

		startPlaylist();
		
        return;
    }

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

    var newPassword = document.querySelector(
        'input[name="newPassword"]'
    );

    var confirmPassword = document.querySelector(
        'input[name="confirmNew"]'
    );


    console.log(
        "Login check " + loginAttempts +
        " | login=" + !!userField +
        " | passwordChange=" +
        (!!newPassword && !!confirmPassword)
    );


    /*
     * ---------------------------------------------
     * PASSWORD CHANGE PAGE
     * ---------------------------------------------
     */

    if (newPassword && confirmPassword) {

        console.log(
            "Password-change page detected."
        );

        handlePasswordChange();

        return;
    }


    /*
     * ---------------------------------------------
     * LOGIN PAGE
     * ---------------------------------------------
     */

    if (userField && passField) {

        console.log(
            "***** LOGIN FIELDS FOUND *****"
        );


        setReactInput(
            userField,
            "admin"
        );


        setReactInput(
            passField,
            "admin"
        );


        console.log(
            "Credentials inserted."
        );


        setTimeout(function () {

            var loginButton =
                document.querySelector(
                    'button[type="submit"]'
                );


            if (loginButton) {

                console.log(
                    "Login button found:",
                    loginButton.innerText
                );

                console.log(
                    "Clicking Login..."
                );

                loginButton.click();


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


        return;
    }


    /*
     * ---------------------------------------------
     * NOTHING FOUND YET
     * ---------------------------------------------
     *
     * Grafana may still be rendering.
     *
     * Keep trying for up to 30 seconds.
     */

    if (loginAttempts < maxLoginAttempts) {

        console.log(
            "Grafana still loading - checking again..."
        );

        setTimeout(
            findLogin,
            500
        );

    } else {

        console.log(
            "Login fields never appeared. Stopping."
        );

    }

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

    			console.log(
        			"Password submitted successfully."
    			);

    			sessionStorage.setItem(
        			"grafanaAutoLoginComplete",
        			"true"
    			);

    			console.log(
        			"LOGIN SUCCESS FLAG SET."
    			);


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
