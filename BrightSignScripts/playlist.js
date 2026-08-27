/****************************************************
Date: 8/27/2026
Title: playlist.js
Author: Cavan Ray Theiss


****************************************************/


(function () {

    console.log("================================");
    console.log("PLAYLIST TEST");
    console.log("================================");

    function startDemoPlaylist() {

        console.log("Starting playlist test...");

        var paragraphs = document.querySelectorAll("p");

        console.log(
            "Found " + paragraphs.length + " <p> elements"
        );

        for (var i = 0; i < paragraphs.length; i++) {

            var text =
                (paragraphs[i].innerText || "").trim();

            if (text === "Dashboards") {

                console.log("Found Dashboards");

                paragraphs[i].click();

                setTimeout(function () {

                    var items =
                        document.querySelectorAll("p");

                    console.log(
                        "Searching for Playlists..."
                    );

                    for (var j = 0; j < items.length; j++) {

                        var itemText =
                            (items[j].innerText || "").trim();

                        if (itemText === "Playlists") {

                            console.log(
                                "Found Playlists"
                            );

                            items[j].click();

                            return;
                        }
                    }

                    console.log(
                        "ERROR: Playlists not found."
                    );

                }, 1000);

                return;
            }
        }

        console.log(
            "ERROR: Dashboards not found."
        );
    }


    /*
     * Give Grafana time to finish rendering
     * the dashboard before starting.
     */
    setTimeout(
        startDemoPlaylist,
        2000
    );

})();
