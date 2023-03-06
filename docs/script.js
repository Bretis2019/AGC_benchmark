const teamsContainer = document.getElementById('teams-container');
const addTeamForm = document.getElementById('add-team-form');

// Function to create a new team card element
function createTeamCard(team) {
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
}

// Function to load the teams data from the JSON file
function loadTeams() {
  fetch('teams.json')
    .then(response => response.json())
    .then(teams => {
      teams.forEach(team => {
        createTeamCard(team);
      });
    });
}

// Function to add a new team to the JSON file and display its card
function addTeam(event) {
  event.preventDefault();
  const name = addTeamForm.elements['name-input'].value;
  const players = addTeamForm.elements['players-input'].value;
  const location = addTeamForm.elements['location-input'].value;
  const contact = addTeamForm.elements['contact-input'].value;

  const newTeam = { name, players: parseInt(players), location, contact };

  fetch('teams.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTeam)
  })
    .then(response => response.json())
    .then(team => {
      createTeamCard(team);
      addTeamForm.reset();
    });
}

// Load the initial teams data and set up the form submit event listener
loadTeams();
addTeamForm.addEventListener('submit', addTeam);
