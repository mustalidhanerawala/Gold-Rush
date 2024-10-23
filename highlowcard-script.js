let balance = 0;
let currentCardValue = 0;
let nextCardValue = 0;
let betAmount = 0;
let gameStarted = false;

function drawCard() {
    return Math.floor(Math.random() * 21) - 10; // Draws a card value between -10 and 10
}

function updateBalance() {
    document.getElementById('balance').innerText = `Balance: £${balance}`;
}

function resetGame() {
    document.getElementById('card').innerText = '0';
    document.getElementById('toggleButton').disabled = true; // Disable toggle button
    document.getElementById('start').style.display = 'none'; // Hide start button
    document.getElementById('alert').style.display = 'none'; // Hide alert
    gameStarted = false;
    document.getElementById('toggleButton').checked = false; // Reset toggle to low
    document.getElementById('toggleLabel').innerText = "High"; // Reset label to High
}

document.getElementById('submitBet').addEventListener('click', () => {
    betAmount = parseInt(document.getElementById('betAmount').value);
    
    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Please enter a valid bet amount.");
        return;
    }

    balance += betAmount;
    updateBalance();
    document.getElementById('toggleButton').disabled = false; // Enable toggle button
    document.getElementById('start').style.display = 'inline-block'; // Show start button
});

document.getElementById('start').addEventListener('click', () => {
    currentCardValue = drawCard();
    document.getElementById('card').innerText = currentCardValue;
    gameStarted = true;
});

document.getElementById('toggleButton').addEventListener('change', () => {
    if (gameStarted) {
        nextCardValue = drawCard();
        const isHigh = document.getElementById('toggleButton').checked; // Get toggle state
        if ((isHigh && nextCardValue > currentCardValue) || (!isHigh && nextCardValue < currentCardValue)) {
            balance += betAmount; // Player wins
            currentCardValue = nextCardValue; // Update current card value
            document.getElementById('card').innerText = currentCardValue; // Update card display
        } else {
            balance -= betAmount; // Player loses
            document.getElementById('alert').style.display = 'flex'; // Show alert
            resetGame(); // Reset the game
            updateBalance();
            return;
        }
        updateBalance();
    }

    // Update label based on toggle state
    document.getElementById('toggleLabel').innerText = document.getElementById('toggleButton').checked ? "Low" : "High";
});

// Initialize the game with a balance input
document.getElementById('betAmount').addEventListener('input', function() {
    if (this.value) {
        balance = parseInt(this.value);
        updateBalance();
    }
});
