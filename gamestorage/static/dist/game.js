"use strict";
var _a;
const queryParams = new URLSearchParams(window.location.search);
const parameter = queryParams.get("game");
let values = [];
let imgSrc = "";
let title = "";
let platforms = [];
let reviews = [];
if (parameter != null && localStorage.getItem("Game" + parameter)) {
    let stringObject = localStorage.getItem("Game" + parameter);
    if (stringObject != null) {
        let x = JSON.parse(stringObject);
        document.title = x.title;
        title = x.title;
        reviews = x.reviews;
        platforms = x.platforms;
        imgSrc = x.image;
        values = [x.description, x.genre, x.release, x.price.toString(), x.developer, x.ageRating, x.rate.toString(), (_a = x.metacriticRate) === null || _a === void 0 ? void 0 : _a.toString(), x.platforms.join(", ")];
    }
}
let divPs = document.querySelectorAll(".imgDesc p");
divPs.forEach((element, index) => {
    element.innerText += " " + values[index];
});
let img = document.querySelector(".imgDesc>img");
if (imgSrc.includes("base64"))
    img.src = imgSrc;
else
    img.src += imgSrc;
let h1 = document.querySelector("h1");
h1.innerText = title;
function addReview() {
    let authorInput = document.querySelector("#nameInput").value;
    let textReview = document.querySelector("#textReviewInput").value;
    let scoreInput = 1;
    document.getElementsByName("rating").forEach(el => {
        if (el.checked)
            scoreInput = parseInt(el.value);
    });
    let review = {
        author: authorInput,
        text: textReview,
        score: scoreInput
    };
    if (parameter != null && localStorage.getItem("Game" + parameter)) {
        let stringObject = localStorage.getItem("Game" + parameter);
        if (stringObject != null) {
            let x = JSON.parse(stringObject);
            x.reviews.push(review);
            let sum = 0;
            x.reviews.forEach(el => {
                sum += el.score;
            });
            x.rate = sum / x.reviews.length;
            localStorage.setItem("Game" + x.title, JSON.stringify(x));
        }
    }
    window.location.reload();
}
reviews.forEach(el => {
    var _a;
    let reviewDiv = document.createElement("div");
    reviewDiv.setAttribute("class", "review");
    let score = document.createElement("p");
    for (let i = 0; i < el.score; i++) {
        score.innerText += '★';
    }
    score.setAttribute("class", "ratingReview");
    let name = document.createElement("p");
    name.innerText = "Имя: " + el.author;
    let textReview = document.createElement("p");
    textReview.innerText = el.text;
    reviewDiv.appendChild(score);
    reviewDiv.appendChild(name);
    reviewDiv.appendChild(textReview);
    (_a = document.querySelector("#reviews")) === null || _a === void 0 ? void 0 : _a.appendChild(reviewDiv);
});
