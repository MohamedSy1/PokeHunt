export const renderPokemons = async () => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=50&limit=50")
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
        const ul = document.querySelector("#poke")
        const li = document.createElement('li')
        const img = document.createElement("img")
        const h2 = document.createElement("h2")
        const button = document.createElement("button")
        const div = document.querySelector('#pokedex')
    
        li.setAttribute("class", "pokemons")    
        img.src = data["sprites"].front_default
        button.dataset.pokemonId = randomPokemon
        h2.textContent = randomPokemon

        li.append(img)
        li.append(h2)
        ul.appendChild(li)
        div.append(ul)
        document.body.append(div)

            
        return data;
    }
    catch (error) {
        console.log(error)
        return null
    }
}

const pokemonModal