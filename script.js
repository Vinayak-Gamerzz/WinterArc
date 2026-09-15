window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  setTimeout(() => {
    loader.classList.add("loader-fading");

    setTimeout(() => {
      loader.classList.remove("loader-active");
    }, 800);
  }, 2000);
});

var currentTime = "";
      function timeUpdate() {
      currentTime = new Date().toLocaleString();
      var timeText = document.querySelector("#timebarElement");
     if (timeText) {
        timeText.innerHTML = currentTime;
      }

      var downloadLink = document.querySelector("#downloadLink");
      if (downloadLink) {
        var downloadName = "arcos_painting_" + currentTime.replace(/[^a-zA-Z0-9.-]/g, "_") + ".png";
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
  if (!element) {
    return;
  }

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

    var nextTop = element.offsetTop - currentY;
    var nextLeft = element.offsetLeft - currentX;
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
        resizeYouTubePlayer();
      }

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
    updateTransparentDisplay(Number(savedTransparent));
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
  document.documentElement.style.setProperty("--desktop-window-alpha", 1);
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

function updateTransparentDisplay(value) {
  const transparentAmount = Number.isFinite(value) ? value : 0;
  const alpha = Math.max(0, Math.min(1, transparentAmount / 100));
  document.documentElement.style.setProperty("--desktop-window-alpha", alpha.toFixed(2));

  if (transparentValue) {
    transparentValue.textContent = `${Math.round(alpha * 100)}%`;
  }
}

function updateBgcolorDisplay(value) {
  const bgcolorAmount = Number.isFinite(value) ? value : 0;
  document.documentElement.style.setProperty("--welcome-hue", `${bgcolorAmount}`);

  if (bgcolorValue) {
    bgcolorValue.textContent = `${bgcolorAmount}`;
  }
}

if (fileInput) {
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => applyWallpaper(reader.result);
    reader.readAsDataURL(file);
  });
}

if (applyStyleBtn) {
  applyStyleBtn.addEventListener("click", () => {
    const file = fileInput && fileInput.files ? fileInput.files[0] : null;

    if (!file) {
      saveSettings(null, Number(blurInput.value), Number(transparentInput.value), Number(bgcolorInput.value));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      applyWallpaper(reader.result);
      saveSettings(reader.result, Number(blurInput.value), Number(transparentInput.value), Number(bgcolorInput.value));
    };
    reader.readAsDataURL(file);
  });
}

if (resetWallpaperBtn) {
  resetWallpaperBtn.addEventListener("click", () => {
    resetWallpaper();
    clearSavedWallpaper();
    resetToDefaults()
    saveSettings(null, Number(0), Number(100), Number(120));
  });
}

if (blurInput) {
  blurInput.addEventListener("input", (event) => {
    var value = parseInt(event.target.value, 10);
    updateBlurDisplay(value);
    localStorage.setItem(STORAGE_BLUR, String(value));
  });
}

if (transparentInput) {
  transparentInput.addEventListener("input", (event) => {
    var value = parseInt(event.target.value, 10);
    updateTransparentDisplay(value);
    localStorage.setItem(STORAGE_TRANSPARENT, String(value));
  });
}

if (bgcolorInput) {
  bgcolorInput.addEventListener("input", (event) => {
    var value = parseInt(event.target.value, 10);
    updateBgcolorDisplay(value);
    localStorage.setItem(STORAGE_BGCOLOR, String(value));
  });
}

loadSettings();
updateBlurDisplay(Number(blurInput && blurInput.value ? blurInput.value : 0));
updateBgcolorDisplay(Number(bgcolorInput && bgcolorInput.value ? bgcolorInput.value : 0));
updateTransparentDisplay(Number(transparentInput && transparentInput.value ? transparentInput.value : 0));

function closeWindow(element) {
  if (!element) return;

    element.classList.remove("opening");
    void element.offsetWidth;
    element.classList.add("closing");
    setTimeout(function () {
        element.style.display = "none";
        element.classList.remove("closing");
        removeTaskbarApp(element);
    }, 350);
    
}

var welcomeScreenClose = document.querySelector("#welcomeclose")

var welcomeScreenOpen = document.querySelector("#settingsButton")
var calendarScreen = document.querySelector("#calendar")
var calendarScreenOpen = document.querySelector("#timebarElement")

welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
  if (settingsScreen.style.display === "flex") {
    closeWindow(settingsScreen);
  } else {
    openWindow(settingsScreen);
  }
});

if (calendarScreenOpen) {
  calendarScreenOpen.addEventListener("click", function() {
    if (calendarScreen && calendarScreen.style.display === "flex") {
      closeWindow(calendarScreen);
    } else if (calendarScreen) {
      openWindow(calendarScreen);
    }
  });
}

var selectedIcon = undefined

function selectIcon(element) {
  if (element) {
    element.classList.add("selected");
    selectedIcon = element
  }
} 

function deselectIcon(element) {
  if (element) {
    element.classList.remove("selected");
  }
  selectedIcon = undefined
} 

function handleIconTap(element, windowElement, appName) {
  if (!element || !windowElement) {
    return;
  }

  if (element.classList.contains("selected")) {
    deselectIcon(element);
  } else {
    selectIcon(element);
    openWindow(windowElement, appName);
  }
}

const INSTALLED_APPS_STORAGE_KEY = "installedApps";

const APP_ICON_IDS = {
  prog: "progressicon"
};

const APP_DISPLAY_NAMES = {
  spotify: "arcmusic",
  youtube: "arcvid",
  browser: "arcbrowser",
  cterminal: "hackcmd",
  info: "about",
  prog: "proggallery"
};

function getAppIcon(appName) {
  return document.getElementById(APP_ICON_IDS[appName] || appName + "icon");
}

function getAppButton(appName) {
  return document.getElementById(appName + "Button");
}

function getAppDisplayName(appName) {
  return APP_DISPLAY_NAMES[appName] || appName;
}

function getInstalledApps() {
  try {
    return JSON.parse(
      localStorage.getItem(INSTALLED_APPS_STORAGE_KEY)
    ) || [];
  } catch {
    return [];
  }
}

function saveInstalledApps(installedApps) {
  localStorage.setItem(
    INSTALLED_APPS_STORAGE_KEY,
    JSON.stringify(installedApps)
  );
}

function saveVisibleApps() {
  const visibleApps = [...document.querySelectorAll(".appstorebutton")]
    .map((button) => button.id.replace("Button", ""))
    .filter((appName) => {
      const icon = getAppIcon(appName);

      return icon && getComputedStyle(icon).display === "flex";
    });

  saveInstalledApps([...new Set(visibleApps)]);
  document.getElementById("saveAppsBTN").textContent = "Saved!";
  setTimeout(() => document.getElementById("saveAppsBTN").textContent = "Save installed", 2000);
}

function installApp(appName, isTerminal) {
  const icon = getAppIcon(appName);
  const button = getAppButton(appName);

  if (!icon || !button) {
    return;
  }

  const displayName = getAppDisplayName(appName);
  const installedApps = getInstalledApps();
  const appIsInstalled = installedApps.includes(appName);
  const actionText = appIsInstalled ? "Removing" : "Downloading";
  const duration = 3000;
  const startTime = Date.now();
  button.disabled = true;
  button.textContent = `${actionText} 0%`;

  const progressTimer = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    let progress = Math.min(
      100,
      Math.round((elapsedTime / duration) * 100)
    );
    button.textContent = `${actionText} ${progress}%`;

    if (isTerminal) {
      if ((progress === 4 || progress === 3) && appIsInstalled) {
        addCommand(`${displayName} is already installed. Removing...`, "#1008ee");
      }

      addCommand(`${actionText} ${displayName}: ${progress}%`, "#08d3ee");
    }

    if (progress >= 100) {
      clearInterval(progressTimer);
      progress = 0;

      if (appIsInstalled) {
        icon.style.display = "none";
        saveInstalledApps(installedApps.filter((installedApp) => installedApp !== appName));

        if (isTerminal) {
          addCommand(`Removed ${displayName} successfully!`, "#ee1408");
        } else {
          button.textContent = "Install";
        }
      } else {
        icon.style.display = "flex";
        saveInstalledApps([...installedApps, appName]);

        if (isTerminal) {
          addCommand(`Installed ${displayName} successfully!`, "#ee1408");
        } else {
          button.textContent = "Remove";
        }
      }

      button.disabled = false;
    }
  }, 100);
}

function restoreInstalledApps() {
  const installedApps = getInstalledApps();

  document.querySelectorAll(".appstorebutton").forEach((button) => {
    const appName = button.id.replace("Button", "");
    const icon = getAppIcon(appName);

    if (!icon) {
      return;
    }

    const appIsInstalled = installedApps.includes(appName);

    icon.style.display = appIsInstalled ? "flex" : "none";
    button.textContent = appIsInstalled ? "Remove" : "Install";
  });
}

restoreInstalledApps();


dragElement(document.querySelector("#notepad"))

var notepadScreen = document.querySelector("#notepad")
var notepadIcon = document.querySelector("#notepadicon")

var notepadScreenClose = document.querySelector("#notepadclose")

notepadScreenClose.addEventListener("click", () => closeWindow(notepadScreen));

if (notepadIcon) {
  notepadIcon.addEventListener("click", () => {
    handleIconTap(notepadIcon, notepadScreen, "TeXtpad");
  });
}