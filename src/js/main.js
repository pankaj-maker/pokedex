import data from "./data";
import Shuffle from "array-shuffle";
import PokemonCard from "./components/PokemonCard";

//== DOM Targeting ===
const inputEl=document.querySelector("input");
const dataRow = document.querySelector("[data-row]");


// === DOM Selection ===
renderPokemon(Shuffle(data))


function renderPokemon(list){
dataRow.textContent=""
    list.forEach((pokemonObj)=>{
    const pokemon=PokemonCard(pokemonObj)
        dataRow.appendChild(pokemon);
    })
}
function handleSearch(input){
    const filterPokemon=data.filter((pokemonObj))
    pokemonObj.name.toLowerCase().includes(input)
}
inputEl.addEventListener("input",(e)=>{
const cuurInput=e.target.value.trim().toLowerCase();
    handleSearch(cuurInput)
})

document.addEventListener("keyup",(e)=>{
if(e.key==="/"){
    e.preventDefault();
inputEl.focus();
}
});
