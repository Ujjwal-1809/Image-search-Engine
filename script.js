let input = document.getElementById("input");
let searchbtn = document.getElementById("searchBtn");
let res = document.getElementById("result");
let lbtn = document.getElementById("lbtn");
let loadbtn = document.getElementById("loadbtn");
let page = 1;
let apiKey = "4ei7cpsZw8qp9thT7btFWjOtuSqe54bBWgAvO_ClNYk";

// Async function
async function imageSearch(word) {
    let url = `https://api.unsplash.com/search/photos?page=${page}&query=${word}&client_id=${apiKey}&per_page=12`;
    
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: Failed to fetch images`);
        }

        let jsonResponse = await response.json();
        let jsonResults = jsonResponse.results;

        if (jsonResults.length === 0) {
            res.innerHTML = `<p class="no-results" >No results found for "${word}". Please try another search.</p>`;
            loadbtn.style.display = "none"
            return;
        }
        else{
            loadbtn.style.display = "block"
        }

        jsonResults.forEach(element => {
            let create = document.createElement("img");
            create.src = element.urls.small;
            create.id = "imgID";
            res.appendChild(create);
        });

    } catch (error) {
        // res.innerHTML = `<p>Something went wrong: ${error.message}. Please try again later.</p>`;
        console.error("Fetch error:", error);
    }
}

// Function to initiate search
function initiateSearch() {
    res.innerHTML = ""; 
    page = 1; 
    imageSearch(input.value);
    lbtn.style.display = "flex"; 
}

// Event listeners
searchbtn.addEventListener("click", () => {
    initiateSearch();
});

loadbtn.addEventListener("click", () => {
    page++;
    imageSearch(input.value);
});

input.addEventListener("input",()=>{
    if (input.value.trim() !== "") {
        searchbtn.disabled = false;
    }
    else{
        searchbtn.disabled = true;
    }
})

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && input.value.trim() !== "") {
        initiateSearch();
    }
});
