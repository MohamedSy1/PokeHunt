import './style.css'
import {renderPokemons, randomPokemon, catchPokemon} from "./src/components/fetch-functions.js"



const main = () => {
  document.querySelectorAll('.grass, .tree').forEach(el => {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 300;
    el.style.transform = `translate(${randomX}px, ${randomY}px)`;
  });

  catchPokemon()
  
}

main();