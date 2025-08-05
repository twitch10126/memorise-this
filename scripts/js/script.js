/* jshint esversion: 11, jquery: true */


// game object

let game = {
    active: false,
    aiTurn: false,
    restart: false,
    isMuted: true,
    round: 1,
    gameSequence: [],
    userSequence: [],
    speed: 1000,
    colors: ["red", "blue", "green", "purple"],
};

let sounds = [];

// leaderboard data

let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [{ name: "Player", score: 0 }];

function updateLeaderboard() {
    /**
     * Updates the leaderboard UI and data storage.
     *
     * - Sorts players by score in descending order.
     * - Trims the leaderboard to the top 10 players.
     * - Dynamically updates the dropdown menu with player rows.
     * - Hides all rows except the top player by default.
     * - Appends a reset button to the dropdown.
     * - Saves the updated leaderboard to localStorage.
     *
     * Assumes `leaderboard` is a global array of player objects with `name` and `score` properties.
     * Uses jQuery to manipulate DOM elements with ID `dropdown-menu`.
    */

    // Sort by score (highest first)

    leaderboard.sort((a, b) => b.score - a.score);

    // Trim the leaderboard to only store the top 10

    leaderboard = leaderboard.slice(0, 10);

    // Clear table and dynamically add new rows

    $("#dropdown-menu").empty();
    leaderboard.forEach((player, index) => {
        let rowClass = index === 0 ? "" : "dropdownRow hidden"; // Hide all but first row
        $("#dropdown-menu").append(`
                <tr class="${rowClass}">
                    <td>${player.name}</td>
                    <td>${player.score}</td>
                </tr>
            `);
    });

    //  Append reset button after leaderboard rows

    $("#dropdown-menu").append(`
        <tr class="dropdownRow hidden">
            <td colspan="2">
                <button class="reset">Reset</button>
            </td>
        </tr>
        `);

    // Save updated leaderboard to localStorage

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

}

// Initialize leaderboard on page load

updateLeaderboard();

function startGame() {
    /**
     * The StartGame function is called when the start button is clicked.
     * This function resets all values to the original starting value,
     * the start game audio is played and the color sequence starts 
     * after a 3500 millisecond delay
    */

    game.active = true;
    game.restart = false;

    // play game start audio 

    let audio = new Audio(`assets/sounds/game-start.mp3`);
    audio.muted = game.isMuted;
    audio.play();
    sounds.push(audio);

    // reset game to initial values

    game.round = 1;
    game.gameSequence = [];
    game.userSequence = [];
    $(".start").removeClass("border cursor").text("Round:").css(
        {
            "margin-top": "-7px",
            "color": "var(--text)",
        }
    );
    $("#score").removeClass("hidden").text(game.round);
    $(".lg-rules").addClass("hidden");
    $(".rules").addClass("hidden");
    $("#restart").removeClass("hidden");
    $(".bttn").addClass("disable");

    // Sequence starts after 3500 millisecond delay

    setTimeout(() => {

        // call nextColor

        nextColor();

        // call sequence

        setTimeout(flash, 1000);

    }, 3500);
}

function nextColor() {
    /**
     * Generates a random colour between 1 and 4 
     * Stores the result in the randomColor variable
     * Pushes random color into the gameSequence array 
    */

    // generate random color between 1 and 4 of the colors array

    let randomColor = game.colors[(Math.floor(Math.random() * 4))];

    // push random color to game sequence

    game.gameSequence.push(randomColor);
}

function checkInput() {
    /**
     * The checkInput function checks if the user sequence is the
     * same as the game sequence to continue to the next round,
     * if the user sequence is not the same as the game sequence the game will end.
     */

    const index = game.userSequence.length - 1;

    // if userSequence at index is not the same as 
    // game sequence at index, game over.

    if (game.userSequence[index] !== game.gameSequence[index]) {
        endGame();
    }

    // else if userSequence at index is the same as 
    // game sequence at index, next round.

    else if (game.userSequence.length === game.gameSequence.length) {
        nextRound();
    }
}

function nextRound() {
    /**
     * Advances the game to the next round.
     *
     * - Disables all buttons to prevent user input during sequence playback.
     * - Increments the round counter and resets the user's input sequence.
     * - Updates the score display to reflect the current round.
     * - Adds a new color to the game sequence.
     * - Gradually increases difficulty by reducing the flash speed every 3 rounds,
     *   with a minimum speed threshold to maintain playability.
     * - Initiates the flashing sequence after a short delay.
    */

    $(".bttn").addClass("disable");

    // increase round count

    game.round++;

    // Reset user sequence

    game.userSequence = [];

    // Update score display

    $("#score").text(game.round);

    // Generate next color in sequence

    nextColor();

    // Reduce speed every 5 rounds (minimum limit to prevent it from becoming too fast)

    if (game.round % 3 === 0 && game.speed > 400) {
        game.speed -= 100; // Decrease delay by 100ms every 5 rounds
    }

    // Begin flashing sequence with a short delay

    setTimeout(flash, game.speed);
}

function flash() {
    /** 
     * The flash function controls the flashing sequence of colors in the game. 
     * It iterates through the game sequence and calls the lights function 
     * for each color in order with a delay to mimic the pattern.
    */

    game.aiTurn = true;

    // initialise i as 0
    let i = 0;

    function flashSequence() {
        /**
         * Plays back the game's color sequence to the user.
         *
         * - Iterates through `game.gameSequence`, lighting each button in order.
         * - Uses a delay (`game.speed`) between flashes to control playback speed.
         * - Stops playback if the game is restarted or inactive.
         * - Once the sequence is complete, re-enables user input by removing
         *  the `.disable` class.
        */

        // if i is less than game sequence length

        if (i < game.gameSequence.length && !game.restart && game.active) {

            // call lights to light the game sequence button at current index

            lights(game.gameSequence[i]);

            // timeout to stop buttons flashing too frequntly 

            i++;
            setTimeout(flashSequence, game.speed);
        }
        else {
            game.aiTurn = false;
            $(".bttn").removeClass("disable");
        }
    }

    flashSequence();
}


function lights(btn) {
    /**
     * Lights up a game button and plays its associated sound.
     *
     * - Plays a sound file corresponding to the button name (e.g., "red", "blue").
     * - Applies a temporary visual highlight (`.light` class) to the button.
     * - Removes the highlight after 400 milliseconds.
    */


    // play the sound effect for the button clicked

    let audio = new Audio(`assets/sounds/${btn}.mp3`);
    audio.muted = game.isMuted;
    audio.play();
    sounds.push(audio);

    // add a highlight effect to the button

    document.querySelector("." + btn).classList.add("light");

    // remove the highlight effect after 400 milliseconds

    setTimeout(() => {
        document.querySelector("." + btn).classList.remove("light");
    }, 400);
}


function endGame() {
    /**
     * Handles game termination logic and UI reset.
     *
     * This function is triggered when the game ends. It:
     * - Marks the game as inactive and calculates the final score.
     * - Plays a "game over" sound, respecting the mute setting.
     * - Resets core game state variables (round, sequences, speed).
     * - Disables interactive buttons and restores the start button's default styling.
     * - Hides score and restart elements, and reveals game instructions.
     * - If the player completed at least one round, displays a modal with their score.
     *   Otherwise, shows an alert prompting them to play for a valid score.
    */

    game.active = false;
    let finalScore = game.round - 1;

    // play game over sound

    let audio = new Audio(`assets/sounds/game-over.mp3`);
    audio.muted = game.isMuted;
    audio.play();
    sounds.push(audio);

    // reset game values

    game.round = 1;
    game.gameSequence = [];
    game.speed = 1000;
    game.userSequence = [];
    $(".bttn").addClass("disable");

    // Hide game elements and reset start button

    $(".start").addClass("border cursor").text("Start").css(
        {
            "margin-top": "initial",
            "font-size": "initial",
            "color": "var(--gradient-color2)",
        }
    );
    $("#score").addClass("hidden");
    $("#restart").addClass("hidden");
    $(".lg-rules").removeClass("hidden");

    // Automatically open the modal when the game ends

    if (finalScore >= 1) {
        $("#saveModal").modal("show").css("padding-left", "10px");
        $(".score").text(`Your Score: ${finalScore}`);
    }
    else {

        // delay alert so sound will play

        setTimeout(() => alert("Please play to receive a valid score"), 100);
    }


}

// Event listeners

$("#muteToggle").on("click", function () {
    /**
     * Toggles the game's mute state when #muteToggle is clicked.
     *
     * - Toggles the `game.isMuted` boolean to enable or disable sound.
     * - Updates the `muted` property of all currently tracked audio elements.
     * - Switches the icon inside the #muteToggle button between
     *   "fa-volume-xmark" (muted) and "fa-volume-high" (unmuted) to show current state.
    */

    game.isMuted = !game.isMuted;

    // Mute/unmute all tracked sounds
    sounds.forEach(sound => {
        sound.muted = game.isMuted;
    });

    // Toggle icon based on mute state
    $(this).find("i").toggleClass("fa-volume-xmark fa-volume-high");
});


/** 
 * Start button event listener 
 * Calls startGame function when the start button is clicked.
*/

$(".start").on("click", startGame);



$(".red, .blue, .green, .purple").on("click", function () {
    /** 
     * Color button event listener for user input 
     * - Detects which color was clicked, adds it to the user sequence, 
     * - flashes the corresponding button, and checks the input.
    */

    if (game.aiTurn || !game.active) {
        return;
    }

    // extract the class for the clicked button

    const selectedColor = $(this).attr("class").split(" ")[0];

    // push selected color to user sequence array

    game.userSequence.push(selectedColor);

    // call lights function to flash the selected button

    lights(selectedColor);

    // Check user input

    checkInput();
});



$(".restart").on("click", function () {
    /** 
     * - Restart button event listener 
     * - Resets game values, updates UI elements, and re-applies CSS adjustments.
    */

    game.active = false;
    game.restart = true;

    // Reset game variables

    game.round = 1;
    game.gameSequence = [];
    game.userSequence = [];
    game.speed = 1000;

    // Reset elements to restart

    $(".start").addClass("border cursor").text("Start").css(
        {
            "margin-top": "initial",
            "color": "var(--gradient-color2)",
        }
    );
    $("#score").addClass("hidden").text(game.round);
    $(".lg-rules").removeClass("hidden").addClass("visible");
    $("#restart").addClass("hidden");
    $(".bttn").addClass("disable");
});



$("#dropdownBtn").on("click", function () {
    /** 
     *  Dropdown button event listener 
     * - Toggles visibility of leaderboard rows when the leaderboard button is clicked.
    */

    $(".dropdownRow").toggleClass("hidden");
});



$(".lg-rules").on("click", function () {
    /**
     * Attaches a click event listener to the element with class `.lg-rules`.
     *
     * Behavior:
     * - When clicked, toggles the visibility of the rules section (`.rules`) and its ordered list (`<ol>`).
     * - If the rules section is currently hidden (`.hidden`), it becomes visible (`.visible`), and the list is shown.
     * - If the rules section is currently visible, it is hidden again along with the list.
    */

    // if rules section is hidden, make it visible

    if ($(".rules").hasClass("hidden")) {
        $(".rules").removeClass("hidden").addClass("visible");
        $("ol").removeClass("hidden");
    }

    // else, hide the rules section

    else if ($(".rules").hasClass("visible")) {
        $(".rules").removeClass("visible").addClass("hidden");
        $("ol").addClass("hidden");
    }
});

$(document).on("click", ".reset", function () {
    leaderboard = [{ name: "Player", score: 0 }];
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    updateLeaderboard();
});

$("#saveScore").on("click", function () {
    /**
     * Handles the click event on the #saveScore button.
     *
     * - Retrieves the player's name from the input field and trims whitespace.
     * - Extracts the score from the .score element's text.
     * - Validates that both name and score are present and valid.
     * - If the leaderboard's first entry is a placeholder ("Player"), it replaces it.
     *   Otherwise, it appends the new score entry.
     * - Updates localStorage with the new leaderboard data.
     * - Refreshes the leaderboard UI and closes the modal.
     * - Clears the input field for future entries.
     *
     * Alerts the user if the name is missing or invalid.
    */

    const playerName = $("#playerName").val().trim();
    const scoreText = $(".score").text();
    const score = parseInt(scoreText.replace(/\D/g, ""), 10); // Extract number

    if (playerName && !isNaN(score)) {
        if (leaderboard.length > 0 && leaderboard[0].name === "Player") {
            leaderboard[0] = { name: playerName, score: score };
        } else {
            leaderboard.push({ name: playerName, score: score });
        }

        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
        updateLeaderboard();
        $("#saveModal").modal("hide");
        $("#playerName").val("");
    } else {
        alert("Please enter a valid name.");
    }
});

$("a").hover(
    /**
     * Adds a hover effect to all <a> elements.
     *
     * On mouseenter and mouseleave:
     * - Toggles the CSS classes "gradient-text-git" and "gradient-text-link"
     *   on the hovered <a> element.
     * - Also toggles the same classes on its sibling <a> elements.
     *
     * This creates a dynamic gradient text effect that visually links related
     * anchor elements when hovered.
    */

    // mouseenter

    function () {
        $(this).toggleClass("gradient-text-git gradient-text-link");
        $(this).siblings("a").toggleClass("gradient-text-git gradient-text-link");
    },

    // mouseleave

    function () {
        $(this).toggleClass("gradient-text-git gradient-text-link");
        $(this).siblings("a").toggleClass("gradient-text-git gradient-text-link");
    }
);

if (typeof module !== "undefined") module.exports = {
    game, nextRound, nextColor,
};

