const teamsContainer = document.getElementById('teams-container');

const req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    if (req.status == 200) {
      const teams = JSON.parse(req.responseText);
      teams.forEach((team) => {
        const teamCard = document.createElement('div');
        teamCard.classList.add('team-card');

        const nameElement = document.createElement('h2');
        nameElement.textContent = team.name;
        teamCard.appendChild(nameElement);

        const playersElement = document.createElement('p');
        playersElement.textContent = `Number of players: ${team.players}`;
        teamCard.appendChild(playersElement);

        const locationElement = document.createElement('p');
        locationElement.textContent = `Location: ${team.location}`;
        teamCard.appendChild(locationElement);

        const contactButton = document.createElement('button');
        contactButton.textContent = 'Contact Team';
        contactButton.addEventListener('click', () => {
          const contactInfo = document.createElement('p');
          contactInfo.textContent = `Email: ${team.contact}`;
          teamCard.appendChild(contactInfo);
          contactButton.remove();
        });
        teamCard.appendChild(contactButton);

        teamsContainer.appendChild(teamCard);
      });
    } else {
      console.log('Failed to fetch teams data.');
    }
  }
};

req.open("GET", "https://api.jsonbin.io/v3/b/64079dfdace6f33a22eaf72c/latest", true);
req.setRequestHeader("X-Master-Key", "$2b$10$h17YnRI5nIE2YLT2ueTpXuuM7hzYrLKROLfRi81H0Kz7DadgplIPK");
req.send();
