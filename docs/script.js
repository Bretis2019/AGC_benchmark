// Client ID and API key from the Google Developers Console
const CLIENT_ID = '704072422405-rjclfm5u5bgsmg7kcodeqku32jvaf1g1.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCyrmhdn5LhTqsU_R82iO6Ezhb_HaavKgc';

// ID of the Google Sheet containing the team information
const SPREADSHEET_ID = '14ZEtv7YBmjvKt9iW8aDTYi2T9Q99mKXHu34rLunkZyE';

// Range of the cells containing the team information
const RANGE = 'Sheet1!A2:D';

// Array of team objects retrieved from the Google Sheet
let teams = [];

// Load the Google Sheets API client library
gapi.load('client', start);

// Initialize the API client library and make the request to get the team information
function start() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly'
  }).then(() => {
    return gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE
    });
  }).then(response => {
    const values = response.result.values;
    if (values.length > 0) {
      teams = values.map(row => ({
        name: row[0],
        players: row[1],
        location: row[2],
        contact: row[3]
      }));
      displayTeams();
    } else {
      console.log('No data found.');
    }
  }).catch(err => {
    console.log('Error: ' + err.message);
  });
}

// Display the team information on the page
function displayTeams() {
  const teamsContainer = document.getElementById('teams-container');

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
    contact
