window.addEventListener("load", () => {
    const laoder = document.querySelector(".loader");
    setTimeout(() => {
        laoder.classList.add("loader-fading");

    setTimeout(() => {
        laoder.classList.remove("loader-active");
    }, 800);

    }, 200);

});