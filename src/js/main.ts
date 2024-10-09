// Packages
import shuffle from "array-shuffle";
import Fuse from "fuse.js";
import "../scss/style.scss";
import data from "./data.json";
import PokemonCard from "./components/PokemonCard";

// === DOM Targeting ===
const inputEl = document.querySelector('input[type="text"]');
const dataRow = document.querySelector("[data-row]");

renderPokemon(shuffle(data));

// Give list, it will render them
function renderPokemon(list) {
  dataRow.textContent = "";

  if(!list.length){
  const pokemon=PokemonCard({
    image:"https://upload.wikimedia.org/wikipedia/en/e/e4/Ash_Ketchum_Journeys.png?20240410031759",name:"Not found",link:"https://pokedex.com",description:"Try another search"
  });
  dataRow.appendChild(pokemon);
}

  list.forEach((pokemonObj) => {
    const pokemon = PokemonCard(pokemonObj);
    dataRow.appendChild(pokemon);
  });
}

// Will be invoked on search
function handleSearch(input) {
  // const filteredPokemon = data.filter((pokemonObj) => {
  //   return pokemonObj.name.toLowerCase().includes(input);
  // });

  let debounceTimer;
  inputEl.addEventListener("input",(e)=>{
    clearTimeout(debounceTimer);
    debounceTimer=setTimeout(()=>{
const currentInput=e.target.value.trim().toLowerCase();
    handleSearch(currentInput);

  },500);
});

  // Create fuse object
  const options = {
    keys: ["name", "description"],
    threshold: 0.5,
  };
  const fuse = new Fuse(data, options);

  // Perform search
  function performSearch() {
    if (!input) return data;

    const searched = fuse.search(input);
    return searched.map((obj) => obj.item);
  }

  // Create without the 'item' key from fuse search
  const filterdPokemon = performSearch();
  renderPokemon(filterdPokemon);
}

inputEl.addEventListener("input", (e) => {
  const currentInput = e.target.value.trim().toLowerCase();
  handleSearch(currentInput);
});

// Add / to active search
document.addEventListener("keydown", (e) => {
  if (e.key === "/") {
    // Don't type
    e.preventDefault();
    inputEl.focus();
  }
});
