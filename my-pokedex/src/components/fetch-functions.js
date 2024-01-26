

export const renderPokemons = async () => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20")
        if(!response.ok) throw Error("Pokemons not found!!")
        const datas = await response.json()
        const arrayOfPokemon = []
        datas["results"].forEach((data,index) => {
            arrayOfPokemon.push(data.name)
        })
      
        console.log(arrayOfPokemon)
        console.log(datas)
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
        const ul = document.querySelector("#pokedex")
        const li = document.createElement('li')
        const img = document.createElement("img")
        const h2 = document.createElement("h2")
        const button = document.createElement("button")
        li.setAttribute("class", "pokemons")    
        img.src = data["sprites"].back_default
        button.dataset.pokemonId = randomPokemon
        h2.textContent = randomPokemon

        li.append(img)
        li.append(h2)
        ul.append(li)
        document.body.append(ul)

    
        return data;
    }
    catch (error) {
        console.log(error)
        return null
    }
}

const pokemonHandler = async (event) => {
    const caughtPokemon = 
    setTimeout(async () => {
        await randomPokemon()
    
    }, 500)
}

export const catchPokemon = () => {
    const grassElements = document.getElementsByClassName(".grass")

    for (const grass of grassElements) {
        grass.addEventListener("mouseover", pokemonHandler)
    }
   
}