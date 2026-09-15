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
    handleIconTap(notepadIcon, notepadScreen, "NotePad");
  });
}

dragElement(document.querySelector("#weather"))

var weatherScreen = document.querySelector("#weather")
var weatherIcon = document.querySelector("#weathericon")

var weatherScreenClose = document.querySelector("#weatherclose")

weatherScreenClose.addEventListener("click", () => closeWindow(weatherScreen));

if (weatherIcon) {
  weatherIcon.addEventListener("click", () => {
    handleIconTap(weatherIcon, weatherScreen, "Weather");
  });
}


dragElement(document.querySelector("#clock"))

var clockScreen = document.querySelector("#clock")
var clockIcon = document.querySelector("#clockicon")

var clockScreenClose = document.querySelector("#clockclose")

clockScreenClose.addEventListener("click", () => closeWindow(clockScreen));

if (clockIcon) {
  clockIcon.addEventListener("click", () => {
    handleIconTap(clockIcon, clockScreen, "Clock");
  });
}

dragElement(document.querySelector("#spotify"))

var spotifyScreen = document.querySelector("#spotify") 
var spotifyIcon = document.querySelector("#spotifyicon")
var spotifyScreenClose = document.querySelector("#spotifyclose")

spotifyScreenClose.addEventListener("click", () => {
  closeWindow(spotifyScreen);
  audio.pause();
  audio.src = '';
  playBtn.classList.remove("pause");
  playBtn.classList.add("play");
  radioimg.src = "./icons/radio.png"
});

if (spotifyIcon) {
  spotifyIcon.addEventListener("click", () => {
    handleIconTap(spotifyIcon, spotifyScreen, "arcMusic");
  });
}

dragElement(document.querySelector("#youtube"))

var youtubeScreen = document.querySelector("#youtube")
var youtubeIcon = document.querySelector("#youtubeicon")
var youtubeScreenClose = document.querySelector("#youtubeclose")

youtubeScreenClose.addEventListener("click", () => {
  closeWindow(youtubeScreen);
  if (player && typeof player.stopVideo === "function") {
    player.stopVideo();
  }
});

if (youtubeIcon) {
  youtubeIcon.addEventListener("click", () => {
    handleIconTap(youtubeIcon, youtubeScreen, "arcVid");
  });
}


  dragElement(document.querySelector("#cterminal"))

  var cterminalScreen = document.querySelector("#cterminal")
  var cterminalIcon = document.querySelector("#cterminalicon")

  var cterminalScreenClose = document.querySelector("#cterminalclose")

  cterminalScreenClose.addEventListener("click", () => closeWindow(cterminalScreen));

  if (cterminalIcon) {
    cterminalIcon.addEventListener("click", () => {
      handleIconTap(cterminalIcon, cterminalScreen, "HackCMD");
    });
  }

  dragElement(document.querySelector("#terminal"))

  var terminalScreen = document.querySelector("#terminal")
  var terminalIcon = document.querySelector("#terminalicon")

  var terminalScreenClose = document.querySelector("#terminalclose")

  terminalScreenClose.addEventListener("click", () => closeWindow(terminalScreen));

  if (terminalIcon) {
    terminalIcon.addEventListener("click", () => {
      handleIconTap(terminalIcon, terminalScreen, "Terminal");
    });
  }



  dragElement(document.querySelector("#paint"))

  var paintScreen = document.querySelector("#paint")
  var paintIcon = document.querySelector("#painticon")

  var paintScreenClose = document.querySelector("#paintclose")

  paintScreenClose.addEventListener("click", () => closeWindow(paintScreen));

  if (paintIcon) {
    paintIcon.addEventListener("click", () => {
      handleIconTap(paintIcon, paintScreen, "Paint");
    });
  }


  dragElement(document.querySelector("#browser"))

  var browserScreen = document.querySelector("#browser")
  var browserIcon = document.querySelector("#browsericon")

  var browserScreenClose = document.querySelector("#browserclose")

  browserScreenClose.addEventListener("click", () => closeWindow(browserScreen));

  if (browserIcon) {
    browserIcon.addEventListener("click", () => {
      handleIconTap(browserIcon, browserScreen, "arcBrowser");
    });
  }


  dragElement(document.querySelector("#calculator"))

var calculatorScreen = document.querySelector("#calculator")
var calculatorIcon = document.querySelector("#calculatoricon")

var calculatorScreenClose = document.querySelector("#calculatorclose")

calculatorScreenClose.addEventListener("click", () => closeWindow(calculatorScreen));

if (calculatorIcon) {
  calculatorIcon.addEventListener("click", () => {
    handleIconTap(calculatorIcon, calculatorScreen, "Calculator");
  });
}

dragElement(document.querySelector("#info"))

var infoScreen = document.querySelector("#info")
var infoIcon = document.querySelector("#infoicon")

var infoScreenClose = document.querySelector("#infoclose")

infoScreenClose.addEventListener("click", () => closeWindow(infoScreen));

if (infoIcon) {
  infoIcon.addEventListener("click", () => {
    handleIconTap(infoIcon, infoScreen, "Info");
  });
}


dragElement(document.querySelector("#apps"))

var appsScreen = document.querySelector("#apps")
var appsIcon = document.querySelector("#appsicon")

var appsScreenClose = document.querySelector("#appsclose")

appsScreenClose.addEventListener("click", () => closeWindow(appsScreen));

if (appsIcon) {
  appsIcon.addEventListener("click", () => {
    handleIconTap(appsIcon, appsScreen, "App Store");
  });
}

  dragElement(document.querySelector("#pacman"))

var pacmanScreen = document.querySelector("#pacman")
var pacmanIcon = document.querySelector("#pacmanIcon")
const pacmanWindow = document.getElementById('pacmanG');
var pacmanScreenClose = document.querySelector("#pacmanclose")

pacmanScreenClose.addEventListener("click", () => {
  closeWindow(pacmanScreen);
  pacmanWindow.src = 'about:blank';
});
  

if (pacmanIcon) {
  pacmanIcon.addEventListener("click", () => {
    pacmanWindow.src = 'https://pac-man-jet-six.vercel.app/Pacman.html';
    handleIconTap(pacmanIcon, pacmanScreen, "Pacman");
  });
}

  dragElement(document.querySelector("#recorder"))

var recorderScreen = document.querySelector("#recorder")
var recorderIcon = document.querySelector("#recordericon")
var recorderScreenClose = document.querySelector("#recorderclose")

recorderScreenClose.addEventListener("click", () => {
  closeWindow(recorderScreen);
  if(typeof audioStream !== 'undefined' && audioStream){
  audioStream.getTracks().forEach(function(track) {
      track.stop();
    });
}});
  

if (recorderIcon) {
  recorderIcon.addEventListener("click", () => {
    handleIconTap(recorderIcon, recorderScreen, "Recorder");
  });
}

  dragElement(document.querySelector("#prog"))

var progScreen = document.querySelector("#prog")
var progIcon = document.querySelector("#progressicon")
var progScreenClose = document.querySelector("#progclose")

if (progScreenClose) {
  progScreenClose.addEventListener("click", () => {
    closeWindow(progScreen);
  });
}

if (progIcon) {
  progIcon.addEventListener("click", () => {
    handleIconTap(progIcon, progScreen, "progress Gallery");
  });
}


dragElement(document.querySelector("#camera"))

var cameraScreen = document.querySelector("#camera")
var cameraIcon = document.querySelector("#cameraicon")

var cameraScreenClose = document.querySelector("#cameraclose")

cameraScreenClose.addEventListener("click", () => {
  closeWindow(cameraScreen);
  stopCamera();
});

if (cameraIcon) {
  cameraIcon.addEventListener("click", () => {
    handleIconTap(cameraIcon, cameraScreen, "Camera");
  });
}



dragElement(document.querySelector("#pong"))

var pongScreen = document.querySelector("#pong")
var pongIcon = document.querySelector("#pongicon")

var pongScreenClose = document.querySelector("#pongclose")
var pongScreenMinimize = document.querySelector("#pongminimize")

pongScreenClose.addEventListener("click", () => {
  closeWindow(pongScreen);
  stopPong();
  resetPong();
});

if (pongIcon) {
  pongIcon.addEventListener("click", () => {
    const wasOpen = pongIcon.classList.contains("selected");
    handleIconTap(pongIcon, pongScreen, "Pong");
    if (wasOpen) {
      
    } else {
      startPong();
    }
  });
}

var settingsScreen = document.querySelector("#settings")
var settingsIcon = document.querySelector("#settingsicon")


if (settingsIcon) {
  settingsIcon.addEventListener("click", () => {
    handleIconTap(settingsIcon, settingsScreen);
  });
}

var biggestIndex = 1;
var topBar = document.querySelector("#top")

function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;  
  settingsScreen.style.zIndex = biggestIndex;
  calendarScreen.style.zIndex = biggestIndex;
}

function addWindowTapHandling(element) {
  if (!element) {
    return;
  }

  if (element !== settingsScreen) {
    element.addEventListener("mousedown", () => handleWindowTap(element));
  }
}

addWindowTapHandling(welcomeScreen);
addWindowTapHandling(notepadScreen);
addWindowTapHandling(weatherScreen);
addWindowTapHandling(clockScreen);
addWindowTapHandling(spotifyScreen);
addWindowTapHandling(youtubeScreen);
addWindowTapHandling(cterminalScreen);
addWindowTapHandling(terminalScreen);
addWindowTapHandling(paintScreen);
addWindowTapHandling(settingsScreen);
addWindowTapHandling(browserScreen);
addWindowTapHandling(calculatorScreen);
addWindowTapHandling(pongScreen);
addWindowTapHandling(cameraScreen);
addWindowTapHandling(pacmanScreen);
addWindowTapHandling(infoScreen);
addWindowTapHandling(recorderScreen);
addWindowTapHandling(progScreen);
addWindowTapHandling(appsScreen);


var content = [
  {
    title: "Notepad is so good!",
    date: "- nobody",
    content: `
        <h1 class="ubuntu-regular" style="margin: 2px; color: rgb(243, 219, 5)">NotePad</h1>
        <textarea style="width: 256px; height: 128px; resize: auto;" id="textarea" autofocus spellcheck="true"></textarea>
        <p style="margin: 0px;">Note saves to your browser's local storage.</p>
      `
  }

];


function attachNotePadEditor() {
  const textarea = document.getElementById('textarea');
  if (!textarea) {
    return;
  }

  const savedText = localStorage.getItem('myTextareaContent');
  if (savedText !== null) {
    textarea.value = savedText;
  }

  textarea.oninput = function() {
    localStorage.setItem('myTextareaContent', textarea.value);
  };
}

function setNotePadContent(index) {
  var notepadContent = document.querySelector("#notepadContent");
  if (!notepadContent || !content[index]) {
    return;
  }

  notepadContent.innerHTML = content[index].content;
  attachNotePadEditor();
}

function addToBottomBar(index) {
  var bottomBar = document.querySelector("#bottomBar");
  if (!bottomBar || !content[index]) {
    return;
  }

  var note = content[index];
  var newDiv = document.createElement("div");
  newDiv.style.cssText = "background-color: rgb(231, 25, 25); width: 220px; padding: 10px; border-radius: 8px;";
  newDiv.innerHTML = `
    <p style="margin: 0px;">${note.title}</p>
    <p style="font-size: 12px; margin: 0px;">${note.date}</p>
  `;
  newDiv.addEventListener("click", function() {
    setNotePadContent(index);
  });

  bottomBar.appendChild(newDiv);
}

setNotePadContent(0);

for (let i = 0; i < content.length; i++) {
  addToBottomBar(i);
}


function weatherCodeToText(code) {
  const weatherCodes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Snow",
    95: "Thunderstorm"
  };

  return weatherCodes[code] || "Unknown";
}

function weatherCodeToEmoji(code) {
  const weatherIcons = {
    0: "☀️",
    1: "🌤️",
    2: "⛅",
    3: "☁️",
    45: "🌫️",
    48: "🌫️",
    51: "🌦️",
    53: "☔",
    55: "☔",
    61: "🌧️",
    63: "🌧️",
    65: "🌧️",
    71: "🌨️",
    95: "⛈️"
  };

  return weatherIcons[code] || "🌍";
}

async function getLocationName(lat, lon) {
  const providers = [
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=10&accept-language=en`
  ];

  for (const url of providers) {
    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      const city = data.city || data.locality || data.address?.city || data.address?.town || data.address?.village || data.address?.suburb || "";
      const region = data.principalSubdivision || data.address?.state || data.address?.county || "";
      const country = data.countryName || data.address?.country || "";
      const label = [city, region, country].filter(Boolean).join(", ");

      if (label) {
        return label;
      }
    } catch (error) {
      console.warn("Could not resolve location name with provider", url, error);
    }
  }

  return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
}

async function showWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const temp = data.current.temperature_2m;
    const code = data.current.weather_code;
    const desc = weatherCodeToText(code);
    const icon = weatherCodeToEmoji(code);
    const locationName = await getLocationName(lat, lon);

    const weatherIcon = document.querySelector("#weather-icon");

    if (weatherIcon) {
      weatherIcon.textContent = icon;
    }

    document.querySelector("#weathercontent").innerHTML = `
      <p><strong>Location:</strong> ${locationName || "Your location"}</p>
      <p><strong>Temperature:</strong> ${temp}°C</p>
      <p><strong>Condition:</strong> ${desc}</p>
    `;
  } catch {
    document.querySelector("#weathercontent").innerHTML =
      "<p>Weather could not be loaded.</p>";
  }
}

function getUserWeather() {
  if (!navigator.geolocation) {
    document.querySelector("#weathercontent").innerHTML =
      "<p>Geolocation is not supported by this browser.</p>";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      showWeather(position.coords.latitude, position.coords.longitude);
    },
    () => {
      document.querySelector("#weathercontent").innerHTML =
        "<p>Location access was denied.</p>";
    }
  );
}

getUserWeather();

const hourHand = document.querySelector("#hour-hand");
const minuteHand = document.querySelector("#minute-hand");
const secondHand = document.querySelector("#second-hand");
const date = document.querySelector("#date");
const month = document.querySelector("#month");
function setRotation(hand, rotation) {
 hand.style.setProperty('--rotation', rotation);
}
function setClock() {
 const currentDate = new Date();
 const seconds = currentDate.getSeconds();
 const minutes = currentDate.getMinutes();
 const hours = currentDate.getHours();
 const milliseconds = currentDate.getMilliseconds();
const secondsRotation = (seconds / 60) * 360 + (milliseconds / 1000) * 6;
 const minutesRotation = ((minutes + seconds / 60) / 60) * 360;
 const hoursRotation = ((hours + minutes / 60) / 12) * 360;
setRotation(secondHand, secondsRotation);
 setRotation(minuteHand, minutesRotation);
 setRotation(hourHand, hoursRotation);
date.textContent = currentDate.getDate();
 month.textContent = currentDate.toLocaleString('default', { month: 'short' });
}
setInterval(setClock, 10);
setInterval(getUserWeather, 10 * 60 * 1000);


const codeOutput = document.getElementById('codeOutput');
const chunkSize = 5;
let currentSnippet = '';
let currentSnippetIndex = 0;

function isTerminalTopmost() {
  return cterminalScreen && Number(cterminalScreen.style.zIndex || 0) === biggestIndex;
}

const codeSnippets = {
  kernel: [
    'void init_kernel(void) {',
    '  printk(KERN_INFO "Initializing kernel module...");',
    '  setup_interrupts();',
    '  return 0;',
    '}',
    'struct task_struct *task = get_current();',
    'sudo ./neural_overwrite --target=internal --protocol=raw --stealth=99',
    'echo "injecting_payload" | nc -u 192.168.0.1 -p 443 --brute-force --silent',
    './bin/ghost_scan --port=8080 --detect-vulnerabilities --exfiltrate-data --no-log',
    'ssh root@ghost_net --key-exchange=curve25519 --cipher=aes-256-gcm --bypass-firewall',
    'curl -X POST -H "Content-Type: application/json" -d \'{"command":"overwrite"}\' http://localhost:3000/api/execute',
    'python3 exploit.py --target=internal --payload=stealth --protocol=raw --silent',
    'nc -lvp 4444 -e /bin/bash',
    'echo "payload_injected" | nc -u 192.168.0.1 -p 443',
    'xxd -r -p /dev/zero.bin | sed s/00/FF/g | ./mem_corrupt --address=0x4F2A --force',
    'cat /etc/shadow | ./hash_cracker --algorithm=sha512 --mode=rainbow --threads=16',
    'dd if=/dev/urandom of=/tmp/rootkit.iso bs=1024 count=666 --no-sync --quiet',
    'iptables -A INPUT -p tcp --dport 22 -j DROP',
    'echo "kernel_panic" | nc -u 192.168.0.1 -p 443',
    'hexdump -C memory_dump.bin | grep "0xDEADBEEF" | ./patch_binary --offset=0x1000',
    './sql_injector --target=mainframe --payload=DROP_TABLE --unsafe-mode --auto-worm',
    'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock --privileged evil_container',
    'grep -r "password" /var/www/html --include="*.php" --recursive --ignore-case | ./dump_db'
  ]
};
let currentStyle = 'kernel';

function addCodeSnippet() {
  if (!isTerminalTopmost()) {
    return;
  }

  const snippets = codeSnippets[currentStyle];

  if (!currentSnippet || currentSnippetIndex >= currentSnippet.length) {
    const randomSnippet = snippets[Math.floor(Math.random() * snippets.length)];
    currentSnippet = randomSnippet + '\n';
    currentSnippetIndex = 0;
  }

  const nextChunk = currentSnippet.slice(currentSnippetIndex, currentSnippetIndex + chunkSize);
  if (!nextChunk) {
    return;
  }

  codeOutput.value += nextChunk;
  currentSnippetIndex += chunkSize;
  codeOutput.scrollTop = codeOutput.scrollHeight;
}

document.addEventListener('keydown', (e) => {
  if (!isTerminalTopmost()) {
    return;
  }

  e.preventDefault();
  addCodeSnippet();
});

if (isTerminalTopmost()) {
  codeOutput.focus();
}


const API_KEY = 'AIzaSyAHCbUf3EHTFg1L84i3Hu2T4L1tzz968n8';
let player = null;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '390',
        width: '640',
        videoId: '', 
        playerVars: {
            'playsinline': 1,
            'autoplay': 1
        },
        events: {
            'onReady': resizeYouTubePlayer
        }
    });
}

function resizeYouTubePlayer() {
    if (!player || typeof player.setSize !== "function") return;
    var container = document.getElementById("youtube-player");
    if (!container) return;
    var wrapper = container.parentElement;
    var width = wrapper.clientWidth;
    var height = Math.round(width * 9 / 16);
    player.setSize(width, height);
}

async function searchYouTube() {
    const query = document.getElementById('searchInput').value;
    if (!query) return;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Searching...';

    try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=${encodeURIComponent(query)}&type=video,playlist&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        resultsDiv.innerHTML = '';

        if (!data.items || data.items.length === 0) {
            resultsDiv.innerHTML = 'No results.';
            return;
        }else{
          data.items.length = 5;
        }

        data.items.forEach(item => {
            const isPlaylist = item.id.kind === 'youtube#playlist';
            const id = isPlaylist ? item.id.playlistId : item.id.videoId;
            const title = item.snippet.title;
            const thumbnail = item.snippet.thumbnails.default.url;

            const div = document.createElement('div');
            div.className = 'result-item';
            
            const temp = document.createElement('div');
            temp.innerHTML = title;
            
            div.innerHTML = `
                <img src="${thumbnail}" alt="thumbnail">
                <div class="info">
                    <span class="badge ${isPlaylist ? 'playlist' : 'video'}">
                        ${isPlaylist ? 'Playlist' : 'Video'}
                    </span>
                    <span>${temp.innerText}</span>
                </div>
            `;
            
            div.onclick = () => {
                if (isPlaylist) {
                    player.loadPlaylist({list: id});
                } else {
                    player.loadVideoById(id);
                }
                document.getElementById('player-container').scrollIntoView({ behavior: 'smooth' });
            };

            resultsDiv.appendChild(div);
        });

    } catch (error) {
        console.error(error);
        resultsDiv.innerHTML = 'Error searching.';
    }
}




const paintCanvas =
	document.getElementById('pcanvas');
const paintCtx =
	paintCanvas.getContext('2d');

const brushSize =
	document.getElementById('brush-size');
const colorPicker =
	document.getElementById('color-picker');
const clearCanvas =
	document.getElementById('clear-canvas');
let isDrawing = false;

paintCanvas.width =
	window.innerWidth - 40;
paintCanvas.height =
	window.innerHeight * 0.85;
paintCtx.lineWidth = 5;
paintCtx.lineCap = 'round';
paintCtx.strokeStyle = 'black';

function startPosition(e) {
	isDrawing = true;
	draw(e);
}

function endPosition() {
	isDrawing = false;
	paintCtx.beginPath();
}

function getCanvasPoint(e) {
	const rect = paintCanvas.getBoundingClientRect();
	const x = ((e.clientX - rect.left) / rect.width) * paintCanvas.width;
	const y = ((e.clientY - rect.top) / rect.height) * paintCanvas.height;
	return { x, y };
}

function draw(e) {
	if (!isDrawing) return;
	const { x, y } = getCanvasPoint(e);
	paintCtx.strokeStyle =
		colorPicker.value; 
	paintCtx.lineWidth =
		brushSize.value; 
	paintCtx.lineTo(x, y);
	paintCtx.stroke();
	paintCtx.beginPath();
	paintCtx.moveTo(x, y);
}

paintCanvas
	.addEventListener('mousedown', startPosition);
paintCanvas
	.addEventListener('mouseup', endPosition);
paintCanvas
	.addEventListener('mousemove', draw);
clearCanvas
	.addEventListener('click', () => {
		paintCtx.clearRect(
			0, 0, paintCanvas.width,
			paintCanvas.height
		);
	});

brushSize.addEventListener('input', () => {
	paintCtx.lineWidth =
		brushSize.value;
	updateBrushSizeLabel(brushSize.value);
});

function updateBrushSizeLabel(size) {
	const brushSizeLabel =
		document.getElementById('brush-size-label');
	if (brushSizeLabel) {
		brushSizeLabel.textContent =
			`Brush Size: ${size}`;
	}
}

const penButton =
	document.getElementById('pen');
const eraserButton =
	document.getElementById('eraser');

function activatePen() {
	paintCtx.globalCompositeOperation =
		'source-over';
	paintCtx.strokeStyle =
		colorPicker.value;
}

function activateEraser() {
	paintCtx.globalCompositeOperation =
		'destination-out';
	paintCtx.strokeStyle =
		'rgba(0, 0, 0, 0)';
}

penButton
	.addEventListener('click', () => {
	activatePen();
});

eraserButton
	.addEventListener('click', () => {
	activateEraser();
});




var link = document.getElementById('downloadLink');
  link.addEventListener('click', function() {
this.href = paintCanvas.toDataURL('image/png');
}, false);



document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('url-input');
  const loadBtn = document.getElementById('load-btn');
  const browserWindow = document.getElementById('browser-window');

  const loadPage = () => {
    let url = urlInput.value.trim();
    
    if (url === "") return;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    browserWindow.src = url;
  };

  loadBtn.addEventListener('click', loadPage);

  urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      loadPage();
    }
  });
});



		function dis(val) {
			document.getElementById("result").value += val
		}

		function myFunction(event) {
			if (event.key == '0' || event.key == '1'
				|| event.key == '2' || event.key == '3'
				|| event.key == '4' || event.key == '5'
				|| event.key == '6' || event.key == '7'
				|| event.key == '8' || event.key == '9'
				|| event.key == '+' || event.key == '-'
				|| event.key == '*' || event.key == ':')
				document.getElementById("result").value += event.key;
		}

		let cal = document.getElementById("calcu");
		cal.onkeyup = function (event) {
			if (event.keyCode === 13) {
				console.log("Enter");
				let x = document.getElementById("result").value
				console.log(x);
				solve();
			}
		}

		function solve() {
			let x = document.getElementById("result").value
			let y = math.evaluate(x)
			document.getElementById("result").value = y
		}

		function clr() {
			document.getElementById("result").value = ""
		}




    const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};
const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};
let calendar = document.querySelector('.calendar');
const month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
let month_picker = document.querySelector('#month-picker');
const dayTextFormate = document.querySelector('.day-text-formate');
const timeFormate = document.querySelector('.date-time-value');

month_picker.onclick = () => {
  month_list.classList.remove('hideonce');
  month_list.classList.remove('hide');
  month_list.classList.add('show');
  dayTextFormate.classList.remove('showtime');
  dayTextFormate.classList.add('hidetime');
  timeFormate.classList.remove('showtime');
  timeFormate.classList.add('hideTime');
};

const generateCalendar = (month, year) => {
  let calendar_days = document.querySelector('.calendar-days');
  calendar_days.innerHTML = '';
  let calendar_header_year = document.querySelector('#year');
  let days_of_month = [
      31,
      getFebDays(year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

  let currentDate = new Date();

  month_picker.innerHTML = month_names[month];

  calendar_header_year.innerHTML = year;

  let first_day = new Date(year, month);


  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {

    let day = document.createElement('div');

    if (i >= first_day.getDay()) {
      day.innerHTML = i - first_day.getDay() + 1;

      if (i - first_day.getDay() + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add('current-date');
      }
    }
    calendar_days.appendChild(day);
  }
};

let month_list = calendar.querySelector('.month-list');
month_names.forEach((e, index) => {
  let month = document.createElement('div');
  month.innerHTML = `<div>${e}</div>`;

  month_list.append(month);
  month.onclick = () => {
    currentMonth.value = index;
    generateCalendar(currentMonth.value, currentYear.value);
    month_list.classList.replace('show', 'hide');
    dayTextFormate.classList.remove('hideTime');
    dayTextFormate.classList.add('showtime');
    timeFormate.classList.remove('hideTime');
    timeFormate.classList.add('showtime');
  };
});

(function() {
  month_list.classList.add('hideonce');
})();
document.querySelector('#pre-year').onclick = () => {
  --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector('#next-year').onclick = () => {
  ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);

const todayShowTime = document.querySelector('.date-time-value');
const todayShowDate = document.querySelector('.day-text-formate');

const currshowDate = new Date();
const showCurrentDateOption = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
};
const currentDateFormate = new Intl.DateTimeFormat(
  'en-US',
  showCurrentDateOption
).format(currshowDate);
todayShowDate.textContent = currentDateFormate;
setInterval(() => {
  const timer = new Date();
  const option = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
  let time = `${`${timer.getHours()}`.padStart(
      2,
      '0'
    )}:${`${timer.getMinutes()}`.padStart(
      2,
      '0'
    )}: ${`${timer.getSeconds()}`.padStart(2, '0')}`;
  todayShowTime.textContent = formateTimer;
}, 1000);




let pongcanvas = document.getElementById('pongcanvas'), ctx = document.getElementById('pongcanvas').getContext('2d'), paddles = [0, 0], ball = [0, 0, -0.016, 0], score = [0, 0], cursor = 0, reactionSpeed = 6, reactionDistance = -0.5, pongInterval = null;
pongcanvas.addEventListener('mousemove', e => {
    const rect = pongcanvas.getBoundingClientRect();
    cursor = (e.clientY - rect.top) / rect.height * 2 - 1;
});
ctx.textAlign = 'center', ctx.font = '50px "Press Start 2P", Arial, sans-serif', ctx.fillStyle = 'white';

function startPong() {
    if (pongInterval !== null) return;
    pongInterval = setInterval(() => {
        if (Math.abs(ball[0]) >= 1) return (() => { score[ball[0] < 0 ? 1 : 0]++, ball = [0, 0, ball[0] < 0 ? -0.016 : 0.016, 0], reactionDistance = -0.5, reactionSpeed = 6 })();
        ctx.clearRect(0, 0, 500, 500);
        if (Math.abs(ball[1]) >= 1) ball[3] = -ball[3];
        ball[0] += ball[2], ball[1] += ball[3], paddles[0] = cursor;
        if (ball[0] > reactionDistance && ball[2] > 0) paddles[1] += ball[1] > paddles[1] + 10/250 ? reactionSpeed/250 : ball[1] < paddles[1] - 10/250 ? -reactionSpeed/250 : 0;
        if (Math.abs(paddles[0]) > 225/250) paddles[0] = paddles[0] / Math.abs(paddles[0]) * 225/250;
        if (Math.abs(paddles[1]) > 225/250) paddles[1] = paddles[1] / Math.abs(paddles[1]) * 225/250;
        ctx.fillRect(20, paddles[0] * 250 + 225, 10, 50);
        ctx.fillRect(470, paddles[1] * 250 + 225, 10, 50);
        ctx.fillRect(ball[0] * 250 + 245, ball[1] * 250 + 245, 10, 10);
        ctx.fillText(score[0] + ' : ' + score[1], 250, 100);
        if ((ball[0] > -220/250 && ball[0] + ball[2] <= -220/250 && Math.abs(paddles[0] - ball[1] - ball[3] * (-220/250 - ball[0]) / ball[2]) <= 30/250) ||
           (ball[0] < 220/250 && ball[0] + ball[2] >= 220/250 && Math.abs(paddles[1] - ball[1] - ball[3] * (220/250 - ball[0]) / ball[2]) <= 30/250)) {
            let alpha = (ball[0] < 0 ? 1 : -1) * (7/16 * (Math.atan(ball[3] / -ball[2]) + Math.PI / 2) + 0.004375 * Math.PI * (ball[1] - paddles[ball[0] < 0 ? 0 : 1]) * 500 + 27/64 * Math.PI - Math.atan(ball[3] / -ball[2]) + Math.PI * 3/8);
            let x = ball[2] * Math.cos(alpha) - ball[3] * Math.sin(alpha), y = ball[2] * Math.sin(alpha) + ball[3] * Math.cos(alpha);
        ball[2] = x * 1.02, ball[3] = y * 1.02, reactionSpeed = Math.random() * 4.5 + 1.7, reactionDistance = Math.random() * 0.7 - 1;
        }
    }, 1000/60);
}

function stopPong() {
    if (pongInterval !== null) {
        clearInterval(pongInterval);
        pongInterval = null;
    }
}

function resetPong() {
    paddles = [0, 0];
    ball = [0, 0, -0.016, 0];
    score = [0, 0];
    cursor = 0;
    reactionSpeed = 6;
    reactionDistance = -0.5;
    ctx.clearRect(0, 0, 500, 500);
}