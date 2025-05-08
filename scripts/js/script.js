
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
        $("i").addClass("hidden");
        $(".overlay-text").addClass("hidden");
        $(".start").removeClass("border");
        $(".start").text("Score:").css("font-size", "2em","width", "90%");
        $("#score").removeClass("hidden");
        console.log("Game has started");
    };


    function nextColor(){
        
    }

     // Event listeners

     $(".start").on("click", startGame);
});
