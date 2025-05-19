/* jshint esversion: 11, jquery: true */

// when the document is fully loaded the script will run
$(document).ready(function () {

    // game object
    let game = {
        round: 1,
        gameSequence: [],
        userSequence: [],
        speed: 1000,
        colors: ["red", "blue", "green", "purple"],
    };

    /**
     * The StartGame function is called when the start button is clicked.
     * This function resets all values to the original starting value,
     * the start game audio is played and the color sequence starts 
     * after a 3500 millisecond delay
     */

    function startGame() {
        // play game start audio 
        let audio = new Audio(`assets/sounds/game-start.mp3`);
        audio.play();
        // reset game to initial values
        game.round = 1;
        game.gameSequence = [];
        game.userSequence = [];
        $(".start").removeClass("border").text("Score:");
        $("#score").removeClass("hidden").text(game.round);
        $(".lg-rules").addClass("hidden");
        $("#restart").removeClass("hidden");

        // call startCss
        startCss()
        // Sequence starts after 3500 millisecond delay
        setTimeout(() => {
            // call nextColor
            nextColor();
            // call sequence
            setTimeout(flash, 1000)
        }, 3500);
    };

    /**
     * The startCss function adjusts the margin for the outter game circle and
     * the restart button depending on the size of the device used.
     */

    function startCss() {
        // screens smaller than 768px
        if (window.innerWidth < 768) {
            $(".game-outter").css("top", "302px");
            $("#restart").css("margin-top", "140%");
            $("h3").css({
                "margin": "0",
                "margin-top": "28px",
                "margin-bottom": "-14px",
                "padding": "0"
            });
        }
        // screens greater than or equal to 1440px
        else if (window.innerWidth >= 1440) {
            $(".game-outter").css("top", "20%");
            $("#restart").css("margin-top", "50%");
            $("h3").css({
                "font-size": "28px",
                "margin": "0",
                "margin-top": "28px",
                "margin-bottom": "-14px",
                "padding": "0"
            }); 
            $(".start").css("margin-top", "43px");
        }
        // screens greater than or equal to 1024px
        else if (window.innerWidth >= 1024) {
            $(".game-outter").css("top", "20%");
            $("#restart").css("margin-top", "72%");
            $(".start").css("margin-top", "-10");

        }
        // screens greater than or equal to 768px
        else if (window.innerWidth >= 768) {
            $(".game-outter").css("top", "160px");
            $("#restart").css("margin-top", "72%");
            $("h3").css({
                "margin": "0",
                "margin-top": "28px",
                "padding": "0",
            });
        }
    };

    /**
     * The endGameCss function adjusts the margin for the outter game circle
     * depending on the size of the device used.
     */

    function endGameCss() {
        // screens smaller than 768px
        if (window.innerWidth < 768) {
            $(".game-outter").css("top", "302px");
            $("#restart").css("margin-top", "140%");
            $("h3").css({
                "margin": "0",
                "margin-bottom": "-2px",
                "margin-top": "5px",
                "padding": "0"
            });
        }
        // screens greater than or equal to 1024px
        else if (window.innerWidth >= 1024) {
            $(".game-outter").css("top", "233.03px");
            $(".game-outter").css("top", "302px");
            
        }
        // screens greater than or equal to 768px
        else if (window.innerWidth >= 768) {
            $(".game-outter").css("top", "217.672px");
            $(".start").css("margin-top", "25px");
        }
    }

    /**
     * The nextColor function generates a random color from the buttons array,
     * then pushes the randomColor to the gameSequence array.
     */

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
        // Begin flashing sequence with a short delay
        setTimeout(flash, 1000);
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
            if (i < game.gameSequence.length) {
                // call lights to light the game sequence button at current index
                lights(game.gameSequence[i]);
                // timeout to stop buttons flashing too frequntly 
                setTimeout(() => {
                    // increment i by 1
                    i++;
                    // call flash sequence after 1000 millisecond delay 
                    flashSequence();
                }, 1000);
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
        audio.play();
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
        // play game over sound
        let audio = new Audio(`assets/sounds/game-over.mp3`);
        audio.play();
        // reset game values
        game.round = 1;
        game.gameSequence = [];
        game.userSequence = [];
        // Hide game elements and reset start button
        $(".start").addClass("border").text("Start");
        $("#score").addClass("hidden");
        $("#restart").addClass("hidden");
    }

    // Event listeners

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
        // Reset game variables
        game.round = 1;
        gameSequence = [];
        userSequence = [];
        // Reset elements to restart
        $(".start").addClass("border").text("Start");
        $("#score").addClass("hidden").text(game.round);
        $(".lg-rules").removeClass("hidden").addClass("visible");
        $("#restart").addClass("hidden");
        // Apply end-game CSS
        endGameCss();
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
            $("ol").removeClass("hidden")
        }
        // else, hide the rules section
        else if ($(".rules").hasClass("visible")) {
            $(".rules").removeClass("visible").addClass("hidden");
            $("ol").addClass("hidden")
        }
    });

});
