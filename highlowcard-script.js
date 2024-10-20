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
    balance = 0;
    document.getElementById('result').innerText = '';
    document.getElementById('card').innerText = '0';
    document.getElementById('betAmount').value = '';
    updateBalance();
    document.getElementById('start').style.display = 'none'; // Hide start button
    document.getElementById('alert').style.display = 'none'; // Hide alert
    gameStarted = false;
}

document.getElementById('submitBet').addEventListener('click', () => {
    betAmount = parseInt(document.getElementById('betAmount').value);
    
    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Please enter a valid bet amount.");
        return;
    }

    balance += betAmount;
    updateBalance();
    document.getElementById('start').style.display = 'inline-block'; // Show start button
});

document.getElementById('start').addEventListener('click', resetGame);

document.getElementById('high').addEventListener('click', () => {
    if (!gameStarted) {
        currentCardValue = drawCard();
        document.getElementById('card').innerText = currentCardValue;
        gameStarted = true;
    } else {
        nextCardValue = drawCard();
        if (nextCardValue > 0) {
            balance += betAmount; // Player wins
            document.getElementById('card').innerText = nextCardValue;
        } else {
            document.getElementById('alert').style.display = 'flex'; // Show alert
            resetGame(); // Reset the game
            return;
        }
        updateBalance();
    }
});

document.getElementById('low').addEventListener('click', () => {
    if (!gameStarted) {
        currentCardValue = drawCard();
        document.getElementById('card').innerText = currentCardValue;
        gameStarted = true;
    } else {
        nextCardValue = drawCard();
        if (nextCardValue < 0) {
            balance += betAmount; // Player wins
            document.getElementById('card').innerText = nextCardValue;
        } else {
            document.getElementById('alert').style.display = 'flex'; // Show alert
            resetGame(); // Reset the game
            return;
        }
        updateBalance();
    }
});

// Initialize the game with a balance input
document.getElementById('betAmount').addEventListener('input', function() {
    if (this.value) {
        balance = parseInt(this.value);
        updateBalance();
    }
});
