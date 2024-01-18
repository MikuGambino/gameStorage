let allGames : Game[] = [];

type Game = {
    title: string,
    description: string,
    price: number,
    platforms: string[],
    release: string,
    genre: string,
    website: string
    developer: string,
    ageRating: string,
    rate: number;
    metacriticRate: number;
    image: string
    reviews: Review[]
}

function refreshGameElements(){
    if(gamesDivElement != undefined) gamesDivElement.innerHTML = "";
    games.forEach(element => {
        gamesDivElement?.appendChild(gameCreator(element));
    });
}

function gameCreator(game: Game) : HTMLDivElement{
    let element = document.createElement("div");
    element.setAttribute("class", "gameBlock");

    let img = document.createElement("img");
    if(game.image.includes("base64")) img.setAttribute("src", game.image);
    else img.setAttribute("src", "./src/img/" + game.image);
    element.appendChild(img);

    let buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("class", "buttonDiv");

    let title = document.createElement("h2");
    title.innerText = game.title;
    title.setAttribute("class", "title");
    element.appendChild(title);

    let description = document.createElement("p");
    description.innerText = game.description.length > 210 ? game.description.slice(0, 210) + "..." : game.description;
    description.setAttribute("class", "description");
    element.appendChild(description);

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "deleteButton");
    deleteButton.innerText = "Удалить";
    deleteButton.setAttribute("value", game.title);
    deleteButton.setAttribute("onClick", "deleteGame(this.value)");
    buttonDiv.appendChild(deleteButton);

    let button = document.createElement("button");
    button.setAttribute("onClick", `location.href='./src/html/game.html?game=${game.title}'`);
    button.innerText = "Подробнее";
    buttonDiv.appendChild(button);

    element.appendChild(buttonDiv);

    return element;
}

function deleteGame(title: string){
    if(!confirm("Вы уверены что хотите удалить " + title + "?")) return;
    localStorage.removeItem("Game" + title);
    games = games.filter(g => g.title != title);
    refreshGameElements();
}

function filterRangeCreator(name: string, property: string){
    let max = 0; let min = 0;
    if(games.length > 0){
        min = Number.POSITIVE_INFINITY
        max = Number.NEGATIVE_INFINITY;
        games.forEach(element => {
            if(<number> element[property as keyof Game] < min) min = <number> element[property as keyof Game];
            if(<number> element[property as keyof Game] > max) max = <number> element[property as keyof Game];
        })
    }

    let outerElement = document.createElement("div");
    outerElement.setAttribute("class", "range");

    let p = document.createElement("p");
    p.innerText = name;
    
    let innerElement = document.createElement("div");
    innerElement.setAttribute("class", "rangeInputs");
    innerElement.setAttribute("property", property);

    let minInput = document.createElement("input");
    minInput.setAttribute("type", "number");
    minInput.setAttribute("min", min.toString());
    minInput.setAttribute("max", max.toString());
    minInput.setAttribute("placeholder", "От " + min);

    let maxInput = document.createElement("input");
    maxInput.setAttribute("type", "number");
    maxInput.setAttribute("min", min.toString());
    maxInput.setAttribute("max", max.toString());
    maxInput.setAttribute("placeholder", "До " + max);

    innerElement.appendChild(minInput);
    innerElement.appendChild(maxInput);

    outerElement.appendChild(p);
    outerElement.appendChild(innerElement);

    document.getElementById("filters")?.appendChild(outerElement);
}

function filterRangeProcess(){
    let rangeInputs = document.querySelectorAll(".rangeInputs");
    rangeInputs.forEach(element => {
        let property = element.getAttribute("property");
        let inputs = element.querySelectorAll("input");
        let minInput = inputs[0]; let maxInput = inputs[1];
        if(!minInput.value || parseFloat(minInput.value) < parseFloat(minInput.min)) minInput.value = minInput.min;
        if(!maxInput.value || parseFloat(maxInput.value) > parseFloat(maxInput.max)) maxInput.value = maxInput.max;
        games = games.filter(game => <number> game[property as keyof Game] >= parseFloat(minInput.value) &&
                             <number> game[property as keyof Game] <= parseFloat(maxInput.value));
     });
}

function sortProcess(){
    let order = (<HTMLSelectElement> document.getElementById("typeSort")).value == "asc" ? 1 : -1;
    let typeSort = (<HTMLSelectElement> document.getElementById("sortBy")).value;
    if(typeSort == "title"){
        games.sort((a, b) => a.title.localeCompare(b.title) * order);
    }
    else if(typeSort == "release"){
        games.sort((a, b) => {
            let aDate = a.release == "Неизвестно" ? new Date("1111-11-11") : new Date(a.release);
            let bDate = b.release == "Неизвестно" ? new Date("1111-11-11") : new Date(b.release);
            return (aDate.valueOf() - bDate.valueOf()) * order;
        });
    }
    else games.sort((a, b) =>  <number> a[typeSort as keyof Game] - <number> b[typeSort as keyof Game] * order);
}

function filterSelectCreator(name: string, property: string){
    let filterDiv = document.getElementById("filters");

    let label = document.createElement("label");
    label.setAttribute("for", property + "Select");
    label.innerText = name;

    let select = document.createElement("select");
    select.setAttribute("id", property + "Select");
    select.setAttribute("name", property);

    let defaultOption = document.createElement("option");
    defaultOption.setAttribute("value", "none");
    defaultOption.innerText = "Все";
    select.add(defaultOption);

    let values : string[] = [];

    games.forEach(element => {
        let option = document.createElement("option");
        let propertyValue = <string> element[property as keyof Game];
        if(!values.includes(propertyValue)){
            option.setAttribute("value", propertyValue);
            option.innerText = propertyValue;
            select.add(option);
            values.push(propertyValue);
        }
    });

    filterDiv?.appendChild(label);
    filterDiv?.appendChild(select);
}

function filterSelectProcess(){
    let selects = document.querySelectorAll("#filters select");
    selects.forEach(element => {
        let selectedValue = (<HTMLSelectElement> element).value;
        let selectedProp = (<HTMLSelectElement> element).name;
        if(selectedValue != "none"){
            games = games.filter(game => game[selectedProp as keyof Game] == selectedValue);
        }
    });
}

function initGames(allGames : Game[]) : Game[]{
    allGames = [];
    for(let key in localStorage){
        if(!key.includes("Game")) continue;
        let stringGame = localStorage.getItem(key);
        let game;
        if(stringGame != null) game = JSON.parse(stringGame);
        if(game != undefined) allGames.push(game);
    }
    return allGames;
}

allGames = initGames(allGames);
let games = [...allGames];

let gamesDivElement = document.getElementById("games");
function filter(){
    games = [...allGames];
    filterRangeProcess();
    filterSelectProcess();
    sortProcess();
    refreshGameElements();
}

games.sort((a, b) => a.title.localeCompare(b.title));
refreshGameElements();

filterRangeCreator("Цена", "price");
filterRangeCreator("Пользовательский рейтинг", "rate");
filterRangeCreator("Рейтинг Metacritic", "metacriticRate");

filterSelectCreator("Жанр", "genre");
filterSelectCreator("Разработчик", "developer");
filterSelectCreator("Возрастной рейтинг", "ageRating");

let selects = document.querySelectorAll("select");
selects.forEach(element => {
    element.selectedIndex = 0;
});