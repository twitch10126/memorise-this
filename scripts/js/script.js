
// when the document is fully loaded the script will run
$(document).ready(function () {

    let game = {
        round: 1,
        gameSequence: [],
        userSequence: [],
        buttons: ["red", "blue", "green", "purple"],
    };

    // start game function 
    function startGame() {
        game.round = 1;
        gameSequence = [];
        userSequence = [];
        console.log("Game has started");
    };


     // Event listeners

     $(".start").on("click", startGame);
});
