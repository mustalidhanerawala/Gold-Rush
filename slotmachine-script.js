const spinButton = document.getElementById('spin-button');
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');

const symbols = ['🍒', '🔔', '💎', '🍀', '🍋'];

// Function to generate a random symbol for each reel
function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// Spin the reels sequentially
async function spinReels() {
  // Spin duration in ms
  const spinDuration = 500;
  spinButton.disabled = true; // Disable the button while spinning

  // Generate random target symbols for each reel
  const targetSymbol1 = getRandomSymbol();
  const targetSymbol2 = getRandomSymbol();
  const targetSymbol3 = getRandomSymbol();

  // Spin Reel 1
  await spinReel(reel1, targetSymbol1, spinDuration);

  // Spin Reel 2
  await spinReel(reel2, targetSymbol2, spinDuration);

  // Spin Reel 3
  await spinReel(reel3, targetSymbol3, spinDuration);

  // Check if all symbols are the same
  if (targetSymbol1 === targetSymbol2 && targetSymbol2 === targetSymbol3) {
    alert('Jackpot! You win! 🎉');
  } else {
    alert('Sorry, Try Again!');
  }

  spinButton.disabled = false; // Re-enable the spin button
}

// Function to spin a reel to a specific symbol
async function spinReel(reel, targetSymbol, spinDuration) {
  const targetIndex = symbols.indexOf(targetSymbol);
  const randomSpins = 5 + Math.floor(Math.random() * 5); // Randomize spins for effect
  const totalRotation = (randomSpins * 360) + (targetIndex * (360 / symbols.length));

  // Apply the rotation
  reel.style.transition = `transform ${spinDuration}ms cubic-bezier(0.25, 1, 0.5, 1)`;
  reel.style.transform = `rotateX(${totalRotation}deg)`;

  await wait(spinDuration); // Wait for the spin to finish
}

// Function to wait for a specified duration
function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

// Add event listener to the spin button
spinButton.addEventListener('click', spinReels);
