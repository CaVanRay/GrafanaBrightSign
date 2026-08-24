
function startDemoPlaylist() {

    console.log("================================");
    console.log("STARTING DEMO PLAYLIST");
    console.log("================================");

    var paragraphs = document.querySelectorAll("p");

    for (var i = 0; i < paragraphs.length; i++) {

        var text = (paragraphs[i].innerText || "").trim();

        if (text === "Dashboards") {

            console.log("Found Dashboards");

            paragraphs[i].click();

            setTimeout(function () {

                var items = document.querySelectorAll("p");

                for (var j = 0; j < items.length; j++) {

                    var itemText =
                        (items[j].innerText || "").trim();

                    if (itemText === "Playlists") {

                        console.log("Found Playlists");

                        items[j].click();

                        return;
                    }
                }

                console.log("ERROR: Playlists not found.");

            }, 500);

            return;
        }
    }

    console.log("ERROR: Dashboards not found.");
}
