const pokemonDetails = document.getElementById("pokeCard");
const pokemonName = document.getElementById("pokemonName");
const pokemonTypesArea = document.getElementById("pokemonTypes");
const pokemonMovesArea = document.getElementById("pokemonMoves");
const pokemonAbilitiesArea = document.getElementById("pokemonAbilities");
const pokemonBaseExperience = document.getElementById("baseExperience");
const pokemonStatsArea = document.getElementById("pokemonStatsBoard");

function redirectToDetails(pokemonId) { 

    location.replace(`./details.html?pokemonId=${pokemonId}`);
}


document.addEventListener('DOMContentLoaded', function () {
    
    // Obtém o parâmetro da URL
    const params = new URLSearchParams(window.location.search);
    const pokemonId = params.get('pokemonId');

    if (pokemonId) {
        getPokemonInfo(pokemonId);
    }
});

async function getPokemonInfo(pokemonId) {

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    const pokemonAbilities = await fetch(url)
                           .then((response) => response.json())
                           .then((promiseResult) => promiseResult.abilities.map((abilityName) => abilityName.ability.name));
                          

    const pokemonMoves = await fetch(url)
                                .then((response) => response.json())
                                .then((promiseResult) => promiseResult.moves.map(movesList).join(''));

    
    const pokemon = await fetch(url)
                     .then((response) => response.json());
                     

    const loggs = await fetch(url)
                     .then((response) => console.log(response.json()));


    pokemonSprite(pokemon);

    //pokemon background color
    pokemonDetails.classList.add(`${pokemon.types[0].type.name}`);

    pokemonName.innerHTML += `#${pokemonId} ${pokemon.name}`;

    pokemonTypesArea.innerHTML += `${pokemon.types.map(pokemonTypes).join('')}`

    pokemonBaseExperience.innerHTML += pokemon.base_experience;

    pokemonAbilitiesArea.innerHTML += `${pokemonAbilities.join(' / ')}`;

    pokemonMovesArea.innerHTML += `${pokemonMoves}`;

    pokemonStatsArea.innerHTML += pokemon.stats.map(pokemonStats).join('');

    //change the color of the progress bar according with stats value
    ChangeProgressBarColor();
}


function movesList(pokemonMoves){
    return `<p class="moveListItems">
        ${pokemonMoves.move.name}
    </p>
    `
}

function pokemonTypes(pokemon){
    return `
            <span class="${pokemon.type.name}">${pokemon.type.name}</span> 
     `
}

function pokemonStats(pokemon){
    return `    <div>
                    <label for="stat" class="formLabel">
                        ${pokemon.stat.name}
                    </label>
                    <progress class="statBar" value="${pokemon.base_stat}" max="100"></progress>
                    <span class="statNumber">${pokemon.base_stat}</span>
                    </br>
                </div>
    `
}

function ChangeProgressBarColor(){

    const statNumber  = document.getElementsByClassName("statNumber");
    const progressBar = document.getElementsByClassName("statBar");

    for (let i = 0; i < statNumber.length; i++) {
        if(statNumber[i].innerHTML < 50){
            progressBar[i].classList.add("badStat");
        }
    }
}

function pokemonSprite(pokemon){
    pokemonDetails.style.backgroundImage = `url(${pokemon.sprites.front_default})`;
    pokemonDetails.style.backgroundRepeat ='no-repeat';
    pokemonDetails.style.backgroundSize = '300px'
    pokemonDetails.style.backgroundPosition = 'top right'
}


