async function fetchPokemon(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function createCards() {
    const pokemonData = await fetchPokemon('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const pokecard = document.querySelector('.pokecard');

    pokemonData.results.forEach(async (pokemon) => {
        const pokemonDetails = await fetchPokemon(pokemon.url);
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-header">
                <h3>${pokemonDetails.name}</h3>
                <img src="${pokemonDetails.sprites.front_default}" alt="${pokemonDetails.name} Image">
            </div>
        `;
        pokecard.appendChild(card);
    });
}

createCards();

