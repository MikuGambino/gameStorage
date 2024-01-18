const queryParams = new URLSearchParams(window.location.search); 
const parameter = queryParams.get("game");

let values : string[] = [];
let imgSrc : string = "";
let title : string = "";
let platforms : string[] = [];
let reviews : Review[] = [];
if(parameter != null && localStorage.getItem("Game" + parameter)){
    let stringObject = localStorage.getItem("Game" + parameter);
    if(stringObject != null){
        let x : Game = JSON.parse(stringObject);
        document.title = x.title;
        title = x.title;
        reviews = x.reviews;
        platforms = x.platforms;
        imgSrc = x.image;
        values = [x.description, x.genre, x.release, x.price.toString(), x.developer, x.ageRating, x.rate.toString(), x.metacriticRate?.toString(), x.platforms.join(", ")];
    }
}
let divPs = document.querySelectorAll(".imgDesc p");
divPs.forEach((element, index) => {
    (<HTMLParagraphElement> element).innerText += " " + values[index];
});

let img = <HTMLImageElement> document.querySelector(".imgDesc>img");
if(imgSrc.includes("base64")) img.src = imgSrc;
else img.src += imgSrc;

let h1 = <HTMLHeadingElement> document.querySelector("h1");
h1.innerText = title;

type Review = {
    author: string,
    text: string,
    score: 1 | 2 | 3 | 4| 5
};

function addReview(){
    let authorInput = (<HTMLInputElement> document.querySelector("#nameInput")).value;
    let textReview = (<HTMLInputElement> document.querySelector("#textReviewInput")).value;
    let scoreInput : number = 1;
    document.getElementsByName("rating").forEach(el => {
        if((<HTMLInputElement> el).checked) scoreInput = parseInt((<HTMLInputElement> el).value);
    });
    

    let review : Review = {
        author: authorInput,
        text: textReview,
        score: scoreInput as 1 | 2 | 3 | 4 | 5
    }

    
    if(parameter != null && localStorage.getItem("Game" + parameter)){
        let stringObject = localStorage.getItem("Game" + parameter);
        if(stringObject != null){
            let x : Game = JSON.parse(stringObject);
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
    let reviewDiv = document.createElement("div");
    reviewDiv.setAttribute("class", "review");
    
    let score = document.createElement("p");
    for(let i = 0; i < el.score; i++){
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

    document.querySelector("#reviews")?.appendChild(reviewDiv);
});
