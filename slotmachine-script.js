document.getElementById("spinButton").addEventListener("click", spin);
document.getElementById("closeAlertButton").addEventListener("click", closeAlert);

function spin() {
    const symbols = ["🍒", "🍋", "🍉", "🍇", "🍓", "🍊"];
    
    let reel1, reel2, reel3;
    
    // Generate a random number to decide if the user wins
    const isWin = Math.random() <= 0.25; // 25% chance of winning

    if (isWin) {
        // If the user wins, make all reels the same
        const winningSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        reel1 = reel2 = reel3 = winningSymbol;
        showAlert("Jackpot! You win!"); // Show custom alert
        document.getElementById("result").textContent = ""; // Clear any previous result
    } else {
        // If the user loses, generate random symbols for each reel
        reel1 = symbols[Math.floor(Math.random() * symbols.length)];
        reel2 = symbols[Math.floor(Math.random() * symbols.length)];
        reel3 = symbols[Math.floor(Math.random() * symbols.length)];
        document.getElementById("result").textContent = "Try again!";
    }

    // Update the reels with the selected symbols
    document.getElementById("reel1").textContent = reel1;
    document.getElementById("reel2").textContent = reel2;
    document.getElementById("reel3").textContent = reel3;
}

function showAlert(message) {
    document.getElementById("alertMessage").textContent = message;
    document.getElementById("alertModal").style.display = "flex";
}

function closeAlert() {
    document.getElementById("alertModal").style.display = "none";
}
