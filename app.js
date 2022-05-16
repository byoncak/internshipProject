let allPokemon = [{}];
let pokemonImage = "";
let pokemonType = "";
let pokemonName = "";
let pokemonStats = [];
let input = document.getElementById('searchInput')

// Execute a function when the user presses a key on the keyboard
input.addEventListener('keypress', function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === 'Enter') {
        // Cancel the default action, if needed
        event.preventDefault();
        document.getElementById('search-button').click();
    }
});


//Load Data

async function setAllPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
    const data = await response.json()
    allPokemon = data.results

    console.log(allPokemon)
}

setAllPokemon();

//----------//

//Set Pokemon Name

function setPokemonName() {
    let inputName = document.getElementById('searchInput').value.toLowerCase()

    if (allPokemon.filter(e => e.name === inputName)) {

        pokemonName = inputName;
        document.getElementById('pokemon-name').innerText = capitalize(pokemonName)
        setPokemonInfo(pokemonName)
    }
    else {
        alert("That's not a real pokemon. Please check your spelling.");
    }
}

function capitalize(string) {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
}
//----------//

//Set Pokemon Image && Stats

async function setPokemonInfo(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    const data = await response.json()

    pokemonImage = data.sprites.other['official-artwork'].front_default
    document.getElementById('pokemon-image').src = `${pokemonImage}`

    pokemonStats = data.stats
    for (i = 0; i < pokemonStats.length - 1; i++) {
        if (pokemonStats[i].stat.name === "hp")
            document.getElementById('hp').innerText = `HP: ${pokemonStats[i].base_stat}`
        else if (pokemonStats[i].stat.name === "attack")
            document.getElementById('attack').innerText = `Attack: ${pokemonStats[i].base_stat}`
        else if (pokemonStats[i].stat.name === "defense")
            document.getElementById('defense').innerText = `Defense: ${pokemonStats[i].base_stat}`
        else if (pokemonStats[i].stat.name === "special-attack")
            document.getElementById('sp-attack').innerText = `Sp. Attack: ${pokemonStats[i].base_stat}`
        else if (pokemonStats[i].stat.name === "special-defense")
            document.getElementById('sp-defense').innerText = `Sp. Defense: ${pokemonStats[i].base_stat}`
        else (pokemonStats[i].stat.name === "speed")
        document.getElementById('speed').innerText = `Speed: ${pokemonStats[i].base_stat}`
    }

    pokemonType = data.types[0].type.name
    document.getElementById('pokemon-type').innerText = capitalize(pokemonType)

    console.log(pokemonType)
}

function infoButton() {
    let image = document.getElementById('image-container')
    let info = document.getElementById('info')

    if (image.classList.contains('hide')) {
        image.classList.remove('hide')
        info.classList.add('hide')
    }

    else {
        info.classList.remove('hide')
        image.classList.add('hide')
    }

}
