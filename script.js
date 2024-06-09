const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-button");
const pokemonName = document.querySelector("#pokemon-name")
const pokemonId = document.querySelector("#pokemon-id")
const pokemonWeight = document.querySelector("#weight")
const pokemonHeight = document.querySelector("#height")
const pokemonImg = document.querySelector(".pokemonImg")
const pokemonInfo = document.querySelector(".pokemon-info")
const typesDiv = document.querySelector('#types');

const hp = document.querySelector("#hp")
const attack = document.querySelector("#attack")
const defense = document.querySelector("#defense")
const specialAttack = document.querySelector("#special-attack")
const specialDefense = document.querySelector("#special-defense")
const speed = document.querySelector("#speed")



searchBtn.addEventListener("click", async(e) => {
    e.preventDefault();
    const inputValue = searchInput.value.toLowerCase();

    if (!inputValue) {
        alert("Please enter a search term")
        return;
    }

    try {
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputValue}`)

        if(!response.ok){
            throw new Error("Pokémon not found")
        }

        const data = await response.json()


        console.log(data)


        const {name, id, height, weight, sprites, stats, types} =  data

        pokemonName.textContent = `${capitalizeFirstLetter(name)}`
        pokemonId.textContent = `#${id}`
        pokemonHeight.textContent = `Height: ${height}`
        pokemonWeight.textContent = `Weight: ${weight}`

        typesDiv.textContent = ""


        types.map((type)=> {
            const {name} = type.type
            const newParagraph = document.createElement('p');
            newParagraph.textContent = name.toUpperCase()

            typesDiv.appendChild(newParagraph)
        })

        pokemonImg.src = sprites.front_default;

        hp.textContent = stats[0].base_stat
        attack.textContent = stats[1].base_stat
        defense.textContent = stats[2].base_stat
        specialAttack.textContent = stats[3].base_stat
        specialDefense.textContent = stats[4].base_stat
        speed.textContent = stats[5].base_stat

    } catch (error) {
        alert(error.message)
    }
    
});


function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}