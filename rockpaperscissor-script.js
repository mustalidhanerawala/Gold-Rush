function play(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const result = determineWinner(playerChoice, computerChoice);
    
    document.getElementById("result").textContent = `You chose: ${emoji(playerChoice)} | Computer chose: ${emoji(computerChoice)}\n${result}`;
  }
  
  function determineWinner(player, computer) {
    if (player === computer) {
      return "It's a tie!";
    } else if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return "You win!";
    } else {
      return "You lose!";
    }
  }
  
  function emoji(choice) {
    switch (choice) {
      case 'rock': return '🪨';
      case 'paper': return '📄';
      case 'scissors': return '✂️';
      default: return '';
    }
  }
  
  function resetGame() {
    document.getElementById("result").textContent = '';
  }
  