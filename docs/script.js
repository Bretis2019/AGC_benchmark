const API_KEY = "$2b$10$h17YnRI5nIE2YLT2ueTpXuuM7hzYrLKROLfRi81H0Kz7DadgplIPK";
const API_URL = "https://api.jsonbin.io/v3/b/64079dfdace6f33a22eaf72c";
const req = new XMLHttpRequest();
const searchInput = document.getElementById("search-input");

req.onreadystatechange = function() {
  if (req.readyState === XMLHttpRequest.DONE) {
    if (req.status === 200) {
      const data = JSON.parse(req.responseText);
      const teamCards = data.record.map(team => {
        if (team.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            team.location.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            team.players.toString().includes(searchInput.value)) {
          return `<div class="team-card">
            <h2>${team.name}</h2>
            <p><strong>Players:</strong> ${team.players}</p>
            <p><strong>Location:</strong> ${team.location}</p>
            <p><strong>Contact:</strong> ${team.contact}</p>
          </div>`;
        }
      }).join('');
      document.getElementById("team-cards").innerHTML = teamCards;
    } else {
      console.log("Error retrieving team information");
    }
  }
};

req.open("GET", API_URL, true);
req.setRequestHeader("X-Master-Key", API_KEY);
req.send();

searchInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    req.open("GET", API_URL, true);
    req.setRequestHeader("X-Master-Key", API_KEY);
    req.send();
  }
});
