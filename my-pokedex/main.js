import './style.css'
import {renderPokemons, randomPokemon} from "./src/components/fetch-functions.js"

const pokemonHandler = async () => {
  const caughtPokemon = await randomPokemon()
  setTimeout(() => {
      console.log(caughtPokemon)
      return caughtPokemon
  }, 5000)
}

const main = () => {
  document.querySelectorAll('.grass, .tree').forEach(el => {
    const randomX = Math.random() * 40;
    const randomY = Math.random() * 150;
    el.style.transform = `translate(${randomX}px, ${randomY}px)`;
  });

  const grassElements = document.getElementsByClassName("grass")
  console.log(grassElements)
  for (const grass of grassElements) {
    console.log(grass)
    grass.addEventListener("mouseover", pokemonHandler)
  }
}

main();