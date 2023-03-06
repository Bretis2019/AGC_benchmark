// Get the teams from the JSON file
async function getTeams() {
  const response = await fetch('teams.json');
  const teams = await response.json();
  teams.forEach(team => {
    createTeamCard(team);
  });
}

// Create a new team card
function createTeamCard(team) {
  const teamsContainer = document.getElementById('teams-container');

  const teamCard = document.createElement('div');
  teamCard.classList.add('team-card');

  const teamName = document.createElement('h3');
  teamName.textContent = team.name;
  teamCard.appendChild(teamName);

  const teamInfo = document.createElement('p');
  teamInfo.textContent = `${team.players} players · ${team.location}`;
  teamCard.appendChild(teamInfo);

  const contactInfo = document.createElement('p');
  contactInfo.textContent = team.contact;
  teamCard.appendChild(contactInfo);

  teamsContainer.appendChild(teamCard);
}

// Function to add a new team to the JSON file and display its card
async function addTeam(event) {
  event.preventDefault();
  const name = addTeamForm.elements['name-input'].value;
  const players = addTeamForm.elements['players-input'].value;
  const location = addTeamForm.elements['location-input'].value;
  const contact = addTeamForm.elements['contact-input'].value;

  const newTeam = { name, players: parseInt(players), location, contact };

  try {
    // Send the new team data to Formspree
    const response = await fetch('https://formspree.io/f/mbjeyegq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTeam)
    });
    const team = await response.json();

    // Update the local teams array and the teams.json file
    const teamsResponse = await fetch('teams.json');
    let teams = await teamsResponse.json();
    teams.push(team);
    const updateResponse = await fetch('teams.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(teams)
    });

    // If the update was successful, create the new team card
    if (updateResponse.ok) {
      createTeamCard(team);
      addTeamForm.reset();
    } else {
      console.error('Failed to update teams.json');
    }
  } catch (error) {
    console.error(error);
  }
}

// Call the getTeams function to display the existing teams
getTeams();

// Add an event listener to the "Add Team" form
const addTeamForm = document.getElementById('add-team-form');
addTeamForm.addEventListener('submit', addTeam);
