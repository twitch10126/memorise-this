/* jshint esversion: 11, jquery: true */

// when the document is fully loaded the script will run
$(document).ready(function () {

    // game object
    let game = {
        active: false,
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
        console.log("Dropdown Menu HTML:", $("#dropdown-menu").html());

    }

    // Initialize leaderboard on page load
    updateLeaderboard();
    /**
     * The StartGame function is called when the start button is clicked.
     * This function resets all values to the original starting value,
     * the start game audio is played and the color sequence starts 
     * after a 3500 millisecond delay
     */

    function startGame() {
        if (game.active === true) {
            return;
        }
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
        $(".start").removeClass("border").text("Round:").css(
            { "margin-top": "-7px", }
        );
        $("#score").removeClass("hidden").text(game.round);
        $(".lg-rules").addClass("hidden");
        $(".rules").addClass("hidden");
        $("#restart").removeClass("hidden");
        $(".bttn").removeClass("disable");
        // Sequence starts after 3500 millisecond delay
        setTimeout(() => {
            // call nextColor
            nextColor();
            // call sequence
            setTimeout(flash, 1000)
        }, 3500);
    };

    function nextColor() {
        // generate random color between 1 and 4 of the colors array
        randomColor = game.colors[(Math.floor(Math.random() * 4))];
        // push random color to game sequence
        game.gameSequence.push(randomColor);
    }

    /**
     * The checkInput function checks if the user sequence is the
     * same as the game sequence to continue to the next round,
     * if the user sequence is not the same as the game sequence the game will end.
     */

    function checkInput() {
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

    /**
     * The nextRound function adds one to the round, resets user sequence,
     * sets score to the value of current round,
     * calls next color then starts the flashing sequence.
     */

    function nextRound() {
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

    /** 
     * The flash function controls the flashing sequence of colors in the game. 
     * It iterates through the game sequence and calls the lights function 
     * for each color in order with a delay to mimic the pattern.
     */

    function flash() {
        // initialise i as 0
        let i = 0;

        // flash Sequence function
        function flashSequence() {

            // if i is less than game sequence length
            if (i < game.gameSequence.length && !game.restart && game.active) {
                // call lights to light the game sequence button at current index
                lights(game.gameSequence[i]);
                // timeout to stop buttons flashing too frequntly 
                setTimeout(() => {
                    // increment i by 1
                    i++;
                    // call flash sequence after 1000 millisecond delay 
                    flashSequence();
                }, game.speed);
            }
        }

        flashSequence();
    };

    /** 
     * The lights function plays the correct sound for the current button 
     * and briefly changes the appearance of the button. 
     * The effect lasts for 400 milliseconds before changing back.
     */

    function lights(btn) {
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

    /** 
     * The endGame function resets the game and hides 
     * elements to show the game has ended and to prepare for the next game.
     */

    function endGame() {
        game.active = false;
        let finalScore = game.round - 1;
        // play game over sound
        let audio = new Audio(`assets/sounds/game-over.mp3`);
        audio.muted = game.isMuted;
        audio.play();
        sounds.push(audio);
        $("#saveModal").modal("show");
        // reset game values
        game.round = 1;
        game.gameSequence = [];
        game.userSequence = [];
        $(".bttn").addClass("disable");
        // Hide game elements and reset start button
        $(".start").addClass("border").text("Start").css(
            {"margin-top": "initial",
             "font-size": "initial"}
            );
        $("#score").addClass("hidden");
        $("#restart").addClass("hidden");
        $(".lg-rules").removeClass("hidden");
        // Automatically open the modal when the game ends
        $(".score").text(`Your Score: ${finalScore}`);


    }

    // Event listeners

    $("#muteToggle").on("click", function () {
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

    /** 
     * Color button event listener for user input 
     * Detects which color was clicked, adds it to the user sequence, 
     * flashes the corresponding button, and checks the input.
     */

    $(".red, .blue, .green, .purple").on("click", function () {
        // extract the class for the clicked button
        const selectedColor = $(this).attr("class").split(" ")[0];
        // push selected color to user sequence array
        game.userSequence.push(selectedColor);
        // call lights function to flash the selected button
        lights(selectedColor);
        // Check user input
        checkInput();
    });

    /** 
     * Restart button event listener 
     * Resets game values, updates UI elements, and re-applies CSS adjustments.
     */

    $(".restart").on("click", function () {
        game.active = false;
        game.restart = true;
        // Reset game variables
        game.round = 1;
        gameSequence = [];
        userSequence = [];
        // Reset elements to restart
        $(".start").addClass("border").text("Start").css(
            {"margin-top": "initial"}
            );
        $("#score").addClass("hidden").text(game.round);
        $(".lg-rules").removeClass("hidden").addClass("visible");
        $("#restart").addClass("hidden");
        $(".bttn").addClass("disable");
    });

    /** 
     * Dropdown button event listener 
     * Toggles visibility of leaderboard rows when the leaderboard button is clicked.
     */

    $("#dropdownBtn").on("click", function () {
        $(".dropdownRow").toggleClass("hidden");
    });

    /** 
     * Rules section event listener 
     * Toggles visibility of the rules list when the rules button is clicked.
     */

    $(".lg-rules").on("click", function () {
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

});
