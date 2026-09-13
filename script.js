window.addEventListener("load", () => {
    const laoder = document.querySelector(".loader");
    setTimeout(() => {
        laoder.classList.add("loader-fading");

    setTimeout(() => {
        laoder.classList.remove("loader-active");
    }, 500);

    }, 200);

});

var CurrentTime="";

    function timeUpdate() {
        CurrentTime = new Date().toLocaleString();
        var timeText = document.querySelector("#timebarelement");

    if (timeText) {
        timeText.innerHTML = CurrentTime;

    }

    var downloadLink = document.querySelector("#downloadLink");
    if (downloadLink) {
        var downloadName = "arcos_painting_" + CurrentTime.replace(/[^a-zA-z0-9,-]/g, "_") + ".png";
        downloadLink.setAttribute("download", downloadName);

    }

    }
    setInterval(timeUpdate, 1000);