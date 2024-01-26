export const renderPokemons = async () => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=50&limit=50")
        if(!response.ok) throw Error("Pokemons not found!!")
        const datas = await response.json()
        const arrayOfPokemon = []
        datas["results"].forEach((data,index) => {
            arrayOfPokemon.push(data.name)
        })
        const randomIndex = Math.floor(Math.random() * arrayOfPokemon.length)
        return arrayOfPokemon[randomIndex]
    }
    catch (error) {
        console.warn(error)
        return null
    }
}

export const randomPokemon = async () => {
    try {
        const randomPokemon = await renderPokemons()
        const responce = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
        const data = await responce.json()
        const ul = document.querySelector("#poke")
        const li = document.createElement('li')
        const img = document.createElement("img")
        const h2 = document.createElement("h2")
        const button = document.createElement("button")
        const div = document.querySelector('#pokedex')

        li.setAttribute("class", "pokemons")    
        img.src = data["sprites"].front_default
        button.dataset.pokemonId = data.id
        h2.textContent = randomPokemon

        li.append(img)
        li.append(h2)
        ul.appendChild(li)
        div.append(ul)
        document.body.append(div)
        
        return data;
    }
    catch (error) {
        console.log(error.message)
        return null
    }
}

export const pokemonStats = async () => {
    try {
        const pokemonData = await randomPokemon()
        const statsArr = []
        const pokemonStat = pokemonData['stats']
        pokemonStat.forEach((data) => {
            statsArr.push({
                [data['stat'].name]: data["base_stat"]
            })
        })
        return statsArr
    }
    catch (error) {
        console.warn(error.message)
        return null
    }
}

export const pokemonModal = async () => {
    const pokemon = await randomPokemon()
    const pokemonStat = await pokemonStats()

    const dialog = document.querySelector('#pokemonModal')
    const div = document.createElement("div")
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const hp = document.createElement('p')
    const attack = document.createElement('p')
    const button = document.createElement('button')
    const button2 = document.createElement('button')

    dialog.setAttribute("class", "modal")
    button.setAttribute('class', "close-button")
    console.log(pokemonStat)
    img.src = pokemon["sprites"].front_default
    h2.textContent = pokemon.name
    hp.textContent = `Health: ${pokemonStat[0].hp}`
    attack.textContent = `Attack: ${pokemonStat[1].attack}`
    button.textContent = "Catch!"
    button2.textContent = "Abandone!"

    dialog.appendChild(img)
    dialog.appendChild(h2)
    div.append(hp)
    div.append(attack)
    dialog.appendChild(div)
    dialog.appendChild(button)
    dialog.appendChild(button2)
}
