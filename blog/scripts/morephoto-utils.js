const morePhotoElement = document.getElementById("morephoto-container");
let morePhotoRawData = [];

function createMorePhotoHTML(morephoto) {
  const myMorePhotoElement = morephoto
    .map(function (morephoto) {
      return `
          <img
            src="${morephoto.src}"
            alt="${morephoto.alt}"
            class="w-full object-cover"
          />
        `;
    })
    .join("");
  morephotoElement.innerHTML = morephotoContentElement;
}

async function main() {
  const response = await axios.get("/scripts/morephoto.json");
  morephotoRawData = response.data;
  createmorephotoHTML(morephotoRawData);
}


