const myWorkElement = document.getElementById("mywork-container");
let myWorkRawData = [];

function createMyWorkHTML(mywork) {
  const myWorkContentElement = mywork
    .map(function (mywork) {
      return `
          <img
            src="${mywork.src}"
            alt="${mywork.alt}"
            class="w-full object-cover"
          />
        `;
    })
    .join("");
  myWorkElement.innerHTML = myWorkContentElement;
}

async function main() {
  const response = await axios.get("/scripts/mywork.json");
  myWorkRawData = response.data;
  createMyWorkHTML(myWorkRawData);
}

main();
