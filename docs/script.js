// Select the DOM elements
const teamsContainer = document.getElementById('teams-container');
const addTeamForm = document.getElementById('add-team-form');

// Event listener for submitting the add team form
addTeamForm.addEventListener('submit', addTeam);

// Function to fetch the teams data from the JSON file
async function getTeams() {
  try {
    const response = await fetch('teams.json');
    const teams = await response.json();
    teams.forEach(team => createTeamCard(team));
  } catch (error) {
    console.error(error);
  }
}

// Function to create a new team card and append it to the container
function createTeamCard(team) {
  // Create the card element
  const card = document.createElement('div');
  card.classList.add('team-card');

  // Create the card header element
  const cardHeader = document.createElement('div');
  cardHeader.classList.add('team-card-header');

  // Create the card title element
  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('team-card-title');
  cardTitle.textContent = team.name;

  // Create the card subtitle element
  const cardSubtitle = document.createElement('h3');
  cardSubtitle.classList.add('team-card-subtitle');
  cardSubtitle.textContent = `${team.players} players · ${team.location}`;

  // Create the card body element
  const cardBody = document.createElement('div');
  cardBody.classList.add('team-card-body');

  // Create the card contact element
  const cardContact = document.createElement('p');
  cardContact.classList.add('team-card-contact');
  cardContact.textContent = team.contact;

  // Append the elements to the card
  cardHeader.appendChild(cardTitle);
  cardHeader.appendChild(cardSubtitle);
  cardBody.appendChild(cardContact);
  card.appendChild(cardHeader);
  card.appendChild(cardBody);

  // Append the card to the container
  teamsContainer.appendChild(card);
}

// Function to add a new team to the JSON file and display its card
function addTeam(event) {
  event.preventDefault();
  const name = addTeamForm.elements['name-input'].value;
  const players = addTeamForm.elements['players-input'].value;
  const location = addTeamForm.elements['location-input'].value;
  const contact = addTeamForm.elements['contact-input'].value;

  const newTeam = { name, players: parseInt(players), location, contact };

  fetch('https://formspree.io/f/mbjeyegq', {
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

// Fetch the teams data when the page loads
getTeams();
