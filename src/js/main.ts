// Packages
import shuffle from "array-shuffle";
import Fuse from "fuse.js";
import "../scss/style.scss";
import data from "./data.json";
import PokemonCard from "./components/PokemonCard";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  description: string;
  link: string;
  abilities: string[];
}

// === DOM Targeting ===
const inputEl = document.querySelector(
  'input[type="text"]'
) as HTMLInputElement;
const dataRow = document.querySelector("[data-row]") as HTMLDivElement;

renderPokemon(shuffle(data));

// Give list, it will render them
function renderPokemon(list: Pokemon[]): void {
  dataRow.textContent = "";

  if (!list.length) {
    const pokemon = PokemonCard({
      image:
        "https://upload.wikimedia.org/wikipedia/en/e/e4/Ash_Ketchum_Journeys.png?20240410031759",
      name: "Not found",
      link: "https://pokedex.com",
      description: "Try another search",
    });
    dataRow.appendChild(pokemon);
  }

  list.forEach((pokemonObj) => {
    const pokemon = PokemonCard(pokemonObj);
    dataRow.appendChild(pokemon);
  });
}

// Will be invoked on search
function handleSearch(input: string): void {
  // const filteredPokemon = data.filter((pokemonObj) => {
  //   return pokemonObj.name.toLowerCase().includes(input);
  // });

  let debounceTimer: ReturnType<typeof setTimeout>;
  inputEl.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);

    const target = e.target as HTMLInputElement;
    debounceTimer = setTimeout(() => {
      const currentInput = target.value.trim().toLowerCase();
      handleSearch(currentInput);
    }, 500);
  });

  // Create fuse object
  const options = {
    keys: ["name", "description"],
    threshold: 0.5,
  };
  const fuse = new Fuse(data, options);

  // Perform search
  function performSearch(): Pokemon[] {
    if (!input) return data;

    const searched = fuse.search(input);
    return searched.map((obj) => obj.item);
  }

  // Create without the 'item' key from fuse search
  const filterdPokemon = performSearch();
  renderPokemon(filterdPokemon);
}

inputEl.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement;
  const currentInput = target.value.trim().toLowerCase();
  handleSearch(currentInput);
});

// Add / to active search
document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "/") {
    // Don't type
    e.preventDefault();
    inputEl.focus();
  }
});
