const teamsUrl = 'https://bretis2019.github.io/AGC_benchmark/teams.json';
const addButton = document.getElementById('add-team-button');
const teamForm = document.getElementById('team-form');

addButton.addEventListener('click', () => {
  teamForm.style.display = 'block';
});

teamForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name-input').value;
  const players = document.getElementById('players-input').value;
  const location = document.getElementById('location-input').value;
  const contact = document.getElementById('contact-input').value;

  const newTeam = {
    name: name,
    players: parseInt(players),
    location: location,
    contact: contact
  };

  const teamsContent = await fetch(teamsUrl).then(response => response.json());
  const teams = JSON.parse(atob(teamsContent.content));
  teams.push(newTeam);
  const newContent = JSON.stringify(teams, null, 2);
  const newContentEncoded = btoa(newContent);

  const token = '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';
  const branch = 'main';
  const commitMessage = 'Add new team';
  const contentSha = teamsContent.sha;

  const response = await fetch(teamsUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      message: commitMessage,
      content: newContentEncoded,
      sha: contentSha,
      branch: branch
    })
  });

  if (response.status === 200) {
    teams.push(newTeam);
    displayTeams(teams);
    teamForm.reset();
    teamForm.style.display = 'none';
  } else {
    console.error('Failed to add team:', response);
  }
});

async function fetchTeams() {
  const response = await fetch(teamsUrl);
  const content = await response.json();
  const teams = JSON.parse(atob(content.content));
  displayTeams(teams);
}

function displayTeams(teams) {
  const teamsContainer = document.getElementById('teams-container');
  teamsContainer.innerHTML = '';

  teams.forEach(team => {
    const teamCard = document.createElement('div');
    teamCard.className = 'team-card';

    const teamName = document.createElement('h2');
    teamName.textContent = team.name;

    const teamPlayers = document.createElement('p');
    teamPlayers.textContent = `Players: ${team.players}`;

    const teamLocation = document.createElement('p');
    teamLocation.textContent = `Location: ${team.location}`;

    const teamContact = document.createElement('p');
    teamContact.textContent = `Contact: ${team.contact}`;

    teamCard.appendChild(teamName);
    teamCard.appendChild(teamPlayers);
    teamCard.appendChild(teamLocation);
    teamCard.appendChild(teamContact);

    teamsContainer.appendChild(teamCard);
  });
}

fetchTeams();
