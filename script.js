const apiKey = '3223e12e8041477abc4a9479cc48f6a9'; // Ensure this API key is valid
const blogContainer = document.getElementById("blog-container");
const loadingIndicator = document.getElementById("loading");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || "https://placehold.co/600x400"; // Default image if none available
        img.alt = article.title || "No image available"; // Default alt text

        const title = document.createElement("h2");
        title.textContent = article.title || "No title available"; // Default title if none available

        const description = document.createElement("p");
        description.textContent = article.description || "No description available"; // Default description if none available

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogContainer.appendChild(blogCard);
    });
    loadingIndicator.style.display = "none";
}

(async () => {
    try {
        loadingIndicator.style.display = "flex";
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();