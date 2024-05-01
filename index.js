// Fetches all Pokemon from the API
async function getAllPokemon() { 
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000'); 
  const data = await response.json(); 
  return data.results; 
} 

// Displays the list of Pokemon on the webpage
async function displayPokemonList(pokemonList){ 
  const pokemonListContainer = document.getElementById('pokelist'); 

  pokemonListContainer.innerHTML = ` 
      <ul class="pokemon-list"> 
          ${pokemonList.map(pokemon => ` 
              <li class="pokemon-item" data-name="${pokemon.name}"> 
                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractPokemonNumber(pokemon.url)}.png" alt="${pokemon.name}" /> 
                  <span>${pokemon.name}</span> 
              </li> 
          `).join('')} 
      </ul> 
  `; 
} 

// Fetches details of a specific Pokemon
async function getPokemonDetails() { 
  const response = await fetch('https://pokeapi.co/api/v2/type/3'); 
  const data = await response.json(); 
  return data; 
} 

// Displays the details of a specific Pokemon on the webpage
async function displayPokemonDetails(pokeDetails) { 
  const pokemonDetailsContainer = document.getElementById('pokemon-details'); 

  pokemonDetailsContainer.innerHTML = ` 
      <h2>${pokemonDetails.name}</h2> 
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractPokemonNumber(pokemonDetails.url)}.png" alt="${pokemonDetails.name}" /> 
  `; 
} 

// Extracts the Pokemon number from the URL
function extractPokemonNumber(url) { 
  const parts = url.split('/'); 
  return parts[parts.length - 2]; 
} 

// Handles the click event on a Pokemon item
async function handlePokemonClick(event) { 
  const pokemonName = event.target.closest('.pokemon-item').dataset.name; 
  const allPokemon = await getAllPokemon(); 
  const clickedPokemon = allPokemon.find(pokemon => pokemon.name === pokemonName); 
  const response = await fetch(clickedPokemon.url); 
  const data = await response.json(); 
  displayPokemonDetails(data); 
} 

// Adds a click event listener to the Pokemon list
document.getElementById('pokemon-list').addEventListener('click', handlePokemonClick);