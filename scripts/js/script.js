
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
        game.round = 1;
        gameSequence = [];
        userSequence = [];
        $("i").addClass("hidden");
        $(".overlay-text").addClass("hidden");
        $(".start").removeClass("border");
        $(".start").text("Score:").css("font-size", "2em","width", "90%");
        $("#score").removeClass("hidden");
        console.log("Game has started");
        nextColor();
    };

    /**
     * The nextColor function generates a random color from the buttons array,
     * then pushes the randomColor to the gameSequence array.
     */

    function nextColor(){
        randomColor = game.colors[(Math.floor(Math.random() * 4))];
        game.gameSequence.push(randomColor);
        console.log("Game Sequence:", game.gameSequence);
    }

    // check user input
    function checkInput() {
        const index = game.userSequence.length - 1;
        if (game.userSequence[index] !== game.gameSequence[index]) {
            endGame();
        } else if (game.userSequence[index] !== game.gameSequence[index]) {

        }
    }

    function endGame() {
        alert("Game Over!");
        game.round = 1;
        gameSequence = [];
        userSequence = [];
        $("i").removeClass("hidden");
        $(".overlay-text").removeClass("hidden");
        $(".start").addClass("border");
        $(".start").text("Start");
        $("#score").addClass("hidden");
    }

     // Event listeners

     // start button event listener
     $(".start").on("click", startGame);

     // colour buttons event listener for user input
     $(".red, .blue, .green, .purple").on("click", function() {
        const selectedColor = $(this).attr("class").split(" ")[0];
        game.userSequence.push(selectedColor);
        console.log("User Sequence:", game.userSequence);
     });
});
