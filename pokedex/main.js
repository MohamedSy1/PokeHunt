import './style.css'
import {
  renderPokemons,
  randomPokemon,
  pokemonStats,
  rockPokemonModal,
  pokemonModal
} from "./src/components/fetch-functions.js"

let hoverTimer;

const removePokemon = (event) => {
  const modal = document.querySelector("#pokemonModal")
  const ul = document.querySelector("#poke")
  const li = document.querySelector(".pokemons")
  if (event.target.classList.contains('close-button')) {
    modal.close()
    ul.removeChild(li)
  }
}

const addPokemon = (event) => {
  const modal = document.querySelector("#pokemonModal")
  if (event.target.classList.contains('catch-button')) {
    modal.close()
  }
}

const getPokemonData = async (pokemonName) => {
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

const searchForPokemon = async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const formObj = Object.fromEntries(formData);

  console.log('here is your data:', formObj.pokemon);

  await getPokemonData(formObj.pokemon)

  form.reset();
}

const main = () => {
  const modal = document.querySelector("#pokemonModal")
  document.body.addEventListener('click', removePokemon)
  document.body.addEventListener('click', addPokemon)

  document.querySelectorAll('.grass, .tree, .rock').forEach(el => {
    const randomX = Math.random() * 40;
    const randomY = Math.random() * 150;
    el.style.transform = `translate(${randomX}px, ${randomY}px)`;
  });

  const grassElements = document.getElementsByClassName("grass")
  for (const grass of grassElements) {
    grass.addEventListener("mouseover", () => {
      hoverTimer = setTimeout(() => {
        modal.showModal()
        pokemonModal()
      }, 5000)
    })

    grass.addEventListener("mouseout", () => {
      clearTimeout(hoverTimer)
    })
  }

  const rockElements = document.getElementsByClassName("rock")
  for (const rock of rockElements) {
    rock.addEventListener("mouseover", () => {
      hoverTimer = setTimeout(() => {
        modal.showModal()
        rockPokemonModal()
      }, 5000)
    })

    rock.addEventListener("mouseout", () => {
      clearTimeout(hoverTimer)
    })
  }

  const form = document.querySelector("#pokemon-search-form")
  form.addEventListener('submit', searchForPokemon)
}

main();
