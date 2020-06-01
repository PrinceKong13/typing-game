let gameState = {
  lastKeyPress: "t",
  currentSentence: 0,
  charSelector: 0,
  numberOfMistakes: 0,
  startTime: Date.now(),
};
let sentences = [
  "ten ate neite ate nee enet ite ate inet ent eate",
  "Too ato too nOt enot one totA not anot tOO aNot",
  "oat itain oat tain nate eate tea anne inant nean",
  "itant eate anot eat nato inate eat anot tain eat",
  "nee ene ate ite tent tiet ent ine ene ete ene ate",
  " ",
];
let sentenceLength = sentences[gameState.currentSentence].length;
let currentLetter = sentences[gameState.currentSentence][gameState.charSelector];
$("#keyboard-upper-container").css("display", "none");
startGame();

//This generates a start button to ensure the time is precise and allows for easy reset
function startGame() {
  $("#target-letter").append("<button id='start'>Start</button>");
  $("#start").click(function () {
    gameState.lastKeyPress = "t";
    gameState.currentSentence = 0;
    gameState.charSelector = 0;
    gameState.numberOfMistakes = 0;
    gameState.startTime = Date.now();
    sentenceLength = sentences[gameState.currentSentence].length;
    currentLetter = sentences[gameState.currentSentence][gameState.charSelector];
    $("target-letter").empty();
    $("#target-letter").text(currentLetter);
    $("#sentence").append(highlightAt(gameState.charSelector));

    //Everything in the game runs based on key presses, so most things happen right here
    $(document).keydown(function (event) {
      highlightPressedKey();
      if (event.keyCode == 16) {
        showUpperCase();
      } else if (gameState.charSelector == sentenceLength - 1) {
        updateSentence();
      } else {
        feedback();
      }
    });

    //Hides the upper case keyboard once shift is released and returns the lower case one. Also returns keys to their original color when released
    $(document).keyup(function (event) {
      if (event.keyCode == 16) {
        $("#keyboard-upper-container").css("display", "none");
        $("#keyboard-lower-container").css("display", "");
      }
      $(".key").css("backgroundColor", "");
    });
  });
}

//This highlights the target letter in the sentence
function highlightAt(index) {
  return (
    sentences[gameState.currentSentence].substr(0, index) +
    "<span class='highlighted'>" +
    sentences[gameState.currentSentence].substr(index, 1) +
    "</span>" +
    sentences[gameState.currentSentence].substr(index + 1, sentenceLength)
  );
}

//Ends the game and creates a game over screen. Allows game to be restarted if desired
function endGame() {
  $(document).off();
  timeElapsed = Date.now() - gameState.startTime;
  minutes = timeElapsed / 60000;
  $("#sentence").empty();
  $("#feedback").empty();
  $("#target-letter").empty();
  $("#sentence").text(
    "Game Over! Your score is: " +
    (54 / minutes - 2 * gameState.numberOfMistakes) +
    " Words Per Minutes!"
  );
  $("#target-letter").append("<button id='restart'>Restart</button>");
  $("#restart").click(function () {
    $("#sentence").empty();
    $("#target-letter").empty();
    startGame();
  });
}

//This highlights a key when it is pressed
function highlightPressedKey() {
  gameState.lastKeyPress = event.key.charCodeAt(0);
  $("#" + gameState.lastKeyPress).css("backgroundColor", "gray");
}

//Shows the uppercase keyboard
function showUpperCase() {
  $("#keyboard-upper-container").css("display", "");
  $("#keyboard-lower-container").css("display", "none");
}


//Replaces the current sentence with the next one when completed or ends the game if the last sentence is completed
function updateSentence() {
  ++gameState.currentSentence;
  if (gameState.currentSentence == 5) {
    endGame();
  } else {
    gameState.charSelector = 0;
    $("#sentence").empty();
    $("#sentence").append(highlightAt(gameState.charSelector));
    currentLetter = sentences[gameState.currentSentence][gameState.charSelector];
    $("#target-letter").text(currentLetter);
    sentenceLength = sentences[gameState.currentSentence].length;
    $("#feedback").empty();
  }
}

//Tracks mistakes and provides feedback based on whether the player hit the right key. Also moves the highlighter based on what letter is currently required
function feedback() {
  if (event.key == currentLetter) {
    $("#feedback").append("<span class='glyphicon glyphicon-ok'></span>");
  } else {
    $("#feedback").append(
      "<span class='glyphicon glyphicon-remove'></span>"
    );
    ++gameState.numberOfMistakes;
  }
  ++gameState.charSelector;
  currentLetter = sentences[gameState.currentSentence][gameState.charSelector];
  if (currentLetter === " ") {
    $("#target-letter").text("Space");  
  } else {
  $("#target-letter").text(currentLetter);
  }
  $("#sentence").empty();
  $("#sentence").append(highlightAt(gameState.charSelector));
}