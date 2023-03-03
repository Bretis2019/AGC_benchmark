const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const fileInput = document.querySelector('#script-file');
  const scriptFile = fileInput.files[0];
  const formData = new FormData();
  formData.append('script_file', scriptFile);
  const response = await fetch('https://bretis2019.github.io/AGC_benchmark/app.py', {
    method: 'POST',
    body: formData
  });
  const score = await response.text();
  const scoreContainer = document.querySelector('#score-container');
  scoreContainer.textContent = `Your computer is ${score} times more powerful than the AGC!`;
});
