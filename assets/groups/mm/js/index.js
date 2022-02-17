const lists = {
    players: document.getElementById("pl-content "),
    playtime: document.getElementById("pt-content "),
    mobkills: document.getElementById("mk-content "),
    playerkills: document.getElementById("pk-content "),
};

async function getData() {
    const online = await (await fetch("http://localhost:3000/api/mm/onlinelist")).json();
    const playtime = await (await fetch("http://localhost:3000/api/mm/lb/playtime")).json();
    const mobkills = await (await fetch("http://localhost:3000/api/mm/lb/mobkills")).json();
    const playerkills = await (await fetch("http://localhost:3000/api/mm/lb/kills")).json();

    createList(lists.players, online);

    let playtimeList = [];
    playtime.forEach(function(item) {
        playtimeList.push(`${item.name} | ${item.f_playtime}`);
    });
    createList(lists.playtime, playtimeList);

    let mobkillsList = [];
    mobkills.forEach(function(item) {
        mobkillsList.push(`${item.name} | ${formatNumber(item.mobKills)}`);
    });
    createList(lists.mobkills, mobkillsList);

    let playerkillsList = [];
    playerkills.forEach(function(item) {
        playerkillsList.push(`${item.name} | ${formatNumber(item.playerKills)}`);
    });
    createList(lists.playerkills, playerkillsList);
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