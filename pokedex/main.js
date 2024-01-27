import './style.css'
import {
  renderPokemons,
  randomPokemon,
  pokemonStats,
  pokemonModal
} from "./src/components/fetch-functions.js"

// const pokemonHandler = async () => {
//   const caughtPokemon = await randomPokemon()
//   setTimeout(() => {
//       return caughtPokemon
//   }, 5000)
// }

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

  document.querySelectorAll('.grass, .tree').forEach(el => {
    const randomX = Math.random() * 40;
    const randomY = Math.random() * 150;
    el.style.transform = `translate(${randomX}px, ${randomY}px)`;
  });

  const grassElements = document.getElementsByClassName("grass")
  for (const grass of grassElements) {
    grass.addEventListener("mouseover", () => {
      setTimeout(() => {
        modal.showModal()
        pokemonModal()
      }, 5000)
    })
  }
}

main();
