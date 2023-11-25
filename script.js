const url = 'https://mmo-games.p.rapidapi.com/games';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '55ef4021bamshd539b51b15b1807p193c2bjsn1f7f64b08750',
        'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com'
    }
};

const getMMOlist = async () => {
    try {
        const response = await fetch(url, options);
        const mmoData = await response.json();
        writeOut(mmoData);
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
        gameElement.innerHTML = `<img src="${game.thumbnail}" alt="A picture of the game"> <h3>${game.title}</h3> <p>${game.short_description}</p> <p>Release Date: ${game.release_date}</p>`;
        gamesList.appendChild(gameElement);
    });

    threeToSixGames.forEach((game) => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('game');
        gameElement.innerHTML = `<img src="${game.thumbnail}" alt="A picture of the game"> <h3>${game.title}</h3> <p>${game.short_description}</p> <p>Release Date: ${game.release_date}</p>`;
        gamesListTwo.appendChild(gameElement);
    });
}

getMMOlist();
