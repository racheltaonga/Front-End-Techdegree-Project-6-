document.addEventListener("DOMContentLoaded", () => {

    //variables for the game
    const qwerty = document.getElementById('qwerty');
    const phrase = document.getElementById('phrase');
    const startGame = document.querySelector('.btn_reset');
    const overlay = startGame.parentNode;
    const scoreBoard = document.getElementById('scoreboard');

    //phrases for the game
    const phrases = [
        "a clean sweep",
        "a good neighbour a found treasure",
        "the future belongs to those who believe in the beauty of their dreams",
        "a friendly piece of advice",
        "a change of scenery",
        "a beautiful bouquet of red roses for you",
        "a barrel of laughs"
    ];

    // event listener to start the game
    startGame.addEventListener("click", function() {
        resetGame();
    });

    // return a random phrase from an array
    const getRandomPhraseAsArray = arr => {
        let randomPhrase = Math.floor(Math.random() * arr.length);
        return arr[randomPhrase].split("");
    };

    // Adds the letters of a string to the display
    const addPhraseToDisplay = arr => {
        for (i = 0; i < arr.length; i++) {
            let li = document.createElement("li");
            li.textContent = arr[i];
            phrase.appendChild(li);
            if (!(arr[i].indexOf(" ") > -1)) {
                li.classList.add("letter");
            } else {
                li.classList.add("space");
            }
        }
    };

    // Check if a letter is in the phrase
    const checkLetter = button => {
        let lis = document.getElementsByClassName("letter");
        let correctGuess = null;
        for (i = 0; i < lis.length; i++) {
            if (button.textContent === lis[i].textContent) {
                lis[i].classList.add("show");
                correctGuess = button.textContent;
            }
        }
        return correctGuess;
    };

    // Check if the game is won or lost
    const checkWin = () => {
        const letter = document.querySelectorAll(".letter");
        const show = document.querySelectorAll(".show");
        if (letter.length === show.length) {
            changeOverlay("win", "You Won, Way to Go! :)")
        } else if (missCount > 4) {
            changeOverlay("lose", "You Lost, better luck next time  : ( ");
        }
    };

    // resets game
    const resetGame = () => {
        // Resets Overlay
        overlay.style.display = "none";
        overlay.className = "start";

        // Resets keyboard
        const keyboardButtons = document.querySelectorAll("button");
        for (i = 0; i < keyboardButtons.length; i++) {
            keyboardButtons[i].classList.remove("chosen");
            keyboardButtons[i].disabled = false;
        };

        // Resets the phrase
        phrase.innerHTML = "";
        const phraseArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseArray);

        // Resets the lives images
        const lives = document.querySelectorAll(".tries");
        for (let i = 0; i < lives.length; i++) {
            lives[i].children[0].src = 'images/liveHeart.png';
        };

        // Resets the counter to 0
        missCount = 0;
    };

    // Change the overlay
    const changeOverlay = (result, message) => {
        overlay.className = result;
        overlay.children[0].textContent = message;
        overlay.style.display = "flex";
        startGame.textContent = "play again?";
    };

    // Listen for clicks on the screen keyboard
    qwerty.addEventListener("click", function(e) {
        const button = e.target;
        if (button.tagName === "BUTTON") {
            button.classList.add("chosen");
            button.disabled = true;
            const letterFound = checkLetter(button);
            if (letterFound === null) {
                const lives = document.querySelectorAll(".tries");
                for (let i = 0; i < lives.length; i++) {
                    if (lives[i].children[0].src.indexOf("live") > -1) {
                        lives[i].children[0].src = 'images/lostHeart.png';
                        break;
                    }
                }
                missCount += 1;
            }
        }
        checkWin();
    });
});