export const renderPokemons = async () => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon-habitat/grassland/?offset=200&limit=200")
        if(!response.ok) throw Error("Pokemons not found!!")
        const datas = await response.json()
        const arrayOfPokemon = []
        datas["pokemon_species"].forEach((data) => {
            arrayOfPokemon.push(data.name)
        })
        const randomIndex = Math.floor(Math.random() * arrayOfPokemon.length)

        console.log(arrayOfPokemon[randomIndex])
        return arrayOfPokemon[randomIndex]
    }
    catch (error) {
        console.warn(error)
        return null
    }
}

export const renderRockPokemons = async () => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon-habitat/cave/?offset=200&limit=200")
        if(!response.ok) throw Error("Pokemons not found!!")
        const datas = await response.json()
        const arrayOfPokemon = []
        datas["pokemon_species"].forEach((data) => {
            arrayOfPokemon.push(data.name)
        })
        const randomIndex = Math.floor(Math.random() * arrayOfPokemon.length)

        console.log(arrayOfPokemon[randomIndex])
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

        console.log(randomPokemon)
        li.id = randomPokemon    
        img.src = data["sprites"].front_default
        button.dataset.pokemonId = data.id
        h2.textContent = randomPokemon

        li.append(img)
        li.append(h2)
        ul.insertBefore(li, ul.firstChild)
        div.append(ul)
        document.body.append(div)
        
        return data;
    }
    catch (error) {
        console.log(error.message)
        return null
    }
}

export const randomRockPokemon = async () => {
    try {
        const randomPokemon = await renderRockPokemons()
        const responce = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
        const data = await responce.json()
        const ul = document.querySelector("#poke")
        const li = document.createElement('li')
        const img = document.createElement("img")
        const h2 = document.createElement("h2")
        const button = document.createElement("button")
        const div = document.querySelector('#pokedex')

        console.log(randomPokemon)
        li.setAttribute("class", "pokemons") 
        img.src = data["sprites"].front_default
        button.dataset.pokemonId = data.id
        h2.textContent = randomPokemon

        li.append(img)
        li.append(h2)
        ul.insertBefore(li, ul.firstChild)
        div.append(ul)
        document.body.append(div)
        
        return data;
    }
    catch (error) {
        console.log(error.message)
        return null
    }
}

export const pokemonStats = async (pokemonData) => {
    try {
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
    const dialog = document.querySelector('#pokemonModal')
    dialog.innerHTML = ""
    const pokemon = await randomPokemon()
    const pokemonStat = await pokemonStats(pokemon) 
    
    const div = document.createElement("div")
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const hp = document.createElement('p')
    const attack = document.createElement('p')
    const type = document.createElement("p")
    const weight = document.createElement("p")
    const height = document.createElement("p")
    const button = document.createElement('button')
    const button2 = document.createElement('button')
    
    dialog.setAttribute("class", "modal")
    button.setAttribute("class", "catch-button")
    button2.setAttribute('class', "close-button")
    
    img.src = pokemon["sprites"].front_default
    h2.textContent = pokemon.name
    height.textContent = `Height: ${pokemon.height}`
    weight.textContent = `Weight: ${pokemon.weight}`
    type.textContent = `Habitat: GrassLand`
    hp.textContent = `Health: ${pokemonStat[0].hp}`
    attack.textContent = `Attack: ${pokemonStat[1].attack}`
    button.textContent = "Catch!"
    button2.textContent = "Abandone!"

    dialog.appendChild(img)
    dialog.appendChild(h2)
    div.append(hp)
    div.append(attack)
    div.append(height)
    div.append(weight)
    div.append(type)
    dialog.appendChild(div)
    dialog.appendChild(button)
    dialog.appendChild(button2)
}

export const rockPokemonModal = async () => {
    const dialog = document.querySelector('#pokemonModal')
    dialog.innerHTML = ""
    const pokemon = await randomRockPokemon()
    const pokemonStat = await pokemonStats(pokemon) 

    console.log(pokemon)

    const div = document.createElement("div")
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const hp = document.createElement('p')
    const attack = document.createElement('p')
    const type = document.createElement("p")
    const weight = document.createElement("p")
    const height = document.createElement('p')
    const button = document.createElement('button')
    const button2 = document.createElement('button')
    
    dialog.setAttribute("class", "modal")
    button.setAttribute("class", "catch-button")
    button2.setAttribute('class', "close-button")
    
    img.src = pokemon["sprites"].front_default
    h2.textContent = pokemon.name
    weight.textContent = `Weight: ${pokemon.weight}`
    height.textContent = `Height: ${pokemon.height}`
    type.textContent = `Habitat: caves`
    hp.textContent = `Health: ${pokemonStat[0].hp}`
    attack.textContent = `Attack: ${pokemonStat[1].attack}`
    button.textContent = "Catch!"
    button2.textContent = "Abandone!"

    dialog.appendChild(img)
    dialog.appendChild(h2)
    div.append(hp)
    div.append(attack)
    div.append(height)
    div.append(weight)
    div.append(type)
    dialog.appendChild(div)
    dialog.appendChild(button)
    dialog.appendChild(button2)
}

export const getPokemonData = async (pokemonName) => {
    const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    const pokemonData = await response.json()
    const pokemonStat = await pokemonStats(pokemonData) 
  
    const ul = document.querySelector("#searchedPokemon")
    const div = document.createElement("div")
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const hp = document.createElement('p')
    const attack = document.createElement('p')
    const weight = document.createElement("p")
    const height = document.createElement("p")
    const button = document.createElement('button')
    const button2 = document.createElement('button')
    
    button.setAttribute("class", "catch-button")
    button2.setAttribute('class', "close-button")
    
    img.src = pokemonData["sprites"].front_default
    h2.textContent = pokemonData.name
    height.textContent = `Height: ${pokemonData.height}`
    weight.textContent = `Weight: ${pokemonData.weight}`
    hp.textContent = `Health: ${pokemonStat[0].hp}`
    attack.textContent = `Attack: ${pokemonStat[1].attack}`
  
    ul.appendChild(img)
    ul.appendChild(h2)
    div.append(hp)
    div.append(attack)
    div.append(height)
    div.append(weight)
    ul.appendChild(div)
  }