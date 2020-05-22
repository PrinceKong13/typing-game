let lastKeyPress = "t";
let currentSentence = 0;
let charSelector = 0;
let numberOfMistakes = 0
let sentences = [
  "ten ate neite ate nee enet ite ate inet ent eate",
  "Too ato too nOt enot one totA not anot tOO aNot",
  "oat itain oat tain nate eate tea anne inant nean",
  "itant eate anot eat nato inate eat anot tain eat",
  "nee ene ate ite tent tiet ent ine ene ete ene ate",
];
let sentenceLength = sentences[currentSentence].length;
let currentLetter = sentences[currentSentence][charSelector];

$("#keyboard-upper-container").css("display", "none");
$("#target-letter").text(currentLetter);
$("#sentence").append(highLightAt(charSelector));

//Everything in the game runs based on key presses, so most things happen right here
$(document).keydown(function (event) {
  //Shows uppercase keyboard when shift is pressed
  if (event.which == 16) {
    $("#keyboard-upper-container").css("display", "");
    $("#keyboard-lower-container").css("display", "none");
  } else if (charSelector == sentenceLength - 1) {
    newSentence();

    //Moves the highlighter and changes current target letter
  } else {
    if (event.key == currentLetter) {
      $("#feedback").append("<span class='glyphicon glyphicon-ok'></span>");
    } else {
      $("#feedback").append("<span class='glyphicon glyphicon-remove'></span>");
      ++numberOfMistakes
    }
    ++charSelector;
    currentLetter = sentences[currentSentence][charSelector];
    $("#target-letter").text(currentLetter);
    $("#sentence").empty();
    $("#sentence").append(highLightAt(charSelector));
  }
});

//Highlights keys when pressed and stores the ascii value for the pressed key
$(document).keypress(function (event) {
  lastKeyPress = event.which;
  $("#" + lastKeyPress).css("backgroundColor", "gray");
});

//Hides the upper case keyboard once shift is released and returns the lower case one. Also returns keys to their original color when released
$(document).keyup(function (event) {
  if (event.which == 16) {
    $("#keyboard-upper-container").css("display", "none");
    $("#keyboard-lower-container").css("display", "");
  }
  $(".key").css("backgroundColor", "");
});

//This highlights the target letter in the sentence
function highLightAt(index) {
  return (
    sentences[currentSentence].substr(0, index) +
    "<span class='highlighted'>" +
    sentences[currentSentence].substr(index, 1) +
    "</span>" +
    sentences[currentSentence].substr(index + 1, sentenceLength)
  );
}

//This resets the prompt and needed variables for a new sentence
function newSentence() {
  ++currentSentence;
  charSelector = 0;
  $("#sentence").empty();
  $("#sentence").append(highLightAt(charSelector));
  currentLetter = sentences[currentSentence][charSelector];
  $("#target-letter").text(currentLetter);
  sentenceLength = sentences[currentSentence].length;
  $("#feedback").empty();
}
