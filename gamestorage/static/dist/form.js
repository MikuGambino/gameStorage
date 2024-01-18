"use strict";
function createGame() {
    let title = document.querySelector("#titleInput").value;
    let description = document.querySelector("#descTextArea").value;
    let price = parseFloat(document.querySelector("#priceInput").value);
    let date = document.querySelector("#date").value;
    let genre = document.querySelector("#genreInput").value || "Неизвестно";
    let ageRating = document.querySelector("#ageRatingInput").value || "Неизвестно";
    let metacriticRate = document.querySelector("#metacriticRateInput").value;
    let website = document.querySelector("#webSiteInput").value || "Неизвестно";
    let developer = document.querySelector("#developerInput").value || "Неизвестно";
    let platforms = [];
    let platformsElements = document.getElementsByName("platformCheckbox");
    platformsElements.forEach(element => {
        if (element.checked)
            platforms.push(element.value);
    });
    let x = {
        title: title,
        description: description,
        price: price,
        release: date ? new Date(date).toLocaleDateString() : "Неизвестно",
        genre: genre.toLowerCase(),
        ageRating: ageRating,
        developer: developer,
        metacriticRate: metacriticRate ? parseInt(metacriticRate) : 0,
        rate: 0,
        website: website,
        platforms: platforms.length == 0 ? ["Неизвестно"] : platforms,
        image: "default.jpg",
        reviews: []
    };
    let imageInput = document.getElementById("image").files;
    if (imageInput.length > 0) {
        let file = imageInput === null || imageInput === void 0 ? void 0 : imageInput.item(0);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            x.image = reader.result;
        };
    }
    setTimeout(() => {
        localStorage.setItem("Game" + title, JSON.stringify(x));
        window.location.href = "../../index.html";
    }, 500);
}
