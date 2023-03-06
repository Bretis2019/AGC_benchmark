const teamsContainer = document.getElementById('teams-container');

fetch('teams.json')
  .then(response => response.json())
  .then(teams => {
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
