document.querySelector("#random-thought").onclick = function () {
    window.location.replace(
        "/pensiero/" + (Math.floor(Math.random() * 110) + 1)
    );
};
