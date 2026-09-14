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

var STORAGE_BG = "arcos-bg-image";
var STORAGE_BLUR = "arcos-blur";
var STORAGE_TRANSPARENT = "arcos-transparent";
var STORAGE_BGCOLOR = "arcos-bgcolor";

function saveSettings(bgImage, blur, transparent, bgcolor) {
    if (bgImage) {
        localStorage.setItem(STORAGE_BG, bgImage);

    }

    localStorage.setItem(STORAGE_BLUR, String(blur));
    localStorage.setItem(STORAGE_TRANSPARENT, String(transparent));
    localStorage.setItem(STORAGE_BGCOLOR, String(bgcolor));

}

function loadSettings() {
    var savedBg = localStorage.getItem(STORAGE_BG);
    var savedBlur = localStorage.getItem(STORAGE_BLUR);
    var savedTransparent = localStorage.getItem(STORAGE_TRANSPARENT);
    var savedBgcolor = localStorage.getItem(STORAGE_BGCOLOR);

    if (savedBg) {
        applyWallpaper(savedBg);

    }

    if (blurInput && savedBlur !== null) {
        blurInput.value = savedBlur;
        updateBlurDisplay(Number(savedBlur));

    }

    if (transparentInput && savedTransparent !== null) {
        transparentInput.value = savedTransparent;
        updateTransparentDisplay(Number(savedTransport));

    }

    if (bgcolorInput && savedBgcolor !== null) {
        bgcolorInput.value = savedBgcolor;
        updateBgcolorDisplay(Number(savedBgcolor));

    }

}

function clearSavedWallpaper() {
    localStorage.removeItem(STORAGE_BG);    

}

var welcomeScreen = document.querySelector("#welcome")
var body = document.body;
var defaultBackgroundImage = body.style.backgroundImage || "";
var defaultBackgroundColor = body.style.backgroundColor || "antiquewhite";
var defaultBackgroundSize = body.style.backgroundSize || "cover";
var defaultBackgroundPosition = body.style.backgroundPosition || "";
var fileInput = document.getElementById("bgFile");
var applyStyleBtn = document.getElementById("applyStyleBtn");
var resetWallpaperBtn = document.getElementById("resetWallpaperBtn");
var blurInput = document.getElementById("blurInput");
var blurValue = document.getElementById("blurValue");
var transparentInput = document.getElementById("transparentInput");
var transparentValue = document.getElementById("transparentValue");
var bgcolorInput = document.getElementById("bgcolorInput");
var bgcolorValue = document.getElementById("bgcolorValue");

function applyWallpaper(imageDataUrl) {
  if (!body) {
    return;
    
  }

  if (imageDataUrl) {
    body.style.backgroundImage = `url(${imageDataUrl})`;

  } else {
    body.style.backgroundImage = defaultBackgroundImage;

  }

  body.style.backgroundColor = defaultBackgroundColor;
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";

}

function resetWallpaper() {
  if (!body) {
    return;

  }

  body.style.backgroundImage = defaultBackgroundImage;
  body.style.backgroundColor = defaultBackgroundColor;
  body.style.backgroundSize = defaultBackgroundSize;
  body.style.backgroundPosition = defaultBackgroundPosition;

}

function resetToDefaults() {
  document.documentElement.style.setProperty("--desktop-window-alpha", 100);
  document.documentElement.style.setProperty("--desktop-blur", `0px`);
  document.documentElement.style.setProperty("--welcome-hue", `120`);

}

function updateBlurDisplay(value) {
  const blurAmount = Number.isFinite(value) ? value : 0;
  document.documentElement.style.setProperty("--desktop-blur", `${blurAmount}px`);

  if (blurValue) {
    blurValue.textContent = `${blurAmount}px`;

  }

}