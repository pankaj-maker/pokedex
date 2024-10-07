// const dataRow = document.querySelector("[data-row]");

export default function PokemonCard(data){
    const{image,link,description,name}=data;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `<div class="card">
        <img
            src="${image}"
            class="card-img-top"
            alt="${name}"
        />
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${description}</p>
            <a href="${link}" class="btn btn-warning">Visit</a>
        </div>
        </div>`;
    // dataRow.appendChild(div);
    return div;
  }