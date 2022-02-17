const lists = {
    players: document.getElementById("pl-content "),
    playtime: document.getElementById("pt-content "),
    mobkills: document.getElementById("mk-content "),
    playerkills: document.getElementById("pk-content "),
};

async function getData() {
    (await fetch("/api/mm/onlinelist")).json().then((online) => {
        createList(lists.players, online);
    });

    (await fetch("/api/mm/lb/playtime")).json().then((playtime) => {
        let playtimeList = [];
        playtime.forEach(function(item) {
            playtimeList.push(`${item.name} | ${item.f_playtime}`);
        });
        createList(lists.playtime, playtimeList);
    });

    (await fetch("/api/mm/lb/mobkills")).json().then((mobkills) => {
        let mobkillsList = [];
        mobkills.forEach(function(item) {
            mobkillsList.push(`${item.name} | ${formatNumber(item.mobKills)}`);
        });
        createList(lists.mobkills, mobkillsList);
    });

    (await fetch("/api/mm/lb/kills")).json().then((playerkills) => {
        let playerkillsList = [];
        playerkills.forEach(function(item) {
            playerkillsList.push(`${item.name} | ${formatNumber(item.playerKills)}`);
        });
        createList(lists.playerkills, playerkillsList);
    });


}

function createList(element, data) {
    data.forEach(function(item) {
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = item;
        element.appendChild(li);
    });
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

document.addEventListener("load", getData());