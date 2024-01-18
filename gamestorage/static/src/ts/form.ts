function createGame(){
    let title = (<HTMLInputElement>document.querySelector("#titleInput")).value;
    let description = (<HTMLInputElement>document.querySelector("#descTextArea")).value;
    let price = parseFloat((<HTMLInputElement>document.querySelector("#priceInput")).value);
    let date = (<HTMLInputElement>document.querySelector("#date")).value;
    let genre = (<HTMLInputElement>document.querySelector("#genreInput")).value || "Неизвестно";
    let ageRating = (<HTMLInputElement>document.querySelector("#ageRatingInput")).value || "Неизвестно";
    let metacriticRate = (<HTMLInputElement>document.querySelector("#metacriticRateInput")).value;
    let website = (<HTMLInputElement>document.querySelector("#webSiteInput")).value || "Неизвестно";
    let developer = (<HTMLInputElement>document.querySelector("#developerInput")).value || "Неизвестно";

    let platforms : string[] = [];
    let platformsElements = document.getElementsByName("platformCheckbox");
    platformsElements.forEach(element => {
        if((<HTMLInputElement> element).checked) platforms.push((<HTMLInputElement> element).value);
    });

    let x : Game = {
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

    let imageInput = (<HTMLInputElement> document.getElementById("image")).files;
    if(imageInput!.length > 0){
        let file = imageInput?.item(0);
        let reader = new FileReader();
        reader.readAsDataURL(file!);

        reader.onload = function(){
            x.image = reader.result as string;
        };
    } 
    setTimeout(() => {
        localStorage.setItem("Game" + title, JSON.stringify(x));
        window.location.href = "../../index.html";
    }, 500);
}