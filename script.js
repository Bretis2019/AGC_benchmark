function calculateScore() {
  const AGC_FLOPS = 1000000; // 1 MHz
  const userFlopsScore = parseInt(document.getElementById("flops-score").value);
  
  if (!isNaN(userFlopsScore)) {
    const score = Math.round(userFlopsScore / AGC_FLOPS);
    const scoreContainer = document.getElementById("score-container");
    scoreContainer.innerHTML = `Your computer is approximately <strong>${score} times</strong> more powerful than the Apollo Guidance Computer.`;
  }
}
