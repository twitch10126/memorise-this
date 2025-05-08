
// when the document is fully loaded the script will run
$(document).ready(function () {

    // game object
    let game = {
        round: 1,
        gameSequence: [],
        userSequence: [],
        gameover: false,
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


    function nextColor(){
        randomColor = game.colors[(Math.floor(Math.random() * 4))];
        game.gameSequence.push(randomColor);
        console.log("Game Sequence:", game.gameSequence);
    }

     // Event listeners

     $(".start").on("click", startGame);
});
