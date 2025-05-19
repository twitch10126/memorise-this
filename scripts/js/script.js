
// when the document is fully loaded the script will run
$(document).ready(function () {

    // game object
    let game = {
        round: 1,
        gameSequence: [],
        userSequence: [],
        gameover: false,
        colors: ["red", "blue", "green", "purple"],
    };

    // start game function 
    function startGame() {
        let audio = new Audio(`assets/sounds/game-start.mp3`);
        audio.play();
        game.round = 1;
        game.gameSequence = [];
        game.userSequence = [];
        $("i").addClass("hidden");
        $(".overlay-text").addClass("hidden");
        $(".start").removeClass("border");
        $(".start").text("Score:");
        $("#score").removeClass("hidden");
        $("#score").text(game.round);
        $(".lg-rules").addClass("hidden");
        $("#restart").removeClass("hidden");
        startCss()
        setTimeout(() => {
            nextColor();
            setTimeout(flash, 1000)
        }, 3500);
    };

    // start css
    function startCss() {
        if (window.innerWidth < 768) {
            $(".game-outter").css("top", "302px");
            $("#restart").css("margin-top", "140%");

        }
        else if (window.innerWidth >= 1440) {
            $(".game-outter").css("top", "20%");
            $("#restart").css("margin-top", "50%");
        }
        else if (window.innerWidth >= 1024) {
            $(".game-outter").css("top", "20%");
            $("#restart").css("margin-top", "49%");
        }
        else if (window.innerWidth >= 768) {
            $(".game-outter").css("top", "160px");
            $("#restart").css("margin-top", "72%");
        }
    };

    // endGameCss
    function endGameCss() {
        if (window.innerWidth < 768) {

        }
        else if (window.innerWidth >= 1440) {

        }
        else if (window.innerWidth >= 1024) {
            $(".game-outter").css("top", "233.03px");
        }
        else if (window.innerWidth >= 768) {
            $(".game-outter").css("top", "217.672px");
        }
    }

    /**
     * The nextColor function generates a random color from the buttons array,
     * then pushes the randomColor to the gameSequence array.
     */

    function nextColor() {
        randomColor = game.colors[(Math.floor(Math.random() * 4))];
        game.gameSequence.push(randomColor);
    }

    // check user input
    function checkInput() {
        const index = game.userSequence.length - 1;
        if (game.userSequence[index] !== game.gameSequence[index]) {
            endGame();
        } else if (game.userSequence.length === game.gameSequence.length) {
            nextRound();
        }
    }

    // next round function
    function nextRound() {
        game.round++;
        game.userSequence = [];
        $("#score").text(game.round)
        nextColor();
        setTimeout(flash, 1000);
    }

    // flash function
    function flash() {
        let i = 0;

        function flashSequence() {
            if (i < game.gameSequence.length) {
                lights(game.gameSequence[i]);
                setTimeout(() => {
                    i++;
                    flashSequence();
                }, 1000);
            }
        }

        flashSequence();
    };

    // lights function
    function lights(btn) {
        let audio = new Audio(`assets/sounds/${btn}.mp3`);
        audio.play();

        document.querySelector("." + btn).classList.add("light");
        setTimeout(() => {
            document.querySelector("." + btn).classList.remove("light");
        }, 400);
    }

    function endGame() {
        let audio = new Audio(`assets/sounds/game-over.mp3`);
        audio.play();
        game.round = 1;
        game.gameSequence = [];
        game.userSequence = [];
        $("i").removeClass("hidden");
        $(".overlay-text").removeClass("hidden");
        $(".start").addClass("border");
        $(".start").text("Start");
        $("#score").addClass("hidden");
        $("#restart").addClass("hidden");
    }

    // Event listeners

    // start button event listener
    $(".start").on("click", startGame);

    // colour buttons event listener for user input
    $(".red, .blue, .green, .purple").on("click", function () {
        const selectedColor = $(this).attr("class").split(" ")[0];
        game.userSequence.push(selectedColor);
        lights(selectedColor);
        checkInput();
    });

    // reset button event listener

    $(".restart").on("click", function () {
        game.round = 1;
        gameSequence = [];
        userSequence = [];
        $("i").removeClass("hidden");
        $(".overlay-text").removeClass("hidden");
        $(".start").addClass("border");
        $(".start").text("Start");
        $("#score").addClass("hidden");
        $("#score").text(game.round);
        $(".lg-rules").removeClass("hidden");
        $(".lg-rules").addClass("visible");
        $("#restart").addClass("hidden");
        endGameCss();
    });

    // dropdown event listener
    $("#dropdownBtn").on("click", function () {
        $(".dropdownRow").toggleClass("hidden");
    });

    $(".lg-rules").on("click", function () {
        $(".rules").toggleClass("hidden");
        $("ol").toggleClass("hidden");
    });

});
