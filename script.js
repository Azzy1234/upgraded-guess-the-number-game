let randomNumber; // Holds the randomly generated number
let attempts = 0; // Counter for number of tries
let minRange, maxRange; // Variables to store the min and max range

// function to start the game and set up the range
function startGame() {
    // gets the range values from the user inputs or use default if knowt is entered
    minRange = parseInt(document.getElementById('minRange').value) || 1;
    maxRange = parseInt(document.getElementById('maxRange').value) || 100;

    // randomly generate a number within the range
    randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    attempts = 0; // reset the attempt count

    // update the range display in the UI
    document.getElementById('rangeDisplay').innerText = `${minRange} and ${maxRange}`;
    document.getElementById('gameArea').style.display = 'block'; 
    document.getElementById('message').innerHTML = ''; // Clear out old messages
}

// function to check the user's guess
function checkGuess() {
    const userGuess = parseInt(document.getElementById('userGuess').value); 
    const messageDiv = document.getElementById('message'); 
    attempts++; // Add 1 to the attempt count

    // if the guess is out of the range or NAN it will ask for a valid guess
    if (isNaN(userGuess) || userGuess < minRange || userGuess > maxRange) {
        messageDiv.innerHTML = '<p>Oops! Please enter a n umber between the range!</p>'; 
        return; 
    }

    // Calculate the difference between the guess and the target number
    const difference = Math.abs(userGuess - randomNumber); 

    // Define "temperature" ranges based on the difference
    const quarterRange = Math.floor((maxRange - minRange) / 4);
    const halfRange = Math.floor((maxRange - minRange) / 2);

    // this checks how close the guess is to the random number, and give feedback
    if (userGuess === randomNumber) {
        // if its answeered right it will display this below and thenreset the game
        messageDiv.innerHTML = `<p>🎉 Wow! You got it! The number was ${randomNumber}. Attempts: ${attempts}</p>`;
        resetGame();
    } else if (difference >= halfRange) {
        feedback = 'Super Cold';
    } else if (difference >= quarterRange) {
        feedback = 'Pretty Cold';
    } else if (difference >= quarterRange / 2) {
        feedback = 'Warmish';
    } else if (difference >= quarterRange / 4) {
        feedback = 'Hot!';
    } else {
        feedback ='Super Hot!'; 
    }

    // display the feedback if the guess isn't correct
    if (userGuess !== randomNumber) {
        messageDiv.innerHTML += `<p>${feedback}. Give it another shot!</p>`; // Double messages sometimes?
    }
}

// function to reset the game
function resetGame() {
    randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange; // New number, who dis?
    attempts = 0; 
}