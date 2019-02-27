
chrome.storage.sync.get(["clicks", "bestTime", "time"], function (items) {
    var click = document.querySelector("#score");
    click.innerHTML = items.clicks || " ";

    var time = document.querySelector("#highscore");
    time.innerHTML = items.bestTime || items.time || " ";
});