const selectedGenre = document.getElementById('gameGenres');
selectedGenre_text = selectedGenre.value;
const selectedPlatform = document.getElementById('platform');
selectedPlatform_text = selectedPlatform.value;

selectedGenre.addEventListener('change', handleGenreChange);
selectedPlatform.addEventListener('change', handlePlatformChange);

const url = 'https://mmo-games.p.rapidapi.com/games';
const options = {   
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '55ef4021bamshd539b51b15b1807p193c2bjsn1f7f64b08750',
        'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com'
    }
};

const getMMOListByPlatformAndCategory = async (selectedPlatform_text, selectedGenre_text) => {
    const url = `https://mmo-games.p.rapidapi.com/games?platform=${selectedPlatform_text}&category=${selectedGenre_text}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '55ef4021bamshd539b51b15b1807p193c2bjsn1f7f64b08750',
            'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const CatMmoData = await response.json();
        WriteOutGamesByPlatformAndGenre(CatMmoData);
        console.log(CatMmoData);
    } catch (error) {
        console.error(error);
    }
}

const getMMOlist = async () => {
    try {
        const response = await fetch(url, options);
        const mmoData = await response.json();
        writeOut(mmoData);
        console.log(mmoData);
    } catch (error) {
        console.error(error);
    }
}

const writeOut = (mmoData) => {
    const gamesList = document.getElementById('gamesList');
    const gamesListTwo = document.getElementById('gamesListTwo');

    // Sort MMO data by release date in descending order
    const sortedMmoData = mmoData.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

    // Display only the first 6 games
    const firstThreeGames = sortedMmoData.slice(0, 3);
    const threeToSixGames = sortedMmoData.slice(3, 6);

    firstThreeGames.forEach((game) => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('game');
        gameElement.innerHTML = `<img src="${game.thumbnail}" alt="A picture of the game"> <h3>${game.title}</h3> <p>${game.short_description}</p> <p> Category: ${game.genre}</p> <p>Release Date: ${game.release_date}</p>`;
        gamesList.appendChild(gameElement);
    });

    threeToSixGames.forEach((game) => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('game');
        gameElement.innerHTML = `<img src="${game.thumbnail}" alt="A picture of the game"> <h3>${game.title}</h3> <p>${game.short_description}</p> <p> Category: ${game.genre}</p> <p>Release Date: ${game.release_date}</p>`;
        gamesListTwo.appendChild(gameElement);
    });
}
getMMOlist();

getMMOListByPlatformAndCategory();

const WriteOutGamesByPlatformAndGenre = (CatMmoData) => {
    const smallerGameWrapper = document.getElementById('randomCWrapper');
    CatMmoData.forEach((catGame) => {
        const smallerGame = document.createElement('div');
        smallerGame.classList.add('smallerGame');
        smallerGame.innerHTML = `<img src="${catGame.thumbnail}" alt="A picture of the game"> <h3>${catGame.title}</h3> <p>${catGame.short_description}</p> <p>Category: ${catGame.genre}</p> <p>Release Date: ${catGame.release_date}</p>`;
        smallerGameWrapper.appendChild(smallerGame);
    });
}

function handleGenreChange() {
    selectedGenre_text = selectedGenre.value;
    clearSmallerGameList();
    getMMOListByPlatformAndCategory(selectedPlatform_text, selectedGenre_text);
    console.log(selectedGenre_text);
}

function handlePlatformChange() {
    selectedPlatform_text = selectedPlatform.value;
    clearSmallerGameList();
    getMMOListByPlatformAndCategory(selectedPlatform_text, selectedGenre_text);
    console.log(selectedPlatform_text);
}

function clearSmallerGameList() {
    const clearWrapper = document.getElementById('randomCWrapper');
    clearWrapper.innerHTML = '';
}