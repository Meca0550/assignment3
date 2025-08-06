async function getMovie(titleFromSuggestion = null) {
  const titleInput = document.getElementById("movieTitle");
  const movieTitle = titleFromSuggestion || titleInput.value.trim();

  if (!movieTitle) {
    alert("Please enter a movie title.");
    return;
  }

  const apiKey = "6a64c706";
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`;

  const movieInfoDiv = document.getElementById("movieInfo");
  movieInfoDiv.style.display = "block";
  movieInfoDiv.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "False") {
      movieInfoDiv.innerHTML = `<p>No results found for "<strong>${movieTitle}</strong>".</p>`;
      return;
    }

    movieInfoDiv.innerHTML = `
      <img src="${data.Poster !== "N/A" ? data.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="Poster" />
      <div>
        <h2>${data.Title} (${data.Year})</h2>
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Director:</strong> ${data.Director}</p>
        <p><strong>Actors:</strong> ${data.Actors}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
        <p><strong>Runtime:</strong> ${data.Runtime}</p>
      </div>
      <div style="clear:both;"></div>
    `;
  } catch (error) {
    console.error("Fetch error:", error);
    movieInfoDiv.innerHTML = "<p>Error fetching movie data. Try again later.</p>";
  }
}

function searchSuggested(title) {
  document.getElementById("movieTitle").value = title;
  getMovie(title);
}
