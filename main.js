const publicKey = "d94dc08a570a7cafee98e9c5a72ad883";
const privateKey = "e1b89ac73be9493c1a0797628db901cbf05a3a56";
var ts = new Date().getTime();
var hash = md5(ts + privateKey + publicKey);
var input = document.querySelector(".searchFor");
var charId = [1009610, 1009268, 1009652, 1009718, 1010743, 1010763, 1009327, 1009351, 1009220, 1009368, 1009664, 1009187, 1009189];

window.onload = function printDataOnScreen() {
    var val;
    charId.forEach(Id => {
        fetch(`https://gateway.marvel.com:443/v1/public/characters/${Id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
        .then(Response => {
            if (!Response.ok) throw Error("Page not Found");
            return Response.json();
        })
            .then(data => {
            var val = data.data;
            const html = val.results.map(user => {
                var image = user.thumbnail.path + "." + user.thumbnail.extension;
                return `
                <div class="col-md-3 col-sm-6">
                <div class="card card bg-dark text-white">
                    <img class="card-img-top" src="${image}" alt="${user.name}"">
                    <div class="card-body">
                        <h4 class="card-title">${user.name}</h4>
                        <p class="card-text">${user.description}</p>
                        <button class="button"  data-id="${user.id}" type="button">More Info</button>
                    </div>
                </div>
                </div>
                `;
            }).join("");
            document.querySelector(".card-deck").insertAdjacentHTML("afterbegin", html);
        })
        .catch(error => {
            console.log(error);

        });
    });
}

input.addEventListener("keyup", findAndPrint);

function findAndPrint() {
    fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${input.value}&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
        .then(Response => {
            if (!Response.ok) throw Error("Page not Found");
            
            return Response.json();
        })
        .then(data => {
            // console.log(data);
            var val = data.data;
            // console.log(val.results);
            const html = val.results.map(user => {
                var image = user.thumbnail.path + "." + user.thumbnail.extension;
                return `
                <div class="col-md-3 col-sm-6">
                <div class="card card bg-dark text-white" data-id="${user.id}">
                    <img class="card-img-top" src="${image}" alt="${user.name}"">
                    <div class="card-body">
                        <h4 class="card-title">${user.name}</h4>
                        <p class="card-text">${user.description}</p>
                        <button class="button"  data-id="${user.id}" type="button">More Info</button>
                    </div>
                </div>
                </div>
                `;
            }).join("");
            document.querySelector(".card-deck").innerHTML =  html;
        })
        .catch(error => {
            console.log(error);

        });
}

var button = document.querySelector(".button");
console.log(button);
button.addEventListener("click", moreInfoAboutCharacter);

function moreInfoAboutCharacter(event) {
    console.log(event);
    // fetch(`https://gateway.marvel.com:443/v1/public/characters/${Id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
}



