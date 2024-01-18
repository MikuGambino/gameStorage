let allGamesLoad : Game[] = [
    {
        title: "Overwatch 2",
        description: "Overwatch 2 — непрерывно развивающаяся бесплатная игра с постоянной поддержкой. Играйте вместе с друзьями, независимо от платформы, и оцените обновленный PvP-режим. Кроссплатформенная игра и общий прогресс. Благодаря поддержке кроссплатформенной игры вы можете играть на разных платформах и устройствах, постоянно сохраняя доступ к своим наградам, прогрессу и достижениям.",
        price: 0,
        platforms: ["Windows", "Xbox Series X/S", "Playstation 5", "Nintendo Switch", "Xbox One", "Playstation 4"],
        release: "2022-10-04",
        genre: "Шутер",
        website: "https://overwatch.blizzard.com/ru-ru/",
        developer: "Blizzard Entertaiment",
        ageRating: "T",
        rate: 0,
        metacriticRate: 79,
        image: "overwatch2.png",
        reviews: []
    },
    {
        title: "Valorant",
        description: "Valorant (стилизовано как VALORANT) — многопользовательская компьютерная игра, разработанная и издаваемая компанией Riot Games. Valorant является первой игрой Riot Games в жанре шутер от первого лица.",
        price: 0,
        platforms: ["Windows"],
        release: "2020-03-01",
        genre: "Шутер",
        website: "https://www.riotgames.com/ru",
        developer: "Riot Games",
        ageRating: "T",
        rate: 0,
        metacriticRate: 80,
        image: "valorant.jpg",
        reviews: []
    },
    {
        title: "GTA V",
        description: "Компьютерная игра в жанре action-adventure с открытым миром, разработанная компанией Rockstar North и изданная компанией Rockstar Games.",
        price: 2000,
        platforms: ["Windows", "Xbox Series X/S", "Playstation 5", "Nintendo Switch", "Xbox One", "Playstation 4"],
        release: "2013-09-17",
        genre: "Action adventure",
        website: "https://www.rockstargames.com/gta-v",
        developer: "Rockstar Games",
        ageRating: "M",
        rate: 0,
        metacriticRate: 91,
        image: "gta5.png",
        reviews: []
    },
    {
        title: "GTA: San Andreas",
        description: "Grand Theft Auto: San Andreas (сокр. — GTA: San Andreas, GTA: SA) — компьютерная игра в жанре action-adventure, разработанная студией Rockstar North и изданная компанией Rockstar Games; пятая по счёту и третья трёхмерная игра во франшизе Grand Theft Auto.",
        price: 300,
        platforms: ["Windows", "Xbox One", "Playstation 3"],
        release: "2004-10-26",
        genre: "Action adventure",
        website: "https://www.rockstargames.com/games/sanandreas",
        developer: "Rockstar Games",
        ageRating: "M",
        rate: 0,
        metacriticRate: 93,
        image: "gtasa.jpg",
        reviews: []
    }
]

allGamesLoad.forEach(element => {
    localStorage.setItem("Game" + element.title, JSON.stringify(element));
})
