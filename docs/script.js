const teamsContainer = document.getElementById('teams-container');

// Render teams from the teams.json file
async function renderTeams() {
  try {
    const response = await fetch('teams.json');
    const teams = await response.json();
    teams.forEach((team) => {
      renderTeam(team);
    });
  } catch (error) {
    console.error(error);
  }
}

// Render a single team
function renderTeam(team) {
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
  contactButton.addEventListener('click', async () => {
    const contactInfo = await getContactInfo(team.contact);
    const contactElement = document.createElement('p');
    contactElement.textContent = `Email: ${contactInfo.email}`;
    teamCard.appendChild(contactElement);
    contactButton.remove();
  });
  teamCard.appendChild(contactButton);

  teamsContainer.appendChild(teamCard);
}

// Get contact info for a team
async function getContactInfo(contactUrl) {
  try {
    const response = await fetch(contactUrl);
    return await response.json();
  } catch (error) {
    console.error(error);
    return { email: 'Unavailable' };
  }
}

// Handle form submission to add a new team
async function addTeam(event) {
  event.preventDefault();

  const name = document.getElementById('name-input').value;
  const players = document.getElementById('players-input').value;
  const location = document.getElementById('location-input').value;
  const contact = document.getElementById('contact-input').value;

  const newTeam = {
    name,
    players: parseInt(players),
    location,
    contact
  };

  try {
    const response = await fetch('/.netlify/functions/addTeam', {
      method: 'POST',
      body: JSON.stringify(newTeam)
    });

    if (response.ok) {
      console.log('New team added successfully.');
      renderTeam(newTeam);
      document.getElementById('add-team-form').reset();
    } else {
      console.error('Failed to add new team.');
    }
  } catch (error) {
    console.error(error);
  }
}

// Initialize the app
renderTeams();
document.getElementById('add-team-form').addEventListener('submit', addTeam);
