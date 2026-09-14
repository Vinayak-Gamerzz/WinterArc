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

const buttons = document.querySelectorAll('.filterbutton');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

    });

});

dragElement(document.getElementById("welcome"));

function dragElement(element) {
    if (!element) return;

    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

    if (document.getElementById(element.id + "header")) {
        document.getElementById(element.id + "header").onmousedown = startDragging;

    } else {
        element.onmousedown = startDragging;

    }

    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();
        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = dragElement;

    }

    function dragElement(e) {
        e = e || window.event;
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;

        var nextTop = element.offsetTop = - currentY;
        var nextLeft = element.offsetLeft = - currentX;
        var minTop = element.offsetHeight / 2;
        var minLeft = element.offsetWidth / 2;
        var maxTop = window.innerHeight - element.offsetHeight / 2;
        var maxLeft = window.innerWidth - element.offsetWidth / 2;

        element.style.top = Math.max(minTop, Math.min(nextTop, maxTop)) + "px";
        element.style.left = Math.max(minLeft, Math.min(nextLeft, maxLeft)) + "px";

    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;

    }

    if (window.ResizeObserver) {
        var isFirstResizeObservation = true;
        var resizeObserver = new ResizeObserver(function (windowId) {
            if (isFirstResizeObservation) {
                isFirstResizeObservation = false;
                return;

            }
            if (element.style.display === "none") return;
            if (element.id === "youtube") {
                resizeYoutubePlayer();

            }

            var minTop = element.offsetHeight / 2;
            var minTop = element.offsetHeight / 2;
            var minLeft = element.offsetWidth / 2;
            var maxTop = window.innerHeight - element.offsetHeight / 2;
            var maxLeft = window.innerWidth - element.offsetWidth / 2;
            element.style.top = Math.max(minTop, Math.min(element.offsetTop, maxTop)) + "px";
            element.style.left = Math.max(minLeft, Math.min(element.offsetLeft, maxLeft)) + "px";

        });
        resizeObserver.observe(element);

    }

}

