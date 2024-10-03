import data from "./data";
import Shuffle from "array-shuffle";
import PokemonCard from "./components/PokemonCard";


// === DOM Selection ===
renderPokemon(Shuffle(data))


function renderPokemon(list){
    list.forEach((pokemonObj)=>{
        PokemonCard(pokemonObj);
    })
}

