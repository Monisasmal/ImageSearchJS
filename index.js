const accessKey = "L-3I4d5ctSIVguesfh323yAcZsRJiC-wOgRvGKoUixI";

const Form = document.querySelector("form");
const searchInput = document.getElementById("searchImage");
const searchResults = document.querySelector(".searchResults");
const showMoreBtn = document.getElementById("show-more-button");

let inputData = "";
let page = 1;


async function searchImage() {
    inputData = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    const results = data.results;

    results.map((result) => {
        const imgSection = document.createElement("div");
        imgSection.classList.add("searchResult");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;


        imgSection.appendChild(image);
        imgSection.appendChild(imageLink);
        searchResults.appendChild(imgSection);
    });

    page++;
    if(page > 1){
        showMoreBtn.style.display = "block";
    }
}


Form.addEventListener("submit",(e) =>{
    e.preventDefault();
    page = 1;
    searchImage();
});

// for showmorebutton
showMoreBtn.addEventListener("click", ()=>{
    searchImage();
})


