const allPokemon = [{}];
let currentPokemon = {};
let pokemonImage = "";
let pokemonType = "";
let pokemonName = "";
let pokemonStats = [];
let input = document.getElementById('searchInput');
let team = [{}];

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
    for (i = 1; i < 152; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        const data = await response.json()
        allPokemon.push(data)
    }
}

setAllPokemon();

//----------//

//Set Pokemon Name

function setPokemonName() {
    let inputName = document.getElementById('searchInput').value.toLowerCase().trim()
    let thisPokemon = allPokemon.find(e => e.name === inputName)

    if (thisPokemon.name != undefined) {
        pokemonName = inputName;
        document.getElementById('pokemon-name').innerText = capitalize(pokemonName)
        setPokemonInfo(pokemonName)
    }
}

function capitalize(string) {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
}
//----------//

//Set Pokemon Image && Stats

function setPokemonInfo(pokemonName) {
    currentPokemon = allPokemon.find(pokemon => pokemon.name === pokemonName)
    pokemonImage = currentPokemon.sprites.other['official-artwork'].front_default
    document.getElementById('pokemon-image').src = `${pokemonImage}`

    pokemonStats = currentPokemon.stats
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

    pokemonType = currentPokemon.types[0].type.name
    document.getElementById('pokemon-type').innerText = capitalize(pokemonType)

    console.log(pokemonType)
    console.log(currentPokemon)
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

function catchPokemon() {
    const caught = currentPokemon
    let thisPokemon = team.find(pokemon => pokemon.name === caught.name)

    if (thisPokemon != undefined) {
        alert(`Oops, you already caught ${capitalize(caught.name)}!`)
    }
    else {
        team.push({ name: caught.name, id: caught.id, image: caught.sprites.other['official-artwork'].front_default })
        let pokemon = team.pop()
        sendToMyPC(pokemon)
        goodJob()
    }
}

function goodJob() {
    alert(`You caught ${capitalize(currentPokemon.name)}!`)
    let i = allPokemon.findIndex(pokemon => pokemon.id === currentPokemon.id)
    allPokemon[i].sprites.other['official-artwork'].front_default = "https://aux.iconspalace.com/uploads/1256021885372237969.png"

    setPokemonInfo(currentPokemon.name);
}


function clearData() {
    currentPokemon = {};
    pokemonImage = "";
    pokemonType = "";
    pokemonName = "";
    pokemonStats = [];
}





//TEAM BUILDER

function sendToMyPC(pokemon) {
    const container = document.getElementById('team-list-container');
    const card = document.createElement('div')
    card.classlist = 'card-body'

    const info =
        '<div class="card">' +
        '<div class="card-body">' +
        '<div class="card-image-container">' +
        '<img class="pokemon-card-image" src=' + `${pokemon.image}` + ' />' +
        '</div>' +
        '<h5 class="pokemon-card-name">' + `${capitalize(pokemon.name)}` + '</h5>' +
        '</div>' +
        '</div>'

    container.innerHTML += info
}

function chill() {
    let frameBlock = document.getElementById('frame-block')
    let mainHeader = document.getElementById('main-header')
    let teamBlock = document.getElementById('team-block')
    let teamHeader = document.getElementById('team-header')

    teamBlock.classList.remove('hide')
    teamHeader.classList.remove('hide')
    frameBlock.classList.add('hide')
    mainHeader.classList.add('hide')
}

function catchEmAll() {
    let frameBlock = document.getElementById('frame-block')
    let mainHeader = document.getElementById('main-header')
    let teamBlock = document.getElementById('team-block')
    let teamHeader = document.getElementById('team-header')

    teamBlock.classList.add('hide')
    teamHeader.classList.add('hide')
    frameBlock.classList.remove('hide')
    mainHeader.classList.remove('hide')
}