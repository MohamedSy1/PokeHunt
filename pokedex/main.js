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
}

main();
