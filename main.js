


const publicKey = "d94dc08a570a7cafee98e9c5a72ad883";
const privateKey = "e1b89ac73be9493c1a0797628db901cbf05a3a56";
var ts = new Date().getTime();
var hash = md5(ts + privateKey + publicKey);
var input = document.querySelector(".searchFor");
var charId = [1009610, 1009268, 1009652, 1009718, 1010743, 1010763, 1009327, 1009351, 1009220, 1009368, 1009664, 1009187, 1009189];
let list = document.querySelector(".card-deck");
let searchBox = document.querySelector(".search");
let charProfile = document.querySelector(".profile");

window.onload = function printDataOnScreen() {

    if (window.localStorage.getItem("localList") !== null) {
        displayList();
        return;
    }

    var urls = [
        `https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=0&ts=${ts}&apikey=${publicKey}&hash=${hash}`,
        `https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=100&ts=${ts}&apikey=${publicKey}&hash=${hash}`,
        `https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=200&ts=${ts}&apikey=${publicKey}&hash=${hash}`,
        `https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=300&ts=${ts}&apikey=${publicKey}&hash=${hash}`,
        `https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=400&ts=${ts}&apikey=${publicKey}&hash=${hash}`,
        `https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=500&ts=${ts}&apikey=${publicKey}&hash=${hash}`,
        `https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=600&ts=${ts}&apikey=${publicKey}&hash=${hash}`,
        `https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=700&ts=${ts}&apikey=${publicKey}&hash=${hash}`,
        `https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=800&ts=${ts}&apikey=${publicKey}&hash=${hash}`,
        `https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=900&ts=${ts}&apikey=${publicKey}&hash=${hash}`,
        `https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=1000&ts=${ts}&apikey=${publicKey}&hash=${hash}`,
        `https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=1200&ts=${ts}&apikey=${publicKey}&hash=${hash}`,
        `https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=1300&ts=${ts}&apikey=${publicKey}&hash=${hash}`,
        `https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=1400&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    ];

    var requests = urls.map(url => fetch(url));

    Promise.all(requests)
        .then(Responses => {
            return Promise.all(Responses.map(Response => {
                return Response.json();
            }));
        })
        .then(data => {
           data.map(singleData => {
               var val = singleData.data;
               addItemInLocalStorage(val.results);
           })
        });
        

    
   


}

function addItemInLocalStorage(array) {
    let localList;
    if (window.localStorage.getItem("localList") !== null) {
        localList = JSON.parse(window.localStorage.getItem("localList"));
    } else localList = [];

    array.forEach(user => {
        localList.push({
            id: user.id,
            name: user.name,
            description: user.description,
            thumbnail: user.thumbnail.path + "." + user.thumbnail.extension,
            comics: user.comics.items,
            series: user.series.items,
            stories: user.stories.items
        });
        window.localStorage.setItem("localList", JSON.stringify(localList));
        displayList();
    });
}

function displayList() {
    let localList;
    if (window.localStorage.getItem("localList") !== null) {
        localList = JSON.parse(window.localStorage.getItem("localList"));
    } else localList = [];
    charProfile.innerHTML = '';
        list.innerHTML = '';
        document.querySelector(".container").innerHTML = '';
        localList.forEach(user => {

            const html = `<div class="col-md-3 col-sm-6">
                <div class="card card bg-dark text-white">
                    <img class="card-img-top" src="${user.thumbnail}" alt="${user.name}">
                    <div class="card-body">
                        <h4 class="card-title">${user.name}</h4>
                        <p class="card-text">${user.description}</p>
                        
                        <button onclick="table(${user.id})" class="button" type="button">More Info</button>
                        
                    </div>
                </div>
            </div>`
            list.insertAdjacentHTML("beforeend", html);
                
    });
   

}

input.addEventListener("keyup", findAndPrint);

function findAndPrint() {
    let localList;
    if (window.localStorage.getItem("localList") !== null) {
        localList = JSON.parse(window.localStorage.getItem("localList"));
    } else localList = [];
    list.innerHTML = '';
    localList.forEach(user => {

        const html = `<div class="col-md-3 col-sm-6">
                <div class="card card bg-dark text-white">
                    <img class="card-img-top" src="${user.thumbnail}" alt="${user.name}">
                    <div class="card-body">
                        <h4 class="card-title">${user.name}</h4>
                        <p class="card-text">${user.description}</p>
                        <button class="button" data-id="${user.id}" type="button">More Info</button>
                    </div>
                </div>
            </div>`
        list.insertAdjacentHTML("afterbegin", html);

    }); 
}




function table(charId) {
    console.log(charId);
    searchBox.innerHTML = '';
    list.innerHTML = '';

    let localList;
    if (window.localStorage.getItem("localList") !== null) {
        localList = JSON.parse(window.localStorage.getItem("localList"));
    } else localList = [];
    let i = 0;
    localList.forEach(user => {
        if(user.id === charId) {
            const temp = `<img class="userImg" src="${user.thumbnail}" alt="${user.name}">
                            <h1 class="userName">${user.name}</h1>
                            <p class="charInfo">${user.description}</p>`

            charProfile.insertAdjacentHTML("afterbegin", temp);

            user.comics.forEach(comics => {
                const elem = `<li>${comics.name}</li>`
                document.querySelector(".forComics").insertAdjacentHTML("beforeend", elem);
            });
            user.series.forEach(series => {
                const elem = `<li>${series.name}</li>`
                document.querySelector(".forSeries").insertAdjacentHTML("beforeend", elem);
            });
            user.stories.forEach(stories => {
                const elem = `<li>${stories.name}</li>`
                document.querySelector(".forStories").insertAdjacentHTML("beforeend", elem);
            });

           
        }
    })
}

